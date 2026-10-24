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

## Статьи

| Файл | Slug | Ссылки на услуги |
| --- | --- | --- |
| `2026-10-24-einfahrt-pflastern.md` | `einfahrt-pflastern-in-halle-unterbau-gefaelle-entwaesserung-und-kosten` | pflasterarbeiten-halle |
| `2026-10-24-risse-in-der-fassade.md` | `risse-in-der-fassade-ursachen-dringlichkeit-und-sanierung-in-halle` | fassadendaemmung-halle |
| `2026-10-24-entkernung-baureinigung.md` | `entkernung-und-baureinigung-in-halle-ablauf-entsorgung-und-kosten` | wohnungsrenovierung-halle |
| `2026-10-24-renovierung-vor-neuvermietung.md` | `wohnung-vor-neuvermietung-renovieren-in-halle-checkliste-fuer-vermieter` | bodenbelaege-halle, wohnungsrenovierung-halle |

GEO/AIO-структура: короткий ответ «Das Wichtigste in Kürze», вопросы в
заголовках, списки шагов и факторов, честные ограничения (статика,
вредные вещества, право), раздел «Häufige Fragen» с `### Вопрос?`.
Цены, кейсы, отзывы и сертификаты не выдумывались.

## Как опубликовать

1. `/admin` → News → новая статья. Вставить DE: Titel, Kurzbeschreibung,
   Inhalt, Meta-Titel, Meta-Beschreibung. Переключить на RU и вставить RU-поля.
2. **Немецкий заголовок не менять**: из него создаётся slug, а контекстные
   ссылки в коде привязаны к этому slug. После сохранения сверить slug с таблицей.
3. **Заголовки внутри текста не менять**: ссылки на услуги вставляются после
   конкретных заголовков, FAQPage строится из раздела «Häufige Fragen» /
   «Частые вопросы».
4. Обложка: только реальное фото или нейтральная иллюстрация без подачи как
   выполненного объекта SorgfaltBau.
5. Публиковать по одной статье в несколько дней, не все сразу.
6. После публикации: открыть статью DE и RU, проверить ссылку на услугу,
   затем «Проверка URL» → «Запросить индексирование» для DE-версии.
7. Сообщить агенту об опубликованных slug: тогда со страниц услуг можно
   добавить обратные ссылки на статьи (до публикации они вели бы на 404).

Код: `getArticleFaqSchema` в `src/lib/seo.ts` добавляет FAQPage для любой
статьи с этим разделом; `contextualLinksBySlug` в `ArticleClient.tsx` хранит
ссылки на услуги. FAQ-сниппеты Google с 2023 года показывает в основном
государственным и медицинским сайтам; разметка нужна для машинного понимания
страницы, а не ради сниппета.
