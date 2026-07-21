(() => {
  "use strict";

  const root = document.documentElement;
  const body = document.body;

  // Aus Datenschutzgründen nur Vornamen eintragen, deren Veröffentlichung zugestimmt wurde.
  const STUDENT_FIRST_NAMES = [
    "Vorname 1",
    "Vorname 2",
    "Vorname 3",
    "Vorname 4",
    "Vorname 5",
    "Vorname 6",
    "Vorname 7",
    "Vorname 8"
  ];

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("cyberpedia-theme"); } catch (_) { /* Lokale Dateivorschau kann Speicherzugriff blockieren. */ }
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = saved || (prefersDark ? "dark" : "light");

    function updateButtons() {
      const dark = root.dataset.theme === "dark";
      const themeColor = document.querySelector('meta[name="theme-color"]');
      if (themeColor) themeColor.content = dark ? "#0c1220" : "#f7f9fc";
      document.querySelectorAll(".theme-toggle").forEach((button) => {
        button.textContent = dark ? "☀" : "☾";
        button.setAttribute("aria-label", dark ? "Helle Darstellung aktivieren" : "Dunkle Darstellung aktivieren");
        button.title = dark ? "Zur hellen Darstellung" : "Zur dunklen Darstellung";
      });
    }

    document.querySelectorAll(".theme-toggle").forEach((button) => {
      button.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        root.dataset.theme = next;
        try { localStorage.setItem("cyberpedia-theme", next); } catch (_) { /* Darstellung funktioniert auch ohne Speicherung. */ }
        updateButtons();
      });
    });
    updateButtons();
  }

  function initNavigation() {
    const page = body.dataset.page;
    document.querySelector(`[data-nav="${page}"]`)?.classList.add("active");

    const toggle = document.querySelector(".nav-toggle");
    const nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    function closeNavigation() {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".sr-only").textContent = "Menü öffnen";
    }

    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.querySelector(".sr-only").textContent = open ? "Menü schließen" : "Menü öffnen";
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) closeNavigation();
    });

    document.addEventListener("click", (event) => {
      if (nav.classList.contains("open") && !nav.contains(event.target) && !toggle.contains(event.target)) closeNavigation();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeNavigation();
        toggle.focus();
      }
    });
  }

  function initPageEnhancements() {
    const header = document.querySelector(".site-header");
    const main = document.querySelector("main");
    if (!main) return;

    const progress = document.createElement("div");
    progress.className = "reading-progress";
    progress.setAttribute("aria-hidden", "true");
    progress.innerHTML = "<span></span>";
    document.body.prepend(progress);
    const progressValue = progress.firstElementChild;

    const backToTop = document.createElement("button");
    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.setAttribute("aria-label", "Nach oben scrollen");
    backToTop.textContent = "↑";
    document.body.appendChild(backToTop);
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }));

    const tocLinks = [...document.querySelectorAll('.toc a[href^="#"]')];
    const tocSections = tocLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute("href")) }))
      .filter((item) => item.section);

    function updateScrollUi() {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progressValue.style.width = `${Math.min(100, (window.scrollY / scrollable) * 100)}%`;
      header?.classList.toggle("scrolled", window.scrollY > 12);
      backToTop.classList.toggle("visible", window.scrollY > 560);

      if (tocSections.length) {
        let current = tocSections[0];
        tocSections.forEach((item) => {
          if (item.section.getBoundingClientRect().top <= 190) current = item;
        });
        tocLinks.forEach((link) => {
          const active = link === current.link;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      }
    }

    window.addEventListener("scroll", updateScrollUi, { passive: true });
    window.addEventListener("resize", updateScrollUi);
    updateScrollUi();

    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const revealItems = [...main.querySelectorAll(".section-heading, .feature-card, .split-grid > *, .glossary-card, .content-section, .simulator-card, .quiz-shell, .mini-links a")];
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -9%", threshold: .08 });

    revealItems.forEach((item, index) => {
      item.classList.add("reveal-ready");
      item.style.transitionDelay = `${(index % 3) * 70}ms`;
      revealObserver.observe(item);
    });
  }

  function initGlossarySearch() {
    const input = document.getElementById("glossary-search");
    const cards = [...document.querySelectorAll(".glossary-card")];
    const empty = document.getElementById("glossary-empty");
    if (!input || !cards.length) return;

    input.addEventListener("input", () => {
      const query = input.value.trim().toLocaleLowerCase("de");
      let visible = 0;
      cards.forEach((card) => {
        const haystack = `${card.textContent} ${card.dataset.terms || ""}`.toLocaleLowerCase("de");
        const match = !query || haystack.includes(query);
        card.hidden = !match;
        if (match) visible += 1;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  }

  function initStudentCredits() {
    const triggers = [...document.querySelectorAll(".student-credits-trigger")];
    if (!triggers.length) return;

    const dialog = document.createElement("dialog");
    dialog.id = "student-credits-dialog";
    dialog.className = "student-credits-dialog";
    dialog.setAttribute("aria-labelledby", "student-credits-title");
    dialog.innerHTML = `
      <div class="student-credits-card">
        <button class="student-credits-close" type="button" aria-label="Namensliste schließen">×</button>
        <p class="student-credits-kicker">Das Team hinter Cyberpedia</p>
        <h2 id="student-credits-title">Eingangsklasse EK2</h2>
        <p class="student-credits-intro">Hier können die Vornamen der Schülerinnen und Schüler stehen, die ihrer Veröffentlichung zugestimmt haben.</p>
        <ul class="student-name-list" aria-label="Mitwirkende Schülerinnen und Schüler"></ul>
        <p class="student-consent-note"><span aria-hidden="true">●</span> Vornamen werden nur nach freiwilliger Zustimmung veröffentlicht.</p>
      </div>
    `;

    const list = dialog.querySelector(".student-name-list");
    STUDENT_FIRST_NAMES.forEach((name) => {
      const item = document.createElement("li");
      item.textContent = name;
      if (/^Vorname \d+$/.test(name)) item.classList.add("placeholder");
      list.appendChild(item);
    });

    document.body.appendChild(dialog);

    function openDialog() {
      triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "true"));
      body.classList.add("dialog-open");
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
      dialog.querySelector(".student-credits-close").focus();
    }

    function closeDialog() {
      if (typeof dialog.close === "function") dialog.close();
      else {
        dialog.removeAttribute("open");
        body.classList.remove("dialog-open");
        triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
      }
    }

    triggers.forEach((trigger) => {
      trigger.setAttribute("aria-controls", dialog.id);
      trigger.setAttribute("aria-haspopup", "dialog");
      trigger.setAttribute("aria-expanded", "false");
      trigger.addEventListener("click", openDialog);
    });

    dialog.querySelector(".student-credits-close").addEventListener("click", closeDialog);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", () => {
      body.classList.remove("dialog-open");
      triggers.forEach((trigger) => trigger.setAttribute("aria-expanded", "false"));
      triggers[0]?.focus();
    });
  }

  function initWlanSimulator() {
    const module = document.querySelector('[data-module="wlan-simulator"]');
    if (!module) return;

    const frequency = document.getElementById("wlan-frequency");
    const obstacle = document.getElementById("wlan-obstacle");
    const distance = document.getElementById("wlan-distance");
    const distanceOutput = document.getElementById("wlan-distance-output");
    const rssiOutput = document.getElementById("wlan-rssi");
    const speedOutput = document.getElementById("wlan-speed");
    const qualityOutput = document.getElementById("wlan-quality");
    const wall = document.getElementById("wlan-wall");
    const meterBars = [...document.querySelectorAll("#signal-meter b")];

    const maxRates = { "2.4": 240, "5": 1200, "6": 1800 };
    const baseOffset = { "2.4": 39, "5": 45, "6": 47 };
    const wallClasses = {
      "0": "wall-none",
      "3": "wall-wood",
      "7": "wall-brick",
      "15": "wall-concrete",
      "22": "wall-water",
      "30": "wall-metal"
    };

    function update() {
      const freq = frequency.value;
      const meters = Number(distance.value);
      const obstacleLoss = Number(obstacle.value);
      const freeSpaceModel = 20 * Math.log10(Math.max(1, meters));
      const rssi = Math.round(-(baseOffset[freq] + freeSpaceModel + obstacleLoss));
      const maxRate = maxRates[freq];

      let factor = 0;
      if (rssi >= -55) factor = 1;
      else if (rssi >= -65) factor = 0.75;
      else if (rssi >= -72) factor = 0.5;
      else if (rssi >= -80) factor = 0.22;
      else if (rssi >= -87) factor = 0.06;

      const speed = Math.round(maxRate * factor);
      let quality = "Kein stabiler Empfang";
      let qualityClass = "bad";
      let activeBars = 1;
      if (rssi >= -55) { quality = "Sehr gut"; qualityClass = "excellent"; activeBars = 4; }
      else if (rssi >= -68) { quality = "Gut"; qualityClass = "good"; activeBars = 3; }
      else if (rssi >= -78) { quality = "Ausreichend"; qualityClass = "fair"; activeBars = 2; }

      distanceOutput.textContent = `${meters} m`;
      rssiOutput.textContent = `${String(rssi).replace("-", "−")} dBm`;
      speedOutput.textContent = speed > 0 ? `${speed.toLocaleString("de-DE")} Mbit/s` : "unter Nutzgrenze";
      qualityOutput.textContent = quality;
      qualityOutput.className = `quality ${qualityClass}`;

      wall.className = `wall ${wallClasses[obstacle.value]}`;
      meterBars.forEach((bar, index) => {
        const on = index < activeBars;
        bar.style.opacity = on ? "1" : ".18";
        bar.style.background = qualityClass === "bad" ? "var(--red)" : qualityClass === "fair" ? "var(--orange)" : "var(--green)";
      });
    }

    [frequency, obstacle].forEach((element) => element.addEventListener("change", update));
    distance.addEventListener("input", update);
    update();
  }

  function formatDuration(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return "–";
    if (seconds < 60) return `${seconds.toFixed(1).replace(".", ",")} Sek.`;
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.round(seconds % 60);
    return `${minutes} Min. ${String(remaining).padStart(2, "0")} Sek.`;
  }

  function initCableSimulator() {
    const module = document.querySelector('[data-module="cable-simulator"]');
    if (!module) return;

    const distance = document.getElementById("cable-distance");
    const size = document.getElementById("cable-size");
    const interference = document.getElementById("cable-interference");
    const distanceOutput = document.getElementById("cable-distance-output");
    const sizeOutput = document.getElementById("cable-size-output");

    function update() {
      const meters = Number(distance.value);
      const gigabytes = Number(size.value);
      const noisy = interference.value === "high";
      let copperRate;
      let copperLoss;

      if (meters <= 500) { copperRate = 250; copperLoss = "gering"; }
      else if (meters <= 1000) { copperRate = 175; copperLoss = "merklich"; }
      else if (meters <= 1800) { copperRate = 90; copperLoss = "hoch"; }
      else { copperRate = 35; copperLoss = "sehr hoch"; }

      if (noisy) {
        copperRate = Math.max(10, Math.round(copperRate * 0.55));
        copperLoss += " + Störeinfluss";
      }

      const fiberRate = 1000;
      const megabits = gigabytes * 8000;

      distanceOutput.textContent = `${meters.toLocaleString("de-DE")} m`;
      sizeOutput.textContent = `${gigabytes} GB`;
      document.getElementById("copper-speed").textContent = `${copperRate.toLocaleString("de-DE")} Mbit/s`;
      document.getElementById("copper-loss").textContent = copperLoss;
      document.getElementById("copper-time").textContent = formatDuration(megabits / copperRate);
      document.getElementById("fiber-speed").textContent = `${fiberRate.toLocaleString("de-DE")} Mbit/s`;
      document.getElementById("fiber-loss").textContent = "sehr gering";
      document.getElementById("fiber-time").textContent = formatDuration(megabits / fiberRate);
    }

    distance.addEventListener("input", update);
    size.addEventListener("input", update);
    interference.addEventListener("change", update);
    update();
  }

  const quizQuestions = [
    { topic: "Netzwerke", question: "Welche Aufgabe hat ein Router hauptsächlich?", answers: ["Er speichert alle Webseiten dauerhaft", "Er leitet Daten zwischen verschiedenen Netzwerken weiter", "Er verschlüsselt automatisch jede Datei"], correct: 1, explanation: "Router entscheiden, über welchen nächsten Weg Datenpakete zwischen Netzen weitergeleitet werden." },
    { topic: "Netzwerke", question: "Warum erreicht 2,4-GHz-WLAN häufig eine größere praktische Reichweite als 5 GHz?", answers: ["Die niedrigere Frequenz wird in Gebäuden meist weniger stark gedämpft", "2,4 GHz verwendet immer stärkere Antennen", "5 GHz funktioniert nur im Freien"], correct: 0, explanation: "Niedrigere Frequenzen durchdringen viele Hindernisse günstiger. Sendeleistung, Antennen und Umgebung bleiben trotzdem wichtig." },
    { topic: "Netzwerke", question: "Was bedeutet ein Empfangspegel von −50 dBm im Vergleich zu −80 dBm?", answers: ["−50 dBm ist deutlich stärker", "−80 dBm ist stärker", "Beide Werte sind identisch"], correct: 0, explanation: "Bei negativen dBm-Werten liegt der stärkere Pegel näher an 0." },
    { topic: "Netzwerke", question: "Welche Aussage zu Glasfaser ist korrekt?", answers: ["Sie überträgt Daten mit Lichtsignalen und ist unempfindlich gegen elektromagnetische Störungen", "Sie arbeitet grundsätzlich ohne Signalverlust", "Sie kann nur auf Entfernungen unter 100 Metern genutzt werden"], correct: 0, explanation: "Glasfaser verwendet optische Signale und ist gegenüber elektromagnetischen Feldern unempfindlich, hat aber ebenfalls technische Verluste und Grenzen." },
    { topic: "Netzwerke", question: "Was bewirkt ein Verlust von ungefähr 3 dB bei der Leistung?", answers: ["Etwa eine Halbierung", "Eine Verdopplung", "Keine messbare Änderung"], correct: 0, explanation: "3 dB Verlust entsprechen näherungsweise einer Halbierung der Leistung. Die Datenrate halbiert sich dadurch nicht zwingend exakt." },
    { topic: "Sicherheit", question: "Wofür steht das A in der CIA-Triade?", answers: ["Authentication", "Availability", "Anonymity"], correct: 1, explanation: "CIA steht für Confidentiality, Integrity und Availability – Vertraulichkeit, Integrität und Verfügbarkeit." },
    { topic: "Sicherheit", question: "Was ist das typische Ziel eines Phishing-Angriffs?", answers: ["Sensible Daten oder Zugänge zu erlangen", "Die Internetgeschwindigkeit zu erhöhen", "Den Speicherplatz eines Geräts zu vergrößern"], correct: 0, explanation: "Phishing nutzt Täuschung, um Passwörter, Zahlungsdaten oder andere sensible Informationen abzugreifen." },
    { topic: "Sicherheit", question: "Warum sollte jedes Konto ein eigenes Passwort haben?", answers: ["Damit ein bekannt gewordenes Passwort nicht mehrere Konten gefährdet", "Weil Passwörter sonst langsamer geladen werden", "Weil Zwei-Faktor-Schutz dann verboten ist"], correct: 0, explanation: "Passwort-Wiederverwendung ermöglicht Angreifern, gestohlene Zugangsdaten automatisiert bei anderen Diensten zu testen." },
    { topic: "Sicherheit", question: "Welche Maßnahme schützt zusätzlich, wenn ein Passwort gestohlen wurde?", answers: ["Mehrfaktor-Authentisierung", "Ein größerer Monitor", "Das Löschen des Browserverlaufs"], correct: 0, explanation: "Ein zweiter Faktor erschwert den Kontozugriff trotz bekanntem Passwort erheblich." },
    { topic: "Sicherheit", question: "Welche Aussage zu Cloud-Synchronisation ist richtig?", answers: ["Sie ist nicht automatisch ein unabhängiges Backup", "Sie verhindert jede Ransomware-Infektion", "Sie ersetzt grundsätzlich alle lokalen Sicherungen"], correct: 0, explanation: "Auch gelöschte oder verschlüsselte Dateien können synchronisiert werden. Versionierung und getrennte Sicherungen bleiben wichtig." },
    { topic: "Sicherheit", question: "Gilt das Recht auf Löschung nach der DSGVO immer ohne Ausnahme?", answers: ["Nein, beispielsweise können gesetzliche Pflichten entgegenstehen", "Ja, ausnahmslos innerhalb einer Minute", "Nur bei öffentlichen Profilen"], correct: 0, explanation: "Das Löschungsrecht ist wichtig, aber nicht absolut. Die DSGVO und andere Gesetze kennen Ausnahmen." },
    { topic: "Medienkompetenz", question: "Was geschieht bei der Indexierung durch eine Suchmaschine?", answers: ["Gefundene Inhalte werden analysiert und in einem Suchindex gespeichert", "Alle Webseiten werden automatisch juristisch geprüft", "Der Browser löscht doppelte Dateien"], correct: 0, explanation: "Indexierung bereitet gefundene Inhalte für spätere Suchanfragen auf." },
    { topic: "Medienkompetenz", question: "Beweist HTTPS, dass eine Website seriös ist?", answers: ["Nein, HTTPS schützt vor allem die Verbindung", "Ja, jede HTTPS-Seite ist staatlich geprüft", "Nur bei Online-Shops"], correct: 0, explanation: "HTTPS verschlüsselt die Übertragung. Betrügerische Seiten können trotzdem ein gültiges Zertifikat besitzen." },
    { topic: "Medienkompetenz", question: "Was ist bei einer ungewöhnlichen Behauptung der beste erste Schritt?", answers: ["Originalquelle suchen und unabhängige Quellen vergleichen", "Sofort teilen, damit andere warnen können", "Nur die Überschrift lesen"], correct: 0, explanation: "Die Originalquelle und unabhängige Bestätigungen helfen, Kontext und Beleglage zu prüfen." },
    { topic: "Medienkompetenz", question: "Was unterscheidet Desinformation von unbeabsichtigter Fehlinformation?", answers: ["Desinformation wird gezielt zur Täuschung oder Manipulation verbreitet", "Desinformation enthält immer Bilder", "Fehlinformation ist grundsätzlich strafbar"], correct: 0, explanation: "Entscheidend ist die Absicht: Desinformation wird bewusst irreführend verbreitet." },
    { topic: "Medienkompetenz", question: "Wie sollten KI-generierte Antworten für eine wichtige Recherche genutzt werden?", answers: ["Als Ausgangspunkt, dessen Aussagen und Quellen geprüft werden", "Als unangreifbare Primärquelle", "Ohne die genannten Quellen zu öffnen"], correct: 0, explanation: "KI kann plausibel klingende Fehler erzeugen. Wichtige Aussagen sollten an verlässlichen Originalquellen überprüft werden." },
    { topic: "Medienkompetenz", question: "Warum ist ein Suchergebnis auf Platz 1 nicht automatisch wahr?", answers: ["Ranking bewertet viele Signale, aber nicht automatisch die sachliche Wahrheit", "Weil Suchmaschinen nur zufällig sortieren", "Weil der erste Treffer immer Werbung ist"], correct: 0, explanation: "Hohe Platzierungen können relevant und nützlich sein, ersetzen aber keine Quellenkritik." }
  ];

  function shuffle(items) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function initQuiz() {
    const module = document.querySelector('[data-module="quiz"]');
    if (!module) return;

    const startScreen = document.getElementById("quiz-start");
    const playScreen = document.getElementById("quiz-play");
    const resultScreen = document.getElementById("quiz-result");
    const startButton = document.getElementById("quiz-start-button");
    const restartButton = document.getElementById("quiz-restart");
    const nextButton = document.getElementById("quiz-next");
    const questionElement = document.getElementById("quiz-question");
    const answersElement = document.getElementById("quiz-answers");
    const feedback = document.getElementById("quiz-feedback");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackText = document.getElementById("feedback-text");
    const topicElement = document.getElementById("quiz-topic");
    const counterElement = document.getElementById("quiz-counter");
    const progressElement = document.getElementById("quiz-progress");
    const timeElement = document.getElementById("quiz-time");

    let questions = [];
    let current = 0;
    let score = 0;
    let elapsed = 0;
    let timer = null;
    let categoryScore = {};

    function timeString(seconds) {
      const minutes = Math.floor(seconds / 60);
      const rest = seconds % 60;
      return `${minutes}:${String(rest).padStart(2, "0")}`;
    }

    function startTimer() {
      clearInterval(timer);
      elapsed = 0;
      timeElement.textContent = "0:00";
      timer = setInterval(() => {
        elapsed += 1;
        timeElement.textContent = timeString(elapsed);
      }, 1000);
    }

    function showQuestion() {
      const item = questions[current];
      feedback.hidden = true;
      nextButton.hidden = true;
      answersElement.innerHTML = "";
      topicElement.textContent = item.topic;
      counterElement.textContent = `Frage ${current + 1} von ${questions.length}`;
      progressElement.style.width = `${((current + 1) / questions.length) * 100}%`;
      questionElement.textContent = item.question;

      item.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "answer-button";
        button.innerHTML = `<b>${String.fromCharCode(65 + index)}</b><span></span>`;
        button.querySelector("span").textContent = answer;
        button.addEventListener("click", () => chooseAnswer(index));
        answersElement.appendChild(button);
      });
    }

    function chooseAnswer(selectedIndex) {
      const item = questions[current];
      const buttons = [...answersElement.querySelectorAll("button")];
      buttons.forEach((button, index) => {
        button.disabled = true;
        if (index === item.correct) button.classList.add("correct");
        if (index === selectedIndex && selectedIndex !== item.correct) button.classList.add("wrong");
      });

      const correct = selectedIndex === item.correct;
      if (correct) {
        score += 1;
        categoryScore[item.topic] = (categoryScore[item.topic] || 0) + 1;
      }
      feedbackTitle.textContent = correct ? "Richtig!" : "Noch nicht ganz.";
      feedbackText.textContent = item.explanation;
      feedback.hidden = false;
      nextButton.textContent = current === questions.length - 1 ? "Auswertung anzeigen →" : "Nächste Frage →";
      nextButton.hidden = false;
      nextButton.focus();
    }

    function finishQuiz() {
      clearInterval(timer);
      playScreen.hidden = true;
      resultScreen.hidden = false;
      const percent = Math.round((score / questions.length) * 100);
      let title = "Grundlagen vorhanden";
      let message = "Wiederhole die Kapitel gezielt und starte danach eine neue Runde.";
      let icon = "📘";
      if (percent >= 88) { title = "Ausgezeichnet!"; message = "Du beherrschst die Kernthemen sehr sicher."; icon = "🏆"; }
      else if (percent >= 63) { title = "Gute Leistung!"; message = "Die wichtigsten Zusammenhänge sitzen. Einzelne Details kannst du noch vertiefen."; icon = "🎯"; }
      else if (percent >= 38) { title = "Guter Anfang"; message = "Ein Teil des Wissens sitzt bereits. Nutze die Kapitel zum gezielten Nacharbeiten."; icon = "🚀"; }

      const best = Object.entries(categoryScore).sort((a, b) => b[1] - a[1])[0]?.[0] || "–";
      document.getElementById("result-icon").textContent = icon;
      document.getElementById("result-title").textContent = title;
      document.getElementById("result-message").textContent = message;
      document.getElementById("result-score").textContent = score;
      document.getElementById("result-percent").textContent = `${percent} %`;
      document.getElementById("result-time").textContent = timeString(elapsed);
      document.getElementById("result-best").textContent = best;
    }

    function begin() {
      questions = shuffle(quizQuestions).slice(0, 8);
      current = 0;
      score = 0;
      categoryScore = {};
      startScreen.hidden = true;
      resultScreen.hidden = true;
      playScreen.hidden = false;
      startTimer();
      showQuestion();
    }

    nextButton.addEventListener("click", () => {
      current += 1;
      if (current >= questions.length) finishQuiz();
      else showQuestion();
    });
    startButton.addEventListener("click", begin);
    restartButton.addEventListener("click", begin);
  }

  initTheme();
  initNavigation();
  initPageEnhancements();
  initGlossarySearch();
  initStudentCredits();
  initWlanSimulator();
  initCableSimulator();
  initQuiz();
})();
