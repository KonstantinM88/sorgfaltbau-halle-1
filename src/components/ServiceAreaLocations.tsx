import { MapPin } from 'lucide-react';
import AnimateOnScroll from '@/components/ui/AnimateOnScroll';

type ServiceAreaMark = {
  code: string;
  base: string;
  accent: string;
  glint: string;
};

type ServiceAreaLocationsProps = {
  locations: string[];
  density?: 'comfortable' | 'compact';
};

const serviceAreaMarks: Record<string, ServiceAreaMark> = {
  'Halle (Saale)': { code: 'HAL', base: '#e30613', accent: '#fff8f8', glint: '#ffffff' },
  Merseburg: { code: 'MER', base: '#bd1e2d', accent: '#f7f4ef', glint: '#ffffff' },
  Leipzig: { code: 'L', base: '#165ca8', accent: '#f2c640', glint: '#fff4b8' },
  Schkeuditz: { code: 'SK', base: '#b22a25', accent: '#e3b33f', glint: '#f7e9a8' },
  Delitzsch: { code: 'DZ', base: '#1762ac', accent: '#f1c53a', glint: '#fff4b4' },
  Landsberg: { code: 'LA', base: '#071f35', accent: '#cfd9e1', glint: '#f6fbff' },
  Kabelsketal: { code: 'KA', base: '#28733f', accent: '#efc73d', glint: '#fff4bc' },
  Teutschenthal: { code: 'TE', base: '#2b7a46', accent: '#f8fbf8', glint: '#ffffff' },
  'Bad Lauchstädt': { code: 'BL', base: '#1765ad', accent: '#f7fbff', glint: '#ffffff' },
  'Wettin-Löbejün': { code: 'WL', base: '#31804d', accent: '#cf3e35', glint: '#fff8f4' },
  Salzatal: { code: 'SA', base: '#1e67ab', accent: '#f4fbff', glint: '#ffffff' },
  Petersberg: { code: 'PE', base: '#1b63ac', accent: '#f7fbff', glint: '#ffffff' },
};

function getServiceAreaMark(location: string, index: number) {
  return (
    serviceAreaMarks[location] || {
      code: location.slice(0, 2).toUpperCase(),
      base: index % 2 === 0 ? '#071f35' : '#173854',
      accent: index % 2 === 0 ? '#f26422' : '#81a6cf',
      glint: '#f1f7fb',
    }
  );
}

function ServiceAreaShield({
  mark,
  index,
  density,
}: {
  mark: ServiceAreaMark;
  index: number;
  density: NonNullable<ServiceAreaLocationsProps['density']>;
}) {
  const fillId = `service-area-shield-${density}-${index}`;

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center ${
        density === 'compact' ? 'h-14 w-12' : 'h-16 w-14'
      }`}
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full drop-shadow-[0_10px_16px_rgba(7,31,53,0.18)]"
        viewBox="0 0 56 64"
      >
        <defs>
          <linearGradient id={fillId} x1="10" x2="46" y1="6" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor={mark.glint} />
            <stop offset="0.42" stopColor={mark.accent} />
            <stop offset="1" stopColor={mark.base} />
          </linearGradient>
        </defs>
        <path
          d="M28 2.75 49.5 10v19.4c0 14.9-8.75 25.26-21.5 31.85C15.25 54.66 6.5 44.3 6.5 29.4V10L28 2.75Z"
          fill={`url(#${fillId})`}
        />
        <path
          d="M28 5.85 46.5 12v17.1c0 12.73-7.22 22.01-18.5 28.13C16.72 51.11 9.5 41.83 9.5 29.1V12L28 5.85Z"
          fill={mark.base}
          fillOpacity="0.92"
        />
        <path d="M10 16.75 46 8.9v10.8L10 27.55V16.75Z" fill={mark.accent} fillOpacity="0.94" />
        <path
          d="M28 5.85 46.5 12v17.1c0 12.73-7.22 22.01-18.5 28.13C16.72 51.11 9.5 41.83 9.5 29.1V12L28 5.85Z"
          fill="none"
          stroke="white"
          strokeOpacity="0.48"
          strokeWidth="1.35"
        />
      </svg>
      <span
        className={`relative mt-1 font-black uppercase text-white ${
          mark.code.length > 2
            ? 'text-[0.6rem] tracking-[0.08em]'
            : 'text-[0.68rem] tracking-[0.16em]'
        }`}
      >
        {mark.code}
      </span>
    </span>
  );
}

export default function ServiceAreaLocations({
  locations,
  density = 'comfortable',
}: ServiceAreaLocationsProps) {
  return (
    <ul className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${density === 'compact' ? 'mt-5' : 'mt-8'}`}>
      {locations.map((location, index) => {
        const mark = getServiceAreaMark(location, index);

        return (
          <li key={location}>
            <AnimateOnScroll variant="scaleIn" delay={Math.min(index * 0.045, 0.32)} duration={0.5}>
              <div
                className={`group relative flex items-center overflow-hidden rounded-2xl border border-white/90 bg-white/88 shadow-[0_16px_38px_rgba(7,31,53,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-orange/22 hover:bg-white hover:shadow-[0_22px_48px_rgba(7,31,53,0.14)] ${
                  density === 'compact'
                    ? 'min-h-[5.25rem] gap-2 p-2.5 sm:gap-3 sm:p-3'
                    : 'min-h-[6.4rem] gap-3 p-3 sm:gap-4 sm:p-4'
                }`}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-orange/45 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
                <div
                  className={`pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 rounded-full border border-brand-orange/10 bg-brand-orange/[0.035] transition-transform duration-500 group-hover:scale-110 ${
                    density === 'compact' ? 'h-24 w-24' : 'h-28 w-28'
                  }`}
                />
                <ServiceAreaShield mark={mark} index={index} density={density} />
                <div className="relative min-w-0 flex-1">
                  {density === 'comfortable' ? (
                    <p className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-brand-orange/60">
                      SorgfaltBau
                    </p>
                  ) : null}
                  <span
                    className={`block break-words font-semibold leading-6 text-anthracite-800 ${
                      density === 'compact' ? 'text-sm' : 'mt-1 text-sm sm:text-base'
                    }`}
                  >
                    {location}
                  </span>
                </div>
                <MapPin
                  aria-hidden="true"
                  size={density === 'compact' ? 16 : 18}
                  className="relative shrink-0 text-brand-orange/35 transition-all duration-300 group-hover:text-brand-orange"
                />
              </div>
            </AnimateOnScroll>
          </li>
        );
      })}
    </ul>
  );
}
