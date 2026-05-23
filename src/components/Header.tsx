// src/components/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  Globe2,
  Hammer,
  Images,
  Menu,
  Newspaper,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';

const navItems = ['about', 'services', 'whyUs', 'gallery', 'news', 'contact'] as const;
const pageLinks: Record<(typeof navItems)[number], string> = {
  about: '/about',
  services: '/services',
  whyUs: '/why-us',
  gallery: '/galerie',
  news: '/news',
  contact: '/contact',
};

const navIcons = {
  about: Building2,
  services: Hammer,
  whyUs: ShieldCheck,
  gallery: Images,
  news: Newspaper,
  contact: Phone,
};

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const isHomePage = pathname === `/${locale}`;
  const useSolidHeader = isScrolled || !isHomePage;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const switchLocale = (newLocale: string) => {
    const path = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          useSolidHeader
            ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-gradient-to-b from-anthracite-950/58 via-anthracite-950/24 to-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a
              href={`/${locale}`}
              className="group inline-flex items-center"
              aria-label="SorgfaltBau"
            >
              <span className={`rounded-md px-1.5 py-0.5 shadow-lg transition-colors sm:px-2 sm:py-1 ${
                useSolidHeader ? 'bg-white' : 'bg-white/90 shadow-black/20'
              }`}>
                <Image
                  src="/uploads/logo-sb-header.webp"
                  alt="SorgfaltBau"
                  width={156}
                  height={83}
                  priority
                  className="h-8 w-auto sm:h-12"
                />
              </span>
            </a>

            {/* Desktop Nav */}
            <nav
              className={`hidden items-center rounded-full border p-1.5 shadow-sm backdrop-blur-md lg:flex ${
                useSolidHeader
                  ? 'border-anthracite-100 bg-white/78 shadow-brand-orange/[0.04]'
                  : 'border-white/35 bg-white/72 shadow-black/14'
              }`}
            >
              {navItems.map((item) => {
                const href = `/${locale}${pageLinks[item]}`;
                const isActive = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <a
                    key={item}
                    href={href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`group relative overflow-hidden rounded-full px-3 py-2 text-sm font-semibold transition-all xl:px-4 ${
                      isActive
                        ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                        : useSolidHeader
                          ? 'text-anthracite-600 hover:bg-brand-orange/8 hover:text-brand-orange'
                          : 'text-anthracite-800 hover:bg-[#071f35] hover:text-white'
                    }`}
                  >
                    <span className="relative">{t(item)}</span>
                    {!isActive ? (
                      <span
                        className={`pointer-events-none absolute inset-x-4 bottom-1 h-px origin-center scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                          useSolidHeader ? 'bg-brand-orange/65' : 'bg-brand-accent/90'
                        }`}
                      />
                    ) : null}
                  </a>
                );
              })}
            </nav>

            {/* Right side: Language + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Switcher */}
              <div className="flex items-center rounded-full border border-anthracite-200/30 overflow-hidden">
                <button
                  onClick={() => switchLocale('de')}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    locale === 'de'
                      ? 'bg-brand-orange text-white'
                      : useSolidHeader
                        ? 'text-anthracite-500 hover:text-anthracite-800'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  DE
                </button>
                <button
                  onClick={() => switchLocale('ru')}
                  className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
                    locale === 'ru'
                      ? 'bg-brand-orange text-white'
                      : useSolidHeader
                        ? 'text-anthracite-500 hover:text-anthracite-800'
                        : 'text-white/60 hover:text-white'
                  }`}
                >
                  RU
                </button>
              </div>

              {/* CTA Button */}
              <a
                href={`/${locale}/contact`}
                className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-orange/25 active:scale-95"
              >
                <Phone size={15} />
                {t('contact')}
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                useSolidHeader ? 'text-anthracite-700' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[60] flex justify-end bg-[#041524]/58 backdrop-blur-sm lg:hidden"
            onClick={() => setIsMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 260 }}
              className="relative flex h-full w-full max-w-[25rem] flex-col overflow-hidden border-l border-white/12 bg-[#f7fafc] shadow-[-28px_0_84px_rgba(4,21,36,0.38)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,31,53,0.038)_1px,transparent_1px),linear-gradient(180deg,rgba(7,31,53,0.03)_1px,transparent_1px)] bg-[size:52px_52px]" />
              <div className="absolute -right-24 top-20 h-52 w-52 rounded-full bg-brand-orange/[0.08] blur-3xl" />

              <div className="relative overflow-hidden border-b border-white/14 bg-[#061b2f] px-4 pb-6 pt-4 text-white sm:px-6">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#041524_0%,#071f35_52%,#0c314f_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:52px_52px]" />
                <div className="relative flex items-start justify-between gap-4">
                  <a
                    href={`/${locale}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex rounded-lg bg-white px-2 py-1 shadow-xl shadow-black/20"
                    aria-label="SorgfaltBau"
                  >
                    <Image
                      src="/uploads/logo-sb-header.webp"
                      alt="SorgfaltBau"
                      width={150}
                      height={79}
                      className="h-9 w-auto"
                    />
                  </a>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition-all hover:border-brand-accent/55 hover:bg-white/16 hover:text-brand-accent"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="relative mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/66">
                  <span className="h-px w-8 bg-brand-accent" />
                  SorgfaltBau
                </div>
              </div>

              <nav className="relative flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-6">
                <div className="grid gap-2">
                  {navItems.map((item, i) => {
                    const Icon = navIcons[item];
                    const href = `/${locale}${pageLinks[item]}`;
                    const isActive = pathname === href || pathname.startsWith(`${href}/`);

                    return (
                      <motion.a
                        key={item}
                        initial={{ opacity: 0, x: 18 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.05 + i * 0.045 }}
                        href={href}
                        onClick={() => setIsMobileOpen(false)}
                        aria-current={isActive ? 'page' : undefined}
                        className={`group relative flex min-h-14 items-center gap-3 overflow-hidden rounded-2xl border px-3 py-2.5 text-left shadow-sm transition-all ${
                          isActive
                            ? 'border-brand-orange/16 bg-[#071f35] text-white shadow-brand-orange/10'
                            : 'border-white/90 bg-white/88 text-anthracite-700 hover:-translate-y-0.5 hover:border-brand-orange/22 hover:bg-white hover:text-brand-orange hover:shadow-xl hover:shadow-brand-orange/[0.08]'
                        }`}
                      >
                        <span
                          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isActive
                              ? 'bg-brand-accent text-white'
                              : 'bg-brand-orange/10 text-brand-orange group-hover:bg-brand-orange group-hover:text-white'
                          }`}
                        >
                          <Icon size={18} strokeWidth={1.9} />
                        </span>
                        <span className="relative min-w-0 flex-1 text-sm font-semibold leading-5 sm:text-base">
                          {t(item)}
                        </span>
                        <span
                          className={`relative h-2.5 w-2.5 shrink-0 rounded-full border ${
                            isActive
                              ? 'border-brand-accent bg-brand-accent'
                              : 'border-brand-orange/25 bg-brand-orange/[0.08] group-hover:bg-brand-orange/55'
                          }`}
                        />
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-auto pt-5">
                  {/* Language Switcher Mobile */}
                  <div className="rounded-2xl border border-white/90 bg-white/86 p-2 shadow-lg shadow-brand-orange/[0.05] backdrop-blur-sm">
                    <div className="mb-2 flex items-center gap-2 px-2 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-anthracite-500">
                      <Globe2 size={13} className="text-brand-orange" />
                      <span>{locale === 'de' ? 'Sprache' : 'Язык'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => switchLocale('de')}
                        className={`min-h-10 rounded-xl px-3 text-sm font-semibold transition-all ${
                          locale === 'de'
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/18'
                            : 'bg-anthracite-100 text-anthracite-600 hover:bg-brand-orange/10 hover:text-brand-orange'
                        }`}
                      >
                        Deutsch
                      </button>
                      <button
                        onClick={() => switchLocale('ru')}
                        className={`min-h-10 rounded-xl px-3 text-sm font-semibold transition-all ${
                          locale === 'ru'
                            ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/18'
                            : 'bg-anthracite-100 text-anthracite-600 hover:bg-brand-orange/10 hover:text-brand-orange'
                        }`}
                      >
                        Русский
                      </button>
                    </div>
                  </div>

                  {/* CTA Mobile */}
                  <motion.a
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34 }}
                    href={`/${locale}/contact`}
                    onClick={() => setIsMobileOpen(false)}
                    className="group relative mt-3 flex min-h-13 items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand-orange px-4 py-3.5 text-base font-semibold text-white shadow-2xl shadow-brand-orange/20 transition-all hover:-translate-y-0.5 hover:bg-brand-light"
                  >
                    <span className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/28 to-transparent opacity-0 blur-lg transition-all duration-700 group-hover:translate-x-[520%] group-hover:opacity-100" />
                    <Phone size={17} className="relative" />
                    <span className="relative">{t('contact')}</span>
                  </motion.a>
                </div>
              </nav>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}



//----------21.02.26 добавляем страницу новостей и редактора, а также админку для них. В админке будет возможность создавать, редактировать и удалять новости, а также редактировать контент на главной странице. Также добавляем переменные окружения для контактной информации в футере. ----------//
// 'use client';

// import { useState, useEffect } from 'react';
// import { useTranslations, useLocale } from 'next-intl';
// import { usePathname, useRouter } from 'next/navigation';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Menu, X, Phone } from 'lucide-react';

// const navItems = ['about', 'services', 'whyUs', 'gallery', 'contact'] as const;
// const sectionIds: Record<string, string> = {
//   about: 'about',
//   services: 'services',
//   whyUs: 'why-us',
//   contact: 'contact',
// };
// // Gallery links to separate page
// const pageLinks: Record<string, string> = {
//   gallery: '/galerie',
// };

// export default function Header() {
//   const t = useTranslations('nav');
//   const locale = useLocale();
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileOpen, setIsMobileOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     if (isMobileOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = '';
//     }
//     return () => { document.body.style.overflow = ''; };
//   }, [isMobileOpen]);

//   const switchLocale = (newLocale: string) => {
//     const path = pathname.replace(`/${locale}`, `/${newLocale}`);
//     router.push(path);
//     setIsMobileOpen(false);
//   };

//   const homePath = `/${locale}`;
//   const sectionHref = (sectionId: string) => `${homePath}#${sectionId}`;

//   return (
//     <>
//       <header
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//           isScrolled
//             ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-black/5'
//             : 'bg-transparent'
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16 sm:h-20">
//             {/* Logo */}
//             <a
//               href={`/${locale}`}
//               className="group"
//             >
//               <span className={`text-2xl sm:text-[28px] font-heading tracking-tight transition-colors ${
//                 isScrolled ? 'text-brand-orange' : 'text-white'
//               }`}>Sorgfalt</span><span className={`text-2xl sm:text-[28px] font-heading tracking-tight transition-colors ${
//                 isScrolled ? 'text-anthracite-800' : 'text-white'
//               }`}>Bau</span>
//             </a>

//             {/* Desktop Nav */}
//             <nav className="hidden lg:flex items-center gap-1">
//               {navItems.map((item) => {
//                 const pageLink = pageLinks[item];
//                 if (pageLink) {
//                   return (
//                     <a
//                       key={item}
//                       href={`/${locale}${pageLink}`}
//                       className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
//                         isScrolled
//                           ? 'text-anthracite-600 hover:text-anthracite-900 hover:bg-anthracite-50'
//                           : 'text-white/80 hover:text-white hover:bg-white/10'
//                       }`}
//                     >
//                       {t(item)}
//                     </a>
//                   );
//                 }
//                 return (
//                   <a
//                     key={item}
//                     href={sectionHref(sectionIds[item])}
//                     className={`px-3 xl:px-4 py-2 text-sm font-medium rounded-lg transition-all ${
//                       isScrolled
//                         ? 'text-anthracite-600 hover:text-anthracite-900 hover:bg-anthracite-50'
//                         : 'text-white/80 hover:text-white hover:bg-white/10'
//                     }`}
//                   >
//                     {t(item)}
//                   </a>
//                 );
//               })}
//             </nav>

//             {/* Right side: Language + CTA */}
//             <div className="hidden lg:flex items-center gap-3">
//               {/* Language Switcher */}
//               <div className="flex items-center rounded-full border border-anthracite-200/30 overflow-hidden">
//                 <button
//                   onClick={() => switchLocale('de')}
//                   className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
//                     locale === 'de'
//                       ? 'bg-brand-orange text-white'
//                       : isScrolled
//                         ? 'text-anthracite-500 hover:text-anthracite-800'
//                         : 'text-white/60 hover:text-white'
//                   }`}
//                 >
//                   DE
//                 </button>
//                 <button
//                   onClick={() => switchLocale('ru')}
//                   className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-all ${
//                     locale === 'ru'
//                       ? 'bg-brand-orange text-white'
//                       : isScrolled
//                         ? 'text-anthracite-500 hover:text-anthracite-800'
//                         : 'text-white/60 hover:text-white'
//                   }`}
//                 >
//                   RU
//                 </button>
//               </div>

//               {/* CTA Button */}
//               <a
//                 href={sectionHref('contact')}
//                 className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-brand-orange/25 active:scale-95"
//               >
//                 <Phone size={15} />
//                 {t('contact')}
//               </a>
//             </div>

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMobileOpen(!isMobileOpen)}
//               className={`lg:hidden p-2 rounded-lg transition-colors ${
//                 isScrolled ? 'text-anthracite-700' : 'text-white'
//               }`}
//               aria-label="Toggle menu"
//             >
//               {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isMobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, x: '100%' }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: '100%' }}
//             transition={{ type: 'spring', damping: 25, stiffness: 200 }}
//             className="fixed inset-0 z-[60] bg-white lg:hidden"
//           >
//             <div className="flex items-center justify-between h-16 px-4 border-b border-anthracite-100">
//               <span className="text-2xl font-heading"><span className="text-brand-orange">Sorgfalt</span><span className="text-anthracite-800">Bau</span></span>
//               <button
//                 onClick={() => setIsMobileOpen(false)}
//                 className="p-2 text-anthracite-700"
//                 aria-label="Close menu"
//               >
//                 <X size={24} />
//               </button>
//             </div>

//             <nav className="flex flex-col px-6 py-8 gap-1">
//               {navItems.map((item, i) => {
//                 const pageLink = pageLinks[item];
//                 if (pageLink) {
//                   return (
//                     <motion.a
//                       key={item}
//                       initial={{ opacity: 0, x: 20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: i * 0.05 }}
//                       href={`/${locale}${pageLink}`}
//                       onClick={() => setIsMobileOpen(false)}
//                       className="text-left py-3 px-4 text-lg font-medium text-anthracite-700 hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all"
//                     >
//                       {t(item)}
//                     </motion.a>
//                   );
//                 }
//                 return (
//                   <motion.a
//                     key={item}
//                     initial={{ opacity: 0, x: 20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.05 }}
//                     href={sectionHref(sectionIds[item])}
//                     onClick={() => setIsMobileOpen(false)}
//                     className="text-left py-3 px-4 text-lg font-medium text-anthracite-700 hover:text-brand-orange hover:bg-brand-orange/5 rounded-xl transition-all"
//                   >
//                     {t(item)}
//                   </motion.a>
//                 );
//               })}

//               {/* Language Switcher Mobile */}
//               <div className="flex gap-2 mt-6 px-4">
//                 <button
//                   onClick={() => switchLocale('de')}
//                   className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                     locale === 'de'
//                       ? 'bg-brand-orange text-white'
//                       : 'bg-anthracite-100 text-anthracite-600'
//                   }`}
//                 >
//                   Deutsch
//                 </button>
//                 <button
//                   onClick={() => switchLocale('ru')}
//                   className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
//                     locale === 'ru'
//                       ? 'bg-brand-orange text-white'
//                       : 'bg-anthracite-100 text-anthracite-600'
//                   }`}
//                 >
//                   Русский
//                 </button>
//               </div>

//               {/* CTA Mobile */}
//               <motion.a
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 href={sectionHref('contact')}
//                 onClick={() => setIsMobileOpen(false)}
//                 className="mt-4 mx-4 flex items-center justify-center gap-2 bg-brand-orange text-white py-3.5 rounded-xl text-base font-semibold"
//               >
//                 <Phone size={18} />
//                 {t('contact')}
//               </motion.a>
//             </nav>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }
