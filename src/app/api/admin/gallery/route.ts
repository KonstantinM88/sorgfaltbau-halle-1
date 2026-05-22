// src/app/api/admin/gallery/route.ts
import { randomUUID } from 'crypto';
import { unlink } from 'fs/promises';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

const MAX_WIDTH = 1920;
const WEBP_QUALITY = 82;
const MAX_FILE_SIZE = 15 * 1024 * 1024;
const MAX_CAPTION_LENGTH = 180;

const ALLOWED_CATEGORIES = new Set([
  'bathroom',
  'drywall',
  'facade',
  'terrace',
  'flooring',
  'interior',
  'garden',
  'masonry',
  'parking',
  'roof',
  'natural-stone',
]);

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/heic',
  'image/heif',
  'image/avif',
]);

function sanitizeCategory(value: unknown) {
  if (typeof value !== 'string') return 'interior';
  const normalized = value.trim().toLowerCase();
  return ALLOWED_CATEGORIES.has(normalized) ? normalized : 'interior';
}

function sanitizeOptionalText(value: unknown): string | null | undefined {
  if (value === undefined) return undefined;
  if (value === null) return null;
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_CAPTION_LENGTH);
}

const GALLERY_IMAGE_SELECT = {
  id: true,
  url: true,
  filename: true,
  mimeType: true,
  category: true,
  caption: true,
  captionRu: true,
  sortOrder: true,
  width: true,
  height: true,
  size: true,
  createdAt: true,
  updatedAt: true,
} as const;

async function requireSession() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }
  return null;
}

// GET — list all gallery images
export async function GET() {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      select: GALLERY_IMAGE_SELECT,
    });
    return NextResponse.json(images);
  } catch {
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

// POST — upload image(s), convert to WebP
export async function POST(request: NextRequest) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  try {
    const formData = await request.formData();
    const files = formData.getAll('files').filter((item): item is File => typeof item !== 'string');
    const category = sanitizeCategory(formData.get('category'));
    const caption = sanitizeOptionalText(formData.get('caption'));
    const captionRu = sanitizeOptionalText(formData.get('captionRu'));

    if (!files.length) {
      return NextResponse.json({ error: 'Keine Dateien' }, { status: 400 });
    }

    const results = [];

    for (const file of files) {
      const mime = file.type.toLowerCase();
      if (!(ALLOWED_MIME_TYPES.has(mime) || mime.startsWith('image/'))) {
        return NextResponse.json(
          { error: `Nicht unterstütztes Dateiformat: ${file.name}` },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `Datei zu groß (max 15 MB): ${file.name}` },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const image = sharp(buffer, { failOn: 'none' });
      const metadata = await image.metadata();

      if (!metadata.width || !metadata.height) {
        return NextResponse.json(
          { error: `Ungültige Bilddatei: ${file.name}` },
          { status: 400 }
        );
      }

      const processed = metadata.width > MAX_WIDTH
        ? image.resize(MAX_WIDTH, null, { fit: 'inside', withoutEnlargement: true })
        : image;

      const webpBuffer = await processed.webp({ quality: WEBP_QUALITY }).toBuffer();
      const finalMeta = await sharp(webpBuffer).metadata();

      const id = randomUUID();
      const record = await prisma.galleryImage.create({
        data: {
          id,
          url: `/api/gallery/media/${id}`,
          filename: file.name,
          mimeType: 'image/webp',
          data: new Uint8Array(webpBuffer),
          category,
          caption: caption === undefined ? null : caption,
          captionRu: captionRu === undefined ? null : captionRu,
          width: finalMeta.width || 0,
          height: finalMeta.height || 0,
          size: webpBuffer.length,
        },
        select: GALLERY_IMAGE_SELECT,
      });

      results.push(record);
    }

    return NextResponse.json({ success: true, images: results });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Fehler beim Hochladen' }, { status: 500 });
  }
}

// DELETE — remove image by id
export async function DELETE(request: NextRequest) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    if (!id) {
      return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id },
      select: { id: true, url: true },
    });
    if (!image) {
      return NextResponse.json({ error: 'Bild nicht gefunden' }, { status: 404 });
    }

    if (image.url.startsWith('/uploads/gallery/')) {
      const relativePath = image.url.replace(/^\/+/, '');
      const filePath = path.join(process.cwd(), 'public', relativePath);
      try {
        await unlink(filePath);
      } catch {
        // Legacy file can be already missing, DB delete still should continue.
      }
    }

    await prisma.galleryImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 });
  }
}

// PATCH — update image metadata (category, caption, sortOrder)
export async function PATCH(request: NextRequest) {
  const unauthorized = await requireSession();
  if (unauthorized) return unauthorized;

  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    if (!id) {
      return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
    }

    const data: {
      category?: string;
      caption?: string | null;
      captionRu?: string | null;
      sortOrder?: number;
    } = {};

    if (body.category !== undefined) {
      data.category = sanitizeCategory(body.category);
    }

    const caption = sanitizeOptionalText(body.caption);
    if (caption !== undefined) data.caption = caption;

    const captionRu = sanitizeOptionalText(body.captionRu);
    if (captionRu !== undefined) data.captionRu = captionRu;

    if (body.sortOrder !== undefined) {
      const parsed = Number(body.sortOrder);
      if (!Number.isFinite(parsed)) {
        return NextResponse.json({ error: 'Ungültiger Sortierwert' }, { status: 400 });
      }
      data.sortOrder = Math.max(0, Math.floor(parsed));
    }

    if (!Object.keys(data).length) {
      return NextResponse.json({ error: 'Keine Änderungen übergeben' }, { status: 400 });
    }

    const updated = await prisma.galleryImage.update({
      where: { id },
      data,
      select: GALLERY_IMAGE_SELECT,
    });

    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: 'Fehler beim Aktualisieren' }, { status: 500 });
  }
}
