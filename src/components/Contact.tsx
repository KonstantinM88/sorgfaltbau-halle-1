'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  PhoneCall,
  Send,
  ShieldCheck,
} from 'lucide-react';
import {
  COMPANY_MAP_URL,
  COMPANY_POSTAL_CITY,
  COMPANY_PRIMARY_PHONE,
  COMPANY_SECONDARY_PHONE,
  COMPANY_STREET_ADDRESS,
} from '@/lib/contact';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.14 });
  const primaryPhone = COMPANY_PRIMARY_PHONE;
  const secondaryPhone = COMPANY_SECONDARY_PHONE;
  const phoneToTel = (value: string) => value.replace(/\s+/g, '');
  const phoneToWhatsApp = (value: string) => value.replace(/\D/g, '');
  const email = process.env.NEXT_PUBLIC_EMAIL || 'info@sorgfaltbau-halle.de';
  const proofItems = t.raw('proofItems') as string[];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden bg-[#061b2f] py-20 text-white sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_48%,#0c314f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0,transparent_28%,transparent_72%,rgba(255,255,255,0.06)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl"
        initial={{ x: '-20%', opacity: 0 }}
        animate={inView ? { x: ['-20%', '520%'], opacity: [0, 0.75, 0] } : { x: '-20%', opacity: 0 }}
        transition={{ duration: 1.9, ease: 'easeInOut', repeat: inView ? Infinity : 0, repeatDelay: 1.4 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-black/10 backdrop-blur">
            <MessageSquareText size={14} strokeWidth={1.8} />
            {t('eyebrow')}
          </span>
          <h2 className="mt-5 font-heading text-3xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)] sm:text-4xl md:text-5xl">
            {t('sectionTitle')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-white" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-100/85 sm:text-lg">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8 xl:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/18 bg-white/[0.095] p-5 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6 lg:sticky lg:top-24">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent" />
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15">
                  <ClipboardCheck size={21} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                    {t('directTitle')}
                  </p>
                  <h3 className="mt-1 font-heading text-2xl text-white sm:text-3xl">
                    {t('title')}
                  </h3>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {proofItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-100/85">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#f7b267]" strokeWidth={1.9} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 space-y-4">
                <div className="group rounded-2xl border border-white/14 bg-white/[0.08] p-4 transition-colors hover:bg-white/[0.12]">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                      <Phone size={19} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200/70">{t('phone')}</p>
                      <p className="mt-0.5 text-sm text-slate-100/75">{t('replyTime')}</p>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: primaryPhone, value: primaryPhone },
                      { label: secondaryPhone, value: secondaryPhone },
                    ].map((phone) => (
                      <div key={phone.value} className="flex flex-wrap items-center gap-2">
                        <a
                          href={`tel:${phoneToTel(phone.value)}`}
                          className="min-w-0 font-semibold text-white transition-colors hover:text-[#f7b267]"
                        >
                          {phone.label}
                        </a>
                        <a
                          href={`tel:${phoneToTel(phone.value)}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/18 text-slate-100 transition-colors hover:border-[#f7b267]/60 hover:text-[#f7b267]"
                          aria-label={`Call ${phone.label}`}
                        >
                          <PhoneCall size={14} />
                        </a>
                        <a
                          href={`https://wa.me/${phoneToWhatsApp(phone.value)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-300/30 text-emerald-200 transition-colors hover:bg-emerald-400/10"
                          aria-label={`WhatsApp ${phone.label}`}
                          title="WhatsApp"
                        >
                          <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden="true">
                            <path d="M19.11 17.24c-.27-.14-1.61-.79-1.86-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.31.2-.58.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.85-.16-.27-.02-.42.12-.55.12-.12.27-.31.41-.46.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47h-.52c-.18 0-.48.07-.73.34-.25.27-.96.93-.96 2.27 0 1.34.98 2.64 1.11 2.82.14.18 1.92 2.93 4.66 4.11.65.28 1.16.45 1.55.58.65.21 1.24.18 1.71.11.52-.08 1.61-.66 1.84-1.29.23-.64.23-1.19.16-1.29-.07-.09-.25-.14-.52-.27z" />
                            <path d="M16 3C8.83 3 3 8.83 3 16c0 2.29.6 4.53 1.73 6.5L3 29l6.71-1.7A13 13 0 1 0 16 3zm0 23.83c-2.03 0-4.01-.57-5.72-1.64l-.41-.25-3.98 1.01 1.06-3.88-.27-.4A10.78 10.78 0 1 1 16 26.83z" />
                          </svg>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={`mailto:${email}`}
                  className="group flex items-center gap-4 rounded-2xl border border-white/14 bg-white/[0.08] p-4 transition-colors hover:bg-white/[0.12]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <Mail size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200/70">{t('email')}</p>
                    <p className="mt-1 break-words font-semibold text-white transition-colors group-hover:text-[#f7b267]">
                      {email}
                    </p>
                  </div>
                </a>

                <a
                  href={COMPANY_MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/14 bg-white/[0.08] p-4 transition-colors hover:bg-white/[0.12]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white">
                    <MapPin size={19} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-200/70">{t('address')}</p>
                    <p className="mt-1 font-semibold text-white transition-colors group-hover:text-[#f7b267]">
                      {COMPANY_STREET_ADDRESS}
                    </p>
                    <p className="text-sm text-slate-100/75">
                      {COMPANY_POSTAL_CITY}
                    </p>
                    <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-[#f7b267]">
                      {t('mapCta')}
                      <ArrowRight size={13} strokeWidth={1.9} />
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-white/90 bg-white p-5 text-anthracite-900 shadow-2xl shadow-black/25 sm:p-7 lg:p-8"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
              <div className="mb-6 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange">
                  <ShieldCheck size={22} strokeWidth={1.7} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl text-anthracite-900 sm:text-3xl">
                    {t('formTitle')}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-anthracite-600 sm:text-base">
                    {t('formIntro')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-anthracite-600 mb-1.5">
                    {t('form.name')} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-anthracite-200 px-4 py-3 text-anthracite-800 outline-none transition-all placeholder:text-anthracite-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                    placeholder={t('form.name')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-anthracite-600 mb-1.5">
                    {t('form.email')} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-anthracite-200 px-4 py-3 text-anthracite-800 outline-none transition-all placeholder:text-anthracite-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                    placeholder={t('form.email')}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-anthracite-600 mb-1.5">
                  {t('form.phone')}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-anthracite-200 px-4 py-3 text-anthracite-800 outline-none transition-all placeholder:text-anthracite-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  placeholder={t('form.phone')}
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-anthracite-600 mb-1.5">
                  {t('form.message')} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-anthracite-200 px-4 py-3 text-anthracite-800 outline-none transition-all placeholder:text-anthracite-300 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>

              {status === 'success' && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-green-50 text-green-700 text-sm">
                  <CheckCircle size={18} />
                  {t('form.success')}
                </div>
              )}
              {status === 'error' && (
                <div className="mb-4 flex items-center gap-2 p-3 rounded-xl bg-red-50 text-red-700 text-sm">
                  <AlertCircle size={18} />
                  {t('form.error')}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-xl hover:shadow-brand-orange/25 active:scale-[0.98] disabled:translate-y-0 disabled:opacity-60 sm:py-4"
              >
                <Send size={18} />
                {status === 'sending' ? t('form.sending') : t('form.submit')}
              </button>
              <div className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-anthracite-500">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={1.9} />
                <span>{t('formNote')}</span>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
