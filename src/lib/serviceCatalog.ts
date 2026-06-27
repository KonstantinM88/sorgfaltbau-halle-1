/**
 * Сопоставление позиций каталога услуг детальным страницам /services/[slug].
 *
 * Ключ — индекс в массиве `services.construction.items` (из i18n-словаря).
 * Порядок этого массива одинаков для DE и RU, поэтому привязка по индексу
 * работает для обоих языков.
 *
 * Используется в:
 *   - components/Services.tsx (кликабельные карточки каталога)
 *   - components/Footer.tsx   (список услуг в подвале)
 *
 * ВАЖНО: держать в синхроне со slug'ами из lib/services.ts.
 *
 * Индексы (0-based) → услуга:
 *   0  Massivbau aus Ziegel und Beton            → rohbau-halle
 *   2  Fassadenarbeiten inkl. Dämmung            → fassadendaemmung-halle
 *   3  Trockenbau (Gipskarton)                   → trockenbau-halle
 *   5  Verlegung aller Bodenbeläge               → bodenbelaege-halle
 *   8  Badsanierung ... schlüsselfertig          → badsanierung-halle
 *   17 Dachreparaturen und Dachdämmung           → dachsanierung-halle
 *   18 Parkflächen und Einfahrten schlüsselfertig→ pflasterarbeiten-halle
 */
export const CONSTRUCTION_CATALOG_SLUGS: Record<number, string> = {
  0: 'rohbau-halle',
  2: 'fassadendaemmung-halle',
  3: 'trockenbau-halle',
  5: 'bodenbelaege-halle',
  8: 'badsanierung-halle',
  17: 'dachsanierung-halle',
  18: 'pflasterarbeiten-halle',
};

/** Индексы услуг с детальными страницами, по порядку каталога (для футера). */
export const FOOTER_SERVICE_INDICES = Object.keys(CONSTRUCTION_CATALOG_SLUGS)
  .map(Number)
  .sort((a, b) => a - b);
