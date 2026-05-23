# SorgfaltBau – Bau- und Handwerksleistungen

Moderne, professionelle Website für SorgfaltBau – Bau- und Handwerksunternehmen in Halle (Saale).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Sprachen**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Animationen**: Framer Motion
- **Icons**: Lucide React
- **i18n**: next-intl (DE / RU)
- **Datenbank**: Prisma ORM + PostgreSQL (Neon.tech)

## Installation

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Umgebungsvariablen in .env konfigurieren
# -> DATABASE_URL, NEXT_PUBLIC_PHONE, NEXT_PUBLIC_EMAIL and SMTP_PASSWORD eintragen

# 3. Datenbank erstellen
npx prisma db push

# 4. Entwicklungsserver starten
npm run dev
```

## Bilder hinzufügen

Folgende Bilder werden benötigt:

```
public/images/
├── hero-bg.png          ← Baustelle / Gebäude (Hero-Hintergrund)
├── about.png            ← Team / Arbeiter
└── gallery/
    ├── bathroom.jpg     ← Badezimmer-Renovierung
    ├── drywall.jpg      ← Trockenbauarbeiten
    ├── facade.jpg       ← Fassadensanierung
    ├── flooring.jpg     ← Bodenverlegung
    ├── terrace.jpg      ← Terrassenbau
    └── room.jpg         ← Raumrenovierung
```

## Produktion

```bash
npm run build
npm start
```

## E-Mail-Zustellung

Kontaktformular-Nachrichten werden über die konfigurierte Hostinger-Mailbox versendet.
Für gute Zustellbarkeit müssen die DNS-Einträge der absendenden Domain aktiv bleiben:

- SPF für die Root-Domain mit Hostinger (`include:_spf.mail.hostinger.com`)
- DKIM CNAME-Einträge `hostingermail-a._domainkey`, `hostingermail-b._domainkey` und `hostingermail-c._domainkey`
- DMARC TXT-Eintrag unter `_dmarc`

`SMTP_USER` und `CONTACT_FROM_EMAIL` müssen dieselbe absendende Domain verwenden, zum Beispiel
`service@sorgfaltbau.de`. Kundenadressen gehören nur in `Reply-To`; sie dürfen nicht als
`From` der Website-E-Mails verwendet werden, weil sonst SPF, DKIM und DMARC nicht sauber
zusammenpassen.

Bei Spam-Analysen in Gmail zuerst "Original anzeigen" prüfen. Wenn SPF, DKIM und DMARC auf
`PASS` stehen, aber MailChannels-Header wie `X-MC-Relay: Junk` oder `X-MC-Relay: Bad`
auftauchen, liegt das Problem nicht an der DNS-Authentifizierung, sondern an Relay- oder
Inhaltsklassifizierung bei Hostinger/MailChannels. In diesem Fall den vollständigen Header
ohne personenbezogene Daten an Hostinger weitergeben und nach Relay-Reputation/False Positive
fragen.

Die Website-Mails verwenden bewusst stabile lateinische Betreffzeilen, eine ausgerichtete
SMTP-Envelope-Adresse und einen Firmenfooter. Wenn Gmail das eigentliche Lese-Postfach ist,
ist `CONTACT_TO_EMAIL` direkt auf dieses Postfach sauberer als eine zusätzliche Weiterleitung
von der Hostinger-Mailbox nach Gmail.

## Struktur

```
src/
├── app/
│   ├── [locale]/         ← Sprachbasiertes Routing (de/ru)
│   │   ├── layout.tsx    ← Hauptlayout mit Metadaten
│   │   ├── page.tsx      ← Startseite
│   │   ├── impressum/    ← Impressum
│   │   └── datenschutz/  ← Datenschutz
│   └── api/contact/      ← Kontaktformular API
├── components/           ← React-Komponenten
├── i18n/                 ← Internationalisierung
│   ├── config.ts
│   ├── request.ts
│   └── dictionaries/     ← DE + RU Übersetzungen
└── lib/
    └── prisma.ts         ← Datenbank-Client
```
