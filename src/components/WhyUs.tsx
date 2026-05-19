'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Banknote, CheckCircle2, Clock, Sparkles, UserCheck } from 'lucide-react';

const icons = [Award, Clock, Sparkles, Banknote, UserCheck];

export default function WhyUs() {
  const t = useTranslations('whyUs');
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });

  const items = t.raw('items') as Array<{ title: string; text: string }>;

  return (
    <section id="why-us" ref={ref} className="relative overflow-hidden bg-[#f7f9fb] py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_46%,#eef4f8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/90 to-transparent blur-2xl"
        initial={{ x: '-20%', opacity: 0 }}
        animate={inView ? { x: ['-20%', '520%'], opacity: [0, 0.5, 0] } : { x: '-20%', opacity: 0 }}
        transition={{ duration: 2.1, ease: 'easeInOut', repeat: inView ? Infinity : 0, repeatDelay: 2.4 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-anthracite-900">
            {t('sectionTitle')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-orange" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-anthracite-600 sm:text-lg">
            {t('intro')}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-6">
          {items.map((item, i) => {
            const Icon = icons[i] || Award;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`group relative flex min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-6 shadow-lg shadow-brand-orange/[0.04] transition-colors duration-300 hover:border-brand-orange/25 hover:shadow-2xl hover:shadow-brand-orange/10 sm:p-7 sm:last:col-span-2 lg:col-span-2 lg:last:col-span-2 ${
                  i === 3 ? 'lg:col-start-2' : ''
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(7,31,53,0.08)_0%,transparent_48%,rgba(242,100,34,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="pointer-events-none absolute right-5 top-5 font-heading text-5xl leading-none text-brand-orange/[0.06] transition-colors duration-300 group-hover:text-brand-orange/[0.12]">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                  <Icon size={26} strokeWidth={1.6} />
                </div>

                <h3 className="relative mb-3 font-heading text-lg text-anthracite-900 sm:text-xl">
                  {item.title}
                </h3>
                <p className="relative text-sm leading-relaxed text-anthracite-600 sm:text-base">
                  {item.text}
                </p>

                <div className="relative mt-auto flex items-center gap-2 pt-5 text-sm font-semibold text-brand-orange">
                  <CheckCircle2 size={17} strokeWidth={1.8} />
                  <span>{t('cardProof')}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
