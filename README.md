# SensGAi Services

Zweisprachige Website (Deutsch und Arabisch) für Menschen in Deutschland. SensGAi ist nur Tippgeber: keine Versicherungsberatung, keine Finanzberatung, keine Vertragsvermittlung.

Slogan: „Wechseln. Sparen. Entspannen.“ / „بدّل، وفّر، وارتاح.“

## Lokal starten

Node.js 20 oder neuer.

```bash
npm install
npm run dev
```

Die Startseite liegt unter [http://localhost:3000/de](http://localhost:3000/de). `/` leitet nach `/de` weiter. Arabisch liegt unter `/ar`.

```bash
npm test
npm run lint
npm run build
npm run test:e2e
```

## Sprache und Richtung

Texte der Oberfläche stehen in `messages/de.json` und `messages/ar.json`. Eine weitere Sprache, zum Beispiel Englisch, braucht einen Eintrag in `src/i18n/routing.ts` und eine neue Datei `messages/en.json`.

Arabisch setzt `lang="ar"` und `dir="rtl"`. Das Layout nutzt logische CSS-Eigenschaften. Es gibt kein Sprach-Cookie. Die Sprache steht in der Adresse. Hell und Dunkel liegen nur im Browser (`localStorage`).

Es gibt keine Analyse, keine Tracking-Pixel und keine Werbe-Cookies.

## Inhalt

- Katalog: `src/data/catalog.ts`
- Ratgeber: `content/ratgeber/{de|ar}/*.mdx`
- Wegweiser: `src/data/wegweiser.ts` (nur Links zu offiziellen Stellen)
- Kontakt und Interesse: Server Actions. Versand über Resend oder SMTP.

Kopieren Sie `.env.example` nach `.env.local`. Ohne `MAIL_FROM`, `MAIL_TO` und entweder `RESEND_API_KEY` oder SMTP-Daten wird keine Nachricht versendet. Das Formular sagt das deutlich.

## Deployment

### Vercel, Region Frankfurt

1. Projekt importieren.
2. In den Projekteinstellungen die Region **Frankfurt (fra1)** wählen. `vercel.json` setzt `regions` für Funktionen ebenfalls auf `fra1`.
3. Umgebungsvariablen aus `.env.example` eintragen.
4. `NEXT_PUBLIC_SITE_URL` auf die echte Adresse setzen.

### Eigener Node-Host

Auf einem Server in der EU:

```bash
npm ci
npm run build
npm start
```

Davor dieselben Umgebungsvariablen setzen. Ein Reverse-Proxy (zum Beispiel Caddy oder nginx) sollte HTTPS übernehmen. `npm start` lauscht standardmäßig auf Port 3000.

## Noch Platzhalter

- Affiliate-Links: `AFFILIATE_URL_<SLUG>`, Kategorien sind `active: false`, in der Oberfläche steht „Link folgt“.
- Vergleichsfenster: `IFRAME_URL_<SLUG>`, kein iframe wird geladen.
- `supportsPrefill` ist überall falsch. Es gibt keine erfundenen Partner-Parameter.
- Feldhilfen und Glossar sind nur bei Strom ausformuliert. Die anderen Kategorien tragen TODO.
- Partnerlogos sind nicht erlaubt (`logoAllowed: false`). Die Kopfzeile ist ein Textlogo. `public/brand/logo.svg` ist nur eine Datei für später.
- Impressum ohne Straße, Register, Umsatzsteuer-ID und verantwortliche Person.
- Öffentliche E-Mail-Adresse fehlt.
- Anfragen und Angebote: nur die Interessen-Seite. Kein Supabase, keine Konten, keine Angebote.
- Die Kategorienliste in der Vorgabe endete bei der Haftpflicht. Girokonto und Reisen sind ergänzt, weil die Gruppen `finanzen` und `reisen` und der Auftrag Bankkonten und Reisen nennen.
- Der Artikel `behoerden-termin` gibt es nur auf Deutsch. Die arabische Adresse zeigt den deutschen Text mit Hinweis.

Vor einer öffentlichen Freigabe müssen Impressum, Datenschutz-Verantwortlicher und echte Partnerlinks geprüft werden.
