'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, ThumbsUp } from 'lucide-react';

const badges = [
  { key: 'reliability', Icon: Shield },
  { key: 'quality', Icon: Award },
  { key: 'satisfaction', Icon: ThumbsUp },
] as const;

export default function TrustBadges() {
  const t = useTranslations('trust');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section ref={ref} aria-labelledby="trust-badges-heading" className="relative z-20 -mt-16 pb-12">
      <h2 id="trust-badges-heading" className="sr-only">
        SorgfaltBau: {t('reliability.title')}, {t('quality.title')}, {t('satisfaction.title')}
      </h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {badges.map(({ key, Icon }, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative min-h-[13.5rem] overflow-hidden rounded-2xl border border-white/70 bg-white p-6 text-center shadow-2xl shadow-[#071f35]/10 transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/35 hover:shadow-[#071f35]/20 sm:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full border border-brand-orange/10 bg-brand-orange/[0.04]" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(7,31,53,0.08)_0%,transparent_46%,rgba(242,100,34,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-[#071f35]/20 ring-8 ring-brand-orange/10 transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-light">
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <span
                aria-hidden="true"
                className="absolute left-6 top-6 select-none font-heading text-4xl leading-none text-[#8a3414] opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              >
                {String(i + 1).padStart(2, '0')}
              </span>

              <p className="relative mb-2 font-heading text-lg text-anthracite-900 sm:text-xl">
                {t(`${key}.title`)}
              </p>
              <p className="relative mx-auto max-w-[18rem] text-sm leading-relaxed text-anthracite-600 sm:text-base">
                {t(`${key}.text`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
