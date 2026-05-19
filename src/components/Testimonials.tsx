'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { MapPin, Star } from 'lucide-react';

type TestimonialItem = {
  name: string;
  location: string;
  service: string;
  scope: string;
  text: string;
};

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.15 });
  const items = t.raw('items') as TestimonialItem[];

  return (
    <section
      id="reviews"
      ref={ref}
      className="relative overflow-hidden bg-[#061b2f] py-20 sm:py-28"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_46%,#0c314f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_0,transparent_28%,transparent_72%,rgba(255,255,255,0.06)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-2xl"
        initial={{ x: '-20%', opacity: 0 }}
        animate={inView ? { x: ['-20%', '520%'], opacity: [0, 0.75, 0] } : { x: '-20%', opacity: 0 }}
        transition={{ duration: 1.8, ease: 'easeInOut', repeat: inView ? Infinity : 0, repeatDelay: 1.2 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[0.8fr_1.2fr] xl:items-start xl:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="xl:pr-2 2xl:pr-6"
          >
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-sm shadow-black/10 backdrop-blur">
              {t('eyebrow')}
            </span>
            <h2 className="mt-5 max-w-xl font-heading text-3xl text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.2)] sm:text-4xl md:text-5xl">
              {t('sectionTitle')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-100/85 sm:text-lg">
              {t('intro')}
            </p>

            <div className="mt-8 rounded-[1.75rem] border border-white/20 bg-white/[0.11] p-6 shadow-2xl shadow-black/20 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-orange shadow-lg shadow-black/15">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-200/75">
                    {t('highlightKicker')}
                  </p>
                  <p className="mt-1 font-heading text-2xl text-white">
                    {t('highlightTitle')}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-100/85 sm:text-base">
                {t('highlightText')}
              </p>
            </div>
          </motion.div>

          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {items.map((item, index) => (
              <motion.article
                key={item.name + item.service}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 + index * 0.08 }}
                className={`group relative min-w-0 overflow-hidden rounded-[1.75rem] border border-white/18 bg-white/[0.095] p-6 shadow-xl shadow-black/[0.22] backdrop-blur-md transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.13] ${
                  index === items.length - 1 ? 'md:col-span-2 2xl:col-span-1' : ''
                }`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-70" />
                <div className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/12 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid min-h-12 grid-cols-[minmax(5.5rem,1fr)_9rem] items-start gap-3 sm:grid-cols-[minmax(6rem,1fr)_9.75rem]">
                  <div className="flex h-12 items-center gap-1 text-[#f7b267]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star key={starIndex} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <span className="inline-flex h-12 w-full items-center justify-center rounded-full border border-white/20 bg-white/10 px-3 text-center text-[10px] font-semibold uppercase leading-[1.05] tracking-[0.08em] text-white sm:text-[11px]">
                    {item.service}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-50 sm:text-[15px]">
                  &ldquo;{item.text}&rdquo;
                </p>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.name}</p>
                      <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-200/80">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    <span className="max-w-[9rem] text-right text-xs leading-5 text-slate-200/70">
                      {item.scope}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
