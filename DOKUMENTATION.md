# Cyberpedia – vollständige Projektdokumentation

**Projekt:** Informationshomepage der Eingangsklasse EK2

**Stand:** 21. Juli 2026

**Repository:** <https://github.com/JakobSawazki/Cyberpedia-EK2>

**Onlinefassung:** <https://jakobsawazki.github.io/Cyberpedia-EK2/>

## 1. Auftrag und Ziel

Aus den von den Schülerinnen und Schülern erarbeiteten HTML-, CSS-, JavaScript- und Markdown-Dateien sollte eine vollständige, fachlich belastbare und übersichtliche Informationshomepage entstehen. Dabei sollten möglichst wenige HTML-Dateien, genau eine zentrale CSS-Datei und bei Bedarf eine zentrale JavaScript-Datei verwendet werden.

Das Ergebnis ist eine statische, ohne Build-Prozess lauffähige Website. Sie eignet sich für GitHub Pages, Replit, einen Schulserver oder jeden anderen statischen Webserver.

## 2. Sichtung und Konsolidierung der Ausgangsdateien

Die zahlreichen Einzel-, Test- und Varianten-Seiten wurden thematisch geordnet und in fünf Hauptseiten zusammengeführt:

| Zielseite | Übernommene und ausgebaute Inhalte |
|---|---|
| `index.html` | Startseite, Projektüberblick und durchsuchbares Glossar |
| `netzwerke.html` | WLAN, Funkwellen, Signalhindernisse, Router, Dämpfung, Kupfer und Glasfaser |
| `sicherheit.html` | Bedrohungen, Phishing, sichere Konten, Passkeys, Backups und DSGVO |
| `medienkompetenz.html` | Internet, Suchmaschinen, Quellenprüfung, Fake News, KI-Inhalte und soziale Netzwerke |
| `quiz.html` | interaktiver Lerncheck mit zufälliger Fragenauswahl und Erklärungen |

Die Ausgangsinhalte `wlanundfunkverbindung.html`, `signalhindernisseunddaempfung.html`, `routerundoptimierung.html`, `kupferuglasfkabel.html`, die Varianten im Ordner `leo`, `cybersicherheitunddatenschutz.html`, `suchergebnisseundinternet.html` und `vernetztegemeinschaften.html` gingen in diese Struktur ein.

Entfernt oder ersetzt wurden:

- doppelte Test- und Simulatorvarianten;
- isolierte Inline-CSS-Blöcke und Einzelskripte;
- ein nicht konfigurierter PayPal-Platzhalter;
- die missverständliche Bezeichnung „Wikipedia“;
- unfertige Platzhalter sowie physikalisch oder fachlich zu pauschale Aussagen.

## 3. Redaktionelle und fachliche Überarbeitung

Die Schülertexte wurden sprachlich vereinheitlicht, gegliedert und ergänzt. Technische Aussagen zu Funkwellenausbreitung, Frequenzbereichen, Dämpfung, Glasfaser, HTTPS, Authentisierung, Backups und Datenschutz wurden präzisiert.

Ergänzt wurden unter anderem:

- nachvollziehbare Lernziele und Merksätze;
- offizielle weiterführende Quellen;
- Glossareinträge, darunter DNS, Passkey und Deepfake;
- konkrete Prüfschritte für Quellen und verdächtige Nachrichten;
- ein ausgewogener Vergleich von Kupfer- und Glasfaseranschlüssen;
- Erklärungen zu jeder Antwort im Quiz.

Die Simulationen dienen ausdrücklich der Veranschaulichung im Unterricht und nicht als Mess- oder Planungstools.

## 4. Gestaltung und Bedienung

Das komplette Projekt nutzt `style.css` als einzige zentrale CSS-Datei. Navigation, Kopf- und Fußbereich, Typografie, Farben, Karten, Tabellen, Formulare und Inhaltsseiten folgen einem gemeinsamen responsiven Gestaltungssystem.

Umgesetzt wurden:

- Desktop-, Tablet- und Smartphone-Layouts;
- heller und dunkler Darstellungsmodus;
- mobile Navigation;
- sichtbare Tastatur-Fokuszustände und ein Sprunglink zum Hauptinhalt;
- animierte Button-, Karten- und Linkzustände;
- dezente Scroll-Einblendungen;
- Lesefortschrittsanzeige;
- aktive Kapitelmarkierung auf langen Seiten;
- Schaltfläche „Nach oben“;
- Rücksicht auf `prefers-reduced-motion` für Nutzerinnen und Nutzer, die reduzierte Bewegung wünschen.

## 5. Interaktive Funktionen

Alle Funktionen liegen zentral in `script.js`:

- Navigation und mobiles Menü;
- Speicherung des Darstellungsmodus;
- Glossarsuche mit Sofortfilter;
- WLAN-Modell für Frequenz, Entfernung und Hindernisse;
- Vergleichsmodell für Kupfer- und Glasfaserzugänge;
- Quiz mit zufälligen Fragen, Fortschrittsanzeige, Auswertung und Erklärungen;
- Scrollanimationen, Lesefortschritt, Kapitelmarkierung und „Nach oben“-Funktion.
- aufrufbare EK2-Namensliste im Fußbereich mit zentral gepflegten Vornamen.

## 6. Bildmaterial

### Titelmotiv

Für die Startseite wurde ein fotorealistisches Cybersecurity-Titelmotiv erzeugt und als `assets/cyberpedia-hero.webp` eingebunden. Es unterstützt die Themen Netzwerke, Sicherheit und digitale Medien, ohne Textinhalte zu überlagern.

### Browser-Tab-Logo

Am 21. Juli 2026 wurde das bisher im Browser-Tab verwendete SVG durch ein eigens erzeugtes fotorealistisches Rastermotiv ersetzt. Das Motiv zeigt ein dunkelblaues Hightech-Schild aus Metall und Glas mit einem klaren cyanfarbenen Netzwerkkern. Die kontrastreiche, symmetrische Form bleibt auch in kleinen Browser-Tabs erkennbar.

Verwendete Dateien:

- `assets/cyberpedia-favicon-source.png` – unverkleinertes Ausgangsbild;
- `assets/cyberpedia-favicon.png` – 512 × 512 Pixel für hochauflösende Geräte und Apple-Touch-Icons;
- `assets/cyberpedia-favicon-32.png` – optimierte 32 × 32-Pixel-Fassung;
- `favicon.ico` – Mehrgrößen-Datei mit 16, 32, 48, 64, 128 und 256 Pixeln;
- `tools/build_favicons.py` – reproduzierbare Erzeugung der Größen aus dem Ausgangsbild.

Der finale Generierungsauftrag lautete:

> Use case: product-mockup. Asset type: square raster favicon and browser-tab logo for the German educational website “Cyberpedia”. Create a photorealistic miniature high-tech cyber shield as a premium studio product photograph. Use a deep midnight-navy background, one centered front-facing shield made from dark brushed titanium and sapphire-blue glass, and a simple glowing cyan network core. Keep it symmetrical, high-contrast and readable at 16 × 16 and 32 × 32 pixels. No text, letters, numbers, watermark, brand marks, browser chrome, extra objects, flat vector style or cartoon look.

Das Bild wurde mit der integrierten Bildgenerierung im Rastermodus erstellt.

### Logo im Seitenkopf und Fußbereich

Das gleiche fotorealistische Schildmotiv wird als `assets/cyberpedia-logo.png` auch im sichtbaren Markenbereich oben links und im Fußbereich eingesetzt. Die 192 × 192 Pixel große PNG-Datei ist für hochauflösende Displays optimiert und wird auf der Website im Seitenkopf mit 56 Pixeln, auf kleinen Bildschirmen mit 50 Pixeln und im Fußbereich mit 42 Pixeln dargestellt. Ein feiner Rahmen, mehr Abstand und ein zurückhaltender Lichtschein sorgen für eine hochwertigere Wirkung. Das frühere Vektorlogo wurde vollständig ersetzt; die Website verwendet für das Cyberpedia-Logo keine SVG-Datei mehr.

## 7. Barrierearmut

Die Website enthält:

- semantische Überschriften und Seitenbereiche;
- aussagekräftige Beschriftungen für interaktive Elemente;
- Bedienbarkeit per Tastatur;
- sichtbare Fokusmarkierungen;
- ausreichend große Touch-Ziele;
- einen Sprunglink zum Hauptinhalt;
- respektierte Systemeinstellungen für reduzierte Bewegung;
- verständliche Rückmeldungen bei Suche, Simulationen und Quiz.
- einen per Tastatur bedienbaren Namensdialog mit Fokusführung, Escape-Unterstützung und sichtbarer Schließen-Schaltfläche.

## 8. Freiwillige Namensnennung der Schülerinnen und Schüler

Der Text „Eingangsklasse EK2“ im unteren Seitenbereich ist auf allen fünf Seiten als Schaltfläche umgesetzt. Beim Anklicken öffnet sich eine responsive Namensansicht. Bis zur Freigabe echter Vornamen enthält sie neutrale Platzhalter.

Die Namen werden genau einmal am Anfang von `script.js` im Array `STUDENT_FIRST_NAMES` gepflegt. Ein Platzhalter wie `"Vorname 1"` kann dort beispielsweise durch `"Anna"` ersetzt werden. Weitere Einträge können ergänzt oder nicht benötigte Platzhalter entfernt werden.

Es werden ausschließlich Vornamen eingetragen, deren Veröffentlichung freiwillig zugestimmt wurde. Nachnamen, Kontaktdaten oder andere personenbezogene Angaben sind für diese Funktion nicht vorgesehen.

## 9. Suchmaschinen und Linkvorschau

Ergänzt wurden:

- eindeutige Seitentitel und Beschreibungen;
- Canonical-Links;
- Open-Graph-Angaben und Social-Media-Vorschaubild;
- `robots.txt`;
- `sitemap.xml`;
- passende `theme-color`-Angaben;
- Raster-Favicons für Browser und Mobilgeräte.

## 10. Qualitätssicherung

Die Endfassung wurde auf folgende Punkte geprüft:

- vorhandene interne Links, Bilder, CSS- und JavaScript-Dateien;
- eindeutige HTML-IDs;
- korrekte lokale Pfade;
- gültige JavaScript-Syntax;
- Funktion von Navigation, Glossarsuche, Simulationen und Quiz;
- responsive Darstellung und mobile Navigation;
- Vorhandensein aller Favicon-Größen;
- Verwendung des Rasterlogos auf allen fünf Seiten;
- Tastatur- und Mausbedienung des EK2-Namensdialogs;
- Erreichbarkeit der veröffentlichten GitHub-Pages-Seite.

Das Prüfskript `tools/validate_site.py` kontrolliert die statische Seitenstruktur. Die Logo- und Favicon-Dateien können mit `tools/build_favicons.py` erneut aus dem Masterbild erzeugt werden.

## 11. Veröffentlichung auf GitHub

Am 21. Juli 2026 wurde das Repository `JakobSawazki/Cyberpedia-EK2` erstellt, der vollständige Projektstand auf den Hauptzweig `main` übertragen und GitHub Pages aktiviert.

- Erstveröffentlichung: Commit `6022d5f` („Cyberpedia EK2 veröffentlichen“)
- Repository: <https://github.com/JakobSawazki/Cyberpedia-EK2>
- Website: <https://jakobsawazki.github.io/Cyberpedia-EK2/>

Nach Änderungen an `main` wird die Website von GitHub Pages automatisch neu veröffentlicht.

## 12. Einbindung bei Sawazki Electronics

Cyberpedia wurde außerdem im Bereich „Unsere Projekte“ der Sawazki-Electronics-Homepage ergänzt:

- eigene Projektkarte mit fotorealistischem Rasterbild;
- direkter Link zur veröffentlichten Cyberpedia-Seite;
- Einordnung in der Reihenfolge unter BM-Lab;
- rechts daneben Solarsystem und danach Games Lab.

Relevante Schritte im Sawazki-Electronics-Repository:

- `ae68344` – Cyberpedia im Projektbereich ergänzen;
- `c03a972` – Cyberpedia-Veröffentlichung dokumentieren;
- `d65de8b` – Projektkarten neu anordnen;
- `79d53cd` – neue Projektanordnung dokumentieren.

Die Projektübersicht ist unter <https://jakobsawazki.github.io/sawazki-electronics/#projekte> erreichbar.

## 13. Aktuelle Projektstruktur

```text
EK2_Cyberpedia_final/
├── index.html
├── netzwerke.html
├── sicherheit.html
├── medienkompetenz.html
├── quiz.html
├── style.css
├── script.js
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── README.md
├── PROJEKTUEBERSICHT.md
├── DOKUMENTATION.md
├── assets/
│   ├── cyberpedia-hero.webp
│   ├── cyberpedia-logo.png
│   ├── cyberpedia-favicon-source.png
│   ├── cyberpedia-favicon.png
│   └── cyberpedia-favicon-32.png
└── tools/
    ├── validate_site.py
    └── build_favicons.py
```

## 14. Pflege und Weiterentwicklung

Inhalte werden direkt in den fünf HTML-Dateien gepflegt. Globale Gestaltung gehört ausschließlich in `style.css`, globale Interaktionen ausschließlich in `script.js`. Neue Dateien sollten nur angelegt werden, wenn sie die bestehende übersichtliche Struktur sinnvoll ergänzen.

Für die Namensliste werden ausschließlich die Werte in `STUDENT_FIRST_NAMES` am Anfang von `script.js` geändert. Vor jeder Veröffentlichung muss die freiwillige Zustimmung der genannten Schülerinnen und Schüler vorliegen.

Nach einer Änderung empfiehlt sich:

1. `python tools/validate_site.py` ausführen;
2. die betroffene Seite lokal über einen statischen Webserver prüfen;
3. Änderungen nachvollziehbar dokumentieren;
4. den geprüften Stand in das GitHub-Repository übertragen.

## 15. Chronologischer Überblick

| Datum | Schritt |
|---|---|
| 21.07.2026 | Schülerarbeiten gesichtet und zu fünf Seiten konsolidiert |
| 21.07.2026 | Inhalte fachlich, sprachlich und strukturell überarbeitet |
| 21.07.2026 | einheitliches responsives Design und zentrale Interaktionen umgesetzt |
| 21.07.2026 | fotorealistisches Titelmotiv, Animationen und Mikrointeraktionen ergänzt |
| 21.07.2026 | SEO-, Barrierearmuts- und Qualitätsprüfungen ergänzt |
| 21.07.2026 | GitHub-Repository erstellt, Projekt übertragen und GitHub Pages aktiviert |
| 21.07.2026 | Cyberpedia bei Sawazki Electronics mit Bild und Link eingebunden |
| 21.07.2026 | Projektkarten in die gewünschte Reihenfolge gebracht |
| 21.07.2026 | fotorealistisches Raster-Favicon erzeugt und auf allen Seiten eingebunden |
| 21.07.2026 | vollständige Projektdokumentation angelegt |
| 21.07.2026 | sichtbares Kopf- und Fußzeilenlogo vollständig auf fotorealistisches PNG umgestellt |
| 21.07.2026 | aufrufbare EK2-Namensliste mit Platzhaltern und Zustimmungshinweis ergänzt |
| 21.07.2026 | Seitenkopf-Logo vergrößert und mit dezenterem Premium-Licht- und Rahmeneffekt verfeinert |
