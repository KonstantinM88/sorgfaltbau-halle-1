import Link from 'next/link';
import Image from 'next/image';
import {ArrowRight} from 'lucide-react';
import {SERVICES} from '@/lib/services';

type Props = {
  locale: string;
};

const UI = {
  de: {
    eyebrow: 'Im Detail',
    title: 'Ausgewählte Leistungen im Detail',
    intro:
      'Zu den wichtigsten Leistungen gibt es eigene Seiten mit Ablauf, Umfang und Antworten auf häufige Fragen.',
    more: 'Mehr erfahren',
  },
  ru: {
    eyebrow: 'Подробно',
    title: 'Ключевые услуги подробно',
    intro:
      'По основным услугам есть отдельные страницы с порядком работ, объёмом и ответами на частые вопросы.',
    more: 'Подробнее',
  },
} as const;

export default function ServiceHighlights({locale}: Props) {
  const lang = locale === 'ru' ? 'ru' : 'de';
  const ui = UI[lang];

  return (
    <section className="relative bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full border border-brand-orange/15 bg-brand-orange/[0.04] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange">
            {ui.eyebrow}
          </span>
          <h2 className="mt-5 font-heading text-3xl text-anthracite-950 sm:text-4xl">
            {ui.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-anthracite-600 sm:text-lg">
            {ui.intro}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => {
            const c = service[lang];
            return (
              <Link
                key={service.slug}
                href={`/${locale}/services/${service.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-anthracite-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/40 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={c.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-heading text-xl text-anthracite-950">{c.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-anthracite-500">{c.short}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent">
                    {ui.more}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
