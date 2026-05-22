// src/app/[locale]/galerie/GalerieClient.tsx
'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bath,
  BrickWall,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Images,
  ArrowLeft,
  ChevronRight as ArrowIcon,
  Grid3X3,
  Hammer,
  Home,
  Leaf,
  MapPin,
  Phone,
  SquareParking,
  Stone,
} from 'lucide-react';

/* ═══════════════════════ TYPES ═══════════════════════ */

type GalleryImage = {
  id: string;
  url: string;
  filename: string | null;
  category: string;
  caption: string | null;
  captionRu: string | null;
  width: number;
  height: number;
};

type Props = {
  locale: string;
  images: GalleryImage[];
};

/* ═══════════════════════ CONFIG ═══════════════════════ */

type CategoryIcon = typeof Grid3X3;

type Category = {
  value: string;
  de: string;
  ru: string;
  icon: CategoryIcon;
};

const CATEGORIES: Category[] = [
  { value: 'bathroom', de: 'Badezimmer', ru: 'Ванная', icon: Bath },
  { value: 'drywall', de: 'Trockenbau', ru: 'Гипсокартон', icon: BrickWall },
  { value: 'facade', de: 'Fassade', ru: 'Фасад', icon: Home },
  { value: 'terrace', de: 'Terrasse', ru: 'Терраса', icon: Leaf },
  { value: 'flooring', de: 'Bodenbeläge', ru: 'Полы', icon: Grid3X3 },
  { value: 'interior', de: 'Innenausbau', ru: 'Интерьер', icon: Hammer },
  { value: 'garden', de: 'Garten', ru: 'Сад', icon: Leaf },
  { value: 'masonry', de: 'Massivbau', ru: 'Кладка', icon: BrickWall },
  { value: 'parking', de: 'Parkplätze und Einfahrten schlüsselfertig', ru: 'Парковки и въезды под ключ', icon: SquareParking },
  { value: 'roof', de: 'Dachreparatur und Dämmung', ru: 'Кровля и утепление', icon: Home },
  { value: 'natural-stone', de: 'Natursteinarbeiten - Sandstein und Granit', ru: 'Натуральный камень: песчаник и гранит', icon: Stone },
];

const t = {
  de: {
    title: 'Unsere Projekte',
    subtitle: 'Qualität, die man sieht',
    description: 'Einblicke in unsere abgeschlossenen Bau- und Renovierungsprojekte in Halle (Saale) und Umgebung.',
    all: 'Alle',
    photos: (n: number) => `${n} ${n === 1 ? 'Foto' : 'Fotos'}`,
    close: 'Schließen',
    noImages: 'Noch keine Bilder vorhanden.',
    back: 'Startseite',
    previous: 'Vorheriges Foto',
    next: 'Nächstes Foto',
    collection: 'Referenzen aus der Praxis',
    workAreas: 'Arbeitsbereiche',
    filterTitle: 'Nach Arbeitsbereich filtern',
    filterText: 'Wählen Sie den passenden Bereich oder sehen Sie alle Referenzen zusammen.',
    region: 'Halle (Saale) und Umgebung',
    ctaTitle: 'Gefallen Ihnen unsere Arbeiten?',
    ctaSubtitle: 'Lassen Sie sich kostenlos beraten — wir freuen uns auf Ihr Projekt.',
    ctaButton: 'Kostenlose Beratung',
    of: 'von',
  },
  ru: {
    title: 'Наши проекты',
    subtitle: 'Качество, которое видно',
    description: 'Фотографии наших завершённых строительных и ремонтных проектов в Галле (Заале) и окрестностях.',
    all: 'Все',
    photos: (n: number) => `${n} фото`,
    close: 'Закрыть',
    noImages: 'Изображений пока нет.',
    back: 'Главная',
    previous: 'Предыдущее фото',
    next: 'Следующее фото',
    collection: 'Реализованные проекты',
    workAreas: 'Направления работ',
    filterTitle: 'Фильтр по виду работ',
    filterText: 'Выберите нужное направление или посмотрите все проекты вместе.',
    region: 'Галле (Заале) и окрестности',
    ctaTitle: 'Нравятся наши работы?',
    ctaSubtitle: 'Получите бесплатную консультацию — мы ждём ваш проект.',
    ctaButton: 'Бесплатная консультация',
    of: 'из',
  },
};

/* ═══════════════════════ LIGHTBOX ═══════════════════════ */

function Lightbox({
  images,
  currentIndex,
  onClose,
  onChange,
  locale,
}: {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onChange: (i: number) => void;
  locale: string;
}) {
  const isRu = locale === 'ru';
  const tx = isRu ? t.ru : t.de;
  const img = images[currentIndex];
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isDragging = useRef(false);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onChange((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onChange((currentIndex + 1) % images.length);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [currentIndex, images.length, onClose, onChange]);

  // Touch swipe
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isDragging.current = true;
  }, []);

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      const dy = e.changedTouches[0].clientY - touchStartY.current;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        if (dx > 0) onChange((currentIndex - 1 + images.length) % images.length);
        else onChange((currentIndex + 1) % images.length);
      }
    },
    [currentIndex, images.length, onChange]
  );

  if (!img) return null;
  const catLabel = CATEGORIES.find((c) => c.value === img.category);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-anthracite-950/96 backdrop-blur-md" />

      {/* Top bar */}
      <div className="absolute left-0 right-0 top-0 z-20 flex items-center justify-between bg-gradient-to-b from-anthracite-950/78 via-anthracite-950/36 to-transparent px-4 pb-8 pt-4 sm:bg-none sm:px-6 sm:pb-4">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <span className="shrink-0 text-sm font-medium tabular-nums text-white/72">
            {currentIndex + 1} {tx.of} {images.length}
          </span>
          {catLabel && (
            <span className="inline-flex min-w-0 max-w-[11rem] rounded-full border border-brand-accent/35 bg-[#041524]/70 px-2.5 py-1 text-xs font-semibold text-white shadow-lg shadow-black/15 backdrop-blur-sm sm:max-w-none sm:bg-brand-orange/20 sm:text-brand-orange sm:shadow-none">
              <span className="truncate">{isRu ? catLabel.ru : catLabel.de}</span>
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:rotate-90"
          aria-label={tx.close}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((currentIndex - 1 + images.length) % images.length);
        }}
        className="group absolute left-4 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 bg-[#041524]/88 text-white shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-md transition-all duration-300 hover:-translate-x-1 hover:border-brand-accent/60 hover:bg-[#071f35] hover:shadow-[0_22px_64px_rgba(242,100,34,0.2)] focus-visible:border-brand-accent md:flex md:items-center md:justify-center lg:left-8 xl:left-12"
        aria-label={tx.previous}
        title={tx.previous}
      >
        <span className="pointer-events-none absolute inset-1 rounded-full border border-white/12" />
        <span className="pointer-events-none absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/24 to-transparent blur-lg transition-transform duration-700 group-hover:translate-x-[420%] group-focus-visible:translate-x-[420%]" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.09] transition-colors duration-300 group-hover:bg-brand-accent group-focus-visible:bg-brand-accent">
          <ChevronLeft className="h-8 w-8 -translate-x-px transition-transform duration-300 group-hover:-translate-x-1 group-focus-visible:-translate-x-1" strokeWidth={1.8} />
        </span>
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onChange((currentIndex + 1) % images.length);
        }}
        className="group absolute right-4 top-1/2 z-20 hidden h-16 w-16 -translate-y-1/2 overflow-hidden rounded-full border border-white/20 bg-[#041524]/88 text-white shadow-[0_18px_50px_rgba(0,0,0,0.38)] backdrop-blur-md transition-all duration-300 hover:translate-x-1 hover:border-brand-accent/60 hover:bg-[#071f35] hover:shadow-[0_22px_64px_rgba(242,100,34,0.2)] focus-visible:border-brand-accent md:flex md:items-center md:justify-center lg:right-8 xl:right-12"
        aria-label={tx.next}
        title={tx.next}
      >
        <span className="pointer-events-none absolute inset-1 rounded-full border border-white/12" />
        <span className="pointer-events-none absolute -left-full top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/24 to-transparent blur-lg transition-transform duration-700 group-hover:translate-x-[420%] group-focus-visible:translate-x-[420%]" />
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/[0.09] transition-colors duration-300 group-hover:bg-brand-accent group-focus-visible:bg-brand-accent">
          <ChevronRight className="h-8 w-8 translate-x-px transition-transform duration-300 group-hover:translate-x-1 group-focus-visible:translate-x-1" strokeWidth={1.8} />
        </span>
      </button>

      {/* Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-x-2 bottom-3 top-14 z-10 sm:relative sm:inset-auto sm:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={img.url}
            alt={isRu ? (img.captionRu || img.caption || '') : (img.caption || '')}
            width={img.width || 1200}
            height={img.height || 900}
            className="h-full w-full rounded-lg object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.45)] sm:h-auto sm:max-h-[80vh] sm:w-auto sm:max-w-[92vw] sm:rounded-2xl sm:shadow-2xl sm:shadow-black/40 sm:drop-shadow-none"
            sizes="(max-width: 639px) calc(100vw - 1rem), 92vw"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Bottom caption */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-5 left-1/2 z-20 hidden max-w-md -translate-x-1/2 px-4 text-center sm:block"
      >
        {(img.caption || img.captionRu) && (
          <p className="text-white/50 text-sm leading-relaxed">
            {isRu ? (img.captionRu || img.caption) : img.caption}
          </p>
        )}
      </motion.div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/[0.06] z-20">
        <motion.div
          className="h-full bg-brand-orange/60"
          initial={false}
          animate={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

/* ═══════════════════════ GALLERY CARD ═══════════════════════ */

function GalleryCard({
  img,
  index,
  onClick,
  locale,
}: {
  img: GalleryImage;
  index: number;
  onClick: () => void;
  locale: string;
}) {
  const isRu = locale === 'ru';
  const catLabel = CATEGORIES.find((c) => c.value === img.category);
  const CategoryIcon = catLabel?.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.4),
        ease: [0.25, 0.1, 0.25, 1],
      }}
      onClick={onClick}
      className="group relative w-full break-inside-avoid overflow-hidden rounded-xl border border-white bg-white shadow-lg shadow-brand-orange/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange/50 focus-visible:ring-offset-2"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-xl bg-anthracite-100">
        <Image
          src={img.url}
          alt={isRu ? (img.captionRu || img.caption || img.category) : (img.caption || img.category)}
          width={img.width || 600}
          height={img.height || 400}
          className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          loading="lazy"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/78 via-anthracite-950/12 to-transparent opacity-70 transition-all duration-500 ease-out group-hover:opacity-100 group-focus-visible:opacity-100" />

        {/* Category badge */}
        {catLabel && (
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#041524]/76 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg shadow-black/15 backdrop-blur-md">
              {CategoryIcon && <CategoryIcon className="h-3 w-3 text-brand-accent" strokeWidth={1.9} />}
              {isRu ? catLabel.ru : catLabel.de}
            </span>
          </div>
        )}

        {/* Zoom icon */}
        <div className="absolute top-3 right-3 z-10">
          <div className="scale-90 rounded-full border border-white/15 bg-[#041524]/68 p-2 opacity-0 shadow-lg shadow-black/10 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100">
            <ZoomIn className="w-4 h-4 text-white/90" />
          </div>
        </div>

        {/* Bottom caption */}
        {(img.caption || img.captionRu) && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-3">
            <p className="line-clamp-2 text-left text-xs font-medium leading-snug text-white/95">
              {isRu ? (img.captionRu || img.caption) : img.caption}
            </p>
          </div>
        )}
      </div>
    </motion.button>
  );
}

/* ═══════════════════════ MASONRY GRID ═══════════════════════ */

function MasonryGrid({
  images,
  onImageClick,
  locale,
}: {
  images: GalleryImage[];
  onImageClick: (index: number) => void;
  locale: string;
}) {
  return (
    <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout">
        {images.map((img, i) => (
          <GalleryCard
            key={img.id}
            img={img}
            index={i}
            onClick={() => onImageClick(i)}
            locale={locale}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════ CATEGORY PILL ═══════════════════════ */

function CategoryPill({
  label,
  count,
  isActive,
  onClick,
  icon,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
  icon?: CategoryIcon;
}) {
  const Icon = icon;

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex min-h-11 items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'scale-[1.02] border-brand-orange bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
          : 'border-anthracite-100 bg-white text-anthracite-700 shadow-sm hover:border-brand-orange/35 hover:text-brand-orange hover:shadow-md'
      }`}
    >
      {Icon && <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-brand-accent' : ''}`} strokeWidth={1.9} />}
      {label}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold transition-colors duration-300 ${
          isActive
            ? 'bg-white/25 text-white'
            : 'bg-anthracite-50 text-anthracite-400'
        }`}
      >
        {count}
      </span>
    </button>
  );
}

/* ═══════════════════════ MAIN COMPONENT ═══════════════════════ */

export default function GalerieClient({ locale, images }: Props) {
  const isRu = locale === 'ru';
  const tx = isRu ? t.ru : t.de;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

  const filteredImages = useMemo(
    () => (activeCategory ? images.filter((i) => i.category === activeCategory) : images),
    [activeCategory, images]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    images.forEach((img) => {
      counts[img.category] = (counts[img.category] || 0) + 1;
    });
    return counts;
  }, [images]);

  const activeCategories = CATEGORIES.filter((c) => categoryCounts[c.value]);
  const previewImages = images.slice(0, 2);

  const openLightbox = useCallback((i: number) => setLightbox({ index: i }), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <main className="min-h-screen bg-white pt-24 sm:pt-28">
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden bg-[#061b2f] pb-16 pt-12 text-white sm:pb-20 sm:pt-16">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_50%,#0c314f_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-accent/[0.16] blur-3xl" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-white/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-2 text-sm text-slate-100/65 sm:mb-10"
          >
            <Link
              href={`/${locale}`}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              {tx.back}
            </Link>
            <ArrowIcon size={14} />
            <span className="text-slate-50/90">{tx.title}</span>
          </nav>

          <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(25rem,1fr)] lg:items-center lg:gap-12">
            <div className="min-w-0 max-w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-black/10 backdrop-blur"
              >
                <Grid3X3 className="h-3.5 w-3.5 text-brand-accent" />
                {tx.collection}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 max-w-[10ch] font-heading text-4xl leading-[1.04] text-white drop-shadow-[0_3px_18px_rgba(0,0,0,0.26)] sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {tx.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-5 max-w-2xl text-lg font-semibold leading-7 text-brand-accent sm:text-xl"
              >
                {tx.subtitle}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-3 max-w-full break-words text-base leading-8 text-slate-100/85 sm:max-w-xl sm:text-lg"
              >
                {tx.description}
              </motion.p>

              <div className="mt-7 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 }}
                  className="col-span-2 rounded-2xl border border-white/14 bg-white/[0.09] p-4 shadow-xl shadow-black/10 backdrop-blur-sm sm:col-span-1"
                >
                  <Images className="h-5 w-5 text-brand-accent" strokeWidth={1.8} />
                  <p className="mt-3 font-heading text-2xl leading-none text-white">{images.length}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-100/72">{tx.photos(images.length)}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.36 }}
                  className="rounded-2xl border border-white/14 bg-white/[0.09] p-4 shadow-xl shadow-black/10 backdrop-blur-sm"
                >
                  <Hammer className="h-5 w-5 text-brand-accent" strokeWidth={1.8} />
                  <p className="mt-3 font-heading text-2xl leading-none text-white">{activeCategories.length}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-100/72">{tx.workAreas}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.42 }}
                  className="rounded-2xl border border-white/14 bg-white/[0.09] p-4 shadow-xl shadow-black/10 backdrop-blur-sm"
                >
                  <MapPin className="h-5 w-5 text-brand-accent" strokeWidth={1.8} />
                  <p className="mt-3 text-sm font-semibold leading-5 text-white">{tx.region}</p>
                </motion.div>
              </div>
            </div>

            {previewImages.length > 0 ? (
              <div className="grid min-w-0 gap-3 sm:gap-4">
                {previewImages.map((img, index) => {
                  const category = CATEGORIES.find((item) => item.value === img.category);
                  const CategoryPreviewIcon = category?.icon;

                  return (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: 0.16 + index * 0.1 }}
                      className="overflow-hidden rounded-2xl border border-white/16 bg-white/[0.08] shadow-2xl shadow-black/25"
                    >
                      <div className="relative aspect-[16/10]">
                        <Image
                          src={img.url}
                          alt={isRu ? (img.captionRu || img.caption || img.category) : (img.caption || img.category)}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 1024px) 100vw, 44vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#041524]/44 via-[#041524]/10 to-[#041524]/6 sm:from-[#041524]/88 sm:via-[#041524]/24 sm:to-[#041524]/8" />
                        {category && (
                          <div className="absolute bottom-4 left-4 hidden min-w-0 max-w-[calc(100%-2rem)] items-center gap-2 rounded-xl border border-white/16 bg-[#041524]/72 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-black/15 backdrop-blur-sm sm:inline-flex">
                            {CategoryPreviewIcon && (
                              <CategoryPreviewIcon className="h-3.5 w-3.5 shrink-0 text-brand-accent" strokeWidth={1.9} />
                            )}
                            <span className="truncate">{isRu ? category.ru : category.de}</span>
                          </div>
                        )}
                      </div>
                      {category && (
                        <div className="flex min-w-0 items-center gap-2 border-t border-white/12 bg-[#041524]/72 px-3 py-2.5 text-xs font-semibold text-white sm:hidden">
                          {CategoryPreviewIcon && (
                            <CategoryPreviewIcon className="h-3.5 w-3.5 shrink-0 text-brand-accent" strokeWidth={1.9} />
                          )}
                          <span className="truncate">{isRu ? category.ru : category.de}</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="flex min-h-[20rem] items-center justify-center rounded-2xl border border-white/16 bg-white/[0.08] p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-sm"
              >
                <div>
                  <Images className="mx-auto h-12 w-12 text-brand-accent" strokeWidth={1.5} />
                  <p className="mt-5 text-base font-medium text-slate-50">{tx.noImages}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════ CATEGORY FILTER ═══════ */}
      <section className="relative z-10 overflow-hidden bg-[#f7f9fb] py-10 sm:py-12">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#f7f9fb_58%,#eef4f8_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.035)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange">
                <CheckCircle2 className="h-4 w-4 text-brand-accent" strokeWidth={1.9} />
                {tx.workAreas}
              </div>
              <h2 className="mt-2 font-heading text-2xl text-anthracite-900 sm:text-3xl">
                {tx.filterTitle}
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-6 text-anthracite-600 sm:text-base">
              {tx.filterText}
            </p>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible sm:pb-0">
            <CategoryPill
              label={tx.all}
              count={images.length}
              isActive={!activeCategory}
              onClick={() => setActiveCategory(null)}
              icon={Images}
            />
            {activeCategories.map((cat) => (
              <CategoryPill
                key={cat.value}
                label={isRu ? cat.ru : cat.de}
                count={categoryCounts[cat.value]}
                isActive={activeCategory === cat.value}
                onClick={() => setActiveCategory(activeCategory === cat.value ? null : cat.value)}
                icon={cat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ GALLERY GRID ═══════ */}
      <section className="relative overflow-hidden bg-[#f7f9fb] pb-20 pt-1 sm:pb-24">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/18 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredImages.length > 0 ? (
            <>
              {/* Results count */}
              <div className="mb-6 flex items-center justify-between">
                <p className="inline-flex items-center gap-2 rounded-full border border-anthracite-100 bg-white px-3 py-1.5 text-sm text-anthracite-600 shadow-sm">
                  <Images className="h-3.5 w-3.5 text-brand-orange" strokeWidth={1.9} />
                  {tx.photos(filteredImages.length)}
                  {activeCategory && (
                    <span className="text-anthracite-400">
                      {' · '}
                      {isRu
                        ? CATEGORIES.find((c) => c.value === activeCategory)?.ru
                        : CATEGORIES.find((c) => c.value === activeCategory)?.de}
                    </span>
                  )}
                </p>
              </div>

              <MasonryGrid
                key={activeCategory ?? 'all'}
                images={filteredImages}
                onImageClick={openLightbox}
                locale={locale}
              />
            </>
          ) : (
            <div className="py-24 text-center sm:py-32">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white shadow-lg shadow-brand-orange/[0.08]">
                <Images className="h-8 w-8 text-brand-orange/30" />
              </div>
              <p className="text-lg font-medium text-anthracite-500">{tx.noImages}</p>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ CTA ═══════ */}
      <section className="relative overflow-hidden bg-[#061b2f] text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_48%,#0c314f_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/18" />
        <div className="absolute left-1/2 top-1/2 h-80 w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-accent/[0.12] blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-brand-accent" />

          <h2 className="mb-3 font-heading text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
            {tx.ctaTitle}
          </h2>

          <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-100/84 sm:text-base">
            {tx.ctaSubtitle}
          </p>

          <Link
            href={`/${locale}/contact`}
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-orange shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 hover:shadow-2xl active:scale-[0.98]"
          >
            <Phone className="w-4 h-4" />
            {tx.ctaButton}
            <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Bottom decorative */}
          <div className="mx-auto mt-14 h-px w-20 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
      </section>

      {/* ═══════ LIGHTBOX ═══════ */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={filteredImages}
            currentIndex={lightbox.index}
            onClose={closeLightbox}
            onChange={(i) => setLightbox({ index: i })}
            locale={locale}
          />
        )}
      </AnimatePresence>

      {/* ═══════ UTILITY STYLES ═══════ */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  );
}


//------пробую улучшить галерею
// 'use client';

// import { useState, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';
// import { X, ChevronLeft, ChevronRight, ZoomIn, Images, ArrowLeft } from 'lucide-react';

// type GalleryImage = {
//   id: string;
//   url: string;
//   filename: string | null;
//   category: string;
//   caption: string | null;
//   captionRu: string | null;
//   width: number;
//   height: number;
// };

// type Props = {
//   locale: string;
//   images: GalleryImage[];
// };

// const CATEGORIES = [
//   { value: 'bathroom', de: 'Badezimmer', ru: 'Ванная' },
//   { value: 'drywall', de: 'Trockenbau', ru: 'Гипсокартон' },
//   { value: 'facade', de: 'Fassade', ru: 'Фасад' },
//   { value: 'terrace', de: 'Terrasse', ru: 'Терраса' },
//   { value: 'flooring', de: 'Bodenbeläge', ru: 'Полы' },
//   { value: 'interior', de: 'Innenausbau', ru: 'Интерьер' },
//   { value: 'garden', de: 'Garten', ru: 'Сад' },
//   { value: 'masonry', de: 'Massivbau', ru: 'Кладка' },
// ];

// const t = {
//   de: {
//     title: 'Unsere Projekte',
//     subtitle: 'Einblicke in unsere abgeschlossenen Arbeiten',
//     all: 'Alle',
//     photos: (n: number) => `${n} ${n === 1 ? 'Foto' : 'Fotos'}`,
//     close: 'Schließen',
//     noImages: 'Noch keine Bilder vorhanden.',
//     back: 'Zurück zur Startseite',
//     cta: 'Kostenlose Beratung anfragen',
//   },
//   ru: {
//     title: 'Наши проекты',
//     subtitle: 'Фотографии завершённых работ',
//     all: 'Все',
//     photos: (n: number) => `${n} фото`,
//     close: 'Закрыть',
//     noImages: 'Изображений пока нет.',
//     back: 'На главную',
//     cta: 'Получить бесплатную консультацию',
//   },
// };

// /* ═══════ LIGHTBOX ═══════ */
// function Lightbox({
//   images, currentIndex, onClose, onChange, locale,
// }: {
//   images: GalleryImage[];
//   currentIndex: number;
//   onClose: () => void;
//   onChange: (i: number) => void;
//   locale: string;
// }) {
//   const img = images[currentIndex];
//   if (!img) return null;
//   const isRu = locale === 'ru';
//   const catLabel = CATEGORIES.find((c) => c.value === img.category);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-[100] flex items-center justify-center bg-anthracite-950/95 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       {/* Close */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
//       >
//         <X className="w-5 h-5" />
//       </button>

//       {/* Counter */}
//       <div className="absolute top-5 left-5 text-white/50 text-sm font-medium tabular-nums">
//         {currentIndex + 1} / {images.length}
//       </div>

//       {/* Prev */}
//       <button
//         onClick={(e) => { e.stopPropagation(); onChange((currentIndex - 1 + images.length) % images.length); }}
//         className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
//       >
//         <ChevronLeft className="w-6 h-6" />
//       </button>

//       {/* Next */}
//       <button
//         onClick={(e) => { e.stopPropagation(); onChange((currentIndex + 1) % images.length); }}
//         className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
//       >
//         <ChevronRight className="w-6 h-6" />
//       </button>

//       {/* Image */}
//       <AnimatePresence mode="wait">
//         <motion.img
//           key={img.id}
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.95 }}
//           transition={{ duration: 0.25 }}
//           src={img.url}
//           alt={isRu ? (img.captionRu || img.caption || '') : (img.caption || '')}
//           className="max-w-[90vw] max-h-[85vh] object-contain rounded-xl"
//           onClick={(e) => e.stopPropagation()}
//         />
//       </AnimatePresence>

//       {/* Caption */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
//         {catLabel && (
//           <span className="inline-block px-3 py-1 bg-brand-orange/80 text-white text-xs font-semibold rounded-full mb-2">
//             {isRu ? catLabel.ru : catLabel.de}
//           </span>
//         )}
//         {(img.caption || img.captionRu) && (
//           <p className="text-white/60 text-sm">
//             {isRu ? (img.captionRu || img.caption) : img.caption}
//           </p>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// /* ═══════ MASONRY GRID ═══════ */
// function MasonryGrid({ images, onImageClick, locale }: {
//   images: GalleryImage[];
//   onImageClick: (index: number) => void;
//   locale: string;
// }) {
//   const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
//   const isRu = locale === 'ru';

//   return (
//     <div
//       ref={ref}
//       className={`columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4 transition-opacity duration-700 ${
//         inView ? 'opacity-100' : 'opacity-0'
//       }`}
//     >
//       {images.map((img, i) => {
//         const catLabel = CATEGORIES.find((c) => c.value === img.category);
//         return (
//           <motion.button
//             key={img.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={inView ? { opacity: 1, y: 0 } : {}}
//             transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.5) }}
//             onClick={() => onImageClick(i)}
//             className="group relative w-full break-inside-avoid rounded-2xl overflow-hidden border border-anthracite-100 shadow-sm hover:shadow-lg focus:outline-none transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1"
//           >
//             <img
//               src={img.url}
//               alt={isRu ? (img.captionRu || img.caption || '') : (img.caption || img.category)}
//               className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
//               loading="lazy"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-anthracite-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
//               {catLabel && (
//                 <span className="inline-block self-start px-2.5 py-1 bg-brand-orange text-white text-xs font-semibold rounded-full mb-1">
//                   {isRu ? catLabel.ru : catLabel.de}
//                 </span>
//               )}
//               {(img.caption || img.captionRu) && (
//                 <p className="text-white/80 text-xs">
//                   {isRu ? (img.captionRu || img.caption) : img.caption}
//                 </p>
//               )}
//               <ZoomIn className="absolute top-3 right-3 w-5 h-5 text-white/60" />
//             </div>
//           </motion.button>
//         );
//       })}
//     </div>
//   );
// }

// /* ═══════ MAIN COMPONENT ═══════ */
// export default function GalerieClient({ locale, images }: Props) {
//   const isRu = locale === 'ru';
//   const tx = isRu ? t.ru : t.de;
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);
//   const [lightbox, setLightbox] = useState<{ index: number } | null>(null);

//   const filteredImages = activeCategory
//     ? images.filter((i) => i.category === activeCategory)
//     : images;

//   // Count per category (only existing ones)
//   const categoryCounts = useMemo(() => {
//     const counts: Record<string, number> = {};
//     images.forEach((img) => {
//       counts[img.category] = (counts[img.category] || 0) + 1;
//     });
//     return counts;
//   }, [images]);

//   const activeCategories = CATEGORIES.filter((c) => categoryCounts[c.value]);

//   return (
//     <main className="min-h-screen bg-white pt-20">
//       {/* Hero */}
//       <section className="relative py-16 sm:py-24 bg-gradient-to-b from-anthracite-50/50 to-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           {/* Back link */}
//           <a
//             href={`/${locale}`}
//             className="inline-flex items-center gap-1.5 text-sm text-anthracite-500 hover:text-brand-orange transition-colors mb-6"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             {tx.back}
//           </a>

//           <div className="inline-flex items-center gap-2 rounded-full border border-anthracite-200 bg-white px-4 py-1.5 text-xs font-semibold tracking-wide text-anthracite-600 shadow-sm mb-5">
//             <Images className="h-4 w-4 text-brand-orange" />
//             {tx.photos(images.length)}
//           </div>

//           <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-anthracite-900">
//             {tx.title}
//           </h1>
//           <p className="mt-3 text-anthracite-500 text-lg max-w-xl mx-auto">
//             {tx.subtitle}
//           </p>
//           <div className="mt-4 mx-auto w-16 h-1 bg-brand-orange rounded-full" />
//         </div>
//       </section>

//       {/* Category filter */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="flex flex-wrap justify-center gap-2">
//           <button
//             onClick={() => setActiveCategory(null)}
//             className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
//               !activeCategory
//                 ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
//                 : 'border border-anthracite-200 bg-white text-anthracite-600 hover:border-anthracite-300'
//             }`}
//           >
//             {tx.all}
//             <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
//               !activeCategory ? 'bg-white/25' : 'bg-anthracite-100 text-anthracite-500'
//             }`}>
//               {images.length}
//             </span>
//           </button>

//           {activeCategories.map((cat) => {
//             const isActive = activeCategory === cat.value;
//             return (
//               <button
//                 key={cat.value}
//                 onClick={() => setActiveCategory(isActive ? null : cat.value)}
//                 className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
//                   isActive
//                     ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
//                     : 'border border-anthracite-200 bg-white text-anthracite-600 hover:border-anthracite-300'
//                 }`}
//               >
//                 {isRu ? cat.ru : cat.de}
//                 <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
//                   isActive ? 'bg-white/25' : 'bg-anthracite-100 text-anthracite-500'
//                 }`}>
//                   {categoryCounts[cat.value]}
//                 </span>
//               </button>
//             );
//           })}
//         </div>
//       </section>

//       {/* Gallery Grid */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         {filteredImages.length > 0 ? (
//           <MasonryGrid
//             key={activeCategory ?? 'all'}
//             images={filteredImages}
//             onImageClick={(i) => setLightbox({ index: i })}
//             locale={locale}
//           />
//         ) : (
//           <div className="text-center py-20">
//             <Images className="w-12 h-12 mx-auto mb-3 text-anthracite-200" />
//             <p className="text-anthracite-400 font-medium">{tx.noImages}</p>
//           </div>
//         )}
//       </section>

//       {/* CTA */}
//       <section className="py-16 bg-anthracite-50/50">
//         <div className="max-w-2xl mx-auto px-4 text-center">
//           <h2 className="font-heading text-2xl sm:text-3xl text-anthracite-900 mb-4">
//             {isRu ? 'Нравятся наши работы?' : 'Gefallen Ihnen unsere Arbeiten?'}
//           </h2>
//           <a
//             href={`/${locale}#contact`}
//             className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-brand-orange hover:bg-brand-orange-dark text-white font-semibold transition-colors shadow-lg shadow-brand-orange/20"
//           >
//             {tx.cta}
//             <ChevronRight className="w-5 h-5" />
//           </a>
//         </div>
//       </section>

//       {/* Lightbox */}
//       <AnimatePresence>
//         {lightbox && (
//           <Lightbox
//             images={filteredImages}
//             currentIndex={lightbox.index}
//             onClose={() => setLightbox(null)}
//             onChange={(i) => setLightbox({ index: i })}
//             locale={locale}
//           />
//         )}
//       </AnimatePresence>
//     </main>
//   );
// }
