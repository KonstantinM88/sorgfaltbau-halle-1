/**
 * Данные посадочных страниц услуг (/services/[slug]).
 *
 * Каждая услуга = отдельная страница под локальный коммерческий запрос
 * ("[Услуга] Halle"). Контент уникальный, двуязычный (DE/RU).
 *
 * Как добавить новую услугу:
 *   1) добавьте объект в массив SERVICES со своим slug;
 *   2) положите картинку в /public/images/ и укажите путь в image;
 *   3) всё остальное (роут, метаданные, sitemap, разметка) подхватится само.
 */

export type ServiceLocaleContent = {
  /** H1 и заголовок в списках */
  title: string;
  /** <title> для вкладки/выдачи (до ~60 симв.) */
  metaTitle: string;
  /** meta description (до ~155 симв.) */
  metaDescription: string;
  /** короткая подпись под H1 в каталоге */
  short: string;
  /** вводный абзац */
  intro: string | string[];
  /** что входит в услугу */
  includes: string[];
  /** содержательные блоки */
  sections: {heading: string; body: string | string[]; points?: string[]}[];
  /** пошаговый процесс для услуг, где он полезен */
  process?: {heading: string; steps: {title: string; body: string}[]};
  /** контекстная ссылка на связанный материал */
  guide?: {heading: string; body: string; anchor: string; path: string};
  /** ссылка на опубликованные примеры работ */
  reference?: {heading: string; body: string; anchor: string; path: string};
  /** только подтверждённые публичные показатели */
  trustPoints?: {value: string; label: string}[];
  /** локализованный финальный CTA */
  cta?: {title: string; text: string};
  /** вопрос-ответ (идёт и в FAQPage-разметку) */
  faq: {q: string; a: string}[];
  /** уточнённый видимый заголовок FAQ, если нужен */
  faqHeading?: string;
};

export type Service = {
  slug: string;
  /** путь к изображению в /public */
  image: string;
  /** schema.org serviceType */
  serviceType: string;
  de: ServiceLocaleContent;
  ru: ServiceLocaleContent;
  /** slug'и смежных услуг для перелинковки */
  related: string[];
};

export const SERVICES: Service[] = [
  {
    slug: 'trockenbau-halle',
    image: '/images/drywall.webp',
    serviceType: 'Trockenbau',
    related: ['wohnungsrenovierung-halle', 'badsanierung-halle', 'bodenbelaege-halle'],
    de: {
      title: 'Trockenbau in Halle (Saale)',
      metaTitle: 'Trockenbau Halle (Saale) – Wände, Decken & Dämmung | SorgfaltBau',
      metaDescription:
        'Trockenbau in Halle (Saale): Gipskartonwände, abgehängte Decken, Schall- und Wärmedämmung, Vorsatzschalen und Verspachtelung bis Q4. Sauber, termintreu, Festpreis nach Aufmaß. Jetzt kostenlos anfragen.',
      short: 'Gipskartonwände, abgehängte Decken, Dämmung und Verspachtelung.',
      intro:
        'Ob neue Raumaufteilung im Altbau, eine abgehängte Decke im Plattenbau oder besserer Schallschutz zwischen zwei Wohnungen – Trockenbau ist die schnelle, saubere und flexible Lösung. SorgfaltBau plant und montiert Trockenbau in Halle (Saale) und Umgebung fachgerecht: von der einzelnen Ständerwand bis zum kompletten Innenausbau einer Wohnung, auf Wunsch streichfertig übergeben.',
      includes: [
        'Gipskarton-Ständerwände und Raumteiler',
        'Vorsatzschalen für Leitungen und Installationen',
        'Abgehängte Decken und Akustikdecken',
        'Schall- und Wärmedämmung von Wand und Decke',
        'Feuchtraumplatten für Bad und Küche',
        'Brandschutzbekleidungen (auf Anfrage)',
        'Verspachtelung in Qualitätsstufe Q2 bis Q4',
        'Revisionsklappen, Aussparungen und Nischen',
        'Maler- und Spachtelarbeiten im Anschluss (optional)',
      ],
      sections: [
        {
          heading: 'Trockenbau für Halles Altbau und Plattenbau',
          body: 'Halle hat einen sehr unterschiedlichen Gebäudebestand – von Gründerzeitwohnungen mit hohen Decken in Stadtteilen wie dem Paulusviertel oder Giebichenstein bis zu Plattenbauten in Halle-Neustadt und der Silberhöhe. Genau hier spielt Trockenbau seine Stärke aus: Mit Gipskartonkonstruktionen lassen sich Räume neu aufteilen, hohe Altbaudecken abhängen oder Leitungen sauber verkleiden, ohne aufwendige Massivarbeiten. Unterkonstruktion, Plattentyp und Dämmung wählen wir passend zum Objekt.',
        },
        {
          heading: 'Schallschutz und Wärmedämmung',
          body: 'Gerade in Mehrfamilienhäusern und geteilten Altbauwohnungen ist Ruhe ein echtes Komfortmerkmal. Mit zweilagiger Beplankung, entkoppelten Profilen und Mineralwolle in der Wand verbessern wir den Schallschutz spürbar. An Außenwänden und Dachschrägen bringen wir zusätzlich Wärmedämmung ein – das senkt Heizkosten und beugt Feuchteproblemen vor.',
        },
        {
          heading: 'Verspachtelung bis streichfertig',
          body: 'Das sichtbare Ergebnis entscheidet sich beim Verspachteln. Wir arbeiten in der passenden Qualitätsstufe – von Q2 für normale Wandflächen bis Q4 für Flächen mit Streiflicht oder hochwertigen Anstrichen. Auf Wunsch übernehmen wir die anschließenden Maler- und Spachtelarbeiten direkt mit, sodass Sie eine fertige, gleichmäßige Fläche erhalten.',
        },
        {
          heading: 'Sauber arbeiten in bewohnten Wohnungen',
          body: 'Viele Aufträge laufen in Wohnungen, die während der Arbeiten weiter genutzt werden – oder die zwischen zwei Mietern schnell fertig werden müssen. Wir schützen Böden und Möbel mit Folie, halten Staub mit Abschottung und Absaugung zurück und hinterlassen den Arbeitsbereich täglich ordentlich.',
        },
        {
          heading: 'Ablauf und Angebot mit Festpreis',
          body: 'Nach einer kurzen Beschreibung oder Besichtigung machen wir ein Aufmaß und nennen Material, Aufbau und Termin nachvollziehbar. In der Regel erhalten Sie das Angebot innerhalb von 2 bis 5 Werktagen – bei klaren Arbeiten oft als Festpreis. So wissen Sie vor dem Start, woran Sie sind.',
        },
      ],
      faq: [
        {
          q: 'Wie lange dauert eine Trockenbauwand?',
          a: 'Eine einzelne Ständerwand steht meist an einem Tag. Mit beidseitiger zweilagiger Beplankung, Dämmung und mehrlagiger Verspachtelung sollten Sie je nach Fläche zwei bis vier Tage einplanen – Trocknungszeiten der Spachtelschichten inklusive.',
        },
        {
          q: 'Wie gut ist der Schallschutz von Gipskartonwänden?',
          a: 'Mit zweilagiger Beplankung, entkoppelter Unterkonstruktion und Mineralwolldämmung erreichen Trockenbauwände einen sehr guten Schallschutz, der für Wohnungen in der Regel ausreichend ist. Für besondere Anforderungen wählen wir Aufbau und Material gezielt aus.',
        },
        {
          q: 'Eignet sich Trockenbau auch fürs Badezimmer?',
          a: 'Ja. In Feucht- und Nassbereichen verwenden wir imprägnierte Feuchtraumplatten und dichten vor dem Fliesen fachgerecht ab. So ist Trockenbau auch im Bad oder in der Küche dauerhaft geeignet.',
        },
        {
          q: 'Übernehmen Sie auch das Verspachteln und Streichen?',
          a: 'Ja. Wir verspachteln in der gewünschten Qualitätsstufe von Q2 bis Q4 und übergeben streichfertig. Auf Wunsch führen wir die Maler- und Spachtelarbeiten direkt mit aus, sodass Sie alles aus einer Hand erhalten.',
        },
        {
          q: 'Arbeiten Sie auch in bewohnten Wohnungen?',
          a: 'Das ist bei uns Alltag. Wir schotten den Arbeitsbereich ab, begrenzen Staub und stimmen die Reihenfolge so ab, dass die Wohnung möglichst nutzbar bleibt – ideal auch für die zügige Vorbereitung vor einer Neuvermietung.',
        },
        {
          q: 'Können tragende Wände durch Trockenbau ersetzt werden?',
          a: 'Nein. Trockenbauwände sind nicht tragend. Wenn eine tragende Wand verändert oder ein Durchbruch nötig ist, gehört das zum Rohbau und erfordert eine statische Betrachtung – auch das übernehmen wir, getrennt vom Trockenbau.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen. Je nach Umfang und Termin arbeiten wir auch in Merseburg, Leipzig, Schkeuditz, Delitzsch und im nahen Umland.',
        },
      ],
    },
    ru: {
      title: 'Гипсокартон и сухое строительство в Halle (Saale)',
      metaTitle: 'Trockenbau Halle – гипсокартон, стены, потолки | SorgfaltBau',
      metaDescription:
        'Сухое строительство в Halle (Saale): перегородки и облицовки из гипсокартона, подвесные потолки, звуко- и теплоизоляция, шпаклёвка до Q4. Чисто, в срок, с фиксированной ценой после замера.',
      short: 'Перегородки, подвесные потолки, изоляция и шпаклёвка.',
      intro:
        'Новая планировка в старом доме (Altbau), подвесной потолок в панельном доме или звукоизоляция между квартирами — гипсокартон даёт быстрое, чистое и гибкое решение. SorgfaltBau проектирует и монтирует Trockenbau в Halle (Saale) и окрестностях профессионально: от одной перегородки до полной внутренней отделки квартиры, при желании — сразу под покраску.',
      includes: [
        'Каркасные перегородки и зонирование',
        'Облицовки для труб и коммуникаций',
        'Подвесные и акустические потолки',
        'Звуко- и теплоизоляция стен и потолков',
        'Влагостойкие плиты для ванной и кухни',
        'Противопожарные обшивки (по запросу)',
        'Шпаклёвка уровней Q2–Q4',
        'Ревизионные люки, ниши и проёмы',
        'Малярные работы следом (по желанию)',
      ],
      sections: [
        {
          heading: 'Гипсокартон для Altbau и панельных домов Halle',
          body: 'В Halle очень разная застройка — от квартир грюндерзайт с высокими потолками в районах Paulusviertel и Giebichenstein до панельных домов в Halle-Neustadt и Silberhöhe. Здесь гипсокартон особенно силён: перепланировка, подшивка высоких потолков, аккуратная зашивка коммуникаций — без тяжёлых капитальных работ. Каркас, тип плит и изоляцию подбираем под конкретный объект.',
        },
        {
          heading: 'Звуко- и теплоизоляция',
          body: 'В многоквартирных и разделённых старых домах тишина — реальный комфорт. Двойная обшивка, развязанные профили и минвата заметно улучшают звукоизоляцию. На наружных стенах и мансардах добавляем тепловую изоляцию — это снижает расходы на отопление и предотвращает проблемы с влагой.',
        },
        {
          heading: 'Шпаклёвка под покраску',
          body: 'Видимый результат решается на шпаклёвке. Работаем в нужном уровне — от Q2 для обычных стен до Q4 для поверхностей под скользящим светом и качественной покраской. По желанию сразу выполняем малярные работы, и вы получаете готовую ровную поверхность.',
        },
        {
          heading: 'Чисто в жилых квартирах',
          body: 'Часто работаем там, где продолжают жить, или где квартиру нужно быстро подготовить между арендаторами. Защищаем полы и мебель плёнкой, отсекаем зону и удерживаем пыль пылеудалением, ежедневно оставляем участок в порядке.',
        },
        {
          heading: 'Порядок работ и смета с фиксированной ценой',
          body: 'После короткого описания или осмотра делаем замер и понятно называем материал, конструкцию и срок. Смету обычно даём за 2–5 рабочих дней, по простым работам — часто фиксированной ценой. Вы знаете условия до старта.',
        },
      ],
      faq: [
        {
          q: 'Сколько делается перегородка?',
          a: 'Одна перегородка обычно встаёт за день. С двусторонней двойной обшивкой, изоляцией и многослойной шпаклёвкой — от двух до четырёх дней с учётом высыхания.',
        },
        {
          q: 'Насколько хороша звукоизоляция гипсокартона?',
          a: 'С двойной обшивкой, развязанным каркасом и минватой перегородки дают очень хорошую звукоизоляцию, которой для квартир обычно достаточно. Под особые требования подбираем конструкцию и материал отдельно.',
        },
        {
          q: 'Подходит ли гипсокартон для ванной?',
          a: 'Да. В мокрых зонах используем влагостойкие плиты и выполняем гидроизоляцию перед укладкой плитки. Так гипсокартон надёжно служит и в ванной, и на кухне.',
        },
        {
          q: 'Делаете ли шпаклёвку и покраску?',
          a: 'Да. Шпаклюем до нужного уровня Q2–Q4 и сдаём под покраску. По желанию выполняем малярные работы сразу — всё из одних рук.',
        },
        {
          q: 'Работаете в жилых квартирах?',
          a: 'Это обычная практика. Отсекаем зону работ, ограничиваем пыль и согласуем порядок так, чтобы квартирой можно было пользоваться — удобно и для быстрой подготовки к сдаче.',
        },
        {
          q: 'Можно ли заменить несущую стену гипсокартоном?',
          a: 'Нет. Перегородки из гипсокартона не несущие. Если нужно изменить несущую стену или сделать проём — это уже капитальные работы с расчётом нагрузок. Их мы тоже выполняем, отдельно от гипсокартона.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми стадтайлями. По объёму и срокам — также Merseburg, Leipzig, Schkeuditz, Delitzsch и ближайшие окрестности.',
        },
      ],
    },
  },

  {
    slug: 'rohbau-halle',
    image: '/images/rohbau-massivbau-halle.webp',
    serviceType: 'Rohbau und Massivbau',
    related: ['fassadendaemmung-halle', 'pflasterarbeiten-halle', 'dachsanierung-halle'],
    de: {
      title: 'Rohbau und Massivbau in Halle (Saale)',
      metaTitle: 'Rohbau Halle (Saale) – Massivbau, Mauerwerk, Durchbrüche | SorgfaltBau',
      metaDescription:
        'Rohbau und Massivbau in Halle (Saale): Mauerwerk aus Ziegel und Beton, Garagen und Nebengebäude, Wanddurchbrüche mit Sturz, Stahl- und Metallarbeiten. Realistische Planung, klare Termine. Jetzt anfragen.',
      short: 'Massivbau aus Ziegel und Beton, Garagen, Durchbrüche.',
      intro:
        'Tragende Wände, ein neues Nebengebäude, eine Garage oder ein Durchbruch in einer Altbauwohnung – beim Rohbau zählen eine realistische Planung und eine saubere Ausführung, auf der spätere Gewerke aufbauen können. SorgfaltBau übernimmt Rohbau- und Massivbauarbeiten in Halle (Saale) und Umgebung: vom einzelnen Mauerwerksabschnitt bis zum schlüsselfertigen Nebengebäude.',
      includes: [
        'Massivbau aus Ziegel, Kalksandstein und Beton',
        'Garagen, Carports und Nebengebäude',
        'Tragende Wände und Mauerwerk',
        'Wanddurchbrüche mit Sturz und Abfangung',
        'Stahlträger und Metallkonstruktionen',
        'Schweißarbeiten vor Ort',
        'Bögen sowie Stütz- und Gartenmauern',
        'Aussparungen, Schlitze und Anpassungen im Bestand',
      ],
      sections: [
        {
          heading: 'Massivbau mit klarer Ablaufplanung',
          body: 'Beim Rohbau entscheiden Untergrund, Statik, Material und Reihenfolge über das Ergebnis. Wir prüfen die Bedingungen vor Ort in Halle (Saale) und Umgebung, stimmen die Arbeitsschritte ab und führen Mauerwerk aus Ziegel, Kalksandstein oder Beton so aus, dass nachfolgende Gewerke wie Putz, Trockenbau oder Estrich sauber darauf aufbauen können.',
        },
        {
          heading: 'Durchbrüche in Halles Altbau',
          body: 'In Gründerzeithäusern, etwa im Paulusviertel oder in Giebichenstein, sind nachträgliche Durchbrüche ein häufiger Wunsch – für offene Küchen, neue Türen oder mehr Licht. Bei tragenden Wänden setzen wir Stürze und Abfangungen fachgerecht, in Abstimmung mit der erforderlichen statischen Betrachtung. So bleibt die Konstruktion sicher.',
        },
        {
          heading: 'Garagen und Nebengebäude',
          body: 'Ob massive Garage, Geräteschuppen oder ein kleines Nebengebäude im Umland – wir übernehmen den Rohbau von der Gründung bis zum fertigen Mauerwerk. Material, Maße und Ablauf stimmen wir vorab ab, damit das Ergebnis tragfähig und langlebig ist.',
        },
        {
          heading: 'Stahl-, Schweiß- und Metallarbeiten',
          body: 'Wo Mauerwerk allein nicht reicht, ergänzen wir Stahlträger, Unterzüge und Metallkonstruktionen – inklusive Schweißarbeiten direkt auf der Baustelle. Das ist besonders bei Abfangungen, größeren Öffnungen und tragenden Anpassungen im Bestand wichtig.',
        },
        {
          heading: 'Statik und Genehmigungen – ehrlich eingeordnet',
          body: 'Wir weisen frühzeitig darauf hin, wenn ein statischer Nachweis oder eine Genehmigung nötig ist, und planen den Ablauf entsprechend. Die Prüfung und Freigabe erfolgt durch die zuständigen Fachstellen – wir führen die Arbeiten passend dazu aus, statt etwas zu versprechen, das nicht abgesichert ist.',
        },
      ],
      faq: [
        {
          q: 'Darf man eine tragende Wand einfach durchbrechen?',
          a: 'Nein, nicht ohne statische Betrachtung. Bei tragenden Wänden ist eine Abfangung mit Sturz oder Stahlträger nötig, in der Regel mit statischem Nachweis. Wir sagen Ihnen vor Beginn, was Ihr Vorhaben erfordert, und führen den Durchbruch dann sicher aus.',
        },
        {
          q: 'Kümmern Sie sich um Statik und Genehmigungen?',
          a: 'Wir erkennen frühzeitig, wann ein Statiker oder eine Genehmigung gebraucht wird, und stimmen den Ablauf darauf ab. Die Nachweise selbst erstellen die zuständigen Fachplaner; die Bauausführung übernehmen wir.',
        },
        {
          q: 'Wie lange dauert der Bau einer Garage?',
          a: 'Das hängt von Größe, Gründung und Material ab. Eine massive Einzelgarage liegt im Rohbau meist im Bereich weniger Wochen. Nach der Besichtigung nennen wir ein belastbares Zeitfenster.',
        },
        {
          q: 'Übernehmen Sie auch kleine Massivbauarbeiten?',
          a: 'Ja. Vom einzelnen Durchbruch, einer Mauer oder Aussparung bis zum kompletten Nebengebäude – wir besprechen Umfang und Reihenfolge vorab und arbeiten auch an kleineren Abschnitten.',
        },
        {
          q: 'Arbeiten Sie auch im bewohnten Bestand?',
          a: 'Ja. Durchbrüche und Anpassungen setzen wir auch in bewohnten Wohnungen um – mit Staubschutz, Abschottung und Rücksicht auf die angrenzenden Räume.',
        },
        {
          q: 'Welche Materialien verwenden Sie?',
          a: 'Je nach Anforderung Ziegel, Kalksandstein oder Beton, bei tragenden Ergänzungen auch Stahl. Die Wahl richtet sich nach Statik, Bauphysik und Ihrem Vorhaben.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) und das nahe Umland – darunter Merseburg, Leipzig, Schkeuditz, Landsberg und Kabelsketal. Größere Vorhaben prüfen wir auch darüber hinaus.',
        },
      ],
    },
    ru: {
      title: 'Коробка и капитальные работы в Halle (Saale)',
      metaTitle: 'Rohbau Halle – кладка, проёмы, металлоконструкции | SorgfaltBau',
      metaDescription:
        'Возведение коробки и капитальные работы в Halle (Saale): кладка из кирпича и бетона, гаражи и хозпостройки, проёмы в несущих стенах с перемычкой, металлоконструкции и сварка. Оставьте заявку.',
      short: 'Кладка из кирпича и бетона, гаражи, проёмы.',
      intro:
        'Несущие стены, новая хозпостройка, гараж или проём в старой квартире — в капитальных работах важны реалистичный план и аккуратное исполнение, на котором держатся последующие этапы. SorgfaltBau выполняет работы по возведению коробки в Halle (Saale) и окрестностях: от отдельного участка кладки до хозпостройки под ключ.',
      includes: [
        'Кладка из кирпича, силиката и бетона',
        'Гаражи, навесы и хозпостройки',
        'Несущие стены и кладка',
        'Проёмы в стенах с перемычкой и разгрузкой',
        'Стальные балки и металлоконструкции',
        'Сварочные работы на объекте',
        'Арки, подпорные и садовые стены',
        'Штробы, ниши и переделки в существующем здании',
      ],
      sections: [
        {
          heading: 'Капитальные работы с чётким планом',
          body: 'Результат определяют основание, расчёт нагрузок, материал и порядок работ. Оцениваем условия на месте в Halle (Saale) и окрестностях, согласуем этапы и ведём кладку из кирпича, силиката или бетона так, чтобы штукатурка, гипсокартон и стяжка ложились на неё без проблем.',
        },
        {
          heading: 'Проёмы в старых домах Halle',
          body: 'В домах грюндерзайт, например в Paulusviertel или Giebichenstein, часто нужны новые проёмы — под открытую кухню, дверь или больше света. В несущих стенах ставим перемычки и разгрузку по правилам, в связке с необходимым расчётом нагрузок. Конструкция остаётся безопасной.',
        },
        {
          heading: 'Гаражи и хозпостройки',
          body: 'Капитальный гараж, сарай для инструмента или небольшая постройка в пригороде — берём коробку от основания до готовой кладки. Материал, размеры и порядок согласуем заранее, чтобы результат был прочным и долговечным.',
        },
        {
          heading: 'Сталь, сварка и металлоконструкции',
          body: 'Где одной кладки мало, добавляем стальные балки, прогоны и металлоконструкции — со сваркой прямо на объекте. Это особенно важно при разгрузках, больших проёмах и несущих переделках.',
        },
        {
          heading: 'Расчёт и разрешения — честно',
          body: 'Заранее предупреждаем, если нужен расчёт нагрузок или разрешение, и выстраиваем процесс соответственно. Сами расчёты и согласования — за профильными специалистами и инстанциями; мы выполняем работы под них, а не обещаем непроверенного.',
        },
      ],
      faq: [
        {
          q: 'Можно ли просто пробить несущую стену?',
          a: 'Нет, без расчёта нельзя. В несущей стене нужна разгрузка с перемычкой или стальной балкой и, как правило, расчёт нагрузок. До начала скажем, что требует ваш случай, и сделаем проём безопасно.',
        },
        {
          q: 'Решаете ли вопросы расчёта и разрешений?',
          a: 'Заранее видим, когда нужен инженер-расчётчик или разрешение, и подстраиваем процесс. Сами расчёты делают профильные специалисты; исполнение берём на себя.',
        },
        {
          q: 'Сколько строится гараж?',
          a: 'Зависит от размера, основания и материала. Капитальный одиночный гараж по коробке обычно занимает несколько недель. После осмотра назовём реальный срок.',
        },
        {
          q: 'Беретесь ли за небольшие объёмы?',
          a: 'Да. От одного проёма, стены или ниши до целой хозпостройки — обсуждаем объём и порядок заранее и работаем и на малых участках.',
        },
        {
          q: 'Работаете в жилом фонде?',
          a: 'Да. Проёмы и переделки делаем и в жилых квартирах — с защитой от пыли, отсечкой зоны и вниманием к соседним помещениям.',
        },
        {
          q: 'Какие материалы используете?',
          a: 'По задаче — кирпич, силикатный блок или бетон, для несущих усилений сталь. Выбор зависит от расчёта, физики здания и вашего проекта.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) и ближайшие окрестности: Merseburg, Leipzig, Schkeuditz, Landsberg, Kabelsketal. Крупные проекты рассматриваем и дальше.',
        },
      ],
    },
  },

  {
    slug: 'fassadendaemmung-halle',
    image: '/images/facade.webp',
    serviceType: 'Fassadenarbeiten und Dämmung',
    related: ['rohbau-halle', 'dachsanierung-halle', 'wohnungsrenovierung-halle'],
    de: {
      title: 'Fassadenarbeiten und Dämmung in Halle (Saale)',
      metaTitle: 'Fassadendämmung Halle (Saale) – WDVS, Putz, Anstrich | SorgfaltBau',
      metaDescription:
        'Fassadenarbeiten und Wärmedämmung (WDVS) in Halle (Saale): Dämmung, Armierung, Ober- und Unterputz, Fassadenanstrich und Risssanierung. Heizkosten senken, Bausubstanz schützen. Jetzt anfragen.',
      short: 'WDVS, Armierung, Putz und Fassadenanstrich.',
      intro:
        'Eine fachgerecht gedämmte Fassade senkt die Heizkosten spürbar, schützt das Mauerwerk vor Witterung und wertet das ganze Gebäude auf. SorgfaltBau übernimmt Fassadenarbeiten in Halle (Saale) und Umgebung – von der Dämmung über Armierung und Putz bis zum fertigen Anstrich, abgestimmt auf den Bestand, ob Einfamilienhaus, Altbau oder Mehrfamilienhaus.',
      includes: [
        'Wärmedämm-Verbundsystem (WDVS) mit EPS oder Mineralwolle',
        'Armierung mit Gewebeeinbettung',
        'Ober- und Unterputz (Kratz-, Scheiben- oder Reibeputz)',
        'Fassadenanstrich und Egalisierung',
        'Sockeldämmung und Perimeterbereich',
        'Riss- und Putzsanierung im Bestand',
        'Wärmedämmung von Schornsteinen',
        'Ausbesserung einzelner Schadstellen und Teilflächen',
      ],
      sections: [
        {
          heading: 'Vom Untergrund bis zum Anstrich',
          body: 'Eine dauerhafte Fassade entsteht in der richtigen Reihenfolge. Wir prüfen Untergrund und Zustand, wählen das passende System und führen Dämmung, Armierung, Putz und Anstrich Schicht für Schicht aus. Trocknungszeiten und Witterung in Halle planen wir realistisch ein, damit das Ergebnis wetterfest und rissarm bleibt.',
        },
        {
          heading: 'Dämmung, die zu Halles Gebäuden passt',
          body: 'Halle reicht vom Gründerzeit-Altbau in der Innenstadt bis zu den Plattenbauten in Halle-Neustadt. Nicht jede Fassade verträgt dasselbe System: Bei Stuck- und Schmuckfassaden oder unter Denkmalschutz ist eine Außendämmung oft nur eingeschränkt möglich – hier beraten wir zu Alternativen. Bei verputzten Fassaden und Plattenbauten ist ein WDVS meist die wirtschaftlichste Lösung.',
        },
        {
          heading: 'Energie sparen und Förderung nutzen',
          body: 'Eine Fassadendämmung gehört zu den wirksamsten Maßnahmen, um Heizenergie zu sparen. Energetische Sanierungen können grundsätzlich förderfähig sein; über aktuelle Programme entscheiden BAFA und KfW. Wir führen die Arbeiten so aus, dass sie zu den technischen Anforderungen passen, und stimmen den Ablauf mit Ihnen ab.',
        },
        {
          heading: 'Risse, Schäden und Teilflächen',
          body: 'Nicht jede Fassade braucht gleich ein Komplettsystem. Oft genügt es, Risse zu sanieren, Putz auszubessern oder eine Teilfläche neu zu beschichten. Wir schauen, was tatsächlich nötig ist, und empfehlen die wirtschaftlich sinnvolle Lösung statt der teuersten.',
        },
        {
          heading: 'Material und Kosten vorab nachvollziehbar',
          body: 'Sie erhalten eine klare Einschätzung zu Dämmstoff, Dämmstärke, Putzart, Gerüst und Terminfenster. Bei den meisten Fassaden ist ein belastbares Angebot nach Besichtigung möglich – ohne versteckte Überraschungen während der Ausführung.',
        },
      ],
      faq: [
        {
          q: 'Welche Dämmstärke ist sinnvoll?',
          a: 'Das hängt von Wandaufbau, Zielwerten und Budget ab. Üblich sind bei WDVS Stärken im Bereich von etwa 12 bis 18 cm. Wir empfehlen eine praktikable Stärke nach Bestandssituation und erklären die Auswirkungen auf Kosten und Einsparung vor dem Start.',
        },
        {
          q: 'EPS oder Mineralwolle – was ist besser?',
          a: 'Beides hat seine Berechtigung. EPS ist wirtschaftlich und verbreitet, Mineralwolle ist nicht brennbar und diffusionsoffener. Welches System passt, hängt von Brandschutz, Gebäudehöhe und Bauphysik ab – das klären wir bei der Beratung.',
        },
        {
          q: 'Ist bei Altbau und Denkmalschutz eine Dämmung möglich?',
          a: 'Nicht immer als klassische Außendämmung. Bei Stuck- oder Schmuckfassaden und unter Denkmalschutz prüfen wir Alternativen wie Innendämmung oder eine reine Putz- und Anstrichsanierung. Wir sagen ehrlich, was sinnvoll und zulässig ist.',
        },
        {
          q: 'Gibt es Förderung für die Fassadendämmung?',
          a: 'Energetische Maßnahmen können förderfähig sein, die Programme und Bedingungen ändern sich jedoch und werden von BAFA und KfW geregelt. Wir führen die Arbeiten technisch passend aus; die Förderprüfung läuft über die offiziellen Stellen oder einen Energieberater.',
        },
        {
          q: 'Wie lange dauern Fassadenarbeiten?',
          a: 'Je nach Fläche, System und Wetter meist von einigen Tagen bis zu wenigen Wochen. Trocknungszeiten zwischen den Schichten und die Witterung planen wir mit ein, damit die Qualität stimmt.',
        },
        {
          q: 'Welche Jahreszeit eignet sich?',
          a: 'Putz- und Dämmarbeiten brauchen frostfreie, nicht zu nasse Bedingungen – meist von Frühjahr bis Herbst. Wir wählen ein passendes Zeitfenster und reagieren flexibel auf das Wetter in der Region.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig und das nahe Umland. Größere Fassadenprojekte prüfen wir auch darüber hinaus.',
        },
      ],
    },
    ru: {
      title: 'Фасадные работы и утепление в Halle (Saale)',
      metaTitle: 'Утепление фасада Halle – WDVS, штукатурка, покраска | SorgfaltBau',
      metaDescription:
        'Фасадные работы и утепление (WDVS) в Halle (Saale): утепление, армирование, штукатурка и покраска фасада, ремонт трещин. Меньше расходов на отопление, защита здания. Оставьте заявку.',
      short: 'WDVS, армирование, штукатурка и покраска фасада.',
      intro:
        'Грамотно утеплённый фасад заметно снижает расходы на отопление, защищает кладку от погоды и преображает всё здание. SorgfaltBau выполняет фасадные работы в Halle (Saale) и окрестностях: от утепления, армирования и штукатурки до финишной покраски — с учётом типа здания, будь то частный дом, Altbau или многоквартирный дом.',
      includes: [
        'Система утепления WDVS (EPS или минвата)',
        'Армирование с утоплением сетки',
        'Базовая и финишная штукатурка (декоративная)',
        'Покраска и выравнивание фасада',
        'Утепление цоколя и приямка',
        'Ремонт трещин и штукатурки',
        'Утепление дымоходов',
        'Ремонт отдельных участков и повреждений',
      ],
      sections: [
        {
          heading: 'От основания до покраски',
          body: 'Долговечный фасад делается в правильном порядке. Проверяем основание и состояние, подбираем систему и выполняем утепление, армирование, штукатурку и покраску слой за слоем. Время высыхания и погоду в Halle закладываем реалистично, чтобы результат был стойким к погоде и без трещин.',
        },
        {
          heading: 'Утепление под застройку Halle',
          body: 'Halle — это и грюндерзайт в центре, и панельные дома в Halle-Neustadt. Не каждый фасад терпит одну систему: на лепных и декоративных фасадах или под охраной памятников наружное утепление часто ограничено — здесь предлагаем альтернативы. На оштукатуренных фасадах и панельных домах WDVS обычно самое выгодное решение.',
        },
        {
          heading: 'Экономия энергии и субсидии',
          body: 'Утепление фасада — одна из самых эффективных мер экономии тепла. Энергетические работы в принципе могут субсидироваться; по актуальным программам решают BAFA и KfW. Мы выполняем работы под технические требования и согласуем порядок с вами.',
        },
        {
          heading: 'Трещины, повреждения и участки',
          body: 'Не каждому фасаду нужна полная система. Часто достаточно отремонтировать трещины, подлатать штукатурку или заново покрыть участок. Смотрим, что реально нужно, и советуем разумное по деньгам решение, а не самое дорогое.',
        },
        {
          heading: 'Материал и стоимость понятны заранее',
          body: 'Вы получаете чёткую оценку по утеплителю, толщине, типу штукатурки, лесам и срокам. По большинству фасадов надёжная смета возможна после осмотра — без скрытых сюрпризов в ходе работ.',
        },
      ],
      faq: [
        {
          q: 'Какая толщина утепления нужна?',
          a: 'Зависит от конструкции стены, целей и бюджета. Для WDVS обычны толщины примерно 12–18 см. Рекомендуем практичную толщину по факту и объясняем влияние на стоимость и экономию до начала.',
        },
        {
          q: 'EPS или минвата — что лучше?',
          a: 'У обоих есть смысл. EPS экономичен и распространён, минвата негорючая и более паропроницаемая. Что подойдёт — зависит от пожарных требований, высоты здания и физики. Обсудим на консультации.',
        },
        {
          q: 'Можно ли утеплять Altbau и памятники?',
          a: 'Не всегда классическим наружным утеплением. На лепных фасадах и под охраной памятников рассматриваем альтернативы — внутреннее утепление или только ремонт штукатурки и покраску. Честно говорим, что разумно и допустимо.',
        },
        {
          q: 'Есть ли субсидии на утепление фасада?',
          a: 'Энергетические меры могут субсидироваться, но программы и условия меняются и регулируются BAFA и KfW. Мы делаем работы технически правильно; проверка субсидий — через официальные органы или энергоконсультанта.',
        },
        {
          q: 'Сколько идут фасадные работы?',
          a: 'В зависимости от площади, системы и погоды — от нескольких дней до пары недель. Время высыхания между слоями и погоду учитываем, чтобы качество не страдало.',
        },
        {
          q: 'Какое время года подходит?',
          a: 'Штукатурке и утеплению нужны без морозов и не слишком сырые условия — обычно с весны по осень. Подбираем подходящее окно и гибко реагируем на погоду в регионе.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми стадтайлями, плюс Merseburg, Leipzig и ближайшие окрестности. Крупные фасадные проекты рассматриваем и дальше.',
        },
      ],
    },
  },

  {
    slug: 'badsanierung-halle',
    image: '/images/bathroom.webp',
    serviceType: 'Badsanierung',
    related: ['wohnungsrenovierung-halle', 'trockenbau-halle', 'bodenbelaege-halle'],
    de: {
      title: 'Badsanierung in Halle (Saale)',
      metaTitle: 'Badsanierung Halle | Badrenovierung & Komplettbad | SorgfaltBau',
      metaDescription:
        'Badsanierung und Badrenovierung in Halle (Saale): Demontage, Abdichtung, Fliesen, Trockenbau und Montage koordiniert aus einer Hand. Jetzt anfragen.',
      short: 'Badsanierung und Badrenovierung koordiniert aus einer Hand.',
      intro: [
        'Ob komplette Badsanierung, Badrenovierung oder gezielter Umbau einzelner Bereiche: In einem Badezimmer müssen Demontage, Leitungen, Abdichtung, Trockenbau, Fliesen und Montage genau aufeinander abgestimmt sein. SorgfaltBau saniert Bäder in Halle (Saale) und koordiniert die notwendigen Schritte aus einer Hand – vom kompakten Altbaubad bis zur bodengleichen, barrierearmen Dusche.',
        'Vor Beginn prüfen wir den vorhandenen Zustand, besprechen Nutzung und Ausstattung und legen fest, welche Arbeiten tatsächlich notwendig sind.',
      ],
      includes: [
        'Demontage, Abbruch und Entsorgung',
        'Sanitärinstallation innen (Zu- und Ableitungen)',
        'Sorgfältige Abdichtung im Nassbereich',
        'Wand- und Bodenfliesen',
        'Trockenbau, Vorwandinstallation und abgehängte Decke',
        'Montage von WC, Waschtisch, Dusche und Wanne',
        'Bodengleiche oder schwellenarme Dusche, sofern technisch möglich',
        'Maler- und Anschlussarbeiten',
        'Koordination der Elektroanschlüsse mit einem entsprechenden Fachbetrieb',
      ],
      sections: [
        {
          heading: 'Badsanierung oder Badrenovierung – was ist der Unterschied?',
          body: [
            'Bei einer Badrenovierung stehen häufig sichtbare Veränderungen im Vordergrund, zum Beispiel neue Fliesen, Sanitärobjekte, Oberflächen oder eine neue Dusche. Eine Badsanierung geht in der Regel weiter und kann auch Leitungen, Abdichtung, Untergründe oder den Aufbau von Wand und Boden betreffen.',
            'In der Praxis überschneiden sich beide Begriffe häufig. Deshalb prüfen wir vor Ort, welche Maßnahmen für das vorhandene Bad tatsächlich sinnvoll sind.',
          ],
        },
        {
          heading: 'Komplettsanierung oder Teilsanierung des Badezimmers?',
          body: [
            'Nicht jedes Bad muss vollständig entkernt werden. Wenn Leitungen, Untergrund und vorhandene Bereiche technisch in Ordnung sind, kann je nach Ziel auch eine Teilsanierung sinnvoll sein.',
            'Bei einer Komplettsanierung werden Demontage, Leitungen, Trockenbau oder Vorwand, Abdichtung, Wand- und Bodenflächen, Fliesen, Sanitärobjekte sowie Montage und Abschlussarbeiten aufeinander abgestimmt. Welche Variante sinnvoll ist, entscheiden wir nach Besichtigung des vorhandenen Bades.',
          ],
          points: [
            'Dusche erneuern',
            'Badewanne ersetzen',
            'Einzelne Sanitärobjekte austauschen',
            'Teilbereiche neu fliesen',
            'Beschädigte Bereiche instand setzen',
          ],
        },
        {
          heading: 'Was kostet eine Badsanierung in Halle?',
          body: [
            'Die Kosten einer Badsanierung hängen nicht allein von der Größe des Badezimmers ab. Entscheidend sind der vorhandene Zustand, notwendige Demontage, Leitungsarbeiten, Abdichtung, Untergründe, Fliesen, Sanitärobjekte und der gewünschte Ausstattungsstandard.',
            'Eine Teilsanierung mit neuer Dusche wird anders kalkuliert als ein komplett entkerntes Badezimmer mit neuen Leitungen, Vorwandinstallation und vollständiger Neuverfliesung. Nach der Besichtigung können wir den tatsächlichen Umfang einschätzen und ein nachvollziehbares Angebot erstellen.',
          ],
          points: [
            'Größe des Badezimmers',
            'Zustand der Leitungen',
            'Umfang der Demontage',
            'Zustand von Wand und Boden',
            'Abdichtung und Untergrund',
            'Fliesen und Format',
            'Dusche, Wanne, WC und Waschtisch',
            'Gewünschte Ausstattung',
            'Grundrissänderungen',
            'Zugänglichkeit des Bades',
          ],
        },
        {
          heading: 'Abdichtung im Bad – entscheidend für den Nassbereich',
          body: 'Wand- und Bodenanschlüsse sowie beanspruchte Nassbereiche werden sorgfältig vorbereitet und abgedichtet, bevor die Fliesenarbeiten beginnen. Eine sorgfältig ausgeführte Abdichtung reduziert das Risiko von Feuchteschäden und ist eine wichtige Grundlage für langlebige Wand- und Bodenflächen.',
        },
        {
          heading: 'Kleine Bäder, Altbau und Plattenbau in Halle',
          body: [
            'In Halle treffen unterschiedliche Gebäudetypen aufeinander: Gründerzeitwohnungen mit älteren Installationen ebenso wie kompakte Badezimmer in Halle-Neustadt und anderen Plattenbaugebieten. Deshalb lässt sich nicht jedes Bad nach demselben Schema planen. Das gilt ebenso für Bestandswohnungen im Paulusviertel, in Giebichenstein oder Trotha.',
            'Gerade bei kleinen Badezimmern sind die Position von Dusche, WC und Waschtisch, ausreichende Bewegungsflächen und sinnvoller Stauraum entscheidend.',
          ],
        },
        {
          heading: 'Bodengleiche Dusche und barrierearmer Badumbau',
          body: [
            'Eine bodengleiche oder möglichst schwellenarme Dusche kann den Einstieg erleichtern und den Nutzungskomfort deutlich verbessern. Ob eine vollständig bodengleiche Lösung im Bestand möglich ist, hängt unter anderem von Aufbauhöhe, Leitungsführung und Entwässerung ab.',
            'Bei der Besichtigung prüfen wir die vorhandenen Voraussetzungen und besprechen eine technisch passende, barrierearme oder altersgerechte Lösung.',
          ],
        },
        {
          heading: 'Fliesen, Sanitärobjekte und Ausstattung auswählen',
          body: [
            'Optik und Budget werden stark durch Fliesen, Armaturen und Sanitärobjekte beeinflusst. Auf Wunsch übernehmen wir die Materialbeschaffung oder arbeiten mit bereits ausgewählten Produkten.',
            'Vor der Bestellung prüfen wir, welche Formate und Produkte zur vorhandenen Situation und zum geplanten Aufbau passen.',
          ],
        },
        {
          heading: 'Bad vor einer Neuvermietung modernisieren',
          body: [
            'Bei Mietwohnungen muss nicht immer die maximal aufwendige Lösung gewählt werden. Entscheidend sind ein technisch ordentlicher Zustand, pflegeleichte Oberflächen und eine saubere, übergabefähige Ausführung.',
            'Nach der Besichtigung stimmen wir den Umfang auf Zustand, Nutzung und geplante Neuvermietung ab.',
          ],
        },
      ],
      process: {
        heading: 'So läuft eine Badsanierung mit SorgfaltBau ab',
        steps: [
          {
            title: 'Anfrage und Fotos',
            body: 'Sie beschreiben kurz den aktuellen Zustand und Ihre Wünsche. Fotos helfen bei der ersten Einschätzung.',
          },
          {
            title: 'Besichtigung und Aufmaß',
            body: 'Wir prüfen Raum, vorhandene Anschlüsse, Untergründe und die geplante Nutzung.',
          },
          {
            title: 'Planung und Angebot',
            body: 'Wir stimmen Leistungsumfang, Materialien, Ausstattung, Reihenfolge und ein realistisches Zeitfenster ab.',
          },
          {
            title: 'Demontage und Vorbereitung',
            body: 'Alte Sanitärobjekte und betroffene Oberflächen werden entsprechend dem vereinbarten Umfang entfernt.',
          },
          {
            title: 'Ausbau und Montage',
            body: 'Sanitärarbeiten, Trockenbau, Abdichtung, Fliesen und Montage werden sinnvoll aufeinander abgestimmt.',
          },
          {
            title: 'Übergabe',
            body: 'Nach Abschluss prüfen wir die ausgeführten Arbeiten gemeinsam und übergeben das Bad ordentlich.',
          },
        ],
      },
      guide: {
        heading: 'Ratgeber zur Badsanierung',
        body: 'Mehr zu Kostenfaktoren, Ablauf, Dauer und Planung finden Sie in unserem Ratgeber.',
        anchor: 'Badsanierung in Halle: Kosten, Ablauf und Dauer richtig planen',
        path: '/news/badsanierung-halle-kosten-ablauf-dauer',
      },
      reference: {
        heading: 'Badezimmer-Referenzen aus der Praxis',
        body: 'In unserer Galerie finden Sie veröffentlichte Fotos ausgeführter Badezimmerarbeiten von SorgfaltBau.',
        anchor: 'Badezimmer-Projekte in der Galerie ansehen',
        path: '/galerie',
      },
      trustPoints: [
        {value: '10+', label: 'Jahre praktische Erfahrung'},
        {value: '200+', label: 'umgesetzte Aufgaben von Innenarbeiten bis Außenflächen'},
        {value: 'Direkt', label: 'ein Ansprechpartner für die abgestimmten Arbeitsschritte'},
        {value: 'Halle', label: 'Schwerpunkt Halle (Saale) und Umgebung'},
      ],
      faq: [
        {
          q: 'Was kostet eine Badsanierung in Halle?',
          a: 'Die Kosten hängen von Größe, Zustand, Leitungen, notwendiger Demontage, Abdichtung, Fliesen und Ausstattung ab. Nach der Besichtigung lässt sich der Umfang realistisch kalkulieren.',
        },
        {
          q: 'Wie lange dauert eine Badsanierung?',
          a: 'Die Dauer hängt von Größe, Zustand, Leistungsumfang und Materialverfügbarkeit ab. Nach der Besichtigung nennen wir ein realistisches Zeitfenster.',
        },
        {
          q: 'Was ist der Unterschied zwischen Badsanierung und Badrenovierung?',
          a: 'Eine Badrenovierung betrifft häufig sichtbare Oberflächen und Sanitärobjekte. Bei einer Badsanierung können zusätzlich Leitungen, Abdichtung, Untergründe sowie Wand- und Bodenaufbau erneuert werden. Welche Maßnahmen nötig sind, zeigt die Bestandsprüfung.',
        },
        {
          q: 'Ist auch eine Teilsanierung möglich?',
          a: 'Ja. Je nach Zustand können wir zum Beispiel eine Dusche erneuern, einzelne Sanitärobjekte austauschen, Teilbereiche neu fliesen oder beschädigte Bereiche instand setzen.',
        },
        {
          q: 'Ist eine bodengleiche Dusche in einem Altbau möglich?',
          a: 'Das hängt von Aufbauhöhe, Leitungsführung und Entwässerung ab. Wir prüfen die vorhandene Situation vor Ort und besprechen eine technisch passende Lösung.',
        },
        {
          q: 'Kann ich eigene Fliesen oder Sanitärobjekte kaufen?',
          a: 'Ja. Auf Wunsch arbeiten wir mit bereits ausgewählten Produkten oder übernehmen die Materialbeschaffung. Vor der Bestellung prüfen wir, ob Formate und Produkte zur vorhandenen Situation und zum geplanten Aufbau passen.',
        },
        {
          q: 'Übernehmen Sie die Elektrik?',
          a: 'Elektroanschlüsse werden durch einen entsprechenden Fachbetrieb ausgeführt und von uns im Ablauf koordiniert.',
        },
        {
          q: 'Sanieren Sie auch Bäder vor einer Neuvermietung?',
          a: 'Ja. Nach der Besichtigung stimmen wir den Umfang auf den technischen Zustand, eine pflegeleichte Ausstattung und die geplante Übergabe der Wohnung ab.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig, Schkeuditz und das nahe Umland.',
        },
      ],
      faqHeading: 'Häufige Fragen zur Badsanierung in Halle',
      cta: {
        title: 'Bad in Halle sanieren oder renovieren lassen?',
        text: 'Beschreiben Sie kurz den aktuellen Zustand Ihres Badezimmers und Ihre Wünsche oder senden Sie uns Fotos. Bei einer größeren Badsanierung vereinbaren wir eine Besichtigung und klären Umfang, Ausstattung und die nächsten Schritte vor Ort.',
      },
    },
    ru: {
      title: 'Ремонт ванной в Halle (Saale) — под ключ с координацией работ',
      metaTitle: 'Ремонт ванной Halle | Под ключ и частичный ремонт | SorgfaltBau',
      metaDescription:
        'Ремонт и обновление ванной в Halle (Saale): демонтаж, гидроизоляция, плитка, гипсокартон и монтаж с координацией всех этапов. Оставьте заявку.',
      short: 'Полный или частичный ремонт ванной с координацией этапов.',
      intro: [
        'Полный ремонт ванной, обновление отдельных зон или точечная переделка требуют согласованной последовательности: демонтаж, коммуникации, гидроизоляция, гипсокартон, плитка и монтаж должны точно сочетаться между собой. SorgfaltBau ремонтирует ванные в Halle (Saale) и координирует необходимые этапы — от компактного санузла в старом доме до душа с удобным малопороговым доступом.',
        'До начала работ мы оцениваем текущее состояние ванной, обсуждаем её использование и оснащение и определяем, какие работы действительно необходимы.',
      ],
      includes: [
        'Демонтаж, разборка и вывоз',
        'Внутренняя сантехника (подвод и слив)',
        'Тщательная гидроизоляция мокрой зоны',
        'Плитка на стены и пол',
        'Гипсокартон, инсталляция и подвесной потолок',
        'Монтаж унитаза, раковины, душа и ванны',
        'Душ вровень с полом или с низким порогом, если это технически возможно',
        'Малярные и финишные работы',
        'Координация электроподключений с профильной фирмой',
      ],
      sections: [
        {
          heading: 'Полный ремонт или обновление ванной — в чём разница?',
          body: [
            'При обновлении ванной основное внимание часто уделяется видимым изменениям: новой плитке, сантехнике, поверхностям или душу. Полный ремонт может дополнительно затрагивать коммуникации, гидроизоляцию, основание и конструкцию стен или пола.',
            'На практике эти понятия часто пересекаются. Поэтому сначала мы осматриваем объект и определяем, какие меры действительно целесообразны для конкретной ванной.',
          ],
        },
        {
          heading: 'Полный или частичный ремонт ванной?',
          body: [
            'Не каждую ванную нужно полностью демонтировать. Если коммуникации, основание и сохраняемые участки находятся в нормальном техническом состоянии, в зависимости от задачи может быть разумен частичный ремонт.',
            'При полном ремонте согласуются демонтаж, коммуникации, гипсокартон или инсталляция, гидроизоляция, стены и пол, плитка, сантехника, монтаж и финишные работы. Подходящий вариант определяем после осмотра ванной.',
          ],
          points: [
            'Обновить душ',
            'Заменить ванну',
            'Заменить отдельные предметы сантехники',
            'Облицевать плиткой отдельные зоны',
            'Восстановить повреждённые участки',
          ],
        },
        {
          heading: 'Сколько стоит ремонт ванной в Галле?',
          body: [
            'Стоимость зависит не только от площади ванной. На итоговую сумму влияют состояние коммуникаций, необходимость демонтажа, подготовка стен и пола, гидроизоляция, плитка, сантехника и выбранный уровень оснащения.',
            'Частичный ремонт с заменой душа рассчитывается иначе, чем полностью демонтированная ванная с новыми коммуникациями, инсталляцией и облицовкой. После осмотра мы можем оценить фактический объём и подготовить понятное предложение.',
          ],
          points: [
            'Площадь ванной',
            'Состояние коммуникаций',
            'Объём демонтажа',
            'Состояние стен и пола',
            'Гидроизоляция и основание',
            'Плитка и её формат',
            'Душ, ванна, унитаз и раковина',
            'Выбранное оснащение',
            'Изменение планировки',
            'Доступ к помещению',
          ],
        },
        {
          heading: 'Гидроизоляция ванной — основа мокрой зоны',
          body: 'До укладки плитки мы тщательно подготавливаем и изолируем примыкания стен и пола и участки, испытывающие воздействие воды. Правильно выполненная гидроизоляция снижает риск повреждений от влаги и создаёт важную основу для долговечных стен и пола.',
        },
        {
          heading: 'Маленькие ванные, старые и панельные дома в Halle',
          body: [
            'В Halle встречаются разные типы зданий: квартиры старого фонда с возрастными коммуникациями и компактные санузлы в Halle-Neustadt и других панельных районах. Поэтому нельзя планировать каждую ванную по одной схеме. Это относится и к квартирам в Paulusviertel, Giebichenstein и Trotha.',
            'Для маленькой ванной особенно важны расположение душа, унитаза и раковины, удобство перемещения и практичное хранение.',
          ],
        },
        {
          heading: 'Душ без высокого порога и адаптированный ремонт ванной',
          body: [
            'Душ вровень с полом или с минимальным порогом может облегчить вход и сделать ванную удобнее. Возможность полностью ровного решения в существующем помещении зависит в том числе от высоты конструкции пола, прокладки коммуникаций и водоотведения.',
            'Во время осмотра мы проверяем исходные условия и обсуждаем технически подходящее решение с удобным малопороговым доступом.',
          ],
        },
        {
          heading: 'Выбор плитки, сантехники и оснащения',
          body: [
            'На внешний вид и бюджет заметно влияют плитка, смесители и сантехника. По желанию мы берём закупку материалов на себя или работаем с уже выбранными изделиями.',
            'Перед заказом проверяем, подходят ли формат плитки и оборудование к имеющимся условиям и запланированной конструкции.',
          ],
        },
        {
          heading: 'Ремонт ванной перед новой сдачей квартиры',
          body: [
            'Для сдаваемой квартиры не всегда нужна максимально сложная переделка. Важны исправное техническое состояние, практичные поверхности и аккуратное выполнение, после которого объект можно передать жильцам.',
            'После осмотра согласуем объём с учётом состояния ванной, будущего использования и планируемой сдачи квартиры.',
          ],
        },
      ],
      process: {
        heading: 'Как проходит ремонт ванной с SorgfaltBau',
        steps: [
          {
            title: 'Запрос и фотографии',
            body: 'Кратко опишите текущее состояние и пожелания. Фотографии помогут с первой оценкой.',
          },
          {
            title: 'Осмотр и замеры',
            body: 'Проверяем помещение, существующие подключения, основания и планируемое использование.',
          },
          {
            title: 'Планирование и предложение',
            body: 'Согласуем объём, материалы, оснащение, последовательность и реалистичный период выполнения.',
          },
          {
            title: 'Демонтаж и подготовка',
            body: 'Старую сантехнику и затрагиваемые поверхности удаляем в согласованном объёме.',
          },
          {
            title: 'Отделка и монтаж',
            body: 'Сантехнические работы, гипсокартон, гидроизоляцию, плитку и монтаж согласуем по этапам.',
          },
          {
            title: 'Передача результата',
            body: 'После завершения вместе проверяем выполненные работы и аккуратно передаём ванную.',
          },
        ],
      },
      guide: {
        heading: 'Руководство по ремонту ванной',
        body: 'Подробнее о факторах стоимости, этапах, сроках и планировании читайте в нашем руководстве.',
        anchor: 'Ремонт ванной в Галле: стоимость, этапы и сроки',
        path: '/news/badsanierung-halle-kosten-ablauf-dauer',
      },
      reference: {
        heading: 'Примеры ванных из выполненных проектов',
        body: 'В нашей галерее опубликованы фотографии выполненных SorgfaltBau работ в ванных комнатах.',
        anchor: 'Посмотреть проекты ванных в галерее',
        path: '/galerie',
      },
      trustPoints: [
        {value: '10+', label: 'лет практического опыта'},
        {value: '200+', label: 'выполненных задач от внутренней отделки до наружных работ'},
        {value: 'Напрямую', label: 'один контакт для согласованных этапов работ'},
        {value: 'Halle', label: 'основной регион — Halle (Saale) и окрестности'},
      ],
      faq: [
        {
          q: 'Сколько стоит ремонт ванной в Галле?',
          a: 'Стоимость зависит от площади, состояния коммуникаций, необходимого демонтажа, гидроизоляции, плитки и оснащения. Реалистично рассчитать объём можно после осмотра.',
        },
        {
          q: 'Сколько длится ремонт ванной?',
          a: 'Срок зависит от размера и состояния ванной, объёма работ и доступности материалов. После осмотра мы называем реалистичный период выполнения.',
        },
        {
          q: 'Чем полный ремонт отличается от обновления ванной?',
          a: 'Обновление часто затрагивает видимые поверхности и сантехнику. При полном ремонте могут дополнительно обновляться коммуникации, гидроизоляция, основания и конструкция стен или пола. Необходимый объём определяет осмотр.',
        },
        {
          q: 'Можно ли сделать только частичный ремонт?',
          a: 'Да. В зависимости от состояния можно обновить душ, заменить отдельную сантехнику, облицевать плиткой часть помещения или восстановить повреждённые участки.',
        },
        {
          q: 'Можно ли сделать душ вровень с полом в старом доме?',
          a: 'Это зависит от высоты конструкции пола, прокладки коммуникаций и водоотведения. Мы проверяем существующие условия на месте и предлагаем технически подходящее решение.',
        },
        {
          q: 'Можно ли купить плитку или сантехнику самостоятельно?',
          a: 'Да. Мы можем работать с уже выбранными изделиями или взять закупку на себя. До заказа проверяем, подходят ли материалы и оборудование к имеющимся условиям и запланированной конструкции.',
        },
        {
          q: 'Вы выполняете электрику в ванной?',
          a: 'Электроподключения выполняет соответствующая профильная фирма, а мы координируем эти работы в общем порядке этапов.',
        },
        {
          q: 'Вы ремонтируете ванные перед новой сдачей квартиры?',
          a: 'Да. После осмотра согласуем объём с учётом технического состояния, практичного оснащения и планируемой передачи квартиры жильцам.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми районами, плюс Merseburg, Leipzig, Schkeuditz и ближайшие окрестности.',
        },
      ],
      faqHeading: 'Частые вопросы о ремонте ванной в Halle',
      cta: {
        title: 'Планируете ремонт или обновление ванной в Halle?',
        text: 'Кратко опишите текущее состояние ванной и свои пожелания или пришлите фотографии. Для крупного ремонта мы договоримся об осмотре и на месте уточним объём, оснащение и следующие шаги.',
      },
    },
  },

  {
    slug: 'bodenbelaege-halle',
    image: '/images/flooring.webp',
    serviceType: 'Bodenbeläge verlegen',
    related: ['wohnungsrenovierung-halle', 'trockenbau-halle', 'badsanierung-halle'],
    de: {
      title: 'Bodenbeläge verlegen in Halle (Saale)',
      metaTitle: 'Bodenleger Halle (Saale) – Laminat, Vinyl, Fliesen | SorgfaltBau',
      metaDescription:
        'Bodenbeläge in Halle (Saale): Laminat, Vinyl, Fliesen und Aufarbeitung von Holzböden. Saubere Untergrundvorbereitung, ebenes Ergebnis, fester Termin. Jetzt kostenlos anfragen.',
      short: 'Laminat, Vinyl, Fliesen und Holzboden-Aufbereitung.',
      intro:
        'Der richtige Boden prägt einen Raum – optisch wie im Alltag. SorgfaltBau verlegt in Halle (Saale) alle gängigen Bodenbeläge und bereitet den Untergrund so vor, dass das Ergebnis eben, ruhig und langlebig ist. Vom einzelnen Zimmer bis zur kompletten Wohnung, auch mit Aufarbeitung alter Dielen.',
      includes: [
        'Laminat und Vinyl (Klick und vollflächig verklebt)',
        'Designboden und Mehrschichtparkett',
        'Keramik- und Bodenfliesen',
        'Untergrundvorbereitung und Spachtelausgleich',
        'Trittschalldämmung',
        'Aufarbeitung von Holzböden (Schliff, Beize, Klarlack)',
        'Sockelleisten und Übergangsprofile',
        'Entsorgung des alten Belags',
      ],
      sections: [
        {
          heading: 'Der Untergrund entscheidet',
          body: 'Ein guter Boden beginnt unter dem Belag. Wir prüfen Ebenheit, Feuchte und Zustand des Untergrunds, gleichen bei Bedarf mit Spachtelmasse aus und verlegen erst dann. Das verhindert spätere Fugen, Knarren und sichtbare Höhenunterschiede.',
        },
        {
          heading: 'Der passende Belag für jeden Raum',
          body: 'Nicht jeder Boden passt in jeden Raum. Für stark genutzte Bereiche, Küchen oder Mietwohnungen empfehlen wir robustes Vinyl oder Fliesen, für Wohnräume gemütliches Laminat oder Parkett. Wir beraten ehrlich, was zu Nutzung, Optik und Budget passt.',
        },
        {
          heading: 'Trittschall und Ruhe',
          body: 'Gerade in Mehrfamilienhäusern in Halle ist Trittschall ein Thema. Mit der passenden Dämmunterlage reduzieren wir Geräusche zum Nachbarn und im eigenen Raum – ein spürbarer Komfortgewinn, der beim Verlegen mitgedacht wird.',
        },
        {
          heading: 'Aufarbeiten statt austauschen',
          body: 'Wo es sich lohnt, restaurieren wir bestehende Holzböden und Dielen, statt sie zu ersetzen – mit Schliff, Beize und Klarlack. Gerade in Altbauwohnungen entsteht so ein frischer, langlebiger Boden mit Charakter und meist zu geringeren Kosten.',
        },
        {
          heading: 'Sauber, schnell, begehbar',
          body: 'Wir arbeiten zügig und sauber, schützen angrenzende Bereiche und räumen ordentlich auf. Laminat und Vinyl sind meist sofort begehbar; bei Fliesen oder Lackierungen planen wir die nötigen Trocknungszeiten transparent mit ein.',
        },
      ],
      faq: [
        {
          q: 'Muss der alte Boden raus?',
          a: 'Nicht immer. Je nach Zustand und Aufbau kann der neue Belag auf den alten verlegt werden, oder wir bereiten den Untergrund neu vor. Das prüfen wir bei der Besichtigung.',
        },
        {
          q: 'Welcher Belag ist der pflegeleichteste?',
          a: 'Vinyl und Fliesen sind besonders robust und pflegeleicht, ideal für Küchen, Flure und Mietwohnungen. Für Wohnräume sind Laminat oder Parkett beliebt. Wir empfehlen nach Nutzung und Budget.',
        },
        {
          q: 'Verlegen Sie auch nur einen Raum?',
          a: 'Ja, vom einzelnen Zimmer bis zur kompletten Wohnung. Den Umfang richten wir nach Ihrem Vorhaben.',
        },
        {
          q: 'Können alte Dielen aufgearbeitet werden?',
          a: 'Oft ja. Mit Schliff, Beize und Klarlack lassen sich Holzböden und Dielen häufig aufarbeiten – das ist nachhaltiger und meist günstiger als ein kompletter Austausch.',
        },
        {
          q: 'Wie schnell ist der Boden begehbar?',
          a: 'Laminat und Vinyl sind meist sofort nutzbar. Bei Fliesen, Verklebungen oder Lackierungen planen wir die nötigen Trocknungszeiten mit ein.',
        },
        {
          q: 'Übernehmen Sie auch die Trittschalldämmung?',
          a: 'Ja. Die passende Dämmunterlage gehört für uns zum sauberen Aufbau – besonders in Mehrfamilienhäusern.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig, Schkeuditz und das nahe Umland.',
        },
      ],
    },
    ru: {
      title: 'Укладка напольных покрытий в Halle (Saale)',
      metaTitle: 'Полы Halle – ламинат, винил, плитка | SorgfaltBau',
      metaDescription:
        'Напольные покрытия в Halle (Saale): ламинат, винил, плитка и реставрация деревянных полов. Аккуратная подготовка основания, ровный результат, точный срок. Оставьте заявку.',
      short: 'Ламинат, винил, плитка и реставрация дерева.',
      intro:
        'Правильный пол задаёт характер помещения — и внешне, и в быту. SorgfaltBau укладывает в Halle (Saale) все распространённые покрытия и готовит основание так, чтобы результат был ровным, тихим и долговечным. От одной комнаты до всей квартиры, в том числе с реставрацией старых досок.',
      includes: [
        'Ламинат и винил (замковый и клеевой)',
        'Дизайн-покрытие и многослойный паркет',
        'Керамическая и напольная плитка',
        'Подготовка и шпаклёвочное выравнивание основания',
        'Подложка для ударного шума',
        'Реставрация деревянных полов (шлифовка, морилка, лак)',
        'Плинтусы и переходные профили',
        'Вывоз старого покрытия',
      ],
      sections: [
        {
          heading: 'Решает основание',
          body: 'Хороший пол начинается под покрытием. Проверяем ровность, влажность и состояние основания, при необходимости выравниваем шпаклёвкой и только потом укладываем. Это исключает щели, скрип и заметные перепады.',
        },
        {
          heading: 'Подходящее покрытие под каждую комнату',
          body: 'Не каждый пол уместен в любой комнате. Для нагруженных зон, кухонь и съёмных квартир советуем прочный винил или плитку, для жилых комнат — уютный ламинат или паркет. Честно подскажем, что подходит по эксплуатации, виду и бюджету.',
        },
        {
          heading: 'Ударный шум и тишина',
          body: 'В многоквартирных домах Halle ударный шум важен. С правильной подложкой снижаем звук к соседям и в самой комнате — ощутимый комфорт, заложенный ещё на этапе укладки.',
        },
        {
          heading: 'Реставрация вместо замены',
          body: 'Где это оправдано, восстанавливаем деревянные полы и доски вместо замены — шлифовкой, морилкой и лаком. Особенно в старых квартирах так получается свежий, долговечный пол с характером и обычно дешевле.',
        },
        {
          heading: 'Чисто, быстро, можно ходить',
          body: 'Работаем быстро и аккуратно, защищаем соседние зоны и убираем за собой. По ламинату и винилу обычно можно ходить сразу; для плитки и лака прозрачно закладываем время высыхания.',
        },
      ],
      faq: [
        {
          q: 'Нужно ли снимать старый пол?',
          a: 'Не всегда. В зависимости от состояния новое покрытие можно уложить поверх или подготовить основание заново. Проверяем на осмотре.',
        },
        {
          q: 'Какое покрытие самое неприхотливое?',
          a: 'Винил и плитка особенно прочные и простые в уходе — для кухонь, коридоров и съёмных квартир. Для жилых комнат популярны ламинат и паркет. Рекомендуем по эксплуатации и бюджету.',
        },
        {
          q: 'Кладёте ли только одну комнату?',
          a: 'Да, от одной комнаты до всей квартиры. Объём — под вашу задачу.',
        },
        {
          q: 'Можно ли отреставрировать старые доски?',
          a: 'Часто да. Шлифовкой, морилкой и лаком деревянные полы и доски нередко восстанавливаются — это экологичнее и обычно дешевле полной замены.',
        },
        {
          q: 'Когда можно ходить по полу?',
          a: 'По ламинату и винилу обычно сразу. Для плитки, клеевой укладки и лака закладываем время высыхания.',
        },
        {
          q: 'Делаете ли подложку под ударный шум?',
          a: 'Да. Правильная подложка для нас — часть аккуратного пирога пола, особенно в многоквартирных домах.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми районами, плюс Merseburg, Leipzig, Schkeuditz и ближайшие окрестности.',
        },
      ],
    },
  },

  {
    slug: 'wohnungsrenovierung-halle',
    image: '/images/room.webp',
    serviceType: 'Wohnungsrenovierung und Wohnungssanierung',
    related: ['trockenbau-halle', 'badsanierung-halle', 'bodenbelaege-halle'],
    de: {
      title: 'Wohnungsrenovierung in Halle (Saale) – koordiniert aus einer Hand',
      metaTitle: 'Wohnungsrenovierung Halle | Wohnungssanierung | SorgfaltBau',
      metaDescription:
        'Wohnungsrenovierung und Wohnungssanierung in Halle (Saale): Trockenbau, Malerarbeiten, Bodenbeläge und Renovierung vor Neuvermietung aus einer Hand.',
      short: 'Koordinierte Renovierung und Sanierung – bewohnt oder vor Neuvermietung.',
      intro:
        'Ob Wohnungsrenovierung, Wohnungssanierung oder die Vorbereitung vor einer Neuvermietung: In einer Wohnung greifen meist mehrere Arbeiten ineinander. SorgfaltBau renoviert Wohnungen in Halle (Saale) und koordiniert Maler- und Spachtelarbeiten, Trockenbau, Bodenbeläge, Badarbeiten und Montage aus einer Hand. Auch in bewohnten Wohnungen planen wir die Arbeiten so, dass Belastung, Staub und Ausfallzeiten möglichst gering bleiben. Vor dem Start prüfen wir, welche Leistungen zum Zustand der Wohnung und zur geplanten Nutzung passen, und legen daraus eine sinnvolle Reihenfolge fest.',
      includes: [
        'Maler- und Spachtelarbeiten',
        'Vorbereitung von Wänden und Decken',
        'Trockenbau und Innenausbau',
        'Bodenbeläge, Laminat, Vinyl und Sockelleisten',
        'Abgestimmte Arbeiten im Bad',
        'Kleinere Montage- und Abschlussarbeiten',
        'Vorbereitung vor einer Neuvermietung',
        'Altmaterial und übergabefertige Endreinigung auf Wunsch',
      ],
      sections: [
        {
          heading: 'Mehrere Gewerke, ein koordinierter Ablauf',
          body: 'Eine Wohnungsrenovierung besteht selten aus nur einer Aufgabe. Wir bündeln Trockenbau, Spachtel- und Malerarbeiten, Bodenverlegung, abgestimmte Badarbeiten und Montage in einer sinnvollen Reihenfolge. Dadurch werden Übergänge zwischen den Arbeiten früh geklärt, und Sie müssen nicht mehrere einzelne Handwerker separat koordinieren.',
        },
        {
          heading: 'Wohnungsrenovierung oder Wohnungssanierung – was ist der Unterschied?',
          body: [
            'Bei einer Renovierung stehen meist optische und oberflächenbezogene Arbeiten wie Spachteln, Streichen oder neue Bodenbeläge im Vordergrund. Eine Sanierung geht häufig weiter und kann auch beschädigte oder technisch beziehungsweise baulich problematische Bereiche betreffen.',
            'In der Praxis überschneiden sich Wohnungsrenovierung und Wohnungssanierung häufig. Deshalb prüfen wir vor Ort, welche Arbeiten für die jeweilige Wohnung tatsächlich notwendig und sinnvoll sind. So entsteht kein unnötig großer Leistungsumfang, sondern eine Lösung, die zum Zustand der Immobilie und zur geplanten Nutzung passt.',
          ],
        },
        {
          heading: 'Welche Arbeiten gehören zu einer Wohnungsrenovierung?',
          body: 'Der konkrete Umfang richtet sich nach dem Zustand der Wohnung. Häufig gehören die Vorbereitung von Wänden und Decken, Spachtel- und Malerarbeiten, Trockenbau, neue Bodenbeläge mit Sockelleisten sowie kleinere Montage- und Abschlussarbeiten dazu. Arbeiten im Bad stimmen wir passend zum tatsächlichen Bedarf und zu den von uns angebotenen Leistungen ab.',
        },
        {
          heading: 'Wohnung vor der Neuvermietung renovieren',
          body: [
            'Nach dem Auszug eines Mieters soll eine Wohnung häufig möglichst schnell wieder bezugs- und vermietbar sein. Typische Arbeiten sind das Ausbessern von Wänden und Decken, Spachtel- und Malerarbeiten, der Austausch beschädigter Bodenbeläge sowie kleinere Trockenbau- und Montagearbeiten.',
            'SorgfaltBau koordiniert die notwendigen Arbeitsschritte so, dass Vermieter und Eigentümer nicht mehrere einzelne Handwerker separat organisieren müssen. Nach der Besichtigung wird festgelegt, welche Arbeiten tatsächlich erforderlich sind und in welcher Reihenfolge sie sinnvoll ausgeführt werden.',
            'Ziel ist ein sauberer, gepflegter und übergabefertiger Zustand.',
          ],
        },
        {
          heading: 'Bewohnte Wohnung renovieren – mit Rücksicht',
          body: 'Auch eine bewohnte Wohnung kann schrittweise renoviert werden. Entscheidend sind eine klare Reihenfolge der Arbeiten, der Schutz von Möbeln und Laufwegen sowie eine gute Abstimmung mit den Bewohnern. Welche Arbeiten während der Nutzung sinnvoll möglich sind, klären wir bei der Besichtigung.',
        },
        {
          heading: 'Was kostet eine Wohnungsrenovierung in Halle?',
          body: [
            'Die Kosten einer Wohnungsrenovierung in Halle hängen vor allem vom Zustand der Wohnung, der Wohnfläche, dem gewünschten Ausbaustandard und der Anzahl der notwendigen Gewerke ab. Eine Wohnung, bei der nur gespachtelt und gestrichen wird, lässt sich anders kalkulieren als eine Renovierung mit Trockenbau, neuen Bodenbelägen und zusätzlichen Arbeiten im Bad.',
            'Deshalb prüfen wir größere Renovierungen vor Ort und erstellen anschließend ein nachvollziehbares Angebot auf Basis des tatsächlichen Arbeitsumfangs.',
          ],
          points: [
            'Wohnfläche',
            'Zustand von Wänden und Decken',
            'Zustand des vorhandenen Bodens',
            'Anzahl der notwendigen Gewerke',
            'Material und gewünschte Ausführung',
            'Leerstehende oder bewohnte Wohnung',
            'Notwendige Vorarbeiten',
          ],
        },
        {
          heading: 'Altbau und Plattenbau in Halle richtig renovieren',
          body: 'Vom Gründerzeit-Altbau im Paulusviertel bis zur Wohnung in Halle-Neustadt unterscheiden sich Oberflächen, Grundrisse und notwendige Vorarbeiten deutlich. Ältere Wände oder Böden können zusätzliche Vorbereitung erfordern. Deshalb prüfen wir den vorhandenen Zustand vorab und richten Aufbau, Material und Reihenfolge danach aus, statt für jede Wohnung denselben Ablauf anzusetzen.',
        },
      ],
      process: {
        heading: 'So läuft eine Wohnungsrenovierung mit SorgfaltBau ab',
        steps: [
          {title: 'Anfrage und Fotos', body: 'Sie beschreiben kurz die Wohnung und die gewünschten Arbeiten. Fotos helfen uns bei einer ersten Einschätzung.'},
          {title: 'Besichtigung vor Ort', body: 'Wir prüfen Wände, Decken, Böden, Zugänge und den tatsächlichen Renovierungsbedarf.'},
          {title: 'Angebot und Planung', body: 'Sie erhalten ein nachvollziehbares Angebot. Gleichzeitig stimmen wir Reihenfolge, Materialien und einen realistischen Zeitrahmen ab.'},
          {title: 'Ausführung', body: 'Die einzelnen Arbeiten werden sinnvoll koordiniert – zum Beispiel Trockenbau, Spachteln, Malerarbeiten, Bodenverlegung und Montage.'},
          {title: 'Übergabe', body: 'Nach Abschluss der Arbeiten wird die Wohnung sauber und ordentlich übergeben.'},
        ],
      },
      guide: {
        heading: 'Ratgeber zur Wohnungsrenovierung',
        body: 'Mehr zum Ablauf, zu Trockenbau, Malerarbeiten und Bodenverlegung lesen Sie in unserem Ratgeber zur Wohnungsrenovierung in Halle.',
        anchor: 'Wohnung renovieren in Halle: Trockenbau, Malerarbeiten und Bodenverlegung',
        path: '/news/wohnung-renovieren-in-halle-trockenbau-malerarbeiten-bodenverlegung',
      },
      trustPoints: [
        {value: '10+', label: 'Jahre praktische Erfahrung'},
        {value: '200+', label: 'umgesetzte Aufgaben von Innenarbeiten bis Außenflächen'},
      ],
      cta: {
        title: 'Wohnung in Halle renovieren lassen?',
        text: 'Beschreiben Sie kurz Ihr Vorhaben und senden Sie uns Fotos der Wohnung. Bei größeren Renovierungen vereinbaren wir eine Besichtigung und erstellen anschließend ein nachvollziehbares Angebot.',
      },
      faqHeading: 'Häufige Fragen zur Wohnungsrenovierung',
      faq: [
        {
          q: 'Können wir während der Renovierung wohnen bleiben?',
          a: 'In vielen Fällen ja. Wir schützen die Räume, begrenzen Staub und stimmen die Reihenfolge so ab, dass möglichst immer ein Teil der Wohnung nutzbar bleibt.',
        },
        {
          q: 'Wie schnell kommt ein Angebot?',
          a: 'In der Regel innerhalb von 2 bis 5 Werktagen nach der Besichtigung. Kleinere Arbeiten lassen sich oft schneller einschätzen.',
        },
        {
          q: 'Übernehmen Sie auch einzelne Räume?',
          a: 'Ja, vom einzelnen Zimmer bis zur kompletten Wohnung. Den Umfang richten wir nach Ihrem Bedarf und Budget.',
        },
        {
          q: 'Renovieren Sie Wohnungen vor der Vermietung?',
          a: 'Ja, das ist ein Schwerpunkt. Wir bringen Wohnungen zügig und sauber in einen übergabefähigen, vermietbaren Zustand.',
        },
        {
          q: 'Bekomme ich alles aus einer Hand?',
          a: 'Ja. Maler, Trockenbau, Boden, Bad und Montage koordinieren wir als ein Ablauf – Sie haben einen Ansprechpartner statt mehrerer Einzelfirmen.',
        },
        {
          q: 'Übernehmen Sie auch die Entsorgung und Endreinigung?',
          a: 'Ja. Entsorgung von Altmaterial und eine besenreine bis übergabefertige Endreinigung gehören auf Wunsch dazu.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen. Je nach Umfang übernehmen wir Projekte auch im Umland, zum Beispiel in Merseburg, Landsberg, Kabelsketal oder Schkeuditz.',
        },
        {
          q: 'Was kostet eine Wohnungsrenovierung in Halle?',
          a: 'Die Kosten hängen von Wohnfläche, Zustand, Material und Umfang der notwendigen Arbeiten ab. Nach einer Besichtigung können wir den Aufwand realistisch einschätzen und ein nachvollziehbares Angebot erstellen.',
        },
        {
          q: 'Wie lange dauert eine komplette Wohnungsrenovierung?',
          a: 'Die Dauer hängt von Größe, Zustand und Anzahl der Arbeiten ab. Reine Malerarbeiten benötigen deutlich weniger Zeit als eine Renovierung mit Trockenbau, Bodenverlegung und weiteren Gewerken. Nach der Besichtigung nennen wir ein realistisches Zeitfenster.',
        },
      ],
    },
    ru: {
      title: 'Ремонт квартиры в Halle (Saale) — комплексная организация работ',
      metaTitle: 'Ремонт квартиры в Halle (Saale) | SorgfaltBau',
      metaDescription:
        'Ремонт квартиры в Halle (Saale): внутренняя отделка, гипсокартон, покраска стен, напольные покрытия и подготовка квартиры перед сдачей.',
      short: 'Комплексный ремонт жилой квартиры или подготовка перед сдачей.',
      intro:
        'Косметический или комплексный ремонт квартиры, внутренняя отделка и подготовка перед сдачей обычно состоят из нескольких связанных этапов. SorgfaltBau выполняет ремонт квартир в Halle (Saale) и координирует шпаклёвку и покраску стен, гипсокартон, напольные покрытия, согласованные работы в ванной и монтаж. В жилой квартире порядок планируем так, чтобы по возможности сократить пыль, неудобства и время ограниченного использования помещений. Перед началом оцениваем фактическое состояние объекта и определяем разумную последовательность работ.',
      includes: [
        'Малярные и шпаклёвочные работы',
        'Подготовка стен и потолков',
        'Гипсокартон и внутренняя отделка',
        'Напольные покрытия, ламинат, винил и плинтусы',
        'Согласованные работы в ванной',
        'Небольшие монтажные и завершающие работы',
        'Подготовка квартиры перед сдачей',
        'Вывоз старых материалов и финальная уборка по согласованию',
      ],
      sections: [
        {
          heading: 'Несколько видов работ — один согласованный процесс',
          body: 'Ремонт квартиры редко состоит из одной задачи. Мы объединяем гипсокартон, шпаклёвку и покраску, укладку пола, согласованные работы в ванной и монтаж в разумной последовательности. Переходы между этапами определяются заранее, поэтому заказчику не нужно самостоятельно координировать несколько отдельных исполнителей.',
        },
        {
          heading: 'Косметический ремонт или более глубокая санация — в чём разница?',
          body: [
            'Косметический ремонт обычно включает шпаклёвку, покраску и замену напольных покрытий. Более глубокая санация может затрагивать повреждённые или технически проблемные участки.',
            'На практике оба вида работ часто пересекаются, поэтому перед началом мы оцениваем фактическое состояние квартиры. Это помогает определить действительно необходимый объём без лишних работ и подобрать решение под состояние объекта и его дальнейшее использование.',
          ],
        },
        {
          heading: 'Что входит в ремонт квартиры?',
          body: 'Точный объём зависит от состояния квартиры. Часто требуются подготовка стен и потолков, шпаклёвка и покраска, гипсокартон, новые напольные покрытия и плинтусы, а также небольшие монтажные и завершающие работы. Работы в ванной согласовываем в пределах фактической задачи и оказываемых нами услуг.',
        },
        {
          heading: 'Ремонт квартиры перед сдачей',
          body: [
            'После выезда жильца квартиру часто нужно быстро привести в аккуратное и пригодное для новой аренды состояние. Типичные задачи — ремонт стен и потолков, шпаклёвка и покраска, замена повреждённого покрытия пола, небольшие работы с гипсокартоном и монтаж.',
            'SorgfaltBau координирует этапы так, чтобы собственнику или арендодателю не приходилось отдельно организовывать нескольких мастеров. После осмотра определяем, какие работы действительно нужны и в какой последовательности их выполнять.',
            'Цель — чистая, ухоженная и готовая к передаче квартира.',
          ],
        },
        {
          heading: 'Ремонт в жилой квартире — с учётом жильцов',
          body: 'Жилую квартиру можно ремонтировать поэтапно. Для этого важны понятная последовательность работ, защита мебели и проходов и постоянное согласование с жильцами. Какие работы разумно выполнять во время проживания, определяем при осмотре. Полностью беспыльный процесс не обещаем, но принимаем меры для ограничения загрязнения.',
        },
        {
          heading: 'Сколько стоит ремонт квартиры в Галле?',
          body: [
            'Стоимость ремонта зависит от площади, состояния стен и пола, выбранных материалов и количества необходимых работ. Покраска и шпаклёвка одной квартиры рассчитываются иначе, чем комплексный ремонт с гипсокартоном, новым полом и дополнительными работами.',
            'После осмотра объекта можно точнее определить объём и подготовить понятное предложение на основе фактических работ.',
          ],
          points: [
            'Площадь квартиры',
            'Состояние стен и потолков',
            'Состояние существующего пола',
            'Количество видов работ',
            'Материалы и желаемое исполнение',
            'Пустая или жилая квартира',
            'Необходимые подготовительные работы',
          ],
        },
        {
          heading: 'Ремонт Altbau и панельных квартир в Halle',
          body: 'Квартиры в старых домах Paulusviertel и в панельных зданиях Halle-Neustadt требуют разной подготовки. Старые стены, потолки или полы могут нуждаться в дополнительных работах до отделки. Мы заранее проверяем состояние поверхностей и подбираем последовательность, материалы и способ выполнения под конкретный объект.',
        },
      ],
      process: {
        heading: 'Как проходит ремонт квартиры с SorgfaltBau',
        steps: [
          {title: 'Запрос и фотографии', body: 'Вы кратко описываете квартиру и желаемые работы. Фотографии помогают сделать первичную оценку.'},
          {title: 'Осмотр на месте', body: 'Проверяем стены, потолки, полы, доступ и фактический объём ремонта.'},
          {title: 'Предложение и планирование', body: 'Вы получаете понятное предложение. Одновременно согласуем порядок, материалы и реалистичные сроки.'},
          {title: 'Выполнение', body: 'Отдельные этапы координируются в правильном порядке: гипсокартон, шпаклёвка, покраска, укладка пола и монтаж.'},
          {title: 'Передача', body: 'После завершения работ квартира передаётся в чистом и аккуратном состоянии.'},
        ],
      },
      guide: {
        heading: 'Полезная статья о ремонте квартиры',
        body: 'Подробнее о порядке работ, гипсокартоне, покраске и укладке пола читайте в нашем материале о ремонте квартиры в Halle.',
        anchor: 'Ремонт квартиры в Halle: гипсокартон, малярные работы и укладка пола',
        path: '/news/wohnung-renovieren-in-halle-trockenbau-malerarbeiten-bodenverlegung',
      },
      trustPoints: [
        {value: '10+', label: 'лет практического опыта'},
        {value: '200+', label: 'выполненных задач от внутренней отделки до наружных работ'},
      ],
      cta: {
        title: 'Нужно отремонтировать квартиру в Halle?',
        text: 'Кратко опишите задачу и пришлите фотографии квартиры. Для более крупных ремонтов мы согласуем осмотр, а затем подготовим понятное предложение.',
      },
      faqHeading: 'Частые вопросы о ремонте квартиры',
      faq: [
        {
          q: 'Можно ли жить во время ремонта?',
          a: 'Часто да. Защищаем помещения, ограничиваем пыль и согласуем порядок так, чтобы часть квартиры по возможности всегда оставалась пригодной.',
        },
        {
          q: 'Как быстро будет смета?',
          a: 'Обычно в течение 2–5 рабочих дней после осмотра. Небольшие работы оцениваем быстрее.',
        },
        {
          q: 'Делаете ли отдельные комнаты?',
          a: 'Да, от одной комнаты до всей квартиры. Объём — под ваши задачи и бюджет.',
        },
        {
          q: 'Готовите ли квартиры к сдаче?',
          a: 'Да, это одно из основных направлений. Быстро и чисто доводим квартиру до состояния под передачу и сдачу.',
        },
        {
          q: 'Всё ли из одних рук?',
          a: 'Да. Малярку, гипсокартон, полы, ванную и монтаж ведём как один процесс — у вас один ответственный вместо нескольких фирм.',
        },
        {
          q: 'Берёте ли вывоз и финальную уборку?',
          a: 'Да. Вывоз старого материала и уборку до состояния под передачу по желанию включаем.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale). В зависимости от объёма принимаем проекты и в окрестностях, например в Merseburg, Landsberg, Kabelsketal или Schkeuditz.',
        },
        {
          q: 'Сколько стоит ремонт квартиры в Галле?',
          a: 'Стоимость зависит от площади, состояния, материалов и объёма необходимых работ. После осмотра мы можем реалистично оценить затраты и подготовить понятное предложение.',
        },
        {
          q: 'Сколько длится полный ремонт квартиры?',
          a: 'Срок зависит от площади, состояния и количества работ. Одна покраска занимает заметно меньше времени, чем ремонт с гипсокартоном, укладкой пола и дополнительными этапами. После осмотра мы называем реалистичный временной диапазон.',
        },
      ],
    },
  },

  {
    slug: 'pflasterarbeiten-halle',
    image: '/images/parking-driveways.webp',
    serviceType: 'Pflasterarbeiten für Einfahrt, Hof und Terrasse',
    related: ['rohbau-halle', 'fassadendaemmung-halle', 'dachsanierung-halle'],
    de: {
      title: 'Pflasterarbeiten in Halle (Saale) – Einfahrt, Hof und Terrasse',
      metaTitle: 'Pflasterarbeiten Halle | Einfahrt, Hof & Terrasse | SorgfaltBau',
      metaDescription:
        'Pflasterarbeiten in Halle (Saale) für Einfahrt, Hof, Terrasse und Wege: Rückbau, Unterbau, Gefälle und Entwässerung sauber aus einer Hand.',
      short: 'Einfahrten, Höfe, Terrassen und Wege mit passendem Unterbau und Entwässerung.',
      intro: [
        'Ob Einfahrt, Hof, Terrasse oder Gartenweg: Dauerhafte Pflasterarbeiten beginnen nicht beim sichtbaren Stein, sondern mit einem tragfähigen Unterbau, dem richtigen Gefälle und einer funktionierenden Entwässerung. SorgfaltBau übernimmt Pflasterarbeiten in Halle (Saale) und Umgebung – vom Rückbau alter Flächen und den notwendigen Erdarbeiten über Tragschicht und Randeinfassung bis zur sauber verlegten Pflasterfläche.',
        'Je nach Nutzung planen wir Aufbau und Material unterschiedlich. Eine Pkw-Einfahrt stellt andere Anforderungen an Unterbau und Pflaster als eine Terrasse oder ein Gartenweg.',
      ],
      includes: [
        'Einfahrten und Garagenzufahrten',
        'Hofflächen und Flächen vor Garagen',
        'Terrassen und Hauseingänge',
        'Stellplätze und Parkflächen',
        'Geh- und Gartenwege sowie Übergänge',
        'Rückbau alter Pflaster- und Asphaltflächen',
        'Tragfähiger Unterbau und Tragschicht',
        'Verlegen mit Gefälle und Randeinfassung',
        'Entwässerung und Wasserführung',
        'Wassersammelschächte rund, quadratisch oder nach Maß',
        'Betonpflaster und Naturstein nach Projekt',
      ],
      sections: [
        {
          heading: 'Welche Flächen pflastern wir in Halle?',
          body: 'Aufbau und Material richten sich nach Nutzung und Belastung. Eine befahrene Fläche benötigt einen anderen Aufbau als eine ausschließlich zu Fuß genutzte Terrasse oder ein Gartenweg.',
          points: [
            'Einfahrten und Garagenzufahrten',
            'Hofflächen',
            'Terrassen',
            'Stellplätze und Parkflächen',
            'Hauseingänge',
            'Gehwege',
            'Gartenwege',
            'Flächen vor Garagen',
            'Übergänge zwischen Haus, Hof und Garten',
          ],
        },
        {
          heading: 'Einfahrt pflastern in Halle – auf den richtigen Aufbau kommt es an',
          body: [
            'Eine Einfahrt wird täglich durch Fahrzeuge, Witterung und Feuchtigkeit belastet. Deshalb reicht es nicht, Pflastersteine lediglich auf eine bestehende Fläche zu legen. Entscheidend sind ein ausreichend tragfähiger Untergrund, fachgerecht aufgebaute Tragschichten, eine stabile Randeinfassung sowie ein Gefälle, über das Niederschlagswasser kontrolliert abgeführt werden kann.',
            'Vor Beginn prüfen wir den vorhandenen Aufbau und klären, ob bestehende Schichten weiter genutzt werden können oder erneuert werden müssen. So wird nicht pauschal mehr zurückgebaut als notwendig.',
          ],
        },
        {
          heading: 'Hof und Terrasse pflastern',
          body: [
            'Bei Hofflächen und Terrassen spielen neben der Tragfähigkeit auch Optik, Übergänge und Wasserführung eine wichtige Rolle. Pflaster, Format und Verlegemuster sollten zum Gebäude und zur Nutzung der Fläche passen.',
            'Bei Terrassen achten wir besonders auf saubere Anschlüsse an Haus, Garten, Türen oder Stufen und darauf, dass Niederschlagswasser nicht zum Gebäude geführt wird.',
          ],
        },
        {
          heading: 'Neu pflastern oder bestehende Fläche sanieren?',
          body: [
            'Nicht jede unebene oder abgesackte Pflasterfläche muss vollständig neu aufgebaut werden. Entscheidend ist, warum sich die Fläche verändert hat. Liegt das Problem nur in einzelnen Steinen, kann eine begrenzte Reparatur ausreichen. Sind Unterbau, Gefälle oder Entwässerung mangelhaft, ist häufig eine umfassendere Erneuerung sinnvoll.',
            'Bei der Besichtigung prüfen wir deshalb nicht nur die sichtbare Oberfläche, sondern auch erkennbare Ursachen des Problems und empfehlen einen passenden Umfang.',
          ],
        },
        {
          heading: 'Unterbau und Tragschicht machen den Unterschied',
          body: [
            'Der Unterbau verteilt die Belastung und bildet die stabile Basis für die Pflasterfläche. Ist er nicht ausreichend tragfähig oder verdichtet, können sich später Spuren, Senken oder Verschiebungen bilden.',
            'Welche vorhandenen Schichten weiter genutzt werden können und welcher Aufbau sinnvoll ist, hängt von Untergrund, Nutzung und Zustand der Fläche ab. Das klären wir vor Ort, ohne pauschale Aufbauhöhen für jedes Grundstück zu versprechen.',
          ],
        },
        {
          heading: 'Gefälle und Entwässerung richtig planen',
          body: [
            'Regenwasser sollte bereits bei der Planung berücksichtigt werden. Je nach Grundstück und vorhandenen Anschlüssen kann die Lösung über das Gefälle der Fläche, geeignete Abläufe oder Sammelschächte erfolgen.',
            'Vor Ort prüfen wir vorhandene Höhen, Anschlüsse und Wasserführung und stimmen die Ausführung auf die jeweilige Situation ab. Ob zusätzliche Freigaben oder Vorgaben zu beachten sind, muss projektbezogen geklärt werden.',
          ],
        },
        {
          heading: 'Betonpflaster oder Naturstein?',
          body: [
            'Betonpflaster bietet eine große Auswahl an Formaten, Farben und Oberflächen und eignet sich für viele Einfahrten, Höfe und Wege. Naturstein wirkt individueller und kann besonders bei Terrassen, Eingangsbereichen oder gestalterisch anspruchsvollen Flächen interessant sein.',
            'Welche Variante sinnvoll ist, hängt von Nutzung, gewünschter Optik und Budget ab.',
          ],
        },
        {
          heading: 'Was kosten Pflasterarbeiten in Halle?',
          body: [
            'Die Kosten für Pflasterarbeiten hängen nicht nur von der Größe der Fläche ab. Entscheidend sind vor allem der vorhandene Untergrund, notwendiger Rückbau und Aushub, die Tragschicht, Randeinfassungen, Entwässerung sowie das gewählte Pflaster.',
            'Eine vorhandene, tragfähige Fläche mit geringem Vorbereitungsaufwand wird anders kalkuliert als eine Einfahrt, bei der alter Asphalt entfernt, Boden ausgehoben und der komplette Unterbau neu hergestellt werden muss.',
            'Nach einer Besichtigung können wir den tatsächlichen Aufwand einschätzen und ein nachvollziehbares Angebot erstellen.',
          ],
          points: [
            'Fläche in m²',
            'Zustand des Untergrunds',
            'Rückbau und Aushub',
            'Entsorgung',
            'Notwendiger Unterbau',
            'Randeinfassung',
            'Gefälle und Entwässerung',
            'Material',
            'Zugänglichkeit der Baustelle',
          ],
        },
      ],
      process: {
        heading: 'So laufen Pflasterarbeiten mit SorgfaltBau ab',
        steps: [
          {title: 'Anfrage und Fotos', body: 'Sie beschreiben Fläche, Nutzung und gewünschten Zustand. Fotos helfen bei der ersten Einschätzung.'},
          {title: 'Besichtigung', body: 'Wir prüfen Fläche, Untergrund, Höhen, Zufahrt und Wasserführung.'},
          {title: 'Planung und Angebot', body: 'Wir stimmen Rückbau, Aufbau, Material, Entwässerung und Ablauf ab.'},
          {title: 'Rückbau und Vorbereitung', body: 'Wenn erforderlich, werden alte Beläge entfernt und der Untergrund vorbereitet.'},
          {title: 'Unterbau und Pflasterung', body: 'Tragschicht, Gefälle, Randeinfassung und Pflaster werden entsprechend der geplanten Nutzung ausgeführt.'},
          {title: 'Übergabe', body: 'Nach Abschluss wird die Fläche ordentlich und nutzbar übergeben.'},
        ],
      },
      guide: {
        heading: 'Ratgeber zu Einfahrt und Außenanlagen',
        body: 'Mehr zu Unterbau, Entwässerung, Einfahrten, Terrassen und der Planung von Außenflächen lesen Sie in unserem Ratgeber.',
        anchor: 'Fassade, Einfahrt und Terrasse richtig planen',
        path: '/news/fassadensanierung-aussenanlagen-in-halle-fassade-einfahrt-terrasse',
      },
      trustPoints: [
        {value: '10+', label: 'Jahre praktische Erfahrung'},
        {value: '200+', label: 'umgesetzte Aufgaben von Innenarbeiten bis Außenflächen'},
      ],
      cta: {
        title: 'Einfahrt, Hof oder Terrasse in Halle pflastern lassen?',
        text: 'Beschreiben Sie kurz die Fläche, Nutzung und den aktuellen Zustand oder senden Sie Fotos. Bei größeren Pflasterarbeiten vereinbaren wir eine Besichtigung und klären Untergrund, Wasserführung und gewünschten Aufbau vor Ort.',
      },
      faqHeading: 'Häufige Fragen zu Pflasterarbeiten',
      faq: [
        {
          q: 'Was kosten Pflasterarbeiten in Halle?',
          a: 'Die Kosten hängen von Fläche, Untergrund, Rückbau, Aufbau, Entwässerung und Material ab. Nach einer Besichtigung lässt sich der tatsächliche Aufwand zuverlässig einschätzen.',
        },
        {
          q: 'Wie lange dauern Pflasterarbeiten?',
          a: 'Die Dauer richtet sich nach Größe, Zugänglichkeit, notwendigem Rückbau, Unterbau und Material. Nach der Besichtigung können wir ein realistisches Zeitfenster nennen.',
        },
        {
          q: 'Kann eine alte Einfahrt neu gepflastert werden?',
          a: 'Ja. Vorher prüfen wir, welche Teile des vorhandenen Aufbaus weiter genutzt werden können und wo eine Erneuerung sinnvoll ist.',
        },
        {
          q: 'Übernehmen Sie auch die Entwässerung?',
          a: 'Ja. Gefälle, Wasserführung und geeignete Abläufe oder Sammelschächte können wir passend zur Situation mit planen und ausführen. Mögliche Vorgaben oder Genehmigungen werden projektbezogen geklärt.',
        },
        {
          q: 'Wie lange hält eine fachgerecht verlegte Fläche?',
          a: 'Die Haltbarkeit hängt von Untergrund, Aufbau, Nutzung, Material und Wasserführung ab. Deshalb betrachten wir nicht nur den sichtbaren Stein, sondern auch Unterbau, Einfassung und Entwässerung.',
        },
        {
          q: 'Übernehmen Sie Rückbau und Entsorgung?',
          a: 'Ja. Rückbau und Entsorgung der alten Pflaster- oder Asphaltfläche gehören zum Leistungsumfang.',
        },
        {
          q: 'Welches Pflaster ist für eine Pkw-Einfahrt geeignet?',
          a: 'Material, Format, Aufbau und Verlegeart müssen zur geplanten Fahrzeugbelastung passen. Welche Variante geeignet ist, stimmen wir auf Nutzung, Untergrund, Optik und Budget ab.',
        },
        {
          q: 'Pflastern Sie auch Terrassen und Gartenwege?',
          a: 'Ja. Neben Einfahrten übernehmen wir je nach Projekt auch Höfe, Terrassen, Stellplätze sowie Geh- und Gartenwege.',
        },
        {
          q: 'Wann ist die beste Zeit für Pflasterarbeiten?',
          a: 'Pflasterarbeiten sind weitgehend wetterunabhängig, solange der Boden frostfrei ist. Bei Dauerfrost oder stark durchnässtem Untergrund warten wir besser ein passendes Fenster ab.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale). Je nach Projektumfang arbeiten wir auch in Merseburg, Landsberg, Kabelsketal, Schkeuditz und weiteren Orten im nahen Umland.',
        },
      ],
    },
    ru: {
      title: 'Укладка брусчатки в Halle (Saale) — въезд, двор и терраса',
      metaTitle: 'Укладка брусчатки Halle | Въезд, двор и терраса | SorgfaltBau',
      metaDescription:
        'Укладка брусчатки в Halle (Saale): въезд, двор, терраса и дорожки — демонтаж, основание, уклон и водоотвод в одном согласованном процессе.',
      short: 'Въезды, дворы, террасы и дорожки с подходящим основанием и водоотводом.',
      intro: [
        'Въезд, двор, терраса или садовая дорожка: качественное мощение начинается не с видимой брусчатки, а с устойчивого основания, правильного уклона и продуманного отвода воды. SorgfaltBau выполняет укладку брусчатки в Halle (Saale) и окрестностях — от демонтажа старого покрытия и земляных работ до несущего слоя, бордюров и аккуратно уложенной поверхности.',
        'Конструкцию и материал подбираем под использование площадки. Въезд для автомобиля требует другого основания, чем пешеходная терраса или садовая дорожка.',
      ],
      includes: [
        'Въезды и подъезды к гаражу',
        'Дворы и площадки перед гаражом',
        'Террасы и входные зоны',
        'Парковочные места и площадки',
        'Пешеходные, садовые дорожки и переходы',
        'Демонтаж старой брусчатки и асфальта',
        'Несущее основание и щебёночный слой',
        'Укладка с уклоном и бордюром',
        'Уклон и организация отвода воды',
        'Сборные колодцы: круглые, квадратные, по размеру',
        'Бетонная брусчатка и натуральный камень по проекту',
      ],
      sections: [
        {
          heading: 'Какие площадки мы мостим в Halle?',
          body: 'Основание и материал зависят от назначения и нагрузки. Площадка для автомобиля требует другой подготовки, чем терраса или садовая дорожка, используемая только пешеходами.',
          points: [
            'Въезды и подъезды к гаражу',
            'Дворовые площадки',
            'Террасы',
            'Парковочные места',
            'Входные зоны',
            'Пешеходные дорожки',
            'Садовые дорожки',
            'Площадки перед гаражом',
            'Переходы между домом, двором и садом',
          ],
        },
        {
          heading: 'Укладка брусчатки на въезде в Halle — главное правильное основание',
          body: [
            'Въезд ежедневно испытывает нагрузку от автомобилей, погоды и влаги. Поэтому недостаточно просто уложить новую брусчатку на существующую поверхность. Важны устойчивый грунт, правильно подготовленные несущие слои, стабильный бордюр и уклон для контролируемого отвода дождевой воды.',
            'Перед началом проверяем существующее основание и определяем, какие слои можно использовать дальше, а какие разумно обновить. Это позволяет не демонтировать больше, чем действительно необходимо.',
          ],
        },
        {
          heading: 'Мощение двора и террасы',
          body: [
            'Для двора и террасы важны не только несущая способность, но и внешний вид, переходы и направление воды. Формат, рисунок укладки и материал должны соответствовать зданию и использованию площадки.',
            'На террасах особенно важны аккуратные примыкания к дому, саду, дверям или ступеням и организация уклона так, чтобы вода не направлялась к зданию.',
          ],
        },
        {
          heading: 'Уложить заново или отремонтировать существующую площадку?',
          body: [
            'Не каждую неровную или просевшую площадку нужно полностью перестраивать. Важно понять причину изменений. Если проблема только в отдельных камнях, может быть достаточно ограниченного ремонта. Если недостатки связаны с основанием, уклоном или водоотводом, часто разумнее более полное обновление.',
            'При осмотре оцениваем не только видимую поверхность, но и доступные признаки причины проблемы, после чего предлагаем подходящий объём.',
          ],
        },
        {
          heading: 'Основание и несущий слой определяют устойчивость',
          body: [
            'Основание распределяет нагрузку и служит стабильной базой для брусчатки. Если оно недостаточно устойчиво или уплотнено, со временем могут появиться колеи, просадки и смещения.',
            'Возможность сохранить существующие слои и необходимый способ подготовки зависят от грунта, нагрузки и состояния площадки. Это определяем на месте без универсальных обещаний по толщине для любого участка.',
          ],
        },
        {
          heading: 'Как спланировать уклон и отвод воды',
          body: [
            'Дождевую воду нужно учитывать уже при планировании. В зависимости от участка и существующих подключений решение может включать уклон поверхности, подходящие водоприёмники или сборные колодцы.',
            'На месте проверяем высоты, существующие подключения и направление воды, после чего согласуем исполнение для конкретной ситуации. Возможные требования и разрешения уточняются отдельно по проекту.',
          ],
        },
        {
          heading: 'Бетонная брусчатка или натуральный камень?',
          body: [
            'Бетонная брусчатка предлагает большой выбор форматов, цветов и поверхностей и подходит для многих въездов, дворов и дорожек. Натуральный камень выглядит индивидуальнее и может быть интересен для террас, входных зон и более выразительных проектов.',
            'Подходящий вариант зависит от назначения, желаемого вида и бюджета.',
          ],
        },
        {
          heading: 'Сколько стоит укладка брусчатки в Галле?',
          body: [
            'Стоимость зависит не только от площади. На цену влияют состояние основания, необходимость демонтажа старого покрытия и вывоза грунта, подготовка несущего слоя, бордюры, организация уклона и отвода воды, а также выбранный материал.',
            'Площадка с устойчивым основанием и небольшим объёмом подготовки рассчитывается иначе, чем въезд, где требуется снять асфальт, выбрать грунт и заново выполнить весь несущий слой.',
            'После осмотра участка можно определить реальный объём работ и подготовить понятное предложение.',
          ],
          points: [
            'Площадь в м²',
            'Состояние основания',
            'Демонтаж и земляные работы',
            'Вывоз материалов и грунта',
            'Необходимый несущий слой',
            'Бордюры и обрамление',
            'Уклон и водоотвод',
            'Выбранный материал',
            'Доступ к строительной площадке',
          ],
        },
      ],
      process: {
        heading: 'Как проходят работы по мощению с SorgfaltBau',
        steps: [
          {title: 'Запрос и фотографии', body: 'Вы описываете площадку, её назначение и желаемый результат. Фотографии помогают для первичной оценки.'},
          {title: 'Осмотр', body: 'Проверяем площадь, грунт, высоты, подъезд и существующее направление воды.'},
          {title: 'Планирование и предложение', body: 'Согласуем демонтаж, конструкцию основания, материал, водоотвод и порядок работ.'},
          {title: 'Демонтаж и подготовка', body: 'При необходимости удаляем старое покрытие и подготавливаем грунт.'},
          {title: 'Основание и укладка', body: 'Несущий слой, уклон, бордюры и брусчатка выполняются с учётом запланированного использования.'},
          {title: 'Передача', body: 'После завершения площадка передаётся в аккуратном и пригодном для использования состоянии.'},
        ],
      },
      guide: {
        heading: 'Полезная статья о въезде и наружных площадках',
        body: 'Подробнее об основании, водоотводе, въездах, террасах и планировании наружных площадок читайте в нашем материале.',
        anchor: 'Как правильно спланировать фасад, въезд и террасу',
        path: '/news/fassadensanierung-aussenanlagen-in-halle-fassade-einfahrt-terrasse',
      },
      trustPoints: [
        {value: '10+', label: 'лет практического опыта'},
        {value: '200+', label: 'выполненных задач от внутренних до наружных работ'},
      ],
      cta: {
        title: 'Нужно вымостить въезд, двор или террасу в Halle?',
        text: 'Кратко опишите площадку, её назначение и текущее состояние или пришлите фотографии. Для крупных работ согласуем осмотр и на месте уточним грунт, направление воды и желаемую конструкцию.',
      },
      faqHeading: 'Частые вопросы об укладке брусчатки',
      faq: [
        {
          q: 'Сколько стоит укладка брусчатки в Галле?',
          a: 'Стоимость зависит от площади, грунта, демонтажа, основания, водоотвода и материала. После осмотра можно надёжно оценить фактический объём работ.',
        },
        {
          q: 'Сколько времени занимают работы по мощению?',
          a: 'Срок зависит от размера, доступности, необходимого демонтажа, подготовки основания и материала. После осмотра мы называем реалистичный временной диапазон.',
        },
        {
          q: 'Можно ли заново вымостить старый въезд?',
          a: 'Да. Сначала проверяем, какие части существующего основания можно использовать дальше и где обновление действительно необходимо.',
        },
        {
          q: 'Делаете ли водоотвод?',
          a: 'Да. Уклон, направление воды, подходящие водоприёмники или сборные колодцы можно спланировать и выполнить по ситуации. Возможные требования и разрешения уточняются отдельно для проекта.',
        },
        {
          q: 'Сколько служит правильно уложенная площадка?',
          a: 'Срок службы зависит от грунта, основания, нагрузки, материала и направления воды. Поэтому учитываем не только видимую брусчатку, но и несущий слой, бордюры и водоотвод.',
        },
        {
          q: 'Выполняете демонтаж и вывоз?',
          a: 'Да. Демонтаж и вывоз старой брусчатки или асфальта входят в объём работ.',
        },
        {
          q: 'Какая брусчатка подходит для въезда под машину?',
          a: 'Материал, формат, основание и рисунок укладки должны соответствовать нагрузке от автомобилей. Подходящий вариант выбираем с учётом использования, грунта, внешнего вида и бюджета.',
        },
        {
          q: 'Мостите ли террасы и садовые дорожки?',
          a: 'Да. Кроме въездов, в зависимости от проекта выполняем дворы, террасы, парковочные места, пешеходные и садовые дорожки.',
        },
        {
          q: 'Когда лучше делать мощение?',
          a: 'Мощение почти не зависит от погоды, пока грунт не промёрз. При сильных морозах или сильно намокшем основании лучше дождаться подходящего окна.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale). В зависимости от объёма работ принимаем проекты в Merseburg, Landsberg, Kabelsketal, Schkeuditz и ближайших окрестностях.',
        },
      ],
    },
  },

  {
    slug: 'dachsanierung-halle',
    image: '/images/roof-repair-insulation.webp',
    serviceType: 'Dachreparatur und Dachdämmung',
    related: ['fassadendaemmung-halle', 'rohbau-halle', 'wohnungsrenovierung-halle'],
    de: {
      title: 'Dachreparatur und Dämmung in Halle (Saale)',
      metaTitle: 'Dachreparatur Halle (Saale) – Reparatur & Dämmung | SorgfaltBau',
      metaDescription:
        'Dachreparatur und Dachdämmung in Halle (Saale): Schadstellen beheben, abdichten und dämmen. Schnelle Einschätzung, saubere Ausführung, Hilfe bei akuten Schäden. Jetzt anfragen.',
      short: 'Schadstellen beheben, abdichten und dämmen.',
      intro:
        'Ein undichtes oder schlecht gedämmtes Dach kostet Bausubstanz und Energie – und wird mit der Zeit teurer. SorgfaltBau übernimmt Dachreparaturen und Dachdämmung in Halle (Saale) und Umgebung: von der einzelnen Schadstelle über die Abdichtung bis zur gedämmten Fläche, mit ehrlicher Einschätzung vor Ort.',
      includes: [
        'Dachreparaturen und Schadstellen',
        'Abdichtungsarbeiten',
        'Dachdämmung (Aufsparren, Zwischensparren, oberste Geschossdecke)',
        'Ausbesserung nach Sturm, Hagel oder Feuchte',
        'Wärmedämmung von Schornsteinen',
        'Anschlüsse, Kehlen und Durchdringungen',
        'Begleitende Trockenbau- und Innenarbeiten',
        'Einschätzung und Schadensaufnahme vor Ort',
      ],
      sections: [
        {
          heading: 'Erst die Ursache, dann die Reparatur',
          body: 'Wir suchen die tatsächliche Schadensursache, statt nur Symptome zu überdecken. Gerade bei Feuchteflecken liegt die Ursache oft an einer anderen Stelle als der sichtbare Schaden. So vermeiden Sie, dass dieselbe Stelle nach kurzer Zeit wieder Probleme macht.',
        },
        {
          heading: 'Reparatur und Dämmung zusammen denken',
          body: 'Wenn ohnehin am Dach gearbeitet wird, lohnt es sich oft, Reparatur und Dämmung zu verbinden. Eine gute Dachdämmung senkt Heizkosten spürbar und verbessert das Raumklima unter dem Dach – das spart Wege, Gerüst und Kosten.',
        },
        {
          heading: 'Dächer im Bestand von Halle',
          body: 'Vom steilen Gründerzeitdach in der Innenstadt bis zu Flachdächern und Anbauten im Umland: Jede Dachform hat ihre typischen Schwachstellen an Anschlüssen, Kehlen und Durchdringungen. Wir kennen diese Punkte und prüfen sie gezielt.',
        },
        {
          heading: 'Hilfe bei akuten Schäden',
          body: 'Bei akuten Undichtigkeiten nach Sturm oder Starkregen versuchen wir, kurzfristig eine erste Einschätzung und Sicherung zu ermöglichen, damit kein Folgeschaden entsteht. Melden Sie sich in solchen Fällen am besten telefonisch.',
        },
        {
          heading: 'Ehrliche Einschätzung vor Ort',
          body: 'Bei Dacharbeiten ist eine Besichtigung sinnvoll. Wir nehmen den Schaden auf, erklären Umfang und Möglichkeiten verständlich und nennen eine belastbare Einschätzung – ohne unnötige Arbeiten zu empfehlen.',
        },
      ],
      faq: [
        {
          q: 'Schauen Sie sich den Schaden vorab an?',
          a: 'Ja. Bei Dacharbeiten ist eine Besichtigung sinnvoll, damit Umfang, Material und Aufwand belastbar eingeschätzt werden können.',
        },
        {
          q: 'Übernehmen Sie auch kleine Reparaturen?',
          a: 'Ja, von der einzelnen undichten Stelle bis zur größeren Dämmfläche. Auch kleine Schäden beheben wir, bevor sie größer werden.',
        },
        {
          q: 'Wie schnell können Sie bei einem akuten Schaden helfen?',
          a: 'Bei akuten Schäden versuchen wir, kurzfristig eine erste Einschätzung und Sicherung zu ermöglichen. Rufen Sie in solchen Fällen am besten direkt an.',
        },
        {
          q: 'Lohnt sich eine Dachdämmung?',
          a: 'In den meisten Fällen ja. Eine gute Dämmung senkt Heizkosten und verbessert das Klima unter dem Dach. Wenn ohnehin am Dach gearbeitet wird, ist der Zusatzaufwand besonders wirtschaftlich.',
        },
        {
          q: 'Finden Sie auch die Ursache von Feuchteflecken?',
          a: 'Das ist unser Anspruch. Feuchte wandert oft, daher suchen wir die tatsächliche Quelle, statt nur den sichtbaren Fleck zu überdecken.',
        },
        {
          q: 'Gibt es Förderung für die Dachdämmung?',
          a: 'Energetische Maßnahmen können förderfähig sein; die Programme regeln BAFA und KfW und ändern sich. Wir führen die Arbeiten technisch passend aus; die Förderprüfung läuft über die offiziellen Stellen oder einen Energieberater.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig, Schkeuditz und das nahe Umland.',
        },
      ],
    },
    ru: {
      title: 'Ремонт и утепление крыши в Halle (Saale)',
      metaTitle: 'Ремонт крыши Halle – ремонт и утепление | SorgfaltBau',
      metaDescription:
        'Ремонт и утепление крыши в Halle (Saale): устранение протечек, гидроизоляция и утепление. Быстрая оценка, аккуратная работа, помощь при срочных повреждениях.',
      short: 'Устранение протечек, гидроизоляция и утепление.',
      intro:
        'Протекающая или плохо утеплённая крыша вредит зданию и тратит энергию — и со временем обходится дороже. SorgfaltBau выполняет ремонт и утепление крыши в Halle (Saale) и окрестностях: от отдельной протечки через гидроизоляцию до утеплённой поверхности, с честной оценкой на месте.',
      includes: [
        'Ремонт крыши и повреждений',
        'Гидроизоляционные работы',
        'Утепление крыши (над/между стропилами, перекрытие)',
        'Ремонт после бури, града или влаги',
        'Утепление дымоходов',
        'Примыкания, ендовы и проходы',
        'Сопутствующий гипсокартон и внутренние работы',
        'Оценка и осмотр повреждений на месте',
      ],
      sections: [
        {
          heading: 'Сначала причина, потом ремонт',
          body: 'Ищем настоящую причину повреждения, а не закрываем симптомы. При следах влаги источник часто не там, где видно пятно. Так одно и то же место не начнёт протекать снова через короткое время.',
        },
        {
          heading: 'Ремонт и утепление вместе',
          body: 'Если работа на крыше всё равно идёт, часто выгодно совместить ремонт и утепление. Хорошее утепление крыши ощутимо снижает расходы на отопление и улучшает климат под крышей — это экономит подходы, леса и деньги.',
        },
        {
          heading: 'Крыши в застройке Halle',
          body: 'От крутой грюндерзайт-крыши в центре до плоских крыш и пристроек в пригороде: у каждой формы свои слабые места — примыкания, ендовы, проходы. Знаем эти точки и проверяем их прицельно.',
        },
        {
          heading: 'Помощь при срочных повреждениях',
          body: 'При острых протечках после бури или ливня стараемся оперативно дать первую оценку и сделать временную защиту, чтобы не было новых повреждений. В таких случаях лучше позвонить.',
        },
        {
          heading: 'Честная оценка на месте',
          body: 'Для кровельных работ осмотр оправдан. Фиксируем повреждение, понятно объясняем объём и варианты и даём надёжную оценку — без лишних работ.',
        },
      ],
      faq: [
        {
          q: 'Осматриваете ли повреждение заранее?',
          a: 'Да. Для кровельных работ осмотр оправдан, чтобы надёжно оценить объём, материал и трудозатраты.',
        },
        {
          q: 'Берётесь ли за мелкий ремонт?',
          a: 'Да, от одной протечки до крупной площади утепления. Мелкие повреждения устраняем, пока они не выросли.',
        },
        {
          q: 'Как быстро поможете при срочном повреждении?',
          a: 'При острых случаях стараемся оперативно дать первую оценку и сделать временную защиту. В таких ситуациях лучше сразу позвонить.',
        },
        {
          q: 'Стоит ли утеплять крышу?',
          a: 'В большинстве случаев да. Хорошее утепление снижает расходы на отопление и улучшает климат под крышей. Если работа на крыше всё равно идёт, доплата особенно выгодна.',
        },
        {
          q: 'Находите ли причину следов влаги?',
          a: 'Это наш принцип. Влага часто мигрирует, поэтому ищем настоящий источник, а не закрываем видимое пятно.',
        },
        {
          q: 'Есть ли субсидии на утепление крыши?',
          a: 'Энергетические меры могут субсидироваться; программы регулируют BAFA и KfW и они меняются. Мы делаем работы технически правильно; проверка субсидий — через официальные органы или энергоконсультанта.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми районами, плюс Merseburg, Leipzig, Schkeuditz и ближайшие окрестности.',
        },
      ],
    },
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
