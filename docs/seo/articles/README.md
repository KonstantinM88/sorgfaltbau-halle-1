# Ратгеберы под органические запросы (24.10.2026)

Основание: раскрытые запросы GSC из `../baseline-2026-10-21.json`
(01.05–18.10.2026, final web, до выкладки `aa7d7a0`). Раскрыто 57 запросов;
большая часть из 1 038 показов анонимизирована, поэтому кластеры ниже —
наблюдение, а не оценка рыночного спроса.

| Кластер | Показы | Позиции | Решение |
| --- | --- | --- | --- |
| Фасад (fassadenarbeiten/fassadensanierung halle, firma, kosten, Risse) | ~95 | 8–35 | Ратгебер «Risse in der Fassade» → `fassadendaemmung-halle`, без нового service-URL |
| Ремонт квартир (renovierung halle saale, wohnungssanierung halle) | ~90 | 15–67 | Ратгебер для арендодателей → `wohnungsrenovierung-halle` |
| Trockenbau | ~84 | 70–84 | Новых страниц нет: `trockenbau-halle` ещё неизвестна Google |
| Крыша (dachneueindeckung, dachsanierung) | ~25 | 20–95 | Новых страниц нет (Anlage A HwO, проверить Handwerksrolle) |
| Entkernung, Bau-/Endreinigung | ~20 | 69–95 | Ратгебер; совпадает с Gewerbe «Bauhelfer, Hausmeisterservice» |
| Pflaster | мало раскрыто | ~5 | Ратгебер «Einfahrt pflastern» усиливает лучшую страницу `pflasterarbeiten-halle` |
| «Halle» как здание (Veranstaltungshalle, Werkshalle) | ~20 | — | Нецелевой трафик, не оптимизировать |

## Статьи (опубликованы через код 24.10.2026)

Тексты DE/RU лежат в `src/lib/static-articles.ts` и выходят на сайт с
деплоем, без записи в production-БД. Список новостей, `generateStaticParams`
и sitemap объединяют их со статьями из админки; при совпадении slug
побеждает статья из БД.

| Slug | Ссылки на услуги в тексте | Обратная ссылка со страницы услуги |
| --- | --- | --- |
| `einfahrt-pflastern-in-halle-unterbau-gefaelle-entwaesserung-und-kosten` | pflasterarbeiten-halle | pflasterarbeiten-halle |
| `risse-in-der-fassade-ursachen-dringlichkeit-und-sanierung-in-halle` | fassadendaemmung-halle | fassadendaemmung-halle |
| `entkernung-und-baureinigung-in-halle-ablauf-entsorgung-und-kosten` | wohnungsrenovierung-halle | wohnungsrenovierung-halle |
| `wohnung-vor-neuvermietung-renovieren-in-halle-checkliste-fuer-vermieter` | bodenbelaege-halle, wohnungsrenovierung-halle | wohnungsrenovierung-halle |

GEO/AIO-структура: короткий ответ «Das Wichtigste in Kürze», вопросы в
заголовках, списки шагов и факторов, честные ограничения (статика,
вредные вещества, право), раздел «Häufige Fragen» с `### Вопрос?`.
Цены, кейсы, отзывы и сертификаты не выдумывались. Обложек нет: добавлять
только реальные фото или нейтральные иллюстрации.

## Правила правки

- Немецкие и русские подзаголовки, после которых стоят ссылки
  (`contextualLinksBySlug` в `ArticleClient.tsx`), и раздел FAQ не менять без
  синхронной правки кода.
- Если статью нужно редактировать в админке, создать её там с тем же
  немецким заголовком: версия из БД заменит версию из кода.
- Не менять slug: на него ссылаются страницы услуг (`guide.moreLinks`).
- `publishedAt`/`updatedAt` в коде менять только при реальном изменении
  содержания; не подставлять дату сборки.

## После деплоя

1. Открыть `/de/news` и четыре статьи DE/RU, проверить ссылки на услуги.
2. Проверить `/sitemap.xml`: 8 новых URL (4 × DE/RU).
3. Search Console → «Проверка URL» → «Запросить индексирование» для четырёх
   DE-URL, по одному разу.

FAQ-разметку (`getArticleFaqSchema`) Google с 2023 года показывает как сниппет
в основном государственным и медицинским сайтам; она нужна для машинного
понимания страницы.
