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
    // TODO: при наличии заменить на отдельное фото Rohbau/Massivbau
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
        'Badsanierung in Halle (Saale): Fliesen, Sanitär, Abdichtung und Innenausbau – schlüsselfertig aus einer Hand. Klare Termine und Kosten. Jetzt anfragen.',
      short: 'Bad schlüsselfertig: Fliesen, Sanitär, Abdichtung.',
      intro:
        'Ein neues Bad verbindet viele Gewerke: Abriss, Installation, Abdichtung, Fliesen und Montage. SorgfaltBau saniert Bäder in Halle (Saale) schlüsselfertig und koordiniert die Schritte so, dass die Reihenfolge stimmt.',
      includes: [
        'Demontage und Entsorgung',
        'Sanitärarbeiten innen (Zu- und Ableitungen)',
        'Abdichtung im Nassbereich',
        'Keramik- und Bodenfliesen',
        'Montage von Sanitärobjekten',
        'Maler- und Trockenbauarbeiten im Bad',
      ],
      sections: [
        {
          heading: 'Schlüsselfertig aus einer Hand',
          body: 'Sie haben einen Ansprechpartner für das gesamte Bad. Wir stimmen Installation, Abdichtung, Fliesen und Montage so ab, dass keine Lücken zwischen den Gewerken entstehen.',
        },
        {
          heading: 'Abdichtung ernst genommen',
          body: 'Gerade im Nassbereich entscheidet die Abdichtung über die Lebensdauer. Wir arbeiten hier sorgfältig und nachvollziehbar, bevor gefliest wird.',
        },
      ],
      faq: [
        {
          q: 'Wie lange ist das Bad nicht nutzbar?',
          a: 'Eine komplette Badsanierung dauert je nach Größe meist ein bis drei Wochen. Wir nennen vorab ein realistisches Zeitfenster und halten Sie über den Stand informiert.',
        },
        {
          q: 'Kümmern Sie sich um das Material?',
          a: 'Auf Wunsch übernehmen wir die Materialbeschaffung oder arbeiten mit von Ihnen ausgewählten Fliesen und Objekten. Das klären wir beim Angebot.',
        },
        {
          q: 'Übernehmen Sie auch Teilsanierungen?',
          a: 'Ja. Vom Austausch der Dusche bis zum kompletten Umbau – wir passen den Umfang an Ihr Vorhaben an.',
        },
      ],
    },
    ru: {
      title: 'Ремонт ванной в Halle (Saale)',
      metaTitle: 'Ремонт ванной Halle – под ключ | SorgfaltBau',
      metaDescription:
        'Ремонт ванной комнаты в Halle (Saale) под ключ: плитка, сантехника, гидроизоляция, отделка — из одних рук. Понятные сроки и стоимость. Оставьте заявку.',
      short: 'Ванная под ключ: плитка, сантехника, гидроизоляция.',
      intro:
        'Новая ванная объединяет много работ: демонтаж, разводку, гидроизоляцию, плитку и монтаж. SorgfaltBau делает ванные в Halle (Saale) под ключ и согласует этапы в правильном порядке.',
      includes: [
        'Демонтаж и вывоз',
        'Внутренняя сантехника (подвод и слив)',
        'Гидроизоляция мокрой зоны',
        'Керамическая и напольная плитка',
        'Установка сантехники',
        'Малярные работы и гипсокартон в ванной',
      ],
      sections: [
        {
          heading: 'Под ключ из одних рук',
          body: 'У вас один ответственный по всей ванной. Согласуем разводку, гидроизоляцию, плитку и монтаж так, чтобы между этапами не было пробелов.',
        },
        {
          heading: 'Серьёзно относимся к гидроизоляции',
          body: 'В мокрой зоне именно гидроизоляция определяет срок службы. Делаем её аккуратно и понятно — до укладки плитки.',
        },
      ],
      faq: [
        {
          q: 'Сколько ванная будет недоступна?',
          a: 'Полный ремонт обычно занимает от одной до трёх недель в зависимости от площади. Заранее называем реальные сроки и держим в курсе.',
        },
        {
          q: 'Закупаете ли материалы?',
          a: 'По желанию берём закупку на себя или работаем с выбранными вами плиткой и сантехникой. Обсуждаем при расчёте.',
        },
        {
          q: 'Делаете ли частичный ремонт?',
          a: 'Да. От замены душа до полной перепланировки — подстраиваем объём под вашу задачу.',
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
      metaTitle: 'Bodenleger Halle (Saale) – Laminat, Parkett, Fliesen | SorgfaltBau',
      metaDescription:
        'Bodenbeläge in Halle (Saale): Laminat, Vinyl, Fliesen und Holzboden-Restaurierung. Sauber verlegt, fester Termin. Jetzt kostenlose Einschätzung anfragen.',
      short: 'Laminat, Vinyl, Fliesen und Holzboden-Aufbereitung.',
      intro:
        'Der richtige Boden macht einen Raum aus. SorgfaltBau verlegt in Halle (Saale) alle gängigen Bodenbeläge und bereitet den Untergrund so vor, dass das Ergebnis eben, ruhig und langlebig ist.',
      includes: [
        'Laminat und Vinyl (Klick und vollflächig)',
        'Verlegung aller Bodenbeläge',
        'Keramik- und Bodenfliesen',
        'Untergrundvorbereitung und Ausgleich',
        'Restaurierung von Holzböden mit Beize und Klarlack',
        'Sockelleisten und Übergangsprofile',
      ],
      sections: [
        {
          heading: 'Der Untergrund entscheidet',
          body: 'Ein guter Boden beginnt unter dem Belag. Wir prüfen Ebenheit und Zustand, gleichen bei Bedarf aus und verlegen erst dann – das verhindert spätere Fugen, Knarren und Höhenunterschiede.',
        },
        {
          heading: 'Auch Aufarbeitung statt Austausch',
          body: 'Wo es sich lohnt, restaurieren wir bestehende Holzböden statt sie zu ersetzen – mit Schliff, Beize und Klarlack für ein frisches, langlebiges Ergebnis.',
        },
      ],
      faq: [
        {
          q: 'Muss der alte Boden raus?',
          a: 'Nicht immer. Je nach Zustand und Aufbau kann der neue Belag auf den alten – oder der Untergrund wird vorbereitet. Das prüfen wir vor Ort.',
        },
        {
          q: 'Verlegen Sie auch nur einen Raum?',
          a: 'Ja, vom einzelnen Zimmer bis zur kompletten Wohnung. Den Umfang richten wir nach Ihrem Vorhaben.',
        },
        {
          q: 'Wie schnell ist der Boden begehbar?',
          a: 'Laminat und Vinyl sind meist sofort nutzbar. Bei Fliesen oder Lackierungen planen wir die nötigen Trocknungszeiten mit ein.',
        },
      ],
    },
    ru: {
      title: 'Укладка напольных покрытий в Halle (Saale)',
      metaTitle: 'Полы Halle – ламинат, паркет, плитка | SorgfaltBau',
      metaDescription:
        'Напольные покрытия в Halle (Saale): ламинат, винил, плитка, восстановление деревянных полов. Ровно, аккуратно и в срок. Оставьте заявку.',
      short: 'Ламинат, винил, плитка и реставрация дерева.',
      intro:
        'Правильный пол задаёт характер помещения. SorgfaltBau укладывает в Halle (Saale) все распространённые покрытия и готовит основание так, чтобы результат был ровным, тихим и долговечным.',
      includes: [
        'Ламинат и винил (замковый и клеевой)',
        'Укладка любых напольных покрытий',
        'Керамическая и напольная плитка',
        'Подготовка и выравнивание основания',
        'Реставрация деревянных полов (морилка, лак)',
        'Плинтусы и переходные профили',
      ],
      sections: [
        {
          heading: 'Решает основание',
          body: 'Хороший пол начинается под покрытием. Проверяем ровность и состояние, при необходимости выравниваем и только потом укладываем — это исключает щели, скрип и перепады.',
        },
        {
          heading: 'Реставрация вместо замены',
          body: 'Где это оправдано, восстанавливаем деревянные полы вместо замены — шлифовка, морилка и лак дают свежий и долговечный результат.',
        },
      ],
      faq: [
        {
          q: 'Нужно ли снимать старый пол?',
          a: 'Не всегда. В зависимости от состояния новое покрытие можно уложить поверх или подготовить основание. Проверяем на месте.',
        },
        {
          q: 'Кладёте ли только одну комнату?',
          a: 'Да, от одной комнаты до всей квартиры. Объём — под вашу задачу.',
        },
        {
          q: 'Когда можно ходить по полу?',
          a: 'По ламинату и винилу обычно сразу. Для плитки и лака закладываем время высыхания.',
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
      metaTitle: 'Wohnungsrenovierung Halle (Saale) – Komplett | SorgfaltBau',
      metaDescription:
        'Wohnungsrenovierung in Halle (Saale): Renovierung bewohnter Wohnungen und Vorbereitung vor Neuvermietung. Mehrere Gewerke koordiniert aus einer Hand.',
      short: 'Komplette Renovierung – bewohnt oder vor Vermietung.',
      intro:
        'Ob bewohnte Wohnung oder Vorbereitung vor der Neuvermietung: SorgfaltBau renoviert in Halle (Saale) und verbindet mehrere Arbeitsschritte – Trockenbau, Maler, Boden, Bad und Montage – zu einem nachvollziehbaren Ablauf.',
      includes: [
        'Maler- und Spachtelarbeiten',
        'Trockenbau und Innenausbau',
        'Bodenbeläge und Sockelleisten',
        'Bad- und Sanitärarbeiten',
        'Montage von Türen und Fenstern',
        'Kleinere Reparaturen und Endreinigung',
      ],
      sections: [
        {
          heading: 'Mehrere Gewerke, ein Ablauf',
          body: 'Renovierungen bestehen selten aus einer Aufgabe. Wir bündeln die Schritte sinnvoll, planen die Reihenfolge und vermeiden so Wartezeiten, Doppelarbeit und unnötige Rückschritte.',
        },
        {
          heading: 'Schnell wieder vermietbar',
          body: 'Zwischen zwei Mietern zählt jeder Tag. Wir bringen Wohnungen zügig und ordentlich in einen übergabefähigen Zustand – streichfertig und sauber.',
        },
      ],
      faq: [
        {
          q: 'Können wir während der Renovierung wohnen bleiben?',
          a: 'In vielen Fällen ja. Wir schützen die Räume, begrenzen Staub und stimmen die Reihenfolge so ab, dass die Wohnung nutzbar bleibt.',
        },
        {
          q: 'Wie schnell kommt ein Angebot?',
          a: 'In der Regel innerhalb von 2 bis 5 Werktagen nach der Besichtigung. Kleinere Arbeiten lassen sich oft schneller einschätzen.',
        },
        {
          q: 'Übernehmen Sie auch einzelne Räume?',
          a: 'Ja, vom einzelnen Zimmer bis zur kompletten Wohnung – den Umfang richten wir nach Ihrem Bedarf.',
        },
      ],
    },
    ru: {
      title: 'Ремонт квартиры в Halle (Saale)',
      metaTitle: 'Ремонт квартиры Halle – комплексно | SorgfaltBau',
      metaDescription:
        'Ремонт квартир в Halle (Saale): ремонт жилых квартир и подготовка к сдаче в аренду. Несколько видов работ из одних рук с понятным порядком.',
      short: 'Комплексный ремонт — жилой или под сдачу.',
      intro:
        'Жилая квартира или подготовка к новой сдаче: SorgfaltBau делает ремонт в Halle (Saale) и связывает несколько этапов — гипсокартон, малярка, полы, ванная, монтаж — в понятный процесс.',
      includes: [
        'Малярные и шпаклёвочные работы',
        'Гипсокартон и внутренняя отделка',
        'Напольные покрытия и плинтусы',
        'Работы по ванной и сантехнике',
        'Установка дверей и окон',
        'Мелкий ремонт и финальная уборка',
      ],
      sections: [
        {
          heading: 'Несколько работ — один процесс',
          body: 'Ремонт редко состоит из одной задачи. Логично объединяем этапы, планируем порядок и избегаем простоев, двойной работы и переделок.',
        },
        {
          heading: 'Быстро снова под сдачу',
          body: 'Между арендаторами важен каждый день. Быстро и аккуратно доводим квартиру до состояния под передачу — под покраску и чисто.',
        },
      ],
      faq: [
        {
          q: 'Можно ли жить во время ремонта?',
          a: 'Часто да. Защищаем помещения, ограничиваем пыль и согласуем порядок так, чтобы квартирой можно было пользоваться.',
        },
        {
          q: 'Как быстро будет смета?',
          a: 'Обычно в течение 2–5 рабочих дней после осмотра. Небольшие работы оцениваем быстрее.',
        },
        {
          q: 'Делаете ли отдельные комнаты?',
          a: 'Да, от одной комнаты до всей квартиры — объём под ваши задачи.',
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
        'Pflasterarbeiten in Halle (Saale): Einfahrten, Parkflächen und Höfe schlüsselfertig – inkl. Gefälle, Entwässerung und Sammelschächten. Jetzt anfragen.',
      short: 'Einfahrten, Parkflächen und Höfe mit Entwässerung.',
      intro:
        'Eine Einfahrt muss tragen, entwässern und Jahre halten. SorgfaltBau übernimmt Pflasterarbeiten in Halle (Saale) schlüsselfertig – mit dem passenden Unterbau, Gefälle und einer durchdachten Entwässerung.',
      includes: [
        'Parkflächen und Einfahrten schlüsselfertig',
        'Rückbau alter Pflasterflächen',
        'Unterbau und Tragschicht',
        'Pflasterflächen mit Gefälle',
        'Entwässerung zu Sammelschächten',
        'Wassersammelschächte rund, quadratisch oder nach Maß',
      ],
      sections: [
        {
          heading: 'Unterbau und Entwässerung machen den Unterschied',
          body: 'Wir planen Gefälle und Wasserführung von Anfang an mit. So entstehen keine Pfützen, der Belag bleibt stabil und Niederschlag wird sauber zu Sammelschächten geführt.',
        },
        {
          heading: 'Von der alten Fläche zur fertigen Einfahrt',
          body: 'Bei Bedarf bauen wir die alte Fläche zurück, richten den Unterbau neu ein und verlegen das Pflaster sauber – auch bei schwieriger Entwässerung.',
        },
      ],
      faq: [
        {
          q: 'Übernehmen Sie auch die Entwässerung?',
          a: 'Ja. Gefälle, Wasserführung und Sammelschächte planen und setzen wir mit um – auch bei schwierigen Flächen.',
        },
        {
          q: 'Wie lange hält eine fachgerecht verlegte Fläche?',
          a: 'Mit tragfähigem Unterbau und richtigem Gefälle viele Jahre. Genau deshalb investieren wir früh in die Vorbereitung.',
        },
        {
          q: 'Reißen Sie die alte Fläche selbst ab?',
          a: 'Ja, Rückbau und Entsorgung der alten Pflasterfläche gehören zum Leistungsumfang.',
        },
      ],
    },
    ru: {
      title: 'Мощение и въезды в Halle (Saale)',
      metaTitle: 'Мощение Halle – въезды и дворы | SorgfaltBau',
      metaDescription:
        'Мощение в Halle (Saale): въезды, парковки и дворы под ключ — с уклоном, водоотводом и сборными колодцами. Оставьте заявку.',
      short: 'Въезды, парковки и дворы с водоотводом.',
      intro:
        'Въезд должен держать нагрузку, отводить воду и служить годами. SorgfaltBau выполняет мощение в Halle (Saale) под ключ — с правильным основанием, уклоном и продуманным водоотводом.',
      includes: [
        'Парковки и въезды под ключ',
        'Демонтаж старого покрытия',
        'Основание и несущий слой',
        'Мощение с уклоном',
        'Водоотвод в сборные колодцы',
        'Сборные колодцы: круглые, квадратные, по размеру',
      ],
      sections: [
        {
          heading: 'Основание и водоотвод решают всё',
          body: 'Уклон и движение воды планируем с самого начала. Так не появляются лужи, покрытие остаётся стабильным, а осадки аккуратно уходят в колодцы.',
        },
        {
          heading: 'От старой площадки до готового въезда',
          body: 'При необходимости демонтируем старое покрытие, заново формируем основание и аккуратно укладываем брусчатку — в том числе при сложном водоотводе.',
        },
      ],
      faq: [
        {
          q: 'Делаете ли водоотвод?',
          a: 'Да. Уклон, движение воды и сборные колодцы планируем и устраиваем — в том числе на сложных площадках.',
        },
        {
          q: 'Сколько служит правильно уложенная площадка?',
          a: 'С несущим основанием и верным уклоном — много лет. Именно поэтому уделяем внимание подготовке.',
        },
        {
          q: 'Сносите ли старое покрытие сами?',
          a: 'Да, демонтаж и вывоз старой брусчатки входят в объём работ.',
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
        'Dachreparatur und Dachdämmung in Halle (Saale): Schadstellen beheben, abdichten und dämmen. Schnelle Einschätzung, saubere Ausführung. Jetzt anfragen.',
      short: 'Schadstellen beheben, abdichten und dämmen.',
      intro:
        'Ein undichtes oder schlecht gedämmtes Dach kostet Substanz und Energie. SorgfaltBau übernimmt Dachreparaturen und Dachdämmung in Halle (Saale) – von der einzelnen Schadstelle bis zur gedämmten Fläche.',
      includes: [
        'Dachreparaturen und Schadstellen',
        'Dachdämmung',
        'Abdichtungsarbeiten',
        'Ausbesserung nach Sturm oder Feuchte',
        'Wärmedämmung von Schornsteinen',
        'Einschätzung vor Ort',
      ],
      sections: [
        {
          heading: 'Erst die Ursache, dann die Reparatur',
          body: 'Wir suchen die tatsächliche Schadensursache, statt nur Symptome zu überdecken. So vermeiden Sie, dass dieselbe Stelle nach kurzer Zeit wieder Probleme macht.',
        },
        {
          heading: 'Reparatur und Dämmung zusammen denken',
          body: 'Wenn ohnehin am Dach gearbeitet wird, lohnt es sich oft, Reparatur und Dämmung zu verbinden – das spart Wege und verbessert die Energiebilanz.',
        },
      ],
      faq: [
        {
          q: 'Schauen Sie sich den Schaden vorab an?',
          a: 'Ja. Bei Dacharbeiten ist eine Besichtigung sinnvoll, damit Umfang, Material und Aufwand belastbar eingeschätzt werden.',
        },
        {
          q: 'Übernehmen Sie auch kleine Reparaturen?',
          a: 'Ja, von der einzelnen undichten Stelle bis zur größeren Dämmfläche.',
        },
        {
          q: 'Wie schnell können Sie bei einem akuten Schaden helfen?',
          a: 'Bei akuten Schäden versuchen wir, kurzfristig eine erste Einschätzung und Sicherung zu ermöglichen. Melden Sie sich am besten telefonisch.',
        },
      ],
    },
    ru: {
      title: 'Ремонт и утепление крыши в Halle (Saale)',
      metaTitle: 'Ремонт крыши Halle – ремонт и утепление | SorgfaltBau',
      metaDescription:
        'Ремонт и утепление крыши в Halle (Saale): устранение протечек, гидроизоляция и утепление. Быстрая оценка и аккуратная работа. Оставьте заявку.',
      short: 'Устранение протечек, гидроизоляция и утепление.',
      intro:
        'Протекающая или плохо утеплённая крыша вредит зданию и тратит энергию. SorgfaltBau выполняет ремонт и утепление крыши в Halle (Saale) — от отдельной протечки до утеплённой поверхности.',
      includes: [
        'Ремонт крыши и повреждений',
        'Утепление крыши',
        'Гидроизоляционные работы',
        'Ремонт после непогоды и влаги',
        'Утепление дымоходов',
        'Оценка на месте',
      ],
      sections: [
        {
          heading: 'Сначала причина, потом ремонт',
          body: 'Ищем настоящую причину повреждения, а не закрываем симптомы. Так одно и то же место не начнёт протекать снова через короткое время.',
        },
        {
          heading: 'Ремонт и утепление вместе',
          body: 'Если работа на крыше всё равно идёт, часто выгодно совместить ремонт и утепление — это экономит подходы и улучшает энергобаланс.',
        },
      ],
      faq: [
        {
          q: 'Осматриваете ли повреждение заранее?',
          a: 'Да. Для кровельных работ осмотр оправдан, чтобы надёжно оценить объём, материал и трудозатраты.',
        },
        {
          q: 'Берётесь ли за мелкий ремонт?',
          a: 'Да, от одной протечки до крупной площади утепления.',
        },
        {
          q: 'Как быстро поможете при срочном повреждении?',
          a: 'При срочных случаях стараемся оперативно дать первую оценку и сделать временную защиту. Лучше позвоните.',
        },
      ],
    },
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
