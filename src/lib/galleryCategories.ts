export const GALLERY_CATEGORIES = [
  { value: 'bathroom', de: 'Badezimmer', ru: 'Ванная' },
  { value: 'drywall', de: 'Trockenbau', ru: 'Гипсокартон' },
  { value: 'facade', de: 'Fassade', ru: 'Фасад' },
  { value: 'terrace', de: 'Terrasse', ru: 'Терраса' },
  { value: 'flooring', de: 'Bodenbeläge', ru: 'Полы' },
  { value: 'interior', de: 'Innenausbau', ru: 'Интерьер' },
  { value: 'garden', de: 'Garten', ru: 'Сад' },
  { value: 'masonry', de: 'Massivbau und Mauerwerk', ru: 'Кладка и массивное строительство' },
  { value: 'parking', de: 'Parkplätze und Einfahrten schlüsselfertig', ru: 'Парковки и въезды под ключ' },
  { value: 'roof', de: 'Dachreparatur und Dämmung', ru: 'Кровля и утепление' },
  { value: 'natural-stone', de: 'Natursteinarbeiten - Sandstein und Granit', ru: 'Натуральный камень: песчаник и гранит' },
  { value: 'painting', de: 'Malerarbeiten', ru: 'Покраска и малярные работы' },
  { value: 'plastering', de: 'Putz- und Spachtelarbeiten', ru: 'Штукатурка и шпаклёвка' },
  { value: 'tiling', de: 'Fliesenarbeiten', ru: 'Плиточные работы' },
  { value: 'demolition-openings', de: 'Durchbrüche und Rückbau', ru: 'Проёмы и демонтаж' },
  { value: 'concrete', de: 'Betonarbeiten', ru: 'Бетонные работы' },
  { value: 'garage-outbuildings', de: 'Garagen und Nebengebäude', ru: 'Гаражи и хозпостройки' },
  { value: 'drainage', de: 'Entwässerung und Rinnen', ru: 'Дренаж и водоотвод' },
  { value: 'metalwork', de: 'Schweiß- und Metallarbeiten', ru: 'Сварка и металлоконструкции' },
  { value: 'chimney', de: 'Schornstein und Dämmung', ru: 'Дымоход и утепление' },
  { value: 'wood-floor', de: 'Holzboden-Restaurierung', ru: 'Реставрация деревянных полов' },
  { value: 'stairs', de: 'Treppenarbeiten', ru: 'Лестницы' },
  { value: 'earthwork', de: 'Erd- und Gartenarbeiten', ru: 'Земляные и садовые работы' },
  { value: 'lawn-care', de: 'Rasenpflege und Mähen', ru: 'Покос и уход за газоном' },
  { value: 'tree-care', de: 'Baumarbeiten und Notfallbäume', ru: 'Деревья и аварийные работы' },
  { value: 'firewood', de: 'Holz spalten und stapeln', ru: 'Колка и укладка дров' },
  { value: 'property-care', de: 'Hausmeister- und Pflegearbeiten', ru: 'Уход за объектом' },
  { value: 'full-renovation', de: 'Komplettrenovierung', ru: 'Комплексный ремонт' },
] as const;

export const DEFAULT_GALLERY_CATEGORY = 'interior';

const GALLERY_CATEGORY_VALUES = new Set(GALLERY_CATEGORIES.map((category) => category.value));

export function normalizeGalleryCategory(value: unknown) {
  if (typeof value !== 'string') return DEFAULT_GALLERY_CATEGORY;
  const normalized = value.trim().toLowerCase();
  return GALLERY_CATEGORY_VALUES.has(normalized as (typeof GALLERY_CATEGORIES)[number]['value'])
    ? normalized
    : DEFAULT_GALLERY_CATEGORY;
}
