# Cyberpedia – EK2 Digitalprojekt

Finale, redaktionell konsolidierte Fassung des Homepageprojekts der Eingangsklasse EK2.

**Online:** [Cyberpedia auf GitHub Pages](https://jakobsawazki.github.io/Cyberpedia-EK2/)

## Projektstruktur

- `index.html` – Startseite, Themenübersicht und Glossar
- `netzwerke.html` – WLAN, Funktechnik, Router, Kupfer und Glasfaser inklusive Simulationen
- `sicherheit.html` – Cybersicherheit, Kontenschutz, Backups und Datenschutz
- `medienkompetenz.html` – Internet, Suchmaschinen, Quellenprüfung, Fake News und vernetzte Gesellschaft
- `quiz.html` – zufallsgenerierter Lerncheck
- `style.css` – einzige zentrale CSS-Datei
- `script.js` – Navigation, Darstellungsmodus, Lesefortschritt, Scrollanimationen, Simulationen, Glossarsuche und Quiz
- `assets/` – Logo, Schüler-Infografik, fotorealistisches Titelmotiv und Raster-Favicons
- `favicon.ico` – Browser-Tab-Logo in mehreren Auflösungen
- `DOKUMENTATION.md` – vollständige Dokumentation aller bisherigen Projektphasen
- `tools/` – Prüfskript und reproduzierbare Favicon-Erzeugung

## Nutzung

Die Homepage benötigt keinen Build-Prozess. `index.html` kann lokal geöffnet oder der gesamte Ordner auf einen statischen Webserver beziehungsweise Replit hochgeladen werden.

Für alle Funktionen sollte die Ordnerstruktur unverändert bleiben. Externe Links werden ausschließlich für weiterführende Quellen geöffnet; die eigentliche Homepage funktioniert offline.

Die lokalen Verweise und IDs lassen sich optional mit `python tools/validate_site.py` prüfen.

Die vollständige Entstehungs-, Gestaltungs-, Prüf- und Veröffentlichungshistorie steht in [DOKUMENTATION.md](DOKUMENTATION.md).

## Redaktionelle Hinweise

- Mehrere einzelne Schülerseiten wurden in wenige, klar gegliederte Kapitel zusammengeführt.
- Technische Aussagen wurden sprachlich und fachlich präzisiert.
- Platzhalter, doppelte Seiten, Inline-CSS und isolierte Einzelskripte wurden entfernt.
- Das Layout ist responsiv, tastaturbedienbar und unterstützt einen hellen sowie dunklen Darstellungsmodus.
- Dezente Hover-, Fokus- und Scrollanimationen verbessern die Orientierung; die Systemeinstellung für reduzierte Bewegung wird respektiert.
- Die Simulationen sind didaktische Modelle und keine Mess- oder Planungstools.

© 2026 Cyberpedia · Eingangsklasse EK2
