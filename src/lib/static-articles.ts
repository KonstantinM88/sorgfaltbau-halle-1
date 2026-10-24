// Ратгеберы, которые живут в коде, а не в БД админки.
// Собраны 24.10.2026 по кластерам запросов GSC (см. docs/seo/articles/README.md).
// Если в БД появится статья с тем же slug, побеждает версия из БД.
// Немецкие заголовки и подзаголовки внутри текста не менять: к ним привязаны
// contextualLinksBySlug в ArticleClient.tsx и FAQPage из getArticleFaqSchema.

export type StaticArticle = {
  id: string;
  slug: string;
  title: string;
  titleRu: string;
  excerpt: string;
  excerptRu: string;
  metaTitle: string | null;
  metaTitleRu: string | null;
  metaDesc: string | null;
  metaDescRu: string | null;
  content: string;
  contentRu: string;
  coverUrl: string | null;
  coverWidth: number;
  coverHeight: number;
  published: boolean;
  publishedAt: Date;
  updatedAt: Date;
};

export const STATIC_ARTICLES: StaticArticle[] = [
  {
    id: 'static-einfahrt-pflastern-in-halle-unterbau-gefaelle-entwaesserung-und-kosten',
    slug: "einfahrt-pflastern-in-halle-unterbau-gefaelle-entwaesserung-und-kosten",
    title: "Einfahrt pflastern in Halle: Unterbau, Gefälle, Entwässerung und Kosten",
    titleRu: "Въезд из брусчатки в Halle: основание, уклон, водоотвод и стоимость",
    excerpt: "Eine gepflasterte Einfahrt hält nur so gut wie ihr Unterbau. Wir erklären, welcher Aufbau für Pkw nötig ist, wie viel Gefälle eine Einfahrt braucht, wohin das Regenwasser soll und wovon die Kosten in Halle (Saale) abhängen.",
    excerptRu: "Мощёный въезд служит столько, сколько служит его основание. Рассказываем, какое основание нужно под легковой автомобиль, какой уклон делать, куда отводить дождевую воду и от чего зависит стоимость в Halle (Saale).",
    metaTitle: "Einfahrt pflastern in Halle: Aufbau & Kosten",
    metaTitleRu: "Въезд из брусчатки: основание и стоимость",
    metaDesc: "Einfahrt pflastern in Halle (Saale): welcher Unterbau für Pkw nötig ist, wie viel Gefälle, wohin das Regenwasser soll und wovon die Kosten abhängen.",
    metaDescRu: "Въезд из брусчатки в Halle (Saale): какое основание нужно под автомобиль, какой уклон, куда отводить воду и от чего зависит стоимость работ.",
    content: `## Das Wichtigste in Kürze
- Eine befahrbare Einfahrt hält nur so lange wie ihr Unterbau. Tragschicht, Verdichtung und Bettung entscheiden über die Haltbarkeit mehr als der Pflasterstein selbst.
- Unter dem Pflaster einer Pkw-Einfahrt liegt häufig ein Gesamtaufbau von etwa 30 bis 50 cm. Die genaue Stärke hängt vom Boden, von der Frostgefahr und von der Belastung ab.
- Die Fläche braucht ein Gefälle von etwa 2 bis 2,5 Prozent, immer weg vom Haus.
- Das Regenwasser muss vor dem Bau geplant werden: Versickerung, Rinne oder Sammelschacht.
- Seriöse Kosten lassen sich erst nach einer Besichtigung nennen, weil Rückbau, Boden und Entwässerung von Grundstück zu Grundstück stark abweichen.

## Warum der Unterbau wichtiger ist als der Pflasterstein
Spurrillen, abgesackte Steine, wackelnde Randsteine und Pfützen haben fast immer eine Ursache unter der Oberfläche. Wenn die Tragschicht zu dünn ist, nicht lagenweise verdichtet wurde oder Wasser nicht abfließen kann, gibt die Fläche unter der Last eines Autos nach. Ein teurer Stein gleicht diese Fehler nicht aus.
Auf älteren Grundstücken in Halle (Saale) können Auffüllungen, alter Bauschutt oder bindiger, lehmiger Boden vorkommen, der Wasser nur schlecht durchlässt. Deshalb prüfen wir vor jeder Einfahrt zuerst den Untergrund und die vorhandenen Höhen.

## Der Aufbau einer befahrbaren Einfahrt Schritt für Schritt
- Aushub: Der Boden wird so tief ausgehoben, wie es der geplante Aufbau erfordert. Ungeeignetes Material wird entfernt und entsorgt.
- Planum: Der Untergrund wird mit dem späteren Gefälle profiliert und verdichtet.
- Tragschicht: Frostsicheres Schotter-Splitt-Gemisch wird in Lagen eingebaut und jede Lage einzeln verdichtet.
- Randeinfassung: Bordsteine oder Tiefborde werden in Beton gesetzt, damit die Fläche nicht seitlich ausweicht.
- Bettung: Eine etwa 3 bis 5 cm starke Splittschicht wird eben abgezogen. Sie dient nicht dazu, Unebenheiten der Tragschicht auszugleichen.
- Verlegen: Die Steine werden im passenden Verband mit Fugen von wenigen Millimetern verlegt. Für befahrene Flächen eignet sich zum Beispiel der Fischgrätverband.
- Verfugen und Abrütteln: Fugenmaterial wird eingekehrt, die Fläche mit einer Rüttelplatte mit Gummischürze abgerüttelt und anschließend nachgesandet.

## Wie viel Gefälle braucht eine Einfahrt?
Üblich ist ein Gefälle von etwa 2 bis 2,5 Prozent, also 2 bis 2,5 cm Höhenunterschied pro Meter. Das Wasser muss immer vom Gebäude weg geführt werden. Bei langen oder breiten Flächen reicht ein einfaches Gefälle oft nicht aus, dann wird das Wasser über eine Rinne gesammelt.
Fällt die Einfahrt zur Garage oder zum Haus hin, gehört eine Entwässerungsrinne vor das Tor. Diese Höhen müssen vor dem Aushub festgelegt werden, nicht erst beim Verlegen.

## Wohin mit dem Regenwasser?
- Versickerung auf dem eigenen Grundstück, zum Beispiel in eine angrenzende Rasenfläche oder Mulde, wenn der Boden durchlässig genug ist.
- Versickerungsfähiges Pflaster oder Pflaster mit breiten Fugen. Das funktioniert nur, wenn auch Bettung und Tragschicht Wasser durchlassen.
- Rinne mit Sammelschacht. Ein Anschluss an den öffentlichen Kanal ist nur nach Abstimmung mit dem zuständigen Entsorger möglich.
Viele Kommunen rechnen Niederschlagswasser getrennt nach der angeschlossenen befestigten Fläche ab. Ob eine neue oder größere Pflasterfläche Ihre Gebühr in Halle (Saale) verändert, sollten Sie vor dem Bau beim zuständigen Abwasserentsorger klären.

## Welches Pflaster eignet sich für eine Einfahrt?
- Betonpflaster: Für Pkw-Einfahrten werden in der Regel Steine mit 8 cm Stärke verwendet. 6 cm starke Steine sind eher für Wege und Terrassen gedacht.
- Naturstein wie Granit: sehr langlebig, aber aufwendiger in Verlegung und Material.
- Klinkerpflaster: farbbeständig und hart, braucht eine sorgfältige Bettung.
- Rasengitter- oder Ökopflaster: lässt mehr Wasser versickern, eignet sich aber nicht für jede Nutzung.

## Braucht man für eine Einfahrt eine Genehmigung?
Eine Pflasterfläche auf dem eigenen Grundstück ist häufig genehmigungsfrei. Ein Bebauungsplan kann jedoch die Versiegelung begrenzen, und bei Denkmalschutz gelten eigene Regeln. Die Absenkung des öffentlichen Bordsteins für eine neue Zufahrt ist eine Maßnahme im öffentlichen Straßenraum und muss bei der Stadt beantragt werden.

## Wovon hängen die Kosten einer gepflasterten Einfahrt ab?
- Größe und Form der Fläche, Anzahl der Ecken, Bögen und Anschlüsse.
- Rückbau und Entsorgung des alten Belags, zum Beispiel Beton, Asphalt oder altes Pflaster.
- Aushubtiefe und ein möglicher Bodenaustausch.
- Steinart, Format und Verlegemuster.
- Entwässerung mit Rinnen, Schächten oder Versickerung.
- Zugänglichkeit für Maschinen und Material.
- Höhenanschlüsse an Garage, Haustür, Gehweg und Nachbargrundstück.
Eine Pauschale pro Quadratmeter nennen wir bewusst nicht. Zwei Einfahrten gleicher Größe können sehr unterschiedlich viel Aufwand bedeuten, wenn unter der einen alter Beton liegt und unter der anderen guter Boden.

## Typische Fehler, die später teuer werden
- Zu dünne oder nicht lagenweise verdichtete Tragschicht.
- Bettung als Ausgleichsschicht für Unebenheiten.
- Kein oder falsches Gefälle, Wasser läuft zum Haus.
- Fehlende oder nicht in Beton gesetzte Randeinfassung.
- Nicht vollständig gefüllte Fugen.
- Regenwasser wird auf das Nachbargrundstück geleitet.

## So gehen wir bei einer Einfahrt in Halle vor
Nach Ihrer Anfrage mit Fotos und ungefähren Maßen schauen wir uns die Fläche vor Ort an. Wir prüfen Untergrund, Höhen, Anschlüsse und Wasserführung und schlagen einen Aufbau vor, der zur Nutzung passt. Das Angebot beschreibt Rückbau, Aufbau, Material und Entwässerung nachvollziehbar, sodass Sie wissen, wofür Sie bezahlen.

## Häufige Fragen
### Wie dick muss der Unterbau einer Einfahrt sein?
Für Pkw-Einfahrten liegt der Gesamtaufbau unter dem Pflaster häufig bei etwa 30 bis 50 cm. Entscheidend sind die Tragfähigkeit des Bodens, die Frostgefahr und die Belastung. Ein tragfähiger, durchlässiger Boden braucht weniger Aufbau als ein lehmiger oder aufgefüllter Untergrund.
### Wie viel Gefälle braucht eine gepflasterte Einfahrt?
Üblich sind etwa 2 bis 2,5 Prozent, also 2 bis 2,5 cm pro Meter, immer vom Gebäude weg. Wo das nicht möglich ist, sammelt eine Rinne das Wasser.
### Kann man alte Pflastersteine wiederverwenden?
Ja, wenn die Steine unbeschädigt sind und zur Nutzung passen. Der Unterbau sollte trotzdem geprüft und bei Bedarf erneuert werden, weil dort meist die Ursache für eine unebene Fläche liegt.
### Wann ist die beste Zeit zum Pflastern?
Gepflastert wird bei frostfreiem Wetter und ohne Dauerregen, in der Regel vom Frühjahr bis in den Herbst. Ein gefrorener oder durchnässter Untergrund lässt sich nicht fachgerecht verdichten.
### Kann man auf eine bestehende Fläche einfach neu pflastern?
Pflaster direkt auf alten Beton oder Asphalt zu legen, führt häufig zu Wasserproblemen und Rissen. Meist ist es dauerhafter, den alten Belag zurückzubauen und einen passenden Unterbau herzustellen.`,
    contentRu: `## Коротко о главном
- Въезд для автомобиля служит ровно столько, сколько его основание. Несущий слой, уплотнение и постель важнее, чем сама брусчатка.
- Под брусчаткой въезда для легкового автомобиля обычно делают основание общей толщиной примерно 30–50 см. Точная толщина зависит от грунта, промерзания и нагрузки.
- Нужен уклон примерно 2–2,5 %, всегда от дома.
- Отвод дождевой воды планируют до начала работ: впитывание, лоток или колодец.
- Честную стоимость можно назвать только после осмотра, потому что демонтаж, грунт и водоотвод на каждом участке разные.

## Почему основание важнее брусчатки
Колеи, просевшие камни, шатающийся бордюр и лужи почти всегда имеют причину под поверхностью. Если несущий слой слишком тонкий, его не уплотняли послойно или вода не может уйти, покрытие проседает под весом автомобиля. Дорогой камень эти ошибки не исправит.
На старых участках в Halle (Saale) могут встречаться насыпные грунты, старый строительный мусор или глинистый грунт, который плохо пропускает воду. Поэтому перед каждым въездом мы сначала проверяем грунт и существующие высоты.

## Устройство въезда для автомобиля по шагам
- Выемка грунта на глубину, которую требует выбранная конструкция. Непригодный грунт вывозится.
- Подготовка основания: грунт профилируют с будущим уклоном и уплотняют.
- Несущий слой: морозостойкую щебёночную смесь укладывают слоями и уплотняют каждый слой отдельно.
- Бордюр: бортовой камень устанавливают на бетон, чтобы покрытие не расползалось в стороны.
- Постель: слой отсева или мелкого щебня толщиной примерно 3–5 см выравнивают по правилу. Он не предназначен для исправления неровностей несущего слоя.
- Укладка: камни кладут в подходящей перевязке со швами в несколько миллиметров. Для проезжих площадок подходит, например, укладка ёлочкой.
- Заполнение швов и вибрация: швы засыпают, покрытие прокатывают виброплитой с резиновым ковриком и досыпают швы.

## Какой уклон нужен въезду?
Обычно делают уклон около 2–2,5 %, то есть 2–2,5 см перепада на метр. Вода всегда должна уходить от здания. На длинных или широких площадках одного уклона часто недостаточно, тогда воду собирает лоток.
Если въезд идёт под уклон к гаражу или дому, перед воротами ставят водоотводный лоток. Эти высоты определяют до выемки грунта, а не во время укладки.

## Куда отводить дождевую воду?
- Впитывание на своём участке, например в соседний газон или в дренажную канаву, если грунт достаточно проницаем.
- Водопроницаемая брусчатка или брусчатка с широкими швами. Это работает, только если постель и несущий слой тоже пропускают воду.
- Лоток с водосборным колодцем. Подключение к городской канализации возможно только по согласованию с организацией, которая отвечает за водоотведение.
Многие коммуны рассчитывают плату за дождевую воду отдельно по площади подключённых твёрдых покрытий. Изменит ли новая или увеличенная площадь вашу плату в Halle (Saale), стоит уточнить до начала работ у ответственной организации.

## Какая брусчатка подходит для въезда?
- Бетонная брусчатка: для въезда легкового автомобиля обычно используют камень толщиной 8 см. Камень 6 см больше подходит для дорожек и террас.
- Натуральный камень, например гранит: очень долговечен, но дороже в материале и укладке.
- Клинкерная брусчатка: не выцветает и очень твёрдая, но требует аккуратной постели.
- Газонная решётка или экобрусчатка: лучше пропускает воду, но подходит не для любого использования.

## Нужно ли разрешение на въезд?
Мощение на собственном участке часто не требует разрешения. Однако план застройки может ограничивать площадь твёрдых покрытий, а для памятников архитектуры действуют свои правила. Понижение городского бордюра для нового въезда относится к работам на общественной территории, и на него нужно подавать заявление в город.

## От чего зависит стоимость мощёного въезда?
- Размер и форма площадки, количество углов, радиусов и примыканий.
- Демонтаж и вывоз старого покрытия, например бетона, асфальта или старой брусчатки.
- Глубина выемки и возможная замена грунта.
- Вид камня, формат и рисунок укладки.
- Водоотвод: лотки, колодцы или впитывание.
- Доступ для техники и подвоза материала.
- Примыкания по высоте к гаражу, входной двери, тротуару и соседнему участку.
Цену за квадратный метр мы сознательно не называем. Два въезда одинаковой площади могут сильно отличаться по объёму работ, если под одним лежит старый бетон, а под другим хороший грунт.

## Типичные ошибки, которые потом дорого обходятся
- Слишком тонкий или не уплотнённый послойно несущий слой.
- Постель используется для выравнивания неровностей.
- Нет уклона или он направлен к дому.
- Нет бордюра или он не установлен на бетон.
- Швы заполнены не полностью.
- Дождевая вода уходит на соседний участок.

## Как мы работаем с въездом в Halle
После вашего обращения с фотографиями и примерными размерами мы осматриваем площадку на месте. Проверяем грунт, высоты, примыкания и водоотвод и предлагаем конструкцию, которая подходит для вашего использования. В предложении понятно описаны демонтаж, основание, материал и водоотвод, чтобы вы видели, за что платите.

## Частые вопросы
### Какой толщины должно быть основание въезда?
Для въезда легкового автомобиля общая толщина основания под брусчаткой часто составляет около 30–50 см. Решают несущая способность грунта, промерзание и нагрузка. Плотному проницаемому грунту нужно меньше слоёв, чем глинистому или насыпному.
### Какой уклон нужен мощёному въезду?
Обычно около 2–2,5 %, то есть 2–2,5 см на метр, всегда от здания. Где это невозможно, воду собирает лоток.
### Можно ли повторно использовать старую брусчатку?
Да, если камни целые и подходят для нагрузки. Основание всё равно стоит проверить и при необходимости обновить, потому что причина неровностей обычно именно там.
### Когда лучше всего укладывать брусчатку?
Укладывают в погоду без мороза и затяжных дождей, обычно с весны до осени. Промёрзший или переувлажнённый грунт нельзя правильно уплотнить.
### Можно ли уложить брусчатку поверх старого покрытия?
Укладка прямо на старый бетон или асфальт часто приводит к проблемам с водой и трещинам. Обычно надёжнее демонтировать старое покрытие и сделать подходящее основание.`,
    coverUrl: null,
    coverWidth: 0,
    coverHeight: 0,
    published: true,
    publishedAt: new Date('2026-10-24T03:00:00Z'),
    updatedAt: new Date('2026-10-24T03:00:00Z'),
  },
  {
    id: 'static-risse-in-der-fassade-ursachen-dringlichkeit-und-sanierung-in-halle',
    slug: "risse-in-der-fassade-ursachen-dringlichkeit-und-sanierung-in-halle",
    title: "Risse in der Fassade: Ursachen, Dringlichkeit und Sanierung in Halle",
    titleRu: "Трещины на фасаде: причины, насколько это срочно и как ремонтируют в Halle",
    excerpt: "Nicht jeder Riss im Außenputz ist gefährlich, aber jeder offene Riss lässt Wasser in die Wand. Wir zeigen, wie Sie Risse einordnen, wann ein Fachmann prüfen sollte und wie eine gerissene Fassade in Halle (Saale) dauerhaft saniert wird.",
    excerptRu: "Не каждая трещина в наружной штукатурке опасна, но через каждую открытую трещину в стену попадает вода. Показываем, как оценить трещину, когда нужен специалист и как надёжно отремонтировать фасад в Halle (Saale).",
    metaTitle: "Risse in der Fassade: Ursachen & Sanierung",
    metaTitleRu: "Трещины на фасаде: причины и ремонт",
    metaDesc: "Risse in der Fassade richtig einordnen: Haarriss oder Bauschaden? Ursachen, Selbstcheck, Sanierung mit Armierung und Kostenfaktoren für Häuser in Halle.",
    metaDescRu: "Как оценить трещины на фасаде: волосяная трещина или повреждение кладки? Причины, самопроверка, ремонт с армированием и факторы стоимости в Halle.",
    content: `## Das Wichtigste in Kürze
- Feine Haarrisse im Putz, etwa unter 0,2 mm Breite, sind meist ein optisches Problem. Vor dem nächsten Anstrich sollten sie trotzdem fachgerecht geschlossen werden.
- Breitere, durchgehende, treppenförmige oder wachsende Risse können auf Bewegungen im Mauerwerk hinweisen. Hier muss zuerst die Ursache geklärt werden.
- Jeder offene Riss lässt Regenwasser in die Wand. Im Winter kann gefrierendes Wasser den Schaden vergrößern.
- Dauerhaft saniert wird nicht der einzelne Riss, sondern die Putzfläche und die Ursache dahinter.

## Welche Risse in der Fassade gibt es?
### Haarrisse und Netzrisse
Sehr feine Risse, oft netzartig über die Fläche verteilt. Sie entstehen meist beim Schwinden des Putzes oder durch Temperaturwechsel und sind selten ein Hinweis auf einen Schaden am Mauerwerk.
### Risse an Fenster- und Türecken
Diagonale Risse, die von den Ecken der Öffnungen ausgehen. Dort bündeln sich Spannungen im Putz, besonders wenn bei der Ausführung keine Diagonalbewehrung eingelegt wurde.
### Risse in gedämmten Fassaden
Bei Wärmedämmverbundsystemen zeichnen sich manchmal die Fugen zwischen den Dämmplatten oder die Dübelteller ab. Ursache sind häufig Ausführungsfehler oder eine zu dünne Armierungsschicht.
### Setzungs- und Mauerwerksrisse
Treppenförmige, diagonale oder sehr breite Risse, die durch Fugen und Steine laufen. Sie können durch Setzungen, Feuchtigkeit im Baugrund, Baumwurzeln oder Erschütterungen entstehen und gehören in die Hand eines Fachplaners.
### Hohlstellen und Abplatzungen
Klingt der Putz beim Abklopfen hohl oder fallen Stücke heraus, hat er sich vom Untergrund gelöst. Solche Bereiche müssen vor jeder Sanierung entfernt werden.

## Wie gefährlich ist der Riss? Ein einfacher Selbstcheck
- Messen Sie die Rissbreite mit einer Risskarte aus dem Baumarkt und fotografieren Sie den Riss mit einem Maßstab daneben.
- Markieren Sie die Rissenden mit Bleistift und Datum. Prüfen Sie nach einigen Wochen, ob der Riss länger oder breiter geworden ist.
- Schauen Sie innen nach: Gibt es an derselben Stelle ebenfalls Risse, verläuft der Riss vermutlich durch die ganze Wand.
- Klemmen Fenster oder Türen neuerdings, kann das auf Bewegungen im Gebäude hindeuten.
- Achten Sie auf feuchte Stellen, Ausblühungen oder Schimmel in den Räumen dahinter.
Wenn Risse wachsen, durch die ganze Wand laufen oder Fenster und Türen klemmen, sollte zuerst ein Tragwerksplaner oder Bausachverständiger die Ursache klären. Eine statische Bewertung übernehmen wir nicht. Erst wenn die Ursache geklärt oder behoben ist, ist eine Putzsanierung sinnvoll.

## Typische Ursachen bei Häusern in Halle
Halle (Saale) hat einen sehr gemischten Gebäudebestand. Gründerzeithäuser haben oft Mischmauerwerk und alten Kalkputz, auf den später härtere, zementhaltige Putze oder Farben aufgetragen wurden. Solche Materialkombinationen können Spannungen und Abplatzungen verursachen. Bei Ein- und Mehrfamilienhäusern aus den 1990er-Jahren betreffen Risse häufiger gedämmte Fassaden mit dünner Armierung.
Unabhängig vom Baujahr sind die häufigsten Ursachen Schwinden des Putzes, Temperaturwechsel, Feuchtigkeit und Salze im Mauerwerk, ungeeigneter Putzaufbau und Bewegungen des Gebäudes.

## Wie wird eine gerissene Fassade saniert?
- Ursache klären und die Fassade abklopfen, um Hohlstellen zu finden.
- Lose und hohle Putzbereiche entfernen und mit einem zum Untergrund passenden Putz ergänzen.
- Risse vorbereiten und schließen. Einzelne Risse nur zu verspachteln, hält bei Bewegungen oft nicht lange.
- Armierungsschicht aus Armierungsmörtel mit eingebettetem Gewebe vollflächig aufbringen. Sie überbrückt feine Risse deutlich dauerhafter als punktuelle Reparaturen.
- Oberputz und Anstrich passend zum Untergrund wählen, zum Beispiel diffusionsoffene Systeme auf mineralischem Altputz.
- Bei gedämmten Fassaden zusätzlich Plattenstöße, Dübel und Anschlüsse prüfen.

## Reicht es, die Risse einfach zu überstreichen?
Für feine Haarrisse gibt es rissüberbrückende Fassadenfarben. Sie können die Fläche für einige Jahre schließen. Bei breiteren oder sich bewegenden Rissen reißt der Anstrich jedoch erneut auf, und Wasser kann hinter die Farbschicht gelangen. Dann ist eine Armierung die dauerhaftere Lösung.

## Wovon hängen die Kosten einer Fassadensanierung ab?
- Größe der Fassade und Anzahl der Geschosse.
- Gerüst, bei Straßenfassaden mit möglicher Genehmigung für den Gehweg.
- Art und Anzahl der Risse sowie Anteil der Hohlstellen.
- Teilweise oder vollflächige Armierung.
- Oberputz, Anstrich und gewünschte Struktur.
- Kombination mit einer Wärmedämmung.
Wird ein größerer Teil des Außenputzes erneuert, kann das Gebäudeenergiegesetz Anforderungen an die Wärmedämmung auslösen. Ob das für Ihr Haus gilt, sollte vor der Planung geklärt werden, zum Beispiel mit einem Energieberater. Bei denkmalgeschützten Gebäuden ist außerdem die Denkmalschutzbehörde einzubeziehen.

## Fassadensanierung in Halle mit SorgfaltBau
Wir sehen uns die Fassade vor Ort an, klopfen die Flächen ab, dokumentieren die Risse und besprechen mit Ihnen, ob eine Putzsanierung ausreicht oder ob zuerst ein Fachplaner die Ursache prüfen sollte. Das Angebot beschreibt Vorarbeiten, Armierung, Putz und Anstrich nachvollziehbar.

## Häufige Fragen
### Ab welcher Breite ist ein Riss in der Fassade gefährlich?
Einen festen Grenzwert für alle Gebäude gibt es nicht. Als grobe Orientierung gelten Risse unter etwa 0,2 mm als Haarrisse. Breitere Risse, Risse durch Steine und Fugen, treppenförmige Risse und Risse, die wachsen, sollten fachlich geprüft werden.
### Wer kann Risse in der Fassade beseitigen?
Feine Putzrisse beseitigt ein Fachbetrieb für Putz- und Fassadenarbeiten mit einer Armierung und einem neuen Anstrich. Bei Verdacht auf Bewegungen im Mauerwerk sollte zuerst ein Tragwerksplaner oder Bausachverständiger die Ursache bewerten.
### Wer ist bei einem Mietshaus oder einer Eigentumswohnung zuständig?
Für die Fassade ist der Eigentümer zuständig. Mieter melden Risse dem Vermieter. In einer Wohnungseigentümergemeinschaft gehört die Fassade in der Regel zum Gemeinschaftseigentum, über die Sanierung entscheidet die Gemeinschaft.
### Kann man Fassadenrisse im Winter reparieren?
Putze und Fassadenfarben brauchen Mindesttemperaturen, die die Hersteller meist bei etwa +5 °C angeben, und trockenes Wetter. Im Winter kann man Risse provisorisch vor eindringendem Wasser schützen und die eigentliche Sanierung im Frühjahr ausführen.
### Sind Risse in einer gedämmten Fassade ein Problem?
Ja, weil Wasser in die Dämmung gelangen kann. Feine Risse lassen sich meist mit einer neuen Armierungsschicht überarbeiten. Wichtig ist, vorher Plattenstöße, Dübel und Anschlüsse an Fenstern zu prüfen.`,
    contentRu: `## Коротко о главном
- Тонкие волосяные трещины в штукатурке шириной примерно до 0,2 мм обычно являются косметической проблемой. Перед следующей покраской их всё равно нужно правильно закрыть.
- Более широкие, сквозные, ступенчатые или растущие трещины могут указывать на движение кладки. Здесь сначала выясняют причину.
- Через каждую открытую трещину в стену попадает дождевая вода. Зимой замерзающая вода увеличивает повреждение.
- Надёжно ремонтируют не отдельную трещину, а штукатурный слой и причину повреждения.

## Какие бывают трещины на фасаде?
### Волосяные и сетчатые трещины
Очень тонкие трещины, часто сеткой по всей поверхности. Обычно они появляются из-за усадки штукатурки или перепадов температуры и редко говорят о повреждении кладки.
### Трещины от углов окон и дверей
Диагональные трещины, которые идут от углов проёмов. В этих местах концентрируются напряжения, особенно если при работах не уложили диагональное армирование.
### Трещины на утеплённых фасадах
На фасадах с системой утепления иногда проявляются швы между плитами утеплителя или тарелки дюбелей. Причиной часто бывают ошибки монтажа или слишком тонкий армирующий слой.
### Осадочные трещины и трещины в кладке
Ступенчатые, диагональные или очень широкие трещины, проходящие через швы и камни. Они могут возникать из-за осадки, влажности грунта, корней деревьев или вибраций и требуют оценки специалиста по конструкциям.
### Пустоты и отслоения
Если штукатурка при простукивании звучит глухо или от неё отваливаются куски, она отошла от основания. Такие участки удаляют перед любым ремонтом.

## Насколько опасна трещина? Простая самопроверка
- Измерьте ширину трещины картой-шаблоном из строительного магазина и сфотографируйте её рядом с линейкой.
- Отметьте концы трещины карандашом и подпишите дату. Через несколько недель проверьте, стала ли трещина длиннее или шире.
- Посмотрите изнутри: если в том же месте есть трещина, она, вероятно, проходит через всю стену.
- Если окна или двери стали заедать, это может говорить о движении здания.
- Обратите внимание на влажные пятна, высолы или плесень в помещениях за этой стеной.
Если трещины растут, проходят насквозь или окна и двери заедают, сначала причину должен оценить инженер-конструктор или строительный эксперт. Статическую оценку мы не выполняем. Ремонт штукатурки имеет смысл только после того, как причина выяснена или устранена.

## Типичные причины в домах Halle
В Halle (Saale) очень разный жилой фонд. В домах эпохи грюндерства часто смешанная кладка и старая известковая штукатурка, поверх которой позже нанесли более жёсткие цементные штукатурки или краски. Такие сочетания материалов могут вызывать напряжения и отслоения. В домах 1990-х годов трещины чаще встречаются на утеплённых фасадах с тонким армирующим слоем.
Независимо от года постройки самые частые причины: усадка штукатурки, перепады температуры, влага и соли в кладке, неподходящая система штукатурки и движения здания.

## Как ремонтируют фасад с трещинами?
- Выясняют причину и простукивают фасад, чтобы найти пустоты.
- Удаляют отслоившуюся штукатурку и восполняют её составом, подходящим к основанию.
- Подготавливают и закрывают трещины. Простая шпаклёвка отдельных трещин при движениях обычно держится недолго.
- Наносят сплошной армирующий слой из армирующего раствора с сеткой. Он перекрывает тонкие трещины гораздо надёжнее, чем точечный ремонт.
- Подбирают финишную штукатурку и краску под основание, например паропроницаемые системы на старой минеральной штукатурке.
- На утеплённых фасадах дополнительно проверяют стыки плит, дюбели и примыкания.

## Достаточно ли просто закрасить трещины?
Для тонких волосяных трещин есть фасадные краски, перекрывающие трещины. Они могут закрыть поверхность на несколько лет. Но на широких или подвижных трещинах краска снова растрескается, и вода попадёт под слой краски. Тогда надёжнее армирование.

## От чего зависит стоимость ремонта фасада?
- Площадь фасада и количество этажей.
- Леса, для фасада вдоль улицы возможно с разрешением на использование тротуара.
- Вид и количество трещин, доля пустот.
- Частичное или сплошное армирование.
- Финишная штукатурка, покраска и желаемая фактура.
- Сочетание с утеплением.
Если обновляется значительная часть наружной штукатурки, закон об энергетике зданий (GEG) может потребовать утепления. Применимо ли это к вашему дому, стоит выяснить до планирования, например у энергоконсультанта. Для памятников архитектуры дополнительно нужно согласование с органом охраны памятников.

## Ремонт фасада в Halle с SorgfaltBau
Мы осматриваем фасад на месте, простукиваем поверхности, фиксируем трещины и обсуждаем с вами, достаточно ли ремонта штукатурки или сначала причину должен проверить специалист. В предложении понятно описаны подготовка, армирование, штукатурка и покраска.

## Частые вопросы
### Какая ширина трещины на фасаде уже опасна?
Единого порога для всех зданий нет. Ориентировочно трещины до 0,2 мм считаются волосяными. Более широкие трещины, трещины через камни и швы, ступенчатые и растущие трещины нужно показать специалисту.
### Кто может устранить трещины на фасаде?
Тонкие трещины в штукатурке устраняет специализированная фирма по штукатурным и фасадным работам с помощью армирования и новой покраски. При подозрении на движение кладки сначала причину должен оценить инженер-конструктор или строительный эксперт.
### Кто отвечает за фасад в доходном доме или в квартире в собственности?
За фасад отвечает собственник. Арендаторы сообщают о трещинах арендодателю. В сообществе собственников квартир фасад обычно относится к общему имуществу, и решение о ремонте принимает сообщество.
### Можно ли ремонтировать трещины на фасаде зимой?
Штукатуркам и фасадным краскам нужна минимальная температура, обычно около +5 °C по данным производителей, и сухая погода. Зимой трещины можно временно защитить от воды, а основной ремонт выполнить весной.
### Опасны ли трещины на утеплённом фасаде?
Да, потому что вода может попасть в утеплитель. Тонкие трещины обычно перекрывают новым армирующим слоем. Важно заранее проверить стыки плит, дюбели и примыкания к окнам.`,
    coverUrl: null,
    coverWidth: 0,
    coverHeight: 0,
    published: true,
    publishedAt: new Date('2026-10-24T03:05:00Z'),
    updatedAt: new Date('2026-10-24T03:05:00Z'),
  },
  {
    id: 'static-entkernung-und-baureinigung-in-halle-ablauf-entsorgung-und-kosten',
    slug: "entkernung-und-baureinigung-in-halle-ablauf-entsorgung-und-kosten",
    title: "Entkernung und Baureinigung in Halle: Ablauf, Entsorgung und Kosten",
    titleRu: "Демонтаж и строительная уборка в Halle: порядок работ, вывоз мусора и стоимость",
    excerpt: "Vor einer Sanierung muss das Alte raus, nach den Arbeiten muss es sauber werden. Wir erklären, was zu einer Entkernung gehört, wo ihre Grenzen liegen, wie Bauabfälle getrennt werden und was Grob-, Zwischen- und Endreinigung in Halle (Saale) bedeuten.",
    excerptRu: "Перед ремонтом нужно убрать старое, после работ нужно навести чистоту. Объясняем, что входит в демонтаж, где его границы, как сортируют строительные отходы и что означают черновая, промежуточная и финальная уборка в Halle (Saale).",
    metaTitle: "Entkernung & Baureinigung in Halle",
    metaTitleRu: "Демонтаж и строительная уборка в Halle",
    metaDesc: "Entkernung und Baureinigung in Halle (Saale): was dazugehört, Grenzen bei tragenden Teilen und Schadstoffen, Entsorgung, Reinigungsstufen und Kostenfaktoren.",
    metaDescRu: "Демонтаж и строительная уборка в Halle (Saale): что входит, ограничения по несущим конструкциям и вредным веществам, вывоз мусора, этапы уборки и стоимость.",
    content: `## Das Wichtigste in Kürze
- Entkernung bedeutet den Rückbau nicht tragender Innenbauteile, oft bis auf den Rohbau. Sie bereitet eine Sanierung oder einen Umbau vor.
- Tragende Wände, Decken und Stützen werden nur nach statischer Planung verändert. Das ist keine reine Entkernungsarbeit.
- Bei Verdacht auf Schadstoffe wie Asbest wird vor dem Rückbau eine Probe genommen. Solche Arbeiten führen nur dafür zugelassene Fachbetriebe aus.
- Bauabfälle müssen nach Materialarten getrennt werden. Gute Trennung senkt die Entsorgungskosten.
- Baureinigung erfolgt in Stufen: Grobreinigung während der Arbeiten, Zwischenreinigung und Endreinigung vor der Übergabe.

## Was gehört zu einer Entkernung?
- Ausbau alter Bodenbeläge wie Teppich, PVC, Laminat und Parkett.
- Entfernen von Fliesen an Wänden und Böden.
- Rückbau nicht tragender Trockenbau- und Leichtbauwände.
- Demontage von Türen, Zargen, Einbauschränken und Verkleidungen.
- Ausbau von Sanitärobjekten nach dem Absperren durch den Installateur.
- Entfernen von abgehängten Decken und alten Wandverkleidungen.
- Abtransport und getrennte Entsorgung des Materials.

## Was nicht zur Entkernung gehört
Tragende Wände, Decken, Stützen und Schornsteine sind Teil der Statik eines Gebäudes. Ob und wie sie verändert werden dürfen, entscheidet ein Tragwerksplaner, häufig ist auch eine Genehmigung nötig. Strom-, Gas- und Wasserleitungen werden vor dem Rückbau von den jeweiligen Fachbetrieben abgeschaltet und gesichert.

## Schadstoffe: vor dem Start klären
In Gebäuden, die vor dem Asbestverbot von 1993 gebaut oder saniert wurden, können asbesthaltige Materialien vorkommen, zum Beispiel in alten Bodenplatten, Klebern, Spachtelmassen, Fensterbänken oder Nachtspeicheröfen. Alte Mineralwolle und teerhaltige Parkettkleber können ebenfalls belastet sein.
Besteht ein Verdacht, wird vor dem Rückbau eine Materialprobe im Labor untersucht. Asbestarbeiten dürfen nur sachkundige Fachbetriebe nach den geltenden technischen Regeln ausführen. Stoßen wir während der Arbeiten auf verdächtiges Material, unterbrechen wir die Arbeiten an dieser Stelle und besprechen das weitere Vorgehen mit Ihnen.

## Ablauf einer Entkernung
- Besichtigung und gemeinsame Festlegung, was entfernt wird und was bleibt.
- Klärung möglicher Schadstoffe und der Statik.
- Abschalten von Strom, Wasser und Gas durch die zuständigen Fachbetriebe.
- Schutz von Treppenhaus, Aufzug und verbleibenden Bauteilen.
- Rückbau nach Materialarten getrennt.
- Abtransport über Container oder Fahrzeuge.
- Besenreine Übergabe für die nächsten Gewerke.

## Entsorgung: warum Trennung Geld spart
Nach der Gewerbeabfallverordnung sind Bau- und Abbruchabfälle grundsätzlich getrennt zu sammeln, etwa Holz, Metall, Glas, Kunststoff, Gips, Dämmstoffe sowie Beton und Ziegel. Gemischter Bauschutt ist in der Entsorgung meist deutlich teurer als sortenreines Material.
Soll ein Container auf einer öffentlichen Straße oder einem Gehweg stehen, braucht es dafür eine Genehmigung der Stadt. Diese sollte rechtzeitig vor Beginn beantragt werden.

## Baureinigung: Grob-, Zwischen- und Endreinigung
### Grobreinigung
Während und direkt nach den Rückbau- und Rohbauarbeiten werden Schutt, Verpackungen und grober Staub entfernt. Die Räume werden besenrein für die nächsten Gewerke übergeben.
### Zwischenreinigung
Zwischen einzelnen Bauabschnitten, zum Beispiel vor dem Malern oder dem Verlegen des Bodens, wird Staub gründlich entfernt. Staub unter einem neuen Anstrich oder Bodenbelag führt später zu sichtbaren Mängeln.
### Endreinigung
Die Bauendreinigung erfolgt nach Abschluss aller Arbeiten vor der Übergabe oder dem Einzug. Dazu gehören Fenster mit Rahmen, Böden, Sanitärobjekte, Heizkörper, Türen und das Entfernen von Farb- und Mörtelresten sowie Schutzfolien.

## Wie es nach der Entkernung weitergeht
Nach der Entkernung folgen in der Regel Installationen, Trockenbau, Putz- und Spachtelarbeiten, Malerarbeiten, Bodenverlegung und Montage. Wer Rückbau, Renovierung und Reinigung aus einer Hand plant, vermeidet Wartezeiten zwischen den Gewerken.

## Wovon hängen die Kosten ab?
- Umfang und Art der zu entfernenden Bauteile.
- Etage, Aufzug und Länge der Tragewege.
- Stellplatz für den Container und mögliche Genehmigung.
- Menge und Art der Abfälle sowie die Zahl der getrennten Fraktionen.
- Mögliche Schadstoffe und die dafür nötige Fachfirma.
- Gewünschte Reinigungsstufen und Fläche.
Eine belastbare Einschätzung ist erst nach einer Besichtigung möglich, weil sich unter alten Belägen oft weitere Schichten verbergen.

## Häufige Fragen
### Wie lange dauert die Entkernung einer Wohnung?
Das hängt von Größe, Umfang und Zugänglichkeit ab. Eine Wohnung ist häufig in einigen Arbeitstagen entkernt, ein ganzes Mehrfamilienhaus braucht deutlich länger. Einen verbindlichen Zeitrahmen nennen wir nach der Besichtigung.
### Braucht man für eine Entkernung eine Genehmigung?
Für den Rückbau nicht tragender Innenbauteile ist meist keine Baugenehmigung nötig. Anders ist es bei Eingriffen in die Statik und bei denkmalgeschützten Gebäuden, von denen es in Halle viele gibt. Für einen Container im öffentlichen Straßenraum ist eine Genehmigung der Stadt erforderlich.
### Was ist der Unterschied zwischen Baureinigung und Endreinigung?
Baureinigung ist der Oberbegriff für alle Reinigungen auf einer Baustelle. Die Endreinigung ist die letzte Stufe nach Abschluss aller Arbeiten, bevor die Räume übergeben oder bezogen werden.
### Kann man während der Entkernung im Haus wohnen?
In einem Haus mit mehreren Wohnungen ja, wenn Treppenhaus und Nachbarwohnungen geschützt und Lärmzeiten abgestimmt werden. In der betroffenen Wohnung selbst ist Wohnen während einer Entkernung praktisch nicht möglich.
### Wer ist für die Entsorgung der Bauabfälle verantwortlich?
Verantwortlich ist der Abfallerzeuger, in der Regel also Bauherr oder ausführender Betrieb. Im Angebot sollte klar geregelt sein, wer Container, Transport und Entsorgungsnachweise übernimmt.`,
    contentRu: `## Коротко о главном
- Демонтаж (Entkernung) означает разборку ненесущих внутренних элементов, часто до «коробки». Он готовит объект к ремонту или перепланировке.
- Несущие стены, перекрытия и колонны меняют только по статическому расчёту. Это уже не просто демонтаж.
- При подозрении на вредные вещества, например асбест, до начала работ берут пробу. Такие работы выполняют только допущенные специализированные фирмы.
- Строительные отходы нужно сортировать по видам материалов. Хорошая сортировка снижает стоимость вывоза.
- Строительная уборка проходит этапами: черновая во время работ, промежуточная и финальная перед сдачей.

## Что входит в демонтаж?
- Снятие старых напольных покрытий: ковролина, ПВХ, ламината и паркета.
- Демонтаж плитки со стен и пола.
- Разборка ненесущих перегородок из гипсокартона и лёгких конструкций.
- Демонтаж дверей, коробок, встроенных шкафов и обшивок.
- Демонтаж сантехники после отключения воды сантехником.
- Снятие подвесных потолков и старых стеновых панелей.
- Вывоз и раздельная утилизация материалов.

## Что не входит в демонтаж
Несущие стены, перекрытия, колонны и дымоходы являются частью конструкции здания. Можно ли и как их менять, решает инженер-конструктор, часто также нужно разрешение. Электричество, газ и воду перед демонтажем отключают и обезопасивают профильные специалисты.

## Вредные вещества: выяснить до начала работ
В зданиях, построенных или отремонтированных до запрета асбеста в 1993 году, могут встречаться асбестосодержащие материалы, например в старой напольной плитке, клеях, шпаклёвках, подоконниках или электрических печах-накопителях. Старая минеральная вата и дегтесодержащий паркетный клей тоже могут быть опасны.
При подозрении до демонтажа материал отдают на анализ в лабораторию. Работы с асбестом могут выполнять только специализированные фирмы с допуском по действующим техническим правилам. Если во время работ мы находим подозрительный материал, мы останавливаем работы на этом участке и обсуждаем с вами дальнейшие шаги.

## Порядок работ при демонтаже
- Осмотр и совместное решение, что убираем, а что остаётся.
- Проверка на вредные вещества и вопросы статики.
- Отключение электричества, воды и газа профильными специалистами.
- Защита подъезда, лифта и сохраняемых элементов.
- Демонтаж с сортировкой по видам материалов.
- Вывоз контейнером или машинами.
- Передача помещений после подметания для следующих работ.

## Вывоз мусора: почему сортировка экономит деньги
По немецкому постановлению об отходах (Gewerbeabfallverordnung) строительные отходы в принципе нужно собирать раздельно: дерево, металл, стекло, пластик, гипс, утеплитель, а также бетон и кирпич. Смешанный строительный мусор обычно обходится при утилизации заметно дороже, чем отсортированный.
Если контейнер должен стоять на городской улице или тротуаре, на это нужно разрешение города. Его стоит запросить заранее до начала работ.

## Строительная уборка: черновая, промежуточная и финальная
### Черновая уборка
Во время и сразу после демонтажа и черновых работ убирают мусор, упаковку и крупную пыль. Помещения передают следующим специалистам чисто подметёнными.
### Промежуточная уборка
Между этапами, например перед покраской или укладкой пола, тщательно удаляют пыль. Пыль под новой краской или напольным покрытием позже даёт видимые дефекты.
### Финальная уборка
Финальную уборку делают после завершения всех работ перед сдачей или заселением. Сюда входят окна с рамами, полы, сантехника, радиаторы, двери, удаление следов краски и раствора, а также защитных плёнок.

## Что происходит после демонтажа
После демонтажа обычно следуют инженерные коммуникации, гипсокартон, штукатурные и шпаклёвочные работы, покраска, укладка полов и монтаж. Если демонтаж, ремонт и уборку планирует один исполнитель, между этапами нет лишних простоев.

## От чего зависит стоимость?
- Объём и вид демонтируемых элементов.
- Этаж, наличие лифта и длина пути переноски.
- Место для контейнера и возможное разрешение.
- Количество и вид отходов, число отдельных фракций.
- Возможные вредные вещества и необходимая специализированная фирма.
- Нужные этапы уборки и площадь.
Надёжную оценку можно дать только после осмотра, потому что под старыми покрытиями часто скрываются дополнительные слои.

## Частые вопросы
### Сколько длится демонтаж в квартире?
Зависит от размера, объёма и доступа. Квартиру часто освобождают за несколько рабочих дней, целый многоквартирный дом занимает заметно больше времени. Точные сроки мы называем после осмотра.
### Нужно ли разрешение на демонтаж?
Для разборки ненесущих внутренних элементов разрешение на строительство обычно не нужно. Иначе обстоит дело при вмешательстве в несущие конструкции и в памятниках архитектуры, которых в Halle много. Для контейнера на городской улице нужно разрешение города.
### Чем строительная уборка отличается от финальной?
Строительная уборка — общее название всех уборок на объекте. Финальная уборка — последний этап после завершения всех работ перед сдачей помещений или заселением.
### Можно ли жить в доме во время демонтажа?
В доме с несколькими квартирами можно, если защищены подъезд и соседние квартиры и согласовано время шумных работ. В самой квартире, где идёт демонтаж, жить практически невозможно.
### Кто отвечает за утилизацию строительных отходов?
Отвечает тот, у кого образуются отходы, обычно заказчик или фирма-исполнитель. В предложении должно быть чётко указано, кто берёт на себя контейнер, вывоз и документы об утилизации.`,
    coverUrl: null,
    coverWidth: 0,
    coverHeight: 0,
    published: true,
    publishedAt: new Date('2026-10-24T03:10:00Z'),
    updatedAt: new Date('2026-10-24T03:10:00Z'),
  },
  {
    id: 'static-wohnung-vor-neuvermietung-renovieren-in-halle-checkliste-fuer-vermieter',
    slug: "wohnung-vor-neuvermietung-renovieren-in-halle-checkliste-fuer-vermieter",
    title: "Wohnung vor Neuvermietung renovieren in Halle: Checkliste für Vermieter",
    titleRu: "Ремонт квартиры перед новой сдачей в Halle: чек-лист для арендодателя",
    excerpt: "Jeder Monat Leerstand kostet Miete. Diese Checkliste zeigt Vermietern in Halle (Saale), wie sie die Renovierung zwischen zwei Mietern planen, in welcher Reihenfolge die Arbeiten laufen und was vor der Übergabe an den neuen Mieter erledigt sein sollte.",
    excerptRu: "Каждый месяц простоя стоит арендной платы. Этот чек-лист показывает арендодателям в Halle (Saale), как планировать ремонт между двумя арендаторами, в каком порядке идут работы и что должно быть готово до передачи квартиры новому жильцу.",
    metaTitle: "Wohnung vor Neuvermietung renovieren",
    metaTitleRu: "Ремонт квартиры перед новой сдачей",
    metaDesc: "Checkliste für Vermieter in Halle (Saale): Renovierung zwischen zwei Mietern planen, richtige Reihenfolge, Pflichten wie Rauchwarnmelder und Übergabe.",
    metaDescRu: "Чек-лист для арендодателей в Halle (Saale): ремонт между арендаторами, правильный порядок работ, обязательные датчики дыма и передача квартиры.",
    content: `## Das Wichtigste in Kürze
- Die Planung beginnt mit der Kündigung, nicht mit dem Auszug. Eine Vorbesichtigung während der Kündigungsfrist spart Wochen.
- Die Reihenfolge entscheidet über Tempo und Qualität: erst Rückbau und Installationen, dann Wände, dann Boden, zuletzt Montage und Reinigung.
- Elektro-, Gas- und Heizungsarbeiten gehören in die Hand der jeweiligen Fachbetriebe.
- In Sachsen-Anhalt sind Rauchwarnmelder in Schlafräumen, Kinderzimmern und Fluren zu Aufenthaltsräumen vorgeschrieben.
- Ein sorgfältiges Übergabeprotokoll mit Fotos schützt beide Seiten.

## Schritt 1: Vorbesichtigung vor dem Auszug
Nach einer Kündigung darf der Vermieter die Wohnung in der Regel nach rechtzeitiger Ankündigung besichtigen. Nutzen Sie diesen Termin, um den Zustand von Wänden, Böden, Bad, Küche, Fenstern und Türen zu dokumentieren und den Umfang der Renovierung festzulegen. So können Handwerker schon vor dem Auszug eingeplant und Material bestellt werden.
Ob der bisherige Mieter Schönheitsreparaturen ausführen muss, hängt vom Mietvertrag und vom Zustand bei Einzug ab. Viele ältere Vertragsklauseln sind nach der Rechtsprechung unwirksam. Lassen Sie das im Zweifel von einem Eigentümerverband oder Rechtsanwalt prüfen, bevor Sie Kosten einplanen oder einfordern.

## Schritt 2: Umfang festlegen
- Nur auffrischen: Wände und Decken streichen, kleine Schäden ausbessern, Silikonfugen erneuern, Endreinigung.
- Mittlere Renovierung: zusätzlich neuer Bodenbelag, neue Innentüren oder Beschläge, Ausbesserung von Putz und Spachtelflächen.
- Umfassende Renovierung: zusätzlich Bad, Elektroinstallation, Trockenbau oder geänderte Raumaufteilung.
Bei der Entscheidung hilft die Frage, welche Mieter Sie ansprechen und welche Miete am Markt realistisch ist. Nicht jede Wohnung braucht ein neues Bad, aber jede Wohnung braucht saubere Wände, einen intakten Boden und funktionierende Technik.

## Die richtige Reihenfolge der Arbeiten
- Rückbau alter Beläge, Tapeten und defekter Bauteile.
- Installationen durch Fachbetriebe, zum Beispiel Elektro und Sanitär.
- Trockenbau, Putz- und Spachtelarbeiten.
- Zwischenreinigung, damit kein Staub unter Farbe und Boden landet.
- Malerarbeiten an Decken und Wänden.
- Bodenverlegung.
- Montage von Türen, Leisten, Schaltern, Steckdosenabdeckungen und Sanitärobjekten.
- Endreinigung und Übergabe.
Wer diese Reihenfolge einhält, vermeidet doppelte Arbeit, zum Beispiel neue Farbe an Wänden, die beim späteren Leitungsverlegen wieder beschädigt werden.

## Checkliste nach Räumen
### Wände und Decken
Löcher, Risse und Dübellöcher schließen, Flecken vorbehandeln, Tapeten bei Bedarf entfernen. Für Mietwohnungen bewähren sich helle, neutrale und gut ausbesserbare Farben.
### Böden
Den Zustand von Laminat, Vinyl, Parkett und Fliesen prüfen. Ein abgenutzter Boden wirkt bei der Besichtigung stark und lässt sich bei gutem Untergrund oft schnell erneuern. Wichtig ist der Untergrund: Unebenheiten oder Feuchtigkeit zeigen sich sonst nach wenigen Monaten.
### Bad und Küche
Silikonfugen, Armaturen, Abflüsse, Spülkästen und Lüftung prüfen. Feuchtigkeitsschäden und Schimmel nicht überstreichen, sondern die Ursache klären.
### Fenster, Türen und Heizkörper
Fenster und Türen auf Gängigkeit und Dichtungen prüfen, Beschläge einstellen, Heizkörper und Thermostatventile kontrollieren.
### Elektro und Sicherheit
Steckdosen und Schalter auf Schäden prüfen. Arbeiten an der Elektroinstallation führt eine Elektrofachkraft aus. Rauchwarnmelder in Schlafräumen, Kinderzimmern und Fluren zu Aufenthaltsräumen kontrollieren oder nachrüsten.

## Wie viel Zeit sollte man einplanen?
Ein reines Auffrischen mit Malerarbeiten und Reinigung ist oft in einigen Arbeitstagen erledigt. Kommen ein neuer Boden und kleinere Reparaturen hinzu, sollte man mit ein bis zwei Wochen rechnen. Eine Badsanierung oder Arbeiten an der Elektroinstallation verlängern die Zeit deutlich. Einen verlässlichen Zeitplan gibt es nach der Besichtigung.

## Kosten im Blick behalten
- Umfang der Arbeiten und Zustand der Wohnung.
- Fläche und Raumhöhe, zum Beispiel bei hohen Altbaudecken.
- Material für Boden, Farbe und Ausstattung.
- Entsorgung alter Beläge.
- Zugänglichkeit, Etage und Parkmöglichkeiten.
Steuerlich können Renovierungskosten bei vermieteten Wohnungen meist als Werbungskosten abgesetzt werden. Eine Ausnahme sind größere Arbeiten in den ersten drei Jahren nach dem Kauf: Übersteigen sie 15 Prozent der Anschaffungskosten des Gebäudes, gelten sie als anschaffungsnahe Herstellungskosten. Klären Sie das vor der Planung mit Ihrem Steuerberater.

## Renovierung zwischen zwei Mietern koordinieren lassen
Wenn mehrere Gewerke in kurzer Zeit aufeinander folgen, lohnt sich ein Ansprechpartner, der Reihenfolge und Termine abstimmt. Wir besichtigen die Wohnung idealerweise noch vor dem Auszug, erstellen ein nachvollziehbares Angebot und übergeben die Wohnung gereinigt und bezugsfertig.

## Häufige Fragen
### Muss der Vormieter die Wohnung renovieren?
Das hängt vom Mietvertrag und vom Zustand der Wohnung bei Einzug ab. Viele Klauseln zu Schönheitsreparaturen sind unwirksam, etwa wenn die Wohnung unrenoviert übergeben wurde. Im Zweifel sollte die Klausel rechtlich geprüft werden.
### Welche Wandfarbe eignet sich für eine Mietwohnung?
Helle, neutrale Farben in guter Deckkraft, die sich später einfach ausbessern lassen. Viele Vermieter verwenden einen einheitlichen Farbton, damit Ausbesserungen bei späteren Mieterwechseln nicht auffallen.
### Lohnt sich ein neuer Boden vor der Neuvermietung?
Häufig ja, weil der Boden den Eindruck bei der Besichtigung stark prägt. Robuste Beläge wie Vinyl oder hochwertiges Laminat sind bei Mietwohnungen verbreitet. Entscheidend ist, dass der Untergrund vorher geprüft und vorbereitet wird.
### Sind Rauchwarnmelder in Mietwohnungen in Sachsen-Anhalt Pflicht?
Ja. Nach der Bauordnung des Landes Sachsen-Anhalt müssen Schlafräume, Kinderzimmer und Flure, über die Aufenthaltsräume erreicht werden, mit Rauchwarnmeldern ausgestattet sein. Wer für Einbau und Wartung zuständig ist, sollte im Mietvertrag geregelt sein.
### Was gehört ins Übergabeprotokoll?
Zählerstände, Anzahl der Schlüssel, der Zustand jedes Raums mit Fotos, bekannte Mängel sowie Datum und Unterschriften beider Seiten.`,
    contentRu: `## Коротко о главном
- Планирование начинается с расторжения договора, а не с выезда. Предварительный осмотр в период уведомления экономит недели.
- Порядок работ определяет скорость и качество: сначала демонтаж и коммуникации, потом стены, потом пол, в конце монтаж и уборка.
- Работы с электрикой, газом и отоплением выполняют профильные специалисты.
- В Саксонии-Анхальт датчики дыма обязательны в спальнях, детских и коридорах, ведущих в жилые комнаты.
- Подробный акт передачи с фотографиями защищает обе стороны.

## Шаг 1: осмотр до выезда арендатора
После расторжения договора арендодатель, как правило, может осмотреть квартиру, заранее предупредив арендатора. Используйте этот визит, чтобы зафиксировать состояние стен, полов, ванной, кухни, окон и дверей и определить объём ремонта. Тогда мастеров можно запланировать ещё до выезда и заранее заказать материалы.
Обязан ли прежний арендатор делать косметический ремонт, зависит от договора и от состояния квартиры при заселении. Многие старые пункты договоров по решениям судов недействительны. При сомнениях проверьте это в союзе собственников или у юриста, прежде чем закладывать расходы или требовать их.

## Шаг 2: определить объём
- Только освежить: покрасить стены и потолки, исправить мелкие повреждения, обновить силиконовые швы, финальная уборка.
- Средний ремонт: дополнительно новое напольное покрытие, новые межкомнатные двери или фурнитура, исправление штукатурки и шпаклёвки.
- Капитальный ремонт: дополнительно ванная, электропроводка, гипсокартон или изменение планировки.
Помогает вопрос, на каких арендаторов вы рассчитываете и какая арендная плата реальна на рынке. Не каждой квартире нужна новая ванная, но каждой нужны чистые стены, целый пол и исправная техника.

## Правильный порядок работ
- Демонтаж старых покрытий, обоев и повреждённых элементов.
- Коммуникации силами профильных специалистов, например электрика и сантехника.
- Гипсокартон, штукатурные и шпаклёвочные работы.
- Промежуточная уборка, чтобы пыль не попала под краску и пол.
- Покраска потолков и стен.
- Укладка пола.
- Монтаж дверей, плинтусов, выключателей, накладок розеток и сантехники.
- Финальная уборка и передача.
Соблюдая этот порядок, вы избегаете двойной работы, например свежей покраски, которую потом повредят при прокладке проводки.

## Чек-лист по помещениям
### Стены и потолки
Заделать отверстия, трещины и следы от дюбелей, обработать пятна, при необходимости снять обои. Для сдаваемых квартир хорошо подходят светлые нейтральные краски, которые легко подкрасить.
### Полы
Проверить состояние ламината, винила, паркета и плитки. Изношенный пол сильно влияет на впечатление при показе и при хорошем основании часто быстро меняется. Важно основание: неровности или влага иначе проявятся через несколько месяцев.
### Ванная и кухня
Проверить силиконовые швы, смесители, сливы, бачки и вентиляцию. Следы влаги и плесень не закрашивать, а выяснить причину.
### Окна, двери и радиаторы
Проверить ход и уплотнители окон и дверей, отрегулировать фурнитуру, проверить радиаторы и термостатические вентили.
### Электрика и безопасность
Проверить розетки и выключатели на повреждения. Работы с электропроводкой выполняет электрик. Проверить или установить датчики дыма в спальнях, детских и коридорах, ведущих в жилые комнаты.

## Сколько времени закладывать?
Простое освежение с покраской и уборкой часто занимает несколько рабочих дней. Если добавляются новый пол и мелкий ремонт, стоит рассчитывать на одну-две недели. Ремонт ванной или работы с электропроводкой заметно увеличивают срок. Надёжный график можно составить после осмотра.

## Как держать расходы под контролем
- Объём работ и состояние квартиры.
- Площадь и высота потолков, например в домах старой постройки.
- Материалы для пола, покраски и оснащения.
- Вывоз старых покрытий.
- Доступ, этаж и возможность парковки.
Расходы на ремонт сдаваемой квартиры в Германии обычно можно учесть как расходы на получение дохода (Werbungskosten). Исключение — крупные работы в первые три года после покупки: если они превышают 15 % стоимости приобретения здания, их рассматривают как расходы на создание имущества. Уточните это заранее у налогового консультанта.

## Ремонт между арендаторами под ключ
Когда несколько видов работ должны пройти в короткий срок, удобно иметь одного исполнителя, который согласует порядок и сроки. Мы стараемся осмотреть квартиру ещё до выезда арендатора, готовим понятное предложение и передаём квартиру убранной и готовой к заселению.

## Частые вопросы
### Обязан ли прежний арендатор делать ремонт?
Это зависит от договора аренды и от состояния квартиры при заселении. Многие пункты о косметическом ремонте недействительны, например если квартиру сдавали без ремонта. При сомнениях пункт стоит проверить у юриста.
### Какая краска подходит для стен в сдаваемой квартире?
Светлые нейтральные краски с хорошей укрывистостью, которые потом легко подкрасить. Многие арендодатели используют один и тот же оттенок, чтобы подкраска при следующей смене арендатора была незаметна.
### Стоит ли менять пол перед новой сдачей?
Часто да, потому что пол сильно влияет на впечатление при показе. В сдаваемых квартирах популярны прочные покрытия, например винил или качественный ламинат. Главное — заранее проверить и подготовить основание.
### Обязательны ли датчики дыма в съёмных квартирах в Саксонии-Анхальт?
Да. По строительному кодексу земли Саксония-Анхальт спальни, детские и коридоры, ведущие в жилые комнаты, должны быть оснащены датчиками дыма. Кто отвечает за установку и обслуживание, стоит закрепить в договоре аренды.
### Что указать в акте передачи квартиры?
Показания счётчиков, количество ключей, состояние каждой комнаты с фотографиями, известные недостатки, дату и подписи обеих сторон.`,
    coverUrl: null,
    coverWidth: 0,
    coverHeight: 0,
    published: true,
    publishedAt: new Date('2026-10-24T03:15:00Z'),
    updatedAt: new Date('2026-10-24T03:15:00Z'),
  },
];

export function getStaticArticle(slug: string) {
  return STATIC_ARTICLES.find((article) => article.slug === slug) ?? null;
}

export function getPublishedStaticArticles(now = new Date()) {
  return STATIC_ARTICLES.filter((article) => article.published && article.publishedAt <= now);
}

/** Объединяет статьи из БД со статьями из кода; при совпадении slug остаётся версия из БД. */
export function mergeWithStaticArticles<T extends {slug: string; publishedAt: Date}>(
  dbArticles: T[],
  staticArticles: T[],
) {
  const dbSlugs = new Set(dbArticles.map((article) => article.slug));
  return [...dbArticles, ...staticArticles.filter((article) => !dbSlugs.has(article.slug))].sort(
    (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
  );
}
