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
  intro: string;
  /** что входит в услугу */
  includes: string[];
  /** содержательные блоки */
  sections: {heading: string; body: string}[];
  /** вопрос-ответ (идёт и в FAQPage-разметку) */
  faq: {q: string; a: string}[];
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
      metaTitle: 'Badsanierung Halle (Saale) – Bad schlüsselfertig | SorgfaltBau',
      metaDescription:
        'Badsanierung in Halle (Saale): Fliesen, Sanitär, Abdichtung und Innenausbau schlüsselfertig aus einer Hand. Klare Termine, nachvollziehbare Kosten, barrierearme Lösungen. Jetzt anfragen.',
      short: 'Bad schlüsselfertig: Fliesen, Sanitär, Abdichtung.',
      intro:
        'Ein neues Bad verbindet viele Gewerke – Abriss, Installation, Abdichtung, Fliesen und Montage müssen genau ineinandergreifen. SorgfaltBau saniert Bäder in Halle (Saale) schlüsselfertig aus einer Hand und koordiniert die Schritte so, dass Reihenfolge, Termine und Qualität stimmen – ob kompaktes Altbaubad oder barrierearmer Umbau.',
      includes: [
        'Demontage, Abbruch und Entsorgung',
        'Sanitärinstallation innen (Zu- und Ableitungen)',
        'Fachgerechte Abdichtung im Nassbereich',
        'Wand- und Bodenfliesen',
        'Trockenbau, Vorwandinstallation und abgehängte Decke',
        'Montage von WC, Waschtisch, Dusche und Wanne',
        'Barrierearme und bodengleiche Duschen',
        'Maler- und Anschlussarbeiten bis fertig',
      ],
      sections: [
        {
          heading: 'Schlüsselfertig aus einer Hand',
          body: 'Bei einer Badsanierung greifen viele Gewerke ineinander. Sie haben bei uns einen Ansprechpartner für das gesamte Bad – wir stimmen Installation, Abdichtung, Fliesen und Montage so ab, dass keine Lücken oder Wartezeiten zwischen den Schritten entstehen. Das spart Nerven, Zeit und Abstimmungsaufwand.',
        },
        {
          heading: 'Abdichtung ernst genommen',
          body: 'Im Nassbereich entscheidet die Abdichtung über die Lebensdauer des ganzen Bades. Wir arbeiten hier nach den anerkannten Regeln, dichten Wand- und Bodenanschlüsse sorgfältig ab und dokumentieren die Schritte, bevor gefliest wird. So bleiben Feuchteschäden außen vor.',
        },
        {
          heading: 'Bäder im Altbau und im Plattenbau',
          body: 'Viele Bäder in Halle sind klein geschnitten – im Gründerzeit-Altbau ebenso wie in den Wohnungen in Halle-Neustadt. Mit durchdachter Vorwandinstallation, der richtigen Fliesenwahl und bodengleicher Dusche lässt sich auch auf wenigen Quadratmetern ein modernes, gut nutzbares Bad gestalten.',
        },
        {
          heading: 'Barrierearm und altersgerecht',
          body: 'Auf Wunsch planen wir das Bad barrierearm: bodengleiche Dusche, rutschhemmende Fliesen, gut erreichbare Armaturen und stabile Befestigungen für Haltegriffe. Das erhöht den Komfort heute und macht das Bad langfristig nutzbar.',
        },
        {
          heading: 'Termine und Kosten nachvollziehbar',
          body: 'Nach der Besichtigung nennen wir ein realistisches Zeitfenster und eine nachvollziehbare Kostenaufstellung. Auf Wunsch übernehmen wir die Materialbeschaffung oder arbeiten mit den von Ihnen gewählten Fliesen und Objekten. So behalten Sie den Überblick.',
        },
      ],
      faq: [
        {
          q: 'Wie lange ist das Bad nicht nutzbar?',
          a: 'Eine komplette Badsanierung dauert je nach Größe und Umfang meist ein bis drei Wochen. Wir nennen vorab ein realistisches Zeitfenster und informieren Sie über den Stand, damit Sie planen können.',
        },
        {
          q: 'Kümmern Sie sich um das Material?',
          a: 'Auf Wunsch übernehmen wir die Materialbeschaffung komplett oder arbeiten mit den von Ihnen ausgewählten Fliesen, Armaturen und Objekten. Was sinnvoll ist, klären wir beim Angebot.',
        },
        {
          q: 'Können Sie eine bodengleiche Dusche einbauen?',
          a: 'Ja. Bodengleiche, barrierearme Duschen gehören zu unserem Standard – inklusive passender Abdichtung, Gefälle und rutschhemmender Fliesen.',
        },
        {
          q: 'Übernehmen Sie auch Teilsanierungen?',
          a: 'Ja. Vom Austausch der Dusche oder einzelner Objekte bis zum kompletten Umbau – wir passen den Umfang an Ihr Vorhaben und Ihr Budget an.',
        },
        {
          q: 'Machen Sie auch die Elektrik im Bad?',
          a: 'Wir koordinieren die nötigen Arbeiten im Ablauf. Den fachgerechten Elektroanschluss führt ein Fachbetrieb aus; wir stimmen die Schnittstellen ab, damit alles zusammenpasst.',
        },
        {
          q: 'Arbeiten Sie auch in vermieteten Wohnungen?',
          a: 'Ja. Gerade vor einer Neuvermietung bringen wir Bäder zügig und sauber in einen modernen, übergabefähigen Zustand.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig, Schkeuditz und das nahe Umland.',
        },
      ],
    },
    ru: {
      title: 'Ремонт ванной в Halle (Saale)',
      metaTitle: 'Ремонт ванной Halle – под ключ | SorgfaltBau',
      metaDescription:
        'Ремонт ванной в Halle (Saale) под ключ: плитка, сантехника, гидроизоляция и отделка из одних рук. Понятные сроки и стоимость, решения без барьеров. Оставьте заявку.',
      short: 'Ванная под ключ: плитка, сантехника, гидроизоляция.',
      intro:
        'Новая ванная объединяет много работ — демонтаж, разводка, гидроизоляция, плитка и монтаж должны точно состыковаться. SorgfaltBau делает ванные в Halle (Saale) под ключ из одних рук и согласует этапы так, чтобы порядок, сроки и качество совпали — будь то компактная ванная в Altbau или ремонт без барьеров.',
      includes: [
        'Демонтаж, разборка и вывоз',
        'Внутренняя сантехника (подвод и слив)',
        'Профессиональная гидроизоляция мокрой зоны',
        'Плитка на стены и пол',
        'Гипсокартон, инсталляция и подвесной потолок',
        'Монтаж унитаза, раковины, душа и ванны',
        'Душ вровень с полом, без барьеров',
        'Малярные и финишные работы до готовности',
      ],
      sections: [
        {
          heading: 'Под ключ из одних рук',
          body: 'В ремонте ванной много работ идут встык. У вас один ответственный по всей ванной — согласуем разводку, гидроизоляцию, плитку и монтаж так, чтобы между этапами не было пробелов и простоев. Это экономит время, нервы и согласования.',
        },
        {
          heading: 'Серьёзно относимся к гидроизоляции',
          body: 'В мокрой зоне именно гидроизоляция определяет срок службы всей ванной. Работаем по правилам, тщательно проклеиваем примыкания стен и пола и фиксируем этапы до укладки плитки. Так протечки и плесень остаются в стороне.',
        },
        {
          heading: 'Ванные в Altbau и панельных домах',
          body: 'Многие ванные в Halle небольшие — и в грюндерзайт-домах, и в квартирах Halle-Neustadt. С продуманной инсталляцией, правильной плиткой и душем вровень с полом даже на нескольких квадратных метрах получается современная, удобная ванная.',
        },
        {
          heading: 'Без барьеров и на годы',
          body: 'По желанию проектируем ванную без барьеров: душ вровень с полом, нескользящая плитка, удобные смесители и надёжные крепления под поручни. Это и комфорт сейчас, и пригодность ванной на годы вперёд.',
        },
        {
          heading: 'Сроки и стоимость прозрачны',
          body: 'После осмотра называем реальные сроки и понятную смету. По желанию берём закупку материалов на себя или работаем с вашими плиткой и сантехникой. Вы держите всё под контролем.',
        },
      ],
      faq: [
        {
          q: 'Сколько ванная будет недоступна?',
          a: 'Полный ремонт в зависимости от площади и объёма обычно занимает от одной до трёх недель. Заранее называем реальные сроки и держим в курсе, чтобы вы могли планировать.',
        },
        {
          q: 'Закупаете ли материалы?',
          a: 'По желанию берём закупку полностью или работаем с выбранными вами плиткой, смесителями и сантехникой. Что разумнее — обсудим при расчёте.',
        },
        {
          q: 'Сделаете ли душ вровень с полом?',
          a: 'Да. Душ без порога — это наш стандарт: с правильной гидроизоляцией, уклоном и нескользящей плиткой.',
        },
        {
          q: 'Делаете ли частичный ремонт?',
          a: 'Да. От замены душа или отдельных предметов до полной перепланировки — подстраиваем объём под задачу и бюджет.',
        },
        {
          q: 'Делаете ли электрику в ванной?',
          a: 'Координируем нужные работы в общем графике. Электроподключение по нормам выполняет профильная фирма; мы согласуем стыки, чтобы всё совпало.',
        },
        {
          q: 'Работаете в сдаваемых квартирах?',
          a: 'Да. Перед сдачей быстро и чисто доводим ванную до современного состояния под передачу.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) со всеми районами, плюс Merseburg, Leipzig, Schkeuditz и ближайшие окрестности.',
        },
      ],
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
    serviceType: 'Wohnungsrenovierung',
    related: ['trockenbau-halle', 'badsanierung-halle', 'bodenbelaege-halle'],
    de: {
      title: 'Wohnungsrenovierung in Halle (Saale)',
      metaTitle: 'Wohnungsrenovierung Halle (Saale) – komplett | SorgfaltBau',
      metaDescription:
        'Wohnungsrenovierung in Halle (Saale): Renovierung bewohnter Wohnungen und Vorbereitung vor Neuvermietung. Maler, Trockenbau, Boden, Bad und Montage koordiniert aus einer Hand.',
      short: 'Komplette Renovierung – bewohnt oder vor Vermietung.',
      intro:
        'Ob bewohnte Wohnung oder Vorbereitung vor der Neuvermietung – eine Renovierung besteht selten aus einer einzigen Aufgabe. SorgfaltBau renoviert in Halle (Saale) und verbindet Maler-, Trockenbau-, Boden-, Bad- und Montagearbeiten zu einem klaren, koordinierten Ablauf, damit Termine und Qualität stimmen.',
      includes: [
        'Maler- und Spachtelarbeiten',
        'Trockenbau und Innenausbau',
        'Bodenbeläge und Sockelleisten',
        'Bad- und Sanitärarbeiten',
        'Montage von Türen und Fenstern',
        'Austausch von Armaturen und Sanitärobjekten',
        'Kleinreparaturen und Anpassungen',
        'Endreinigung und übergabefertige Räume',
      ],
      sections: [
        {
          heading: 'Mehrere Gewerke, ein Ablauf',
          body: 'Renovierungen bestehen selten aus einer Aufgabe. Wir bündeln Maler, Trockenbau, Boden und Montage sinnvoll, planen die richtige Reihenfolge und vermeiden so Wartezeiten, Doppelarbeit und unnötige Rückschritte. Ein Ansprechpartner koordiniert das Ganze.',
        },
        {
          heading: 'Bewohnt renovieren – mit Rücksicht',
          body: 'In vielen Fällen können Sie während der Arbeiten wohnen bleiben. Wir schützen Räume und Möbel, begrenzen Staub und stimmen die Reihenfolge so ab, dass möglichst immer ein Teil der Wohnung nutzbar bleibt. Die Belastung halten wir bewusst gering.',
        },
        {
          heading: 'Schnell wieder vermietbar',
          body: 'Zwischen zwei Mietern zählt jeder Tag. Wir bringen Wohnungen in Halle zügig und ordentlich in einen übergabefähigen Zustand – streichfertig, sauber und mit funktionierender Ausstattung. Das verkürzt Leerstand und Aufwand für Vermieter.',
        },
        {
          heading: 'Altbau und Plattenbau im Blick',
          body: 'Vom Gründerzeit-Altbau im Paulusviertel bis zur Wohnung in Halle-Neustadt: Jede Bausubstanz hat ihre Eigenheiten. Wir kennen typische Themen wie unebene Wände, alte Leitungen oder hohe Decken und planen die Renovierung passend dazu.',
        },
        {
          heading: 'Angebot in wenigen Tagen',
          body: 'Nach einer Besichtigung erhalten Sie in der Regel innerhalb von 2 bis 5 Werktagen ein nachvollziehbares Angebot. Kleinere Arbeiten lassen sich oft schneller einschätzen. So wissen Sie früh, woran Sie sind.',
        },
      ],
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
          a: 'Schwerpunkt ist Halle (Saale) mit allen Stadtteilen, dazu Merseburg, Leipzig, Schkeuditz und das nahe Umland.',
        },
      ],
    },
    ru: {
      title: 'Ремонт квартиры в Halle (Saale)',
      metaTitle: 'Ремонт квартиры Halle – комплексно | SorgfaltBau',
      metaDescription:
        'Ремонт квартир в Halle (Saale): ремонт жилых квартир и подготовка к сдаче. Малярка, гипсокартон, полы, ванная и монтаж — скоординированно из одних рук.',
      short: 'Комплексный ремонт — жилой или под сдачу.',
      intro:
        'Жилая квартира или подготовка к новой сдаче — ремонт редко состоит из одной задачи. SorgfaltBau делает ремонт в Halle (Saale) и связывает малярные, гипсокартонные, напольные, сантехнические и монтажные работы в понятный, скоординированный процесс, чтобы сроки и качество совпали.',
      includes: [
        'Малярные и шпаклёвочные работы',
        'Гипсокартон и внутренняя отделка',
        'Напольные покрытия и плинтусы',
        'Работы по ванной и сантехнике',
        'Установка дверей и окон',
        'Замена смесителей и сантехники',
        'Мелкий ремонт и подгонка',
        'Финальная уборка и сдача под ключ',
      ],
      sections: [
        {
          heading: 'Несколько работ — один процесс',
          body: 'Ремонт редко состоит из одной задачи. Логично объединяем малярку, гипсокартон, полы и монтаж, планируем правильный порядок и избегаем простоев, двойной работы и переделок. Всё координирует один ответственный.',
        },
        {
          heading: 'Ремонт в жилой квартире — бережно',
          body: 'Часто во время работ можно продолжать жить. Защищаем помещения и мебель, ограничиваем пыль и согласуем порядок так, чтобы часть квартиры по возможности всегда оставалась пригодной. Нагрузку держим минимальной.',
        },
        {
          heading: 'Быстро снова под сдачу',
          body: 'Между арендаторами важен каждый день. Быстро и аккуратно доводим квартиру в Halle до состояния под передачу — под покраску, чисто и с рабочей комплектацией. Это сокращает простой и хлопоты арендодателя.',
        },
        {
          heading: 'Учитываем Altbau и панель',
          body: 'От грюндерзайт-дома в Paulusviertel до квартиры в Halle-Neustadt: у каждой застройки свои особенности. Знаем типичные нюансы — неровные стены, старые коммуникации, высокие потолки — и планируем ремонт под них.',
        },
        {
          heading: 'Смета за несколько дней',
          body: 'После осмотра обычно за 2–5 рабочих дней даём понятную смету. Небольшие работы оцениваем быстрее. Вы рано понимаете условия.',
        },
      ],
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
          a: 'Основной район — Halle (Saale) со всеми районами, плюс Merseburg, Leipzig, Schkeuditz и ближайшие окрестности.',
        },
      ],
    },
  },

  {
    slug: 'pflasterarbeiten-halle',
    image: '/images/parking-driveways.webp',
    serviceType: 'Pflasterarbeiten und Einfahrten',
    related: ['rohbau-halle', 'fassadendaemmung-halle', 'dachsanierung-halle'],
    de: {
      title: 'Pflasterarbeiten und Einfahrten in Halle (Saale)',
      metaTitle: 'Pflasterarbeiten Halle (Saale) – Einfahrt & Hof | SorgfaltBau',
      metaDescription:
        'Pflasterarbeiten in Halle (Saale): Einfahrten, Parkflächen, Höfe und Wege schlüsselfertig – mit tragfähigem Unterbau, Gefälle und Entwässerung. Jetzt anfragen.',
      short: 'Einfahrten, Parkflächen und Höfe mit Entwässerung.',
      intro:
        'Eine Einfahrt muss tragen, Wasser ableiten und viele Jahre halten. SorgfaltBau übernimmt Pflasterarbeiten in Halle (Saale) und Umgebung schlüsselfertig – vom Rückbau der alten Fläche über tragfähigen Unterbau und Gefälle bis zur fertigen, sauber verlegten Fläche mit durchdachter Entwässerung.',
      includes: [
        'Einfahrten, Parkflächen und Hofflächen',
        'Geh- und Gartenwege',
        'Rückbau alter Pflaster- und Asphaltflächen',
        'Tragfähiger Unterbau und Tragschicht',
        'Verlegen mit Gefälle und Randeinfassung',
        'Entwässerung und Wasserführung',
        'Wassersammelschächte rund, quadratisch oder nach Maß',
        'Pflasterarten nach Wahl (Beton, Naturstein)',
      ],
      sections: [
        {
          heading: 'Unterbau und Entwässerung machen den Unterschied',
          body: 'Eine Einfahrt hält nur so gut wie ihr Unterbau. Wir planen Tragschicht, Gefälle und Wasserführung von Anfang an mit, sodass keine Pfützen stehen bleiben, der Belag stabil liegt und Niederschlag sauber zu den Sammelschächten geführt wird.',
        },
        {
          heading: 'Von der alten Fläche zur fertigen Einfahrt',
          body: 'Bei Bedarf bauen wir die alte Pflaster- oder Asphaltfläche zurück, entsorgen das Material, richten den Unterbau neu ein und verlegen das Pflaster sauber mit fester Randeinfassung – auch bei schwieriger Entwässerung oder beengten Verhältnissen.',
        },
        {
          heading: 'Tragfähig für Auto und Alltag',
          body: 'Eine Pkw-Einfahrt trägt andere Lasten als ein Gartenweg. Wir wählen Aufbau, Pflasterdicke und Verband passend zur Nutzung, damit die Fläche unter dem Gewicht von Fahrzeugen dauerhaft eben und tragfähig bleibt.',
        },
        {
          heading: 'Material und Optik nach Wunsch',
          body: 'Ob schlichtes Betonpflaster, Naturstein oder eine bestimmte Verlegeart – wir beraten zu Material, Farbe und Muster, das zu Haus und Garten passt. So entsteht eine Fläche, die funktioniert und gut aussieht.',
        },
        {
          heading: 'Sauber, termintreu, ordentlich übergeben',
          body: 'Wir arbeiten strukturiert, halten die Baustelle ordentlich und entsorgen Aushub und Altmaterial. Nach Abschluss übergeben wir eine saubere, nutzbare Fläche – mit klarer Absprache zu Ablauf und Termin vorab.',
        },
      ],
      faq: [
        {
          q: 'Übernehmen Sie auch die Entwässerung?',
          a: 'Ja. Gefälle, Wasserführung und Sammelschächte planen und setzen wir mit um – auch bei schwierigen oder wenig geneigten Flächen.',
        },
        {
          q: 'Wie lange hält eine fachgerecht verlegte Fläche?',
          a: 'Mit tragfähigem Unterbau und richtigem Gefälle viele Jahre. Genau deshalb investieren wir früh in Unterbau und Entwässerung statt nur in die sichtbare Oberfläche.',
        },
        {
          q: 'Reißen Sie die alte Fläche selbst ab?',
          a: 'Ja. Rückbau und Entsorgung der alten Pflaster- oder Asphaltfläche gehören zum Leistungsumfang.',
        },
        {
          q: 'Welches Pflaster ist für eine Pkw-Einfahrt geeignet?',
          a: 'Für Einfahrten wählen wir ausreichend dickes Pflaster und einen tragfähigen Aufbau, der Fahrzeuglasten aufnimmt. Material und Verband stimmen wir auf die Nutzung ab.',
        },
        {
          q: 'Können Sie auch nur einen Hof oder Weg pflastern?',
          a: 'Ja, vom kleinen Gartenweg über den Hof bis zur kompletten Einfahrt – den Umfang richten wir nach Ihrem Vorhaben.',
        },
        {
          q: 'Wann ist die beste Zeit für Pflasterarbeiten?',
          a: 'Pflasterarbeiten sind weitgehend wetterunabhängig, solange der Boden frostfrei ist. Bei Dauerfrost oder stark durchnässtem Untergrund warten wir besser ein passendes Fenster ab.',
        },
        {
          q: 'In welchem Gebiet arbeiten Sie?',
          a: 'Schwerpunkt ist Halle (Saale) und das nahe Umland – darunter Merseburg, Leipzig, Schkeuditz, Landsberg und Kabelsketal.',
        },
      ],
    },
    ru: {
      title: 'Мощение и въезды в Halle (Saale)',
      metaTitle: 'Мощение Halle – въезды и дворы | SorgfaltBau',
      metaDescription:
        'Мощение в Halle (Saale): въезды, парковки, дворы и дорожки под ключ — с несущим основанием, уклоном и водоотводом. Оставьте заявку.',
      short: 'Въезды, парковки и дворы с водоотводом.',
      intro:
        'Въезд должен держать нагрузку, отводить воду и служить годами. SorgfaltBau выполняет мощение в Halle (Saale) и окрестностях под ключ — от демонтажа старого покрытия через несущее основание и уклон до готовой, аккуратно уложенной площадки с продуманным водоотводом.',
      includes: [
        'Въезды, парковки и дворовые площадки',
        'Пешеходные и садовые дорожки',
        'Демонтаж старой брусчатки и асфальта',
        'Несущее основание и щебёночный слой',
        'Укладка с уклоном и бордюром',
        'Водоотвод и движение воды',
        'Сборные колодцы: круглые, квадратные, по размеру',
        'Тип брусчатки на выбор (бетон, натуральный камень)',
      ],
      sections: [
        {
          heading: 'Основание и водоотвод решают всё',
          body: 'Въезд держится ровно настолько, насколько хорошо основание. Планируем щебёночный слой, уклон и движение воды с самого начала, чтобы не стояли лужи, покрытие лежало стабильно, а осадки уходили в сборные колодцы.',
        },
        {
          heading: 'От старой площадки до готового въезда',
          body: 'При необходимости демонтируем старую брусчатку или асфальт, вывозим материал, заново формируем основание и аккуратно укладываем покрытие с твёрдым бордюром — в том числе при сложном водоотводе или тесных условиях.',
        },
        {
          heading: 'Под машину и быт',
          body: 'Въезд под автомобиль держит иные нагрузки, чем садовая дорожка. Подбираем конструкцию, толщину брусчатки и перевязку под эксплуатацию, чтобы площадка под весом машин оставалась ровной и несущей.',
        },
        {
          heading: 'Материал и вид на выбор',
          body: 'Простая бетонная брусчатка, натуральный камень или определённый рисунок укладки — советуем материал, цвет и узор под дом и сад. Получается площадка, которая работает и хорошо выглядит.',
        },
        {
          heading: 'Чисто, в срок, сдаём аккуратно',
          body: 'Работаем структурированно, держим площадку в порядке и вывозим грунт и старый материал. По завершении сдаём чистую, готовую к использованию площадку — с заранее согласованным порядком и сроком.',
        },
      ],
      faq: [
        {
          q: 'Делаете ли водоотвод?',
          a: 'Да. Уклон, движение воды и сборные колодцы планируем и устраиваем — в том числе на сложных и слабонаклонных площадках.',
        },
        {
          q: 'Сколько служит правильно уложенная площадка?',
          a: 'С несущим основанием и верным уклоном — много лет. Именно поэтому вкладываемся в основание и водоотвод, а не только в видимую поверхность.',
        },
        {
          q: 'Сносите ли старое покрытие сами?',
          a: 'Да. Демонтаж и вывоз старой брусчатки или асфальта входят в объём работ.',
        },
        {
          q: 'Какая брусчатка подходит для въезда под машину?',
          a: 'Для въездов берём достаточно толстую брусчатку и несущую конструкцию под нагрузку автомобилей. Материал и перевязку подбираем под эксплуатацию.',
        },
        {
          q: 'Можно ли замостить только двор или дорожку?',
          a: 'Да, от небольшой садовой дорожки и двора до целого въезда — объём под вашу задачу.',
        },
        {
          q: 'Когда лучше делать мощение?',
          a: 'Мощение почти не зависит от погоды, пока грунт не промёрз. При сильных морозах или сильно намокшем основании лучше дождаться подходящего окна.',
        },
        {
          q: 'В каком районе работаете?',
          a: 'Основной район — Halle (Saale) и ближайшие окрестности: Merseburg, Leipzig, Schkeuditz, Landsberg, Kabelsketal.',
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
