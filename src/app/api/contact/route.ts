import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

type RateLimitBucket = {
  count: number;
  resetAt: number;
};

type ContactRateLimitStore = {
  buckets: Map<string, RateLimitBucket>;
  lastCleanupAt: number;
};

const CONTACT_IP_RATE_LIMIT = {
  max: 6,
  windowMs: 15 * 60 * 1000,
};
const CONTACT_EMAIL_RATE_LIMIT = {
  max: 4,
  windowMs: 60 * 60 * 1000,
};
const RATE_LIMIT_CLEANUP_INTERVAL_MS = 60 * 1000;
const MAX_RATE_LIMIT_BUCKETS = 2000;

const globalForContactRateLimit = globalThis as unknown as {
  contactRateLimitStore?: ContactRateLimitStore;
};

const contactRateLimitStore = globalForContactRateLimit.contactRateLimitStore ?? {
  buckets: new Map<string, RateLimitBucket>(),
  lastCleanupAt: 0,
};

globalForContactRateLimit.contactRateLimitStore = contactRateLimitStore;

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSmtpPort() {
  const port = Number.parseInt(process.env.SMTP_PORT || '465', 10);
  return Number.isFinite(port) ? port : 465;
}

function firstForwardedValue(value: string | null) {
  return value?.split(',')[0]?.trim().slice(0, 80) || null;
}

function getClientIp(request: NextRequest) {
  return (
    firstForwardedValue(request.headers.get('cf-connecting-ip')) ||
    firstForwardedValue(request.headers.get('x-real-ip')) ||
    firstForwardedValue(request.headers.get('x-forwarded-for'))
  );
}

function cleanupRateLimitBuckets(now: number) {
  if (
    now - contactRateLimitStore.lastCleanupAt < RATE_LIMIT_CLEANUP_INTERVAL_MS &&
    contactRateLimitStore.buckets.size <= MAX_RATE_LIMIT_BUCKETS
  ) {
    return;
  }

  for (const [key, bucket] of contactRateLimitStore.buckets) {
    if (bucket.resetAt <= now) {
      contactRateLimitStore.buckets.delete(key);
    }
  }

  while (contactRateLimitStore.buckets.size > MAX_RATE_LIMIT_BUCKETS) {
    const oldestKey = contactRateLimitStore.buckets.keys().next().value;
    if (!oldestKey) break;
    contactRateLimitStore.buckets.delete(oldestKey);
  }

  contactRateLimitStore.lastCleanupAt = now;
}

function consumeRateLimit(key: string, max: number, windowMs: number, now: number) {
  const bucket = contactRateLimitStore.buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    contactRateLimitStore.buckets.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return null;
  }

  if (bucket.count >= max) {
    return Math.max(1, Math.ceil((bucket.resetAt - now) / 1000));
  }

  bucket.count += 1;
  return null;
}

function checkContactRateLimit(request: NextRequest, email: string) {
  const now = Date.now();
  cleanupRateLimitBuckets(now);

  const ip = getClientIp(request);
  if (ip) {
    const retryAfter = consumeRateLimit(
      `contact:ip:${ip}`,
      CONTACT_IP_RATE_LIMIT.max,
      CONTACT_IP_RATE_LIMIT.windowMs,
      now
    );
    if (retryAfter) return retryAfter;
  }

  return consumeRateLimit(
    `contact:email:${email.toLowerCase()}`,
    CONTACT_EMAIL_RATE_LIMIT.max,
    CONTACT_EMAIL_RATE_LIMIT.windowMs,
    now
  );
}

type ContactEmailParams = {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
};

function createContactMailer() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;

  if (!smtpHost || !smtpUser || !smtpPassword) {
    throw new Error('SMTP_HOST, SMTP_USER and SMTP_PASSWORD must be configured');
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: getSmtpPort(),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const inbox = process.env.CONTACT_TO_EMAIL || smtpUser;

  return {
    transporter,
    inbox,
    from: process.env.CONTACT_FROM_EMAIL || `SorgfaltBau <${smtpUser}>`,
  };
}

async function sendContactEmail(
  params: ContactEmailParams,
  mailer: ReturnType<typeof createContactMailer>
) {
  const localeLabel = params.locale === 'ru' ? 'RU' : 'DE';
  const phoneValue = params.phone || '-';
  const subject = `Neue Anfrage (${localeLabel}) - ${params.name}`;
  const text = [
    'Neue Kontaktanfrage von sorgfaltbau-halle.de',
    '',
    `Name: ${params.name}`,
    `E-Mail: ${params.email}`,
    `Telefon: ${phoneValue}`,
    `Sprache: ${params.locale}`,
    '',
    'Nachricht:',
    params.message,
  ].join('\n');
  const html = `
    <h2>Neue Kontaktanfrage von sorgfaltbau-halle.de</h2>
    <p><strong>Name:</strong> ${escapeHtml(params.name)}</p>
    <p><strong>E-Mail:</strong> ${escapeHtml(params.email)}</p>
    <p><strong>Telefon:</strong> ${escapeHtml(phoneValue)}</p>
    <p><strong>Sprache:</strong> ${escapeHtml(params.locale)}</p>
    <p><strong>Nachricht:</strong></p>
    <p>${escapeHtml(params.message).replace(/\n/g, '<br/>')}</p>
  `.trim();

  await mailer.transporter.sendMail({
    from: mailer.from,
    to: mailer.inbox,
    replyTo: params.email,
    subject,
    text,
    html,
  });
}

function getCustomerConfirmation(params: ContactEmailParams) {
  const isRussian = params.locale === 'ru';
  const greeting = isRussian ? `Здравствуйте, ${params.name}!` : `Guten Tag ${params.name},`;
  const subject = isRussian
    ? 'SorgfaltBau: мы получили Ваше сообщение'
    : 'SorgfaltBau: Ihre Nachricht ist eingegangen';
  const title = isRussian ? 'Спасибо за Ваше сообщение' : 'Vielen Dank für Ihre Nachricht';
  const receivedText = isRussian
    ? 'Мы получили Ваш запрос и внимательно его рассмотрим.'
    : 'Wir haben Ihre Anfrage erhalten und sehen sie uns sorgfältig an.';
  const responseText = isRussian
    ? 'Мы свяжемся с Вами в ближайшее время по указанным контактным данным.'
    : 'Wir melden uns in Kürze über die von Ihnen angegebenen Kontaktdaten.';
  const replyText = isRussian
    ? 'Если нужно добавить детали или фотографии, просто ответьте на это письмо.'
    : 'Wenn Sie Details oder Fotos ergänzen möchten, antworten Sie einfach auf diese E-Mail.';
  const signoff = isRussian ? 'С уважением' : 'Freundliche Grüße';
  const automaticNote = isRussian
    ? 'Это автоматическое подтверждение получения Вашего сообщения.'
    : 'Dies ist eine automatische Bestätigung zum Eingang Ihrer Nachricht.';
  const text = [
    greeting,
    '',
    receivedText,
    responseText,
    '',
    replyText,
    '',
    signoff,
    'SorgfaltBau',
    'Halle (Saale)',
    '',
    automaticNote,
  ].join('\n');
  const html = `
    <div style="margin:0;background:#f4f7fa;padding:32px 16px;color:#071f35;font-family:Arial,Helvetica,sans-serif;">
      <div style="margin:0 auto;max-width:620px;overflow:hidden;border:1px solid #d7e0e8;border-radius:24px;background:#ffffff;box-shadow:0 18px 48px rgba(7,31,53,0.12);">
        <div style="height:6px;background:linear-gradient(90deg,#071f35 0%,#123d61 70%,#f26422 100%);"></div>
        <div style="padding:34px 30px;">
          <p style="margin:0 0 18px;color:#f26422;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;">SorgfaltBau</p>
          <h1 style="margin:0 0 22px;color:#071f35;font-size:28px;line-height:1.2;">${escapeHtml(title)}</h1>
          <p style="margin:0 0 16px;color:#071f35;font-size:16px;line-height:1.7;">${escapeHtml(greeting)}</p>
          <div style="margin:0 0 18px;border-left:4px solid #f26422;border-radius:0 16px 16px 0;background:#f4f7fa;padding:18px 20px;">
            <p style="margin:0 0 8px;color:#071f35;font-size:16px;line-height:1.7;">${escapeHtml(receivedText)}</p>
            <p style="margin:0;color:#071f35;font-size:16px;line-height:1.7;">${escapeHtml(responseText)}</p>
          </div>
          <p style="margin:0 0 26px;color:#38526a;font-size:15px;line-height:1.7;">${escapeHtml(replyText)}</p>
          <p style="margin:0;color:#071f35;font-size:15px;line-height:1.7;">${escapeHtml(signoff)}<br/><strong>SorgfaltBau</strong><br/>Halle (Saale)</p>
        </div>
        <div style="border-top:1px solid #e3ebf2;background:#f7fafc;padding:18px 30px;color:#62798d;font-size:12px;line-height:1.6;">
          ${escapeHtml(automaticNote)}
        </div>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}

async function sendCustomerConfirmationEmail(
  params: ContactEmailParams,
  mailer: ReturnType<typeof createContactMailer>
) {
  const confirmation = getCustomerConfirmation(params);

  await mailer.transporter.sendMail({
    from: mailer.from,
    to: params.email,
    replyTo: mailer.inbox,
    subject: confirmation.subject,
    text: confirmation.text,
    html: confirmation.html,
    headers: {
      'Auto-Submitted': 'auto-replied',
      'X-Auto-Response-Suppress': 'All',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body?.name === 'string' ? body.name.trim() : '';
    const email = typeof body?.email === 'string' ? body.email.trim() : '';
    const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
    const message = typeof body?.message === 'string' ? body.message.trim() : '';
    const website = typeof body?.website === 'string' ? body.website.trim() : '';
    const locale = body?.locale === 'ru' ? 'ru' : 'de';

    if (website) {
      return NextResponse.json({ success: true }, { status: 201 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich.' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gueltige E-Mail-Adresse an.' },
        { status: 400 }
      );
    }

    const retryAfter = checkContactRateLimit(request, email);
    if (retryAfter) {
      return NextResponse.json(
        { error: 'Zu viele Anfragen. Bitte versuchen Sie es spaeter erneut.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
          },
        }
      );
    }

    const emailParams = { name, email, phone, message, locale };
    const mailer = createContactMailer();

    await sendContactEmail(emailParams, mailer);

    const contact = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        message,
        locale,
      },
    });

    try {
      await sendCustomerConfirmationEmail(emailParams, mailer);
    } catch (error) {
      console.error('Customer contact confirmation error:', error);
    }

    return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Interner Serverfehler.' }, { status: 500 });
  }
}
