import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string }>;

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({
    where: { id },
    select: {
      data: true,
      mimeType: true,
      size: true,
    },
  });

  if (!image?.data) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(image.data), {
    headers: {
      'Content-Type': image.mimeType || 'image/webp',
      'Content-Length': String(image.size || image.data.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
