import { prisma } from '@/lib/prisma';

type Params = Promise<{ id: string }>;

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const article = await prisma.newsArticle.findUnique({
    where: { id },
    select: {
      coverData: true,
    },
  });

  if (!article?.coverData) {
    return new Response(null, { status: 404 });
  }

  return new Response(new Uint8Array(article.coverData), {
    headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(article.coverData.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
