'use client';

import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import type { CSSProperties, MouseEvent as ReactMouseEvent } from 'react';

const ABOUT_BANNER_SRC = '/uploads/logo-sb.webp';

export default function About() {
  const t = useTranslations('about');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateXRaw = useTransform(pointerY, [-0.5, 0.5], [7, -7]);
  const rotateYRaw = useTransform(pointerX, [-0.5, 0.5], [-9, 9]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 170, damping: 20, mass: 0.6 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 170, damping: 20, mass: 0.6 });

  const shineX = useTransform(pointerX, [-0.5, 0.5], ['-28%', '28%']);
  const shineY = useTransform(pointerY, [-0.5, 0.5], ['-18%', '18%']);

  const handlePointerMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x);
    pointerY.set(y);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 bg-anthracite-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="mt-4 mx-auto w-16 h-1 bg-brand-orange rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <p className="text-base sm:text-lg text-anthracite-600 leading-relaxed mb-5">
              {t('text1')}
            </p>
            <p className="text-base sm:text-lg text-anthracite-600 leading-relaxed">
              {t('text2')}
            </p>
            <div className="mt-8 overflow-hidden rounded-2xl border border-brand-orange/15 bg-white shadow-xl shadow-brand-orange/10">
              <div className="relative p-5 sm:p-6">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-orange via-brand-light to-brand-accent" />
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-brand-orange/[0.06]" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-brand-orange text-white shadow-lg shadow-brand-orange/25">
                    <span className="font-heading text-3xl leading-none">
                      {t('experience.value')}
                    </span>
                    <ShieldCheck
                      className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full bg-white p-1.5 text-brand-orange shadow-md"
                      strokeWidth={1.7}
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-orange">
                      {t('experience.eyebrow')}
                    </p>
                    <p className="mt-1 font-heading text-2xl text-anthracite-900">
                      {t('experience.title')}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-anthracite-600 sm:text-base">
                      {t('experience.subtitle')}
                    </p>
                  </div>
                </div>

                <div className="relative mt-5 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-start gap-2 rounded-xl bg-anthracite-50 px-3 py-2.5 text-sm text-anthracite-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span>{t('experience.proof1')}</span>
                  </div>
                  <div className="flex items-start gap-2 rounded-xl bg-anthracite-50 px-3 py-2.5 text-sm text-anthracite-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" />
                    <span>{t('experience.proof2')}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <motion.div
              className="group relative overflow-hidden rounded-2xl shadow-2xl shadow-anthracite-900/10 touch-manipulation"
              onMouseMove={handlePointerMove}
              onMouseLeave={resetPointer}
              style={{
                rotateX,
                rotateY,
                transformPerspective: 1200,
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 1.03 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.img
                src={ABOUT_BANNER_SRC}
                alt="SorgfaltBau Logo"
                className="h-72 w-full bg-white object-contain p-6 will-change-transform sm:h-80 sm:p-8 lg:h-96 lg:p-10"
                whileHover={{ scale: 1.04, filter: 'saturate(1.05) brightness(1.02)' }}
                whileTap={{ scale: 1.04, filter: 'saturate(1.05) brightness(1.02)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              />

              {/* Dynamic premium shine */}
              <motion.div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(300px 160px at calc(50% + var(--sx)) calc(50% + var(--sy)), rgba(255,255,255,0.24), transparent 62%)',
                  '--sx': shineX,
                  '--sy': shineY,
                } as CSSProperties}
              />

              <motion.div
                className="pointer-events-none absolute -inset-y-20 -left-2 w-1/2 bg-white/22 blur-2xl"
                style={{ x: shineX }}
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-anthracite-950/5 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/20 ring-inset" />
              {/* Orange accent corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-brand-orange/20 rounded-bl-3xl" />
            </motion.div>
            {/* Floating decoration */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-2 border-brand-orange/20 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
