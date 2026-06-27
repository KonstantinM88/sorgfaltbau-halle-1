'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Hammer,
  Home,
  Thermometer,
  Layers,
  Paintbrush,
  SquareStack,
  Cable,
  DoorOpen,
  Fence,
  Armchair,
  Grid3X3,
  Construction,
  Leaf,
  Scissors,
  ArrowUpRight,
} from 'lucide-react';
import { CONSTRUCTION_CATALOG_SLUGS } from '@/lib/serviceCatalog';

const constructionIcons = [
  Hammer, Home, Thermometer, Layers, Paintbrush, SquareStack,
  Cable, DoorOpen, Fence, Armchair, Grid3X3, Construction,
  Hammer, Grid3X3, Thermometer, Home, SquareStack, Construction,
  Grid3X3, DoorOpen, Construction, Thermometer, Layers, Construction,
  Hammer, Layers,
];

const gardenIcons = [Leaf, Scissors, Scissors, Construction, Hammer, Leaf];

type ServicesProps = {
  headingTitle?: string;
  headingIntro?: string;
  sectionId?: string;
};

export default function Services({
  headingTitle,
  headingIntro,
  sectionId = 'services',
}: ServicesProps = {}) {
  const t = useTranslations('services');
  const locale = useLocale();
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const constructionItems = t.raw('construction.items') as string[];
  const gardenItems = t.raw('garden.items') as string[];
  const title = headingTitle || t('sectionTitle');

  return (
    <section id={sectionId} ref={ref} className="relative overflow-hidden bg-[#f7f9fb] py-20 sm:py-28">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_48%,#eef4f8_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/90 to-transparent blur-2xl"
        initial={{ x: '-20%', opacity: 0 }}
        animate={inView ? { x: ['-20%', '520%'], opacity: [0, 0.55, 0] } : { x: '-20%', opacity: 0 }}
        transition={{ duration: 2.2, ease: 'easeInOut', repeat: inView ? Infinity : 0, repeatDelay: 2.2 }}
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
            {title}
          </h2>
          {headingIntro ? (
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-anthracite-600 sm:text-lg">
              {headingIntro}
            </p>
          ) : null}
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-brand-orange" />
        </motion.div>

        {/* Construction & Renovation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                <Hammer size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange/70">
                  SorgfaltBau
                </p>
                <h3 className="font-heading text-xl text-anthracite-900 sm:text-2xl">
                  {t('construction.title')}
                </h3>
              </div>
            </div>
            <div className="hidden rounded-full border border-brand-orange/15 bg-white px-4 py-2 text-sm font-semibold text-brand-orange shadow-sm shadow-brand-orange/10 sm:block">
              {t('itemsCount', { count: constructionItems.length })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {constructionItems.map((item: string, i: number) => {
              const Icon = constructionIcons[i] || Hammer;
              const slug = CONSTRUCTION_CATALOG_SLUGS[i];
              const hasPage = Boolean(slug);

              const card = (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative h-full min-h-[5.75rem] overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-4 shadow-lg shadow-brand-orange/[0.04] transition-colors duration-300 hover:border-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/10 sm:p-5"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(7,31,53,0.08)_0%,transparent_44%,rgba(242,100,34,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                      <Icon size={19} strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-anthracite-800 transition-colors duration-300 group-hover:text-brand-orange sm:text-base">
                        {item}
                      </span>
                    </div>
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange/8 text-brand-orange transition-all duration-300 ${
                        hasPage
                          ? 'translate-x-0 opacity-100'
                          : 'translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                      }`}
                    >
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </div>
                  </div>
                  <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-4xl leading-none text-brand-orange/[0.05] transition-colors duration-300 group-hover:text-brand-orange/[0.1]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              );

              return hasPage ? (
                <Link
                  key={i}
                  href={`/${locale}/services/${slug}`}
                  aria-label={item}
                  className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/60"
                >
                  {card}
                </Link>
              ) : (
                <Fragment key={i}>{card}</Fragment>
              );
            })}
          </div>
        </motion.div>

        {/* Garden & Outdoor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/20">
                <Leaf size={20} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange/70">
                  SorgfaltBau
                </p>
                <h3 className="font-heading text-xl text-anthracite-900 sm:text-2xl">
                  {t('garden.title')}
                </h3>
              </div>
            </div>
            <div className="hidden rounded-full border border-brand-orange/15 bg-white px-4 py-2 text-sm font-semibold text-brand-orange shadow-sm shadow-brand-orange/10 sm:block">
              {t('itemsCount', { count: gardenItems.length })}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {gardenItems.map((item: string, i: number) => {
              const Icon = gardenIcons[i] || Leaf;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative min-h-[5.75rem] overflow-hidden rounded-2xl border border-anthracite-100/80 bg-white p-4 shadow-lg shadow-brand-orange/[0.04] transition-colors duration-300 hover:border-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/10 sm:p-5"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(7,31,53,0.08)_0%,transparent_44%,rgba(242,100,34,0.06)_100%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-orange/8 text-brand-orange transition-all duration-300 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-orange/20">
                      <Icon size={19} strokeWidth={1.6} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[15px] font-semibold leading-snug text-anthracite-800 transition-colors duration-300 group-hover:text-brand-orange sm:text-base">
                        {item}
                      </span>
                    </div>
                    <div className="flex h-8 w-8 shrink-0 translate-x-2 items-center justify-center rounded-full bg-brand-orange/8 text-brand-orange opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <ArrowUpRight size={16} strokeWidth={1.8} />
                    </div>
                  </div>
                  <span className="pointer-events-none absolute bottom-3 right-4 font-heading text-4xl leading-none text-brand-orange/[0.05] transition-colors duration-300 group-hover:text-brand-orange/[0.1]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
