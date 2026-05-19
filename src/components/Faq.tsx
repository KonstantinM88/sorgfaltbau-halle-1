'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, CheckCircle2, ChevronDown, CircleHelp, ClipboardCheck } from 'lucide-react';

type FaqItem = {
  question: string;
  answer: string;
};

export default function Faq() {
  const t = useTranslations('faq');
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.14 });
  const items = t.raw('items') as FaqItem[];
  const proofItems = t.raw('proofItems') as string[];
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" ref={ref} className="relative overflow-hidden bg-[#f7f9fb] py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_48%,#eef4f8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:58px_58px]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/90 to-transparent blur-2xl"
        initial={{ x: '-20%', opacity: 0 }}
        animate={inView ? { x: ['-20%', '520%'], opacity: [0, 0.55, 0] } : { x: '-20%', opacity: 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut', repeat: inView ? Infinity : 0, repeatDelay: 2.2 }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[0.84fr_1.16fr] xl:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="xl:sticky xl:top-24 xl:self-start"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-orange/15 bg-white/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-orange shadow-sm shadow-brand-orange/5 backdrop-blur">
              <CircleHelp size={14} strokeWidth={1.8} />
              {t('eyebrow')}
            </span>
            <h2 className="mt-5 max-w-lg font-heading text-3xl text-anthracite-900 sm:text-4xl md:text-5xl">
              {t('sectionTitle')}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-brand-orange" />
            <p className="mt-5 max-w-xl text-base leading-relaxed text-anthracite-600 sm:text-lg">
              {t('intro')}
            </p>

            <div className="relative mt-8 overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-6 shadow-xl shadow-brand-orange/[0.05]">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                  <ClipboardCheck size={20} />
                </div>
                <div>
                  <p className="font-heading text-xl text-anthracite-900 sm:text-2xl">
                    {t('contactTitle')}
                  </p>
                  <p className="mt-1 text-sm text-anthracite-500">
                    {t('contactText')}
                  </p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {proofItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-anthracite-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={1.9} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-orange/20 transition-all hover:-translate-y-0.5 hover:bg-brand-light hover:shadow-xl hover:shadow-brand-orange/25"
              >
                {t('contactCta')}
                <ArrowRight size={17} strokeWidth={1.9} />
              </a>
            </div>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {items.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.08 + index * 0.06 }}
                  className={`group relative overflow-hidden rounded-2xl border bg-white shadow-lg transition-colors duration-300 ${
                    isOpen
                      ? 'border-brand-orange/25 shadow-brand-orange/[0.08]'
                      : 'border-anthracite-100/80 shadow-brand-orange/[0.035] hover:border-brand-orange/20'
                  }`}
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    className="grid w-full grid-cols-[auto_1fr_auto] items-start gap-3 px-4 py-5 text-left sm:gap-4 sm:px-6 sm:py-6"
                  >
                    <span
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                        isOpen
                          ? 'bg-brand-orange text-white'
                          : 'bg-brand-orange/8 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="font-heading text-lg leading-7 text-anthracite-900 sm:text-2xl">
                      {item.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border transition-all ${
                        isOpen
                          ? 'border-brand-orange/30 bg-brand-orange text-white'
                          : 'border-anthracite-200 bg-anthracite-50 text-anthracite-500'
                      }`}
                    >
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.26, ease: 'easeOut' }}
                      >
                        <div className="px-4 pb-5 pt-0 sm:px-6 sm:pb-6">
                          <div className="mb-4 ml-12 h-px bg-gradient-to-r from-brand-orange/30 via-anthracite-200 to-transparent" />
                          <div className="grid gap-3 sm:grid-cols-[2.25rem_1fr]">
                            <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-brand-orange/8 text-brand-orange sm:flex">
                              <CheckCircle2 size={18} strokeWidth={1.9} />
                            </div>
                            <p className="max-w-3xl text-sm leading-7 text-anthracite-600 sm:text-base">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
