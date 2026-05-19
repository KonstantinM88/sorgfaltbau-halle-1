// src/components/Hero.tsx
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

const HERO_IMAGE_SRC = '/uploads/hero-sb.webp';

export default function Hero() {
  const t = useTranslations('hero');

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <h1 className="sr-only">
        SorgfaltBau - Bau- und Handwerksleistungen {t('titleHighlight')}
      </h1>

      {/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђ MOBILE вЂ” Video Background в•ђв•ђв•ђв•ђв•ђв•ђв•ђ */}
      <section className="relative isolate min-h-[94svh] overflow-hidden bg-anthracite-950 md:hidden">
        {/* Video background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={HERO_IMAGE_SRC}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center]"
        >
          <source src="/uploads/hero-b-video.webm" type="video/webm" />
          <source src="/uploads/hero-b-video.mp4" type="video/mp4" />
        </video>

        {/* Fallback image (if video fails) */}
        <noscript>
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[68%_center]"
          />
        </noscript>

        <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/92 via-anthracite-950/68 to-anthracite-950/22" />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/90 via-anthracite-950/38 to-anthracite-950/42" />

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[94svh] w-full max-w-xl flex-col justify-end px-4 pb-14 pt-28">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-4 font-heading text-[clamp(2.1rem,11vw,3.2rem)] leading-[1.06] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.72)]"
            aria-hidden="true"
          >
            <span className="block">SorgfaltBau - Bau- und Handwerks-</span>
            <span className="block">leistungen</span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="block text-brand-orange"
            >
              {t('titleHighlight')}
            </motion.span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-8 text-xl font-medium tracking-wide text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <button
              onClick={scrollToContact}
              className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-brand-orange px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-orange-dark active:scale-95"
            >
              {t('cta')}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </motion.div>
        </div>
      </section>

      {/* в•ђв•ђв•ђв•ђв•ђв•ђв•ђ DESKTOP вЂ” Image Background в•ђв•ђв•ђв•ђв•ђв•ђв•ђ */}
      <section className="relative isolate hidden min-h-[90svh] items-center overflow-hidden md:flex lg:min-h-screen">
        <div className="absolute inset-0">
          <Image
            src={HERO_IMAGE_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center lg:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-anthracite-950/94 via-anthracite-950/74 via-[58%] to-anthracite-950/18" />
          <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/76 via-anthracite-950/26 to-anthracite-950/46" />
          <div className="absolute inset-y-0 left-0 w-[62%] bg-anthracite-950/32" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="max-w-2xl lg:max-w-[46rem]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-5 font-heading text-[clamp(3rem,5.2vw,5.4rem)] leading-[1.05] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.82)]"
              aria-hidden="true"
            >
              <span className="block">SorgfaltBau - Bau- und Handwerks-</span>
              <span className="block">leistungen</span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="block text-brand-orange"
              >
                {t('titleHighlight')}
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mb-8 max-w-xl text-xl font-medium tracking-wide text-white drop-shadow-[0_2px_14px_rgba(0,0,0,0.78)] lg:text-2xl"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <button
                onClick={scrollToContact}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand-orange px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-brand-orange-dark hover:shadow-2xl hover:shadow-brand-orange/30 active:scale-95"
              >
                {t('cta')}
                <ArrowRight
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </motion.div>
          </div>
        </div>

        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/60 transition-colors hover:text-white"
          aria-label="Scroll down"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.button>
      </section>
    </>
  );
}

