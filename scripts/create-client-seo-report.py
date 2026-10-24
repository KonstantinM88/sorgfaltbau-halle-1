"""Build the client-facing SorgfaltBau PDF; no site, database or API writes."""
from pathlib import Path
import sys
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "tmp/pdfs/vendor"))
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, Color, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import Paragraph

OUT = ROOT / "output/pdf/SorgfaltBau_Otchet_i_plan_prodvizheniya_RU_2026-10-22.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)
MARK = ROOT / "tmp/pdfs/saaleweb-mark.png"
if not MARK.exists():
    MARK.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run([
        "C:/Program Files/nodejs/node.exe", "-e",
        "require('sharp')('D:/projects/saaleweb-app/saaleweb-app/public/brand/saaleweb-mark.svg')"
        ".resize(420,420).png().toFile(process.argv[1]).catch(e=>{console.error(e.message);process.exitCode=1;});",
        str(MARK),
    ], cwd=ROOT, check=True)
W, H = A4
M = 42
CW = W - 2 * M
INK = "#111827"
BODY = "#374151"
MUTED = "#667085"
PINK = "#FF4FA3"
PURPLE = "#8B5CF6"
GREEN = "#047857"
LINE = "#E6E7EF"
for name, filename in [("Segoe", "segoeui.ttf"), ("SegoeBold", "segoeuib.ttf")]:
    pdfmetrics.registerFont(TTFont(name, "C:/Windows/Fonts/" + filename))
pdfmetrics.registerFontFamily("Segoe", normal="Segoe", bold="SegoeBold", italic="Segoe", boldItalic="SegoeBold")

C = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
C.setTitle("SorgfaltBau | Отчёт о работе и план продвижения | 22.10.2026")
C.setAuthor("SaaleWeb")
C.setSubject("Понятный отчёт для заказчика: сайт, Google, рекомендации и план работ")
C.setCreator("SaaleWeb - client report")
BASE = json.loads((ROOT / "docs/seo/baseline-2026-10-21.json").read_text(encoding="utf-8"))
assert len(BASE["indexation"]) == 40
assert BASE["periods"][0]["datasets"]["totals"]["rows"][0]["clicks"] == 47
BOUNDS = []


def box(x, top, width, height, fill="#FFFFFF", border=LINE, radius=13):
    C.setFillColor(HexColor(fill))
    C.setStrokeColor(HexColor(border or fill))
    C.setLineWidth(0.7)
    C.roundRect(x, H - top - height, width, height, radius, stroke=bool(border), fill=1)


def gradient(x, top, width, height, a=PINK, b=PURPLE):
    C.saveState()
    p = C.beginPath()
    p.rect(x, H - top - height, width, height)
    C.clipPath(p, stroke=0)
    C.linearGradient(x, 0, x + width, 0, [HexColor(a), HexColor(b)])
    C.restoreState()


def text(s, x, top, width=CW, size=10.7, leading=None, color=BODY, bold=False, max_h=None):
    s = s.replace("\u2011", "-").replace("\u2013", "-").replace("\u2014", "-")
    style = ParagraphStyle("p", fontName="SegoeBold" if bold else "Segoe", fontSize=size,
                           leading=leading or size * 1.4, textColor=HexColor(color),
                           spaceBefore=0, spaceAfter=0, allowWidows=0, allowOrphans=0)
    p = Paragraph(s, style)
    _, ph = p.wrap(width, H)
    if max_h is not None:
        assert ph <= max_h + .2, f"Text overflow page {C.getPageNumber()}: {s[:70]} ({ph}>{max_h})"
    assert top + ph < H - 38, f"Footer overflow page {C.getPageNumber()}: {s[:70]}"
    p.drawOn(C, x, H - top - ph)
    BOUNDS.append((C.getPageNumber(), x, top, width, ph))
    return ph


def label(s, top, x=M, color=PURPLE):
    text(s.upper(), x, top, CW, 8.3, color=color, bold=True)


def logo(top=28):
    C.drawImage(str(MARK), M, H - top - 29, 29, 29, mask="auto")
    C.setFont("SegoeBold", 18)
    C.setFillColor(HexColor(INK))
    C.drawString(M + 38, H - top - 22, "Saale")
    tw = pdfmetrics.stringWidth("Saale", "SegoeBold", 18)
    C.setFillColor(HexColor(PURPLE))
    C.drawString(M + 38 + tw, H - top - 22, "Web")


def footer(n):
    C.setStrokeColor(HexColor(LINE))
    C.line(M, 44, W - M, 44)
    C.setFillColor(HexColor(MUTED))
    C.setFont("Segoe", 8)
    C.drawString(M, 28, "SaaleWeb  /  SorgfaltBau  /  22 октября 2026")
    C.drawRightString(W - M, 28, f"{n:02d} / 08")
    C.linkURL("https://saaleweb.de/ru", (M, 24, M + 57, 39), relative=0)


def page(n, tag, title, intro=None):
    C.setFillColor(white)
    C.rect(0, 0, W, H, stroke=0, fill=1)
    gradient(0, 0, W, 4)
    logo()
    text("ОТЧЁТ ДЛЯ ЗАКАЗЧИКА", W - M - 170, 38, 170, 8.1, color=MUTED)
    label(tag, 93)
    th = text(title, M, 116, CW, 25, leading=30, color=INK, bold=True)
    if intro:
        text(intro, M, 126 + th, CW, 10.7, max_h=65)
    footer(n)


def finish():
    C.showPage()


def card(x, top, width, height, title, body, num=None, fill="#FFFFFF"):
    box(x, top, width, height, fill)
    tx = x + 17
    ty = top + 16
    if num:
        C.setFillColor(HexColor("#F1EAFE"))
        C.circle(tx + 10, H - ty - 10, 11, stroke=0, fill=1)
        text(num, tx + 3, ty + 2, 18, 9, color=PURPLE, bold=True)
        ty += 32
    ht = text(title, tx, ty, width - 34, 12.2, leading=16.4, color=INK, bold=True)
    text(body, tx, ty + ht + 9, width - 34, 10.3, leading=14.6,
         max_h=height - (ty - top) - ht - 23)


def note(top, title, body, height=85, fill="#F6F1FF", color=PURPLE):
    box(M, top, CW, height, fill, None)
    C.setFillColor(HexColor(color))
    C.roundRect(M, H - top - height, 4, height, 2, stroke=0, fill=1)
    ht = text(title, M + 17, top + 13, CW - 34, 11.2, color=INK, bold=True)
    text(body, M + 17, top + 20 + ht, CW - 34, 10.3, leading=14.5,
         max_h=height - 31 - ht)


# 1. Cover and executive summary.
C.setFillColor(HexColor("#FBFAFF"))
C.rect(0, 0, W, H, fill=1, stroke=0)
gradient(0, 0, W, 4)
gradient(0, 78, W, 350, "#FFF0F8", "#F0EAFF")
C.setStrokeColor(Color(.55, .36, .96, alpha=.06))
for x in range(0, int(W), 33):
    C.line(x, H - 78, x, H - 428)
for y in range(78, 429, 33):
    C.line(0, H - y, W, H - y)
logo()
label("SorgfaltBau  /  Halle (Saale)", 111)
text("Что сделано.<br/>Что мешает росту.", M, 149, CW, 34, leading=41, bold=True, color=INK)
text("Как двигаться дальше.", M, 239, CW, 31, leading=39, bold=True, color=PURPLE)
text("Отчёт о работе над сайтом и план продвижения", M, 306, CW - 25, 14, leading=21, color=INK)
text("Для владельца бизнеса. Без сложных технических терминов.", M, 365, CW, 10.5, color=MUTED)

metrics = [("1 038", "показов в Google"), ("47", "переходов на сайт"), ("40", "страниц проверено")]
mw = (CW - 22) / 3
for i, (value, caption) in enumerate(metrics):
    x = M + i * (mw + 11)
    box(x, 449, mw, 105)
    text(value, x + 16, 464, mw - 32, 29, color=INK, bold=True)
    text(caption, x + 16, 511, mw - 32, 9.5, color=MUTED)
text("Статистика Google: 1 мая - 18 октября 2026. Проверка страниц: 21 октября.", M, 566, CW, 8.7, color=MUTED)
label("Главное за одну минуту", 615)
text("Сайт уже находят в Google, но охват пока небольшой. В ходе аудита четыре важные немецкие страницы услуг были неизвестны Google. Подготовлены изменения, которые помогают обнаружить услуги и быстрее связаться с компанией.",
     M, 642, CW, 12.1, leading=18.2, color=INK)
text("Следующий шаг: подтвердить публикацию изменений, проверить страницы в Google и усилить доверие реальными примерами работ.",
     M, 727, CW, 10.6, leading=15, color=PURPLE)
footer(1)
finish()

# 2. Historical delivered foundation, grounded in AGENTS.
page(2, "01 / Выполненная работа", "Что уже сделано для сайта",
     "Это обзор ранее выполненных этапов по журналу проекта. Последние изменения после SEO-аудита показаны отдельно на следующей странице.")
gw = (CW - 15) / 2
items = [
    ("Два языка и понятная структура", "Подготовлены немецкая и русская версии, страницы компании, контактов, услуг, статей и примеров работ. Посетителю проще понять предложение."),
    ("Восемь направлений услуг", "Созданы подробные страницы: ремонт квартир и ванных, внутренняя отделка, кладка, фасады, полы, мощение и кровля. В каждой версии языка."),
    ("Содержание для выбора подрядчика", "Расширены описания работ, этапы, ответы на вопросы и объяснение факторов стоимости. Без вымышленных цен, сроков и гарантий."),
    ("Удобство с телефона", "Переработаны меню, контакты и первый экран. Загрузка видео отложена, изображения оптимизированы. Свежую оценку скорости ещё нужно измерить."),
    ("Путь к обращению", "Настроены форма заявки, отправка почты через Hostinger, подтверждение клиенту и базовая защита от спама. Доставку в реальный ящик нужно проверить отдельно."),
    ("Техническая основа продвижения", "Упорядочены адреса и языковые версии, подготовлена карта страниц для Google. Убраны ложные даты обновления страниц при каждой публикации сайта."),
]
for i, (title, body) in enumerate(items):
    card(M + (i % 2) * (gw + 15), 220 + (i // 2) * 159, gw, 146, title, body)
note(711, "Что это даёт бизнесу", "Сайт стал удобнее и подробнее. Но качество сайта само по себе не означает, что Google уже показывает все услуги и что каждый переход станет заявкой.", height=80)
finish()

# 3. Changes from current audit, with honest release status.
page(3, "02 / Работа по итогам аудита", "Что улучшено сейчас",
     "Изменения подготовлены, проверены и переданы в основную версию проекта 22 октября. Проверка опубликованного сайта пока показывает прежнюю версию.")
newitems = [
    ("Услуги заметнее на главной", "Добавлен ранний блок со ссылками на все восемь услуг. Внизу сайта восстановлена ссылка на ремонт квартир."),
    ("Статьи ведут к заказу услуги", "Добавлены связи между полезными материалами и страницами ремонта, внутренней отделки, полов и фасадов."),
    ("Точнее объяснено предложение", "Главная яснее рассказывает о ремонте и внутренней отделке в Halle. Усилен текст о ремонте фасада, в том числе без утепления."),
    ("Меньше препятствий для поиска", "Исправлено обозначение языка RU. Для Google открыт доступ к публичным фото и обложкам; служебные разделы остаются закрыты."),
    ("Карта сайта соответствует контенту", "Подготовлено регулярное обновление списка статей. Даты изменений берутся из реальных данных, а не из времени публикации сайта."),
    ("Есть основа для сравнения", "Сохранены исходная статистика и состояние каждой из 40 страниц. Составлен порядок повторных проверок через 7 и 14 дней."),
]
for i, (title, body) in enumerate(newitems):
    card(M + (i % 2) * (gw + 15), 220 + (i // 2) * 148, gw, 135, title, body)
note(675, "Важно: передача изменений и их появление на сайте - разные этапы", "Проверки кода, рабочей сборки и 40 страниц локальной версии пройдены. Теперь нужно подтвердить обновление на Hostinger и только после этого запрашивать повторную проверку Google.", height=103, fill="#FFF6ED", color="#B45309")
finish()

# 4. Evidence, no fabricated post-release gains.
page(4, "03 / Исходные показатели", "Что показывает Google",
     "Эти цифры получены до публикации последних изменений. Это отправная точка, а не результат новой работы и не прогноз будущих заявок.")
ty = 217
box(M, ty, CW, 132)
cols = [M + 15, M + 237, M + 324, M + 413]
for s, x in zip(["Период", "Показы", "Переходы", "Доля кликов"], cols):
    text(s, x, ty + 14, 205 if x == cols[0] else 83, 9, color=MUTED, bold=True)
rows = [("01.05 - 18.10.2026", "1 038", "47", "4,53%"),
        ("24.08 - 20.09, 28 дней", "210", "4", "1,90%"),
        ("21.09 - 18.10, 28 дней", "203", "8", "3,94%")]
for i, row in enumerate(rows):
    y = ty + 43 + 27 * i
    for j, (s, x) in enumerate(zip(row, cols)):
        text(s, x, y, 205 if j == 0 else 80, 10.1, color=INK, bold=j > 0)
text("Показ - сайт появился в поисковой выдаче. Переход - человек нажал на результат. Это ещё не звонок и не заказ.", M, 363, CW, 10.1, leading=14.5)
text("В двух равных периодах переходы выросли с 4 до 8, а показы снизились с 210 до 203. Данных пока мало, чтобы считать это устойчивым ростом.", M, 411, CW, 10.3, leading=14.5)
label("Состояние 40 страниц на 21 октября", 468)
bar_top = 495
for x, count, fill in [(M, 28, "#10B981"), (M + CW * .7, 7, PINK), (M + CW * .875, 5, PURPLE)]:
    C.setFillColor(HexColor(fill))
    C.rect(x, H - bar_top - 20, CW * count / 40, 20, stroke=0, fill=1)
legend = [("28", "Google включил в поиск", GREEN), ("7", "Google ещё не знает", "#C0267D"), ("5", "Google видел, но не включил", PURPLE)]
for i, (n, caption, color) in enumerate(legend):
    x = M + i * (CW / 3)
    text(n, x, 531, CW / 3 - 10, 23, color=color, bold=True)
    text(caption, x, 568, CW / 3 - 13, 9.4, leading=13)
note(620, "Первый приоритет - четыре немецкие страницы услуг", "Ремонт квартир, внутренняя отделка (Trockenbau), напольные покрытия и кладочные работы (Rohbau). Сначала помогаем Google обнаружить именно эти коммерческие страницы.", height=91)
text("36 из 47 переходов были с мобильных устройств; 44 - из Германии. Статистика считается по датам Google (Pacific Time). Таблицы запросов неполные: часть запросов Google скрывает.", M, 732, CW, 9.3, leading=13.1, color=MUTED)
finish()

# 5. Recommendations.
page(5, "04 / Рекомендации", "На чём сосредоточить усилия",
     "Не на количестве новых страниц, а на обнаружении важных услуг, доказательствах качества работ и понятном пути от поиска к обращению.")
recommendations = [
    ("01", "Сначала - доступность ключевых услуг", "Подтвердить обновление сайта, проверить четыре немецкие страницы в Google и запросить их включение в поиск. Сохранить текущие адреса и не создавать похожие страницы-конкуренты."),
    ("02", "Показать реальные работы компании", "Подготовить 2-3 подробных примера: тип объекта, проблема клиента, выполненные работы, фото до/после и подтверждённый результат. Нужны собственные материалы и разрешение на публикацию."),
    ("03", "Привести в порядок профиль Google", "Проверить профиль компании на Картах: услуги, телефоны, часы, фото и фактическую зону работы. Принимать только настоящие отзывы и отвечать на них. Состояние профиля ещё не проверено. [2]"),
    ("04", "Понимать, откуда приходят обращения", "Согласовать учёт успешных заявок и нажатий на телефон. Вести простой журнал: источник, услуга, качество обращения и результат. Клик по номеру не считать состоявшимся разговором."),
]
for i, (num, title, body) in enumerate(recommendations):
    top = 216 + i * 119
    box(M, top, CW, 107)
    text(num, M + 16, top + 17, 40, 20, color=PURPLE, bold=True)
    text(title, M + 65, top + 14, CW - 82, 12, leading=16, bold=True, color=INK)
    text(body, M + 65, top + 39, CW - 83, 10.1, leading=14.3, max_h=58)
note(710, "Про Google и ответы искусственного интеллекта", "Полезные ответы, реальные кейсы и доступные страницы помогают пониманию сайта. Отдельной гарантии попадания в ИИ-ответы нет; для Google действуют обычные основы продвижения. [3]", height=80)
finish()

# 6. Concrete plan with owners and dates.
page(6, "05 / Рекомендуемый план работ", "Ближайшие шаги и контроль",
     "План рассчитан от фактического обновления сайта. Сроки - контрольные точки нашей работы, а не обещание сроков включения страниц или роста позиций Google.")
steps = [
    ("Сейчас", "Подтвердить публикацию", "SaaleWeb: проверить обновление Hostinger, страницы DE/RU, изображения и контакты; затем подготовить запросы Google. Компания: согласовать тестовое обращение.", "Результат: изменения видны на рабочем сайте."),
    ("29 октября", "Первая проверка через 7 дней", "SaaleWeb: повторно проверить обнаружение страниц и сравнить с аудитом. Компания: выбрать 2-3 приоритетные услуги и передать материалы первых объектов.", "Результат: видно, какие страницы Google обнаружил."),
    ("5 ноября", "Проверка через 14 дней", "SaaleWeb: проверить все 40 страниц, отдельно семь неизвестных; при отсутствии изменений изучить причины. Подготовить первые кейсы после согласования компании.", "Результат: список изменений и конкретных следующих действий."),
    ("Конец ноября*", "Первое сравнение трафика", "SaaleWeb: сравнить 28 полных дней после публикации с сопоставимым периодом. Компания: сверить реальные обращения и их качество с журналом заявок.", "Результат: оценка показов, переходов и обращений, а не только позиций."),
    ("Далее / 30-60 дней", "Развивать то, что подтверждают данные", "Обновлять кейсы, профиль Google и полезные ответы по приоритетным работам. Усиливать страницы с релевантными показами; новые материалы планировать по фактам.", "Результат: регулярный цикл улучшений и ежемесячный отчёт."),
]
for i, (when, title, body, result) in enumerate(steps):
    top = 217 + i * 105
    C.setFillColor(HexColor(PURPLE if i % 2 else PINK))
    C.circle(M + 6, H - top - 9, 4, stroke=0, fill=1)
    text(when, M + 21, top, 133, 9.6, color=PURPLE, bold=True)
    text(title, M + 151, top - 1, CW - 151, 11.8, bold=True, color=INK)
    text(body, M + 151, top + 22, CW - 151, 10, leading=13.7, max_h=56)
    text(result, M + 151, top + 79, CW - 151, 8.6, leading=11.5, color=GREEN, max_h=24)
text("* Если сайт обновится 22 октября. При более поздней публикации даты сдвигаются. Для сравнения нужны полные дни и окончательные данные Google. Объём следующих этапов и бюджет согласуются отдельно.", M, 758, CW, 8.9, leading=12.3, color=MUTED)
finish()

# 7. Client participation and business measurement.
page(7, "06 / Совместная работа", "Что потребуется от компании",
     "Продвижение строительной компании опирается на реальные объекты, понятное предложение и качественную обработку обращений. Эти данные нельзя заменить общими текстами.")
needs = [
    ("Выбрать приоритет", "Указать 2-3 услуги, которые важнее продавать сейчас, фактическую зону выезда и доступность команды. Это поможет не распылять усилия."),
    ("Передать материалы объектов", "Для каждого примера: услуга, город без точного частного адреса, задача, выполненные работы, реальные сроки при наличии и 5-10 собственных фото."),
    ("Подтвердить факты", "Проверить цифры опыта и проектов, отзывы и разрешения на фото. Не публиковать персональные данные клиентов без подходящего основания."),
    ("Учитывать обращения", "Фиксировать звонки и формы: дата, нужная услуга, источник, целевой ли запрос, отправлена ли смета и чем завершилось общение."),
]
for i, (title, body) in enumerate(needs):
    card(M + (i % 2) * (gw + 15), 219 + (i // 2) * 156, gw, 143, title, body)
label("Как поймём, что работа помогает бизнесу", 552)
box(M, 578, CW, 128, "#F7F4FF", None)
text("1. Видимость: важные услуги появляются в поиске.<br/>2. Интерес: растут релевантные показы и переходы.<br/>3. Обращения: появляются подтверждённые звонки и формы.<br/>4. Продажи: обращения переходят в осмотры, сметы и заказы.", M + 18, 593, CW - 36, 10.7, leading=23)
text("Сейчас мы достоверно видим статистику поиска. Источник прежних обращений и число состоявшихся звонков не установлены. Учёт обращений нужно организовать отдельно; новую внешнюю аналитику подключать только после согласования приватности.", M, 726, CW, 10, leading=14.1, color=MUTED)
finish()

# 8. Practical handoff + source notes.
page(8, "07 / Практический чек-лист", "Что проверить в Google",
     "После появления новой версии сайта сначала проверить эти четыре адреса. Они были неизвестны Google во время исходного аудита.")
urlitems = [
    ("Ремонт квартир", "wohnungsrenovierung-halle"),
    ("Внутренняя отделка / Trockenbau", "trockenbau-halle"),
    ("Напольные покрытия", "bodenbelaege-halle"),
    ("Кладочные работы / Rohbau", "rohbau-halle"),
]
for i, (caption, slug) in enumerate(urlitems):
    top = 210 + i * 58
    url = "https://www.sorgfaltbau.de/de/services/" + slug
    text(f"0{i+1}  {caption}", M, top, CW, 11.3, bold=True, color=INK)
    text(f'<link href="{url}" color="{PURPLE}">{url}</link>', M, top + 23, CW, 8.5, leading=12)
note(455, "Порядок действий", 'В Google Search Console открыть «Проверка URL», вставить адрес и после проверки выбрать «Запросить индексирование». Отметить дату. Повторные запросы одного URL не ускоряют процесс. [1]', height=91)
text("Затем проверить главную, страницу фасадных работ и обновлённые статьи, включая русские версии. Полная очередь сохранена в плане сопровождения проекта.", M, 562, CW, 10.3, leading=14.6)
text("Карта сайта уже принята Google: 40 адресов, без ошибок. Заново отправлять её после каждого изменения не нужно. Принятие карты не означает, что все страницы включены в поиск.", M, 612, CW, 10.3, leading=14.6)
label("На чём основан отчёт", 676)
text("Аудит 21.10.2026: данные Search Console за 01.05-18.10, проверка 40 страниц, журнал выполненных работ и сохранённый исходный снимок. Передача изменений: 22.10, версия aa7d7a0. Публикация на Hostinger ещё не подтверждена. Свежая скорость, профиль Google, санкции и ссылочный профиль отдельно не оценены.", M, 697, CW, 8.3, leading=11.3, color=MUTED)
text('[1] <link href="https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl" color="#6D28D9">Google: повторная проверка страниц</link>   [2] <link href="https://support.google.com/business/answer/7091?hl=ru" color="#6D28D9">Google: местное продвижение</link><br/>[3] <link href="https://developers.google.com/search/docs/appearance/ai-features" color="#6D28D9">Google: сайт и функции ИИ</link>   Рекомендации проверены 22.10.2026. Результаты поиска не гарантируются.', M, 756, CW, 8, leading=11)
finish()
C.save()

# Reopen, extract, render and validate the actual PDF, not just authoring inputs.
from pypdf import PdfReader
import pymupdf
from PIL import Image, ImageDraw
reader = PdfReader(str(OUT))
assert len(reader.pages) == 8
extracted = "\n".join(p.extract_text() for p in reader.pages)
for required in ["1 038", "47", "29 октября", "5 ноября", "wohnungsrenovierung-halle", "Сайт уже"]:
    assert required in extracted, required
assert "\ufffd" not in extracted
assert all(abs(float(p.mediabox.width) - W) < 1 and abs(float(p.mediabox.height) - H) < 1 for p in reader.pages)
qa = ROOT / "tmp/pdfs/rendered"
qa.mkdir(parents=True, exist_ok=True)
doc = pymupdf.open(str(OUT))
imgs = []
for i, p in enumerate(doc):
    pix = p.get_pixmap(matrix=pymupdf.Matrix(1.4, 1.4), alpha=False)
    dest = qa / f"page-{i+1:02d}.png"
    pix.save(str(dest))
    for block in p.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line.get("spans", []):
                x0, y0, x1, y1 = span["bbox"]
                assert x0 >= M - 2 and x1 <= W - M + 2, (i + 1, span["text"], span["bbox"])
                assert y0 >= 10 and y1 <= H - 15, (i + 1, span["text"], span["bbox"])
    thumb = Image.open(dest).convert("RGB")
    thumb.thumbnail((420, 595))
    imgs.append(thumb)
contact = Image.new("RGB", (4 * 450, 2 * 635), "#E5E7EB")
draw = ImageDraw.Draw(contact)
for i, im in enumerate(imgs):
    x, y = (i % 4) * 450 + 15, (i // 4) * 635 + 25
    contact.paste(im, (x, y))
    draw.text((x, y - 18), f"{i+1:02d} / 08", fill="#111827")
contact.save(qa / "contact-sheet.png")
links = sum(len(p.get("/Annots", [])) for p in reader.pages)
assert links >= 15, links
print(json.dumps({"output": str(OUT), "pages": 8, "bytes": OUT.stat().st_size,
                  "links": links, "textChecks": "pass", "boundsChecks": "pass",
                  "contactSheet": str(qa / "contact-sheet.png")}, ensure_ascii=False, indent=2))
