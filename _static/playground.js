(() => {
  "use strict";

  const root = document.getElementById("atlas-playground");
  if (!root) {
    return;
  }

  const playgroundScriptUrl = document.currentScript.src;
  const requirement = root.dataset.package;
  const editor = root.querySelector('[data-role="editor"]');
  const output = root.querySelector('[data-role="output"]');
  const presetsElement = root.querySelector('[data-role="presets"]');
  const statusElement = root.querySelector('[data-role="status"]');
  const statusText = root.querySelector('[data-role="status-text"]');
  const runButton = root.querySelector('[data-action="run"]');
  const stopButton = root.querySelector('[data-action="stop"]');
  const resetButton = root.querySelector('[data-action="reset"]');
  const copyButton = root.querySelector('[data-action="copy"]');
  const clearButton = root.querySelector('[data-action="clear"]');
  const pythonVersion = root.querySelector('[data-role="python-version"]');
  const libraryVersion = root.querySelector('[data-role="library-version"]');
  const datasetVersion = root.querySelector('[data-role="dataset-version"]');
  const editorHint = root.querySelector('[data-role="editor-hint"]');
  const filename = root.querySelector('[data-role="filename"]');
  const exploreForm = root.querySelector('[data-role="explore-form"]');
  const exploreQuery = root.querySelector('[data-role="explore-query"]');
  const exploreButton = root.querySelector('[data-action="explore"]');
  const exploreStatus = root.querySelector('[data-role="explore-status"]');
  const exploreResults = root.querySelector('[data-role="explore-results"]');
  let activeExplore = 0;
  const surpriseButton = root.querySelector('[data-action="surprise"]');
  const quizButton = root.querySelector('[data-action="quiz"]');
  const quizCard = root.querySelector('[data-role="quiz-card"]');
  const quizProgress = root.querySelector('[data-role="quiz-progress"]');
  const quizPrompt = root.querySelector('[data-role="quiz-prompt"]');
  const quizChoices = root.querySelector('[data-role="quiz-choices"]');
  const quizFeedback = root.querySelector('[data-role="quiz-feedback"]');
  const quizNext = root.querySelector('[data-action="quiz-next"]');
  const surprises = ["Machu Picchu", "Mount Fuji", "Sahara", "Lake Titicaca", "Victoria Falls", "Mount Everest", "Kilimanjaro", "Grand Canyon", "Amazon River", "Iceland", "Lake Baikal", "Mount Etna", "Galapagos Islands", "Easter Island", "Niagara Falls", "Mont Blanc", "Matterhorn", "Petra", "Angkor Wat", "Uluru", "Table Mountain", "Nile River", "Himalayas", "Madagascar", "Mount Kenya", "Gobi Desert", "Lake Como", "Venice", "Ha Long Bay", "Krakatoa", "Aconcagua", "Taj Mahal", "Stonehenge", "Eiffel Tower", "Mount Kinabalu", "Rocky Mountains", "Mauna Kea"];
  let activeQuiz = 0;
  let quizQuestions = [];
  let quizIndex = 0;
  let quizScore = 0;

  const presets = [
    {
      category: "Meet the world",
      id: "world-snapshot",
      label: "World snapshot",
      description: "Summarize the complete bundled atlas",
      code: `from collections import Counter
from pyworldatlas import Atlas

with Atlas() as atlas:
    info = atlas.dataset_info()
    continents = Counter(
        country.continent or "Other"
        for country in atlas
    )

    print("PYWORLDATLAS: WORLD SNAPSHOT")
    print(f"Dataset:         {info.dataset_version}")
    print(f"Profiles:        {len(atlas):,}")
    print(f"Populated places:{sum(c.major_city_count for c in atlas):>7,}")
    print("\\nProfiles by continent:")
    for continent, count in sorted(continents.items()):
        print(f"  {continent:<12} {count:>3}")`,
    },
    {
      category: "Meet the world",
      id: "postcard",
      label: "Country dossier",
      description: "A rich, readable profile in one query",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    country = atlas.country("Brazil")
    print(country.summary())`,
    },
    {
      category: "Meet the world",
      id: "compare",
      label: "Compare countries",
      description: "Build a compact comparison table",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    countries = [
        atlas.country(name)
        for name in ("Brazil", "Japan", "Switzerland", "Dominican Republic")
    ]

    print(f"{'COUNTRY':<22} {'CAPITAL':<17} {'AREA KM²':>12} {'COAST KM':>10}  CLIMATE")
    print("─" * 83)
    for country in countries:
        climate = country.climate.dominant_zone
        coast = country.coastline_km
        print(
            f"{country.flag} {country.name:<19} "
            f"{country.capital.name:<17} "
            f"{country.area_km2:>12,.0f} "
            f"{coast if coast is not None else 0:>10,.0f}  "
            f"{climate.code if climate else '-'}"
        )`,
    },
    {
      category: "Meet the world",
      id: "names",
      label: "Names and scripts",
      description: "Original writing systems with provenance",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for query, language in [
        ("Dominican Republic", "es"),
        ("China", "zh"),
        ("India", "hi"),
        ("Japan", "ja"),
    ]:
        country = atlas.country(query)
        local = country.local_name(language)
        print(f"{country.flag} {country.name}")
        print(f"  Local:     {local.short_name}")
        print(f"  Formal:    {local.formal_name or 'not supplied by this source'}")
        print(f"  Romanized: {local.romanized_short_name or 'not supplied by this source'}")
        print(f"  Script:    {local.script_code}")
        print(f"  Source:    {local.source.name}")
        print()`,
    },
    {
      category: "Measure and connect",
      id: "distance",
      label: "Distance toolkit",
      description: "Distance, bearing, and midpoint",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    tokyo = atlas.coordinates("Tokyo", country="JP")
    paris = atlas.coordinates("Paris", country="FR")

    print(f"Tokyo: {tokyo.format()}")
    print(f"       {tokyo.dms()}")
    print(f"Tokyo → Paris: {tokyo.distance_to(paris):,.0f} km")
    print(f"Initial direction: {tokyo.compass_direction_to(paris)}")
    print(f"Initial bearing: {tokyo.bearing_to(paris):.1f}°")
    midpoint = tokyo.midpoint_to(paris)
    print(f"Great-circle midpoint: {midpoint.format(precision=3)}")
    print(f"Same distance in miles: {tokyo.distance_to(paris, unit='mi'):,.0f} mi")`,
    },
    {
      category: "Measure and connect",
      id: "capital-radar",
      label: "Capital radar",
      description: "Find the nearest national capitals",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    origin = atlas.city("Santo Domingo", country="DO")
    nearby = atlas.nearest_capitals(origin, limit=8)

    print(f"NEAREST CAPITALS TO {origin.name.upper()}")
    for number, place in enumerate(nearby, 1):
        print(
            f"{number:>2}. {place.capital.name:<18} "
            f"{place.distance:>8,.0f} km  {place.country.name}"
        )`,
    },
    {
      category: "Measure and connect",
      id: "land-path",
      label: "Land-route explorer",
      description: "Traverse reviewed border relationships",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    path = atlas.border_path("Portugal", "China")
    print(" → ".join(path.names))
    print(f"\\nFewest reviewed land-border crossings: {path.crossings}")

    france = atlas.neighbors("France")
    print(f"France has {len(france)} reviewed land neighbors:")
    print(", ".join(country.name for country in france))`,
    },
    {
      category: "Measure and connect",
      id: "shared-waters",
      label: "Shared waters",
      description: "Follow rivers and lakes across profiles",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    amazon = atlas.countries_with_river("Amazon")
    geneva = atlas.countries_with_lake("Geneva")

    print("Countries linked to the source-listed Amazon:")
    print("  " + " → ".join(country.name for country in amazon))
    print("\\nCountries linked to source-listed Lake Geneva:")
    print("  " + " ↔ ".join(country.name for country in geneva))

    brazil = atlas.country("Brazil")
    print("\\nBrazil's source-listed major rivers:")
    for river in brazil.rivers:
        length = f"{river.length_km:,.0f} km" if river.length_km else "length not listed"
        print(f"  {river.name:<28} {length}")`,
    },
    {
      category: "Analyze the atlas",
      id: "rankings",
      label: "Leaderboard",
      description: "Compare several sourced metrics",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for metric, title in [
        ("area", "Largest area"),
        ("population", "Largest population snapshot"),
        ("coastline", "Longest sourced coastline"),
        ("highest_elevation", "Highest national point"),
    ]:
        print(f"\\n{title.upper()}")
        for row in atlas.rank(metric, limit=3):
            print(
                f"  {row.position}. {row.country.name:<20} "
                f"{row.value:>13,.0f} {row.unit}"
            )`,
    },
    {
      category: "Analyze the atlas",
      id: "climate",
      label: "Climate breakdown",
      description: "Inspect represented Köppen–Geiger classes",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    country = atlas.country("Japan")
    print(f"{country.flag} {country.name.upper()}: CLIMATE PROFILE")
    print(country.climate.summary)
    print(f"Reference period: {country.climate.reference_period}\\n")

    for zone in country.climate.koppen_geiger_zones:
        bar = "█" * max(1, round(zone.share_percent / 4))
        print(f"{zone.code:<3} {zone.share_percent:>5.1f}% {bar}  {zone.name}")

    cfb = atlas.countries(koppen_geiger_code="Cfb")
    print(f"\\nCfb is represented in {len(cfb)} country and area profiles.")`,
    },
    {
      category: "Analyze the atlas",
      id: "cities",
      label: "City explorer",
      description: "Search names and discover nearby places",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    matches = atlas.search_cities("santo", country="DO", limit=3)

    print("CITY SEARCH")
    for city in matches:
        print(f"  {city.label:<30} {city.coordinates.format()}")

    nearby = atlas.nearest_cities(
        "Santo Domingo",
        origin_country="DO",
        within_country="DO",
        limit=5,
    )
    print("\\nNEAR SANTO DOMINGO")
    for result in nearby:
        print(f"  {result.city.name:<25} {result.distance:>6.1f} km")`,
    },
    {
      category: "Analyze the atlas",
      id: "search-filter",
      label: "Search and filter",
      description: "Combine discovery tools like a database",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    print("SEARCH RESULTS FOR 'GUINEA'")
    for match in atlas.search_countries("guinea"):
        print(
            f"  {match.country.alpha2}  {match.country.name:<24} "
            f"score {match.score}"
        )

    selection = atlas.countries(
        continent="Americas",
        language_code="es",
        coastal=True,
    )
    print("\\nSPANISH-LANGUAGE + AMERICAS + COASTAL")
    print(", ".join(country.name for country in selection))`,
    },
    {
      category: "Learn and build",
      id: "quiz",
      label: "Quiz studio",
      description: "Build a colorful multiple-choice lesson",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    questions = atlas.quiz(
        topic="local_names",
        count=5,
        choices=4,
        seed="classroom-demo",
    )
    for number, question in enumerate(questions, 1):
        print(f"{number}. {question.prompt}")
        for choice_number, choice in enumerate(question.choices, 1):
            print(f"   {choice_number}. {choice}")
        print(f"   Answer: {question.answer_number}\\n")`,
    },
    {
      category: "Learn and build",
      id: "json-export",
      label: "JSON export",
      description: "Create a portable Unicode profile",
      code: `import json
from pyworldatlas import Atlas

with Atlas() as atlas:
    card = atlas.country("Japan").discovery_card().to_dict()
    portable = {
        "country": card["country"],
        "flag": card["flag_emoji"],
        "capital": card["capital"],
        "local_names": card["local_names"],
        "highest_point": card["highest_point"],
        "climate_classes": card["climate_zone_codes"],
        "source_ids": card["source_ids"],
    }

print(json.dumps(portable, ensure_ascii=False, indent=2))`,
    },
    {
      category: "Every place on Earth",
      id: "places",
      label: "Find any place",
      description: "Search 200,000 places by name",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for name in ("Everest", "Lake Titicaca", "Sahara", "Machu Picchu"):
        place = atlas.search_places(name, limit=1)[0]
        print(f"{place}  at  {place.coordinates.format(precision=2)}")

    print("\\nWhat is near the Eiffel Tower?")
    for nearby in atlas.places_near((48.8584, 2.2945), limit=5):
        print(f"{nearby.distance:6.2f} km  {nearby.place}")`,
    },
    {
      category: "Every place on Earth",
      id: "sun",
      label: "Sun and seasons",
      description: "Daylight around the world on one day",
      code: `from datetime import date
from pyworldatlas import Atlas

day = date(2026, 12, 21)
with Atlas() as atlas:
    print(f"Hours of daylight on {day:%d %B %Y}:\\n")
    for city in ("Oslo", "London", "Cairo", "Nairobi", "Sydney"):
        sun = atlas.sun(city, day)
        bar = "#" * round(sun.day_length_hours)
        print(f"{city:<8} {sun.daylight:>12}  {bar}")`,
    },
    {
      category: "Every place on Earth",
      id: "travel",
      label: "Travel basics",
      description: "Plugs, power, and driving side",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for name in ("Japan", "United Kingdom", "Brazil", "India", "Kenya"):
        country = atlas.country(name)
        if country.travel:
            print(f"{country.flag} {country.name:<15} {country.travel.summary}")`,
    },
    {
      category: "Every place on Earth",
      id: "one-search",
      label: "One search for everything",
      description: "Countries and places together",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for query in ("Georgia", "Victoria", "Amazon"):
        print(f"{query}:")
        for result in atlas.lookup(query, limit=4):
            print(f"  {result}")`,
    },
    {
      category: "Challenges",
      id: "shortest-day",
      label: "Shortest December day",
      description: "Which capital gets the least daylight?",
      code: `from datetime import date
from pyworldatlas import Atlas

day = date(2026, 12, 21)
with Atlas() as atlas:
    days = []
    for country in atlas:
        if country.capital:
            sun = atlas.sun(country.capital, day)
            days.append((sun.day_length_hours, country.capital.name, country.name))
    days.sort()
    print("Shortest days on 21 December:")
    for hours, capital, country in days[:3]:
        print(f"  {capital} ({country}): {hours:.1f} hours")
    hours, capital, country = days[-1]
    print(f"Longest: {capital} ({country}), {hours:.1f} hours")`,
    },
    {
      category: "Challenges",
      id: "equator",
      label: "Closest to the equator",
      description: "Which capitals sit nearest the equator?",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    capitals = sorted(
        (abs(country.capital.coordinates.latitude), country.capital.name, country.name)
        for country in atlas
        if country.capital
    )
    print("Capitals closest to the equator:")
    for degrees, capital, country in capitals[:5]:
        print(f"  {capital} ({country}): {degrees:.2f} degrees away")`,
    },
    {
      category: "Challenges",
      id: "farthest",
      label: "Farthest apart",
      description: "Which two capitals are farthest apart?",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    capitals = [country for country in atlas if country.capital]
    best = (0.0, None, None)
    for i, first in enumerate(capitals):
        for second in capitals[i + 1:]:
            km = atlas.distance_between(first, second)
            if km > best[0]:
                best = (km, first, second)
    km, first, second = best
    print(f"{first.capital.name} and {second.capital.name}: {km:,.0f} km apart")
    print("Half way around the Earth is about 20,000 km.")`,
    },
  ];

  let worker = null;
  let ready = false;
  let running = false;
  let activeRun = 0;
  let watchdog = null;
  let startupWatchdog = null;
  let selectedPreset = presets.find((preset) => {
    const parameters = new URLSearchParams(window.location.hash.slice(1));
    return preset.id === parameters.get("recipe");
  }) || presets[0];

  function setStatus(state, message) {
    statusElement.dataset.state = state;
    statusText.textContent = message;
  }

  function setControls() {
    runButton.disabled = !ready || running;
    exploreButton.disabled = !ready || running;
    surpriseButton.disabled = !ready || running;
    quizButton.disabled = !ready || running;
    exploreQuery.disabled = !ready;
    stopButton.disabled = !running;
    resetButton.disabled = running;
    editor.readOnly = running;
  }

  function clearOutput(message = "") {
    output.replaceChildren();
    if (message) {
      const span = document.createElement("span");
      span.className = "atlas-output-muted";
      span.textContent = message;
      output.append(span);
    }
  }

  function appendOutput(value, stream = "stdout") {
    if (!value) {
      return;
    }
    const span = document.createElement("span");
    span.className = `atlas-output-${stream}`;
    span.textContent = value.endsWith("\n") ? value : `${value}\n`;
    output.append(span);
    output.scrollTop = output.scrollHeight;
  }

  function finishRun(message, state = "ready") {
    running = false;
    window.clearTimeout(watchdog);
    watchdog = null;
    editorHint.textContent = message;
    setStatus(state, state === "ready" ? "Python ready" : "Python needs a reset");
    setControls();
  }

  function workerUrl() {
    return new URL("playground-worker.mjs", playgroundScriptUrl);
  }

  function createWorker(message = "Python is starting. The first load can take a moment.") {
    if (worker) {
      worker.terminate();
    }

    ready = false;
    running = false;
    window.clearTimeout(watchdog);
    window.clearTimeout(startupWatchdog);
    watchdog = null;
    startupWatchdog = null;
    setStatus("loading", "Preparing Python…");
    setControls();
    editorHint.textContent = "The first load downloads the browser Python runtime.";
    if (message) {
      clearOutput(message);
    }

    worker = new Worker(workerUrl(), { type: "module", name: "pyworldatlas-playground" });
    worker.addEventListener("message", handleWorkerMessage);
    worker.addEventListener("error", (event) => {
      window.clearTimeout(startupWatchdog);
      startupWatchdog = null;
      ready = false;
      running = false;
      setStatus("error", "Python could not start");
      setControls();
      appendOutput(
        `The browser runtime could not start. ${event.message || "Check your network connection and try Reset Python."}`,
        "stderr",
      );
    });
    worker.postMessage({ type: "initialize", requirement });
    startupWatchdog = window.setTimeout(() => {
      worker.terminate();
      ready = false;
      running = false;
      setStatus("error", "Python startup timed out");
      setControls();
      clearOutput();
      appendOutput(
        "Python did not finish loading within 45 seconds. Check your connection, then select Reset Python to try again.",
        "stderr",
      );
    }, 45000);
  }

  function handleWorkerMessage(event) {
    const message = event.data;
    if (!message || typeof message.type !== "string") {
      return;
    }

    if (message.type === "status") {
      setStatus("loading", message.message);
      return;
    }

    if (message.type === "ready") {
      window.clearTimeout(startupWatchdog);
      startupWatchdog = null;
      ready = true;
      pythonVersion.textContent = message.details.python;
      libraryVersion.textContent = message.details.library;
      datasetVersion.textContent = message.details.dataset;
      setStatus("ready", `Ready · ${message.details.profiles} profiles`);
      editorHint.textContent = "Your Python session persists between runs.";
      setControls();
      clearOutput("Ready. A complete recipe is already loaded. Press Run Python.");
      // A search started from the home page (playground.html?q=Japan) runs now.
      const asked = new URLSearchParams(window.location.search).get("q");
      if (asked && !exploreQuery.value) {
        exploreQuery.value = asked.slice(0, 80);
        exploreForm.requestSubmit();
        exploreForm.scrollIntoView({ block: "start" });
      }
      return;
    }

    if (message.type === "quiz-result") {
      if (message.id === activeQuiz) {
        startQuiz(message);
      }
      return;
    }

    if (message.type === "explore-result") {
      if (message.id === activeExplore) {
        renderCards(message);
      }
      return;
    }

    if (message.id !== activeRun) {
      return;
    }

    if (message.type === "stream") {
      appendOutput(message.value, message.stream);
      return;
    }

    if (message.type === "complete") {
      finishRun(`Finished in ${(message.elapsedMs / 1000).toFixed(2)} seconds.`);
      return;
    }

    if (message.type === "execution-error") {
      appendOutput(message.message, "stderr");
      finishRun(`Stopped with an error after ${(message.elapsedMs / 1000).toFixed(2)} seconds.`);
      return;
    }

    if (message.type === "fatal-error") {
      window.clearTimeout(startupWatchdog);
      startupWatchdog = null;
      ready = false;
      running = false;
      setStatus("error", "Python could not start");
      setControls();
      clearOutput();
      appendOutput(message.message, "stderr");
    }
  }

  function runCode() {
    const code = editor.value.trim();
    if (!ready || running || !code) {
      return;
    }
    if (code.length > 50000) {
      clearOutput("This playground accepts up to 50,000 characters per run.");
      return;
    }

    activeRun += 1;
    running = true;
    clearOutput();
    setStatus("running", "Running Python…");
    editorHint.textContent = "Running with a 20-second safety limit.";
    setControls();
    worker.postMessage({ type: "run", id: activeRun, code });

    watchdog = window.setTimeout(() => {
      appendOutput("Execution stopped after the 20-second playground limit.", "stderr");
      createWorker("");
    }, 20000);
  }

  function stopRun() {
    if (!running) {
      return;
    }
    appendOutput("Execution stopped. Starting a fresh Python session…", "stderr");
    createWorker("");
  }

  function selectPreset(preset, updateHash = true) {
    selectedPreset = preset;
    editor.value = preset.code;
    filename.textContent = `${preset.id.replaceAll("-", "_")}.py`;
    for (const button of presetsElement.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.preset === preset.id));
    }
    if (updateHash) {
      window.history.replaceState(null, "", `#recipe=${encodeURIComponent(preset.id)}`);
    }
  }

  function renderPresets() {
    const categories = [...new Set(presets.map((preset) => preset.category))];
    for (const category of categories) {
      const group = document.createElement("section");
      group.className = "atlas-preset-group";

      const heading = document.createElement("p");
      heading.className = "atlas-preset-group-label";
      heading.textContent = category;

      const grid = document.createElement("div");
      grid.className = "atlas-preset-grid";

      for (const preset of presets.filter((item) => item.category === category)) {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "atlas-preset";
        button.dataset.preset = preset.id;
        button.setAttribute("aria-pressed", "false");

        const title = document.createElement("strong");
        title.textContent = preset.label;
        const description = document.createElement("span");
        description.textContent = preset.description;
        button.append(title, description);
        button.addEventListener("click", () => selectPreset(preset));
        grid.append(button);
      }

      group.append(heading, grid);
      presetsElement.append(group);
    }
  }

  function renderCards(message) {
    exploreResults.replaceChildren();
    if (message.error) {
      exploreStatus.textContent = "That search could not run. Try another name.";
      return;
    }
    if (!message.cards.length) {
      exploreStatus.textContent = `Nothing found for "${exploreQuery.value.trim()}". Check the spelling or try a nearby city.`;
      return;
    }
    const noun = message.cards.length === 1 ? "result" : "results";
    const time = message.elapsedMs < 1000 ? `${Math.max(1, message.elapsedMs)} ms` : `${(message.elapsedMs / 1000).toFixed(1)} seconds`;
    exploreStatus.textContent = `${message.cards.length} ${noun} in ${time}.`;
    for (const card of message.cards) {
      const item = document.createElement("li");
      item.className = `atlas-explore-card atlas-explore-${card.kind}`;
      const heading = document.createElement("h4");
      heading.textContent = card.title;
      const subtitle = document.createElement("p");
      subtitle.className = "atlas-explore-subtitle";
      subtitle.textContent = card.subtitle;
      const facts = document.createElement("dl");
      for (const [label, value] of card.facts) {
        const term = document.createElement("dt");
        term.textContent = label;
        const detail = document.createElement("dd");
        detail.textContent = value;
        facts.append(term, detail);
      }
      const open = document.createElement("button");
      open.type = "button";
      open.className = "atlas-button atlas-explore-open";
      open.textContent = "Open in the editor";
      open.setAttribute("aria-label", `Open the Python for ${card.title} in the editor`);
      open.addEventListener("click", () => {
        editor.value = card.code;
        filename.textContent = "my_lookup.py";
        for (const button of presetsElement.querySelectorAll("button")) {
          button.setAttribute("aria-pressed", "false");
        }
        editor.focus();
        editorHint.textContent = "The code for this card is in the editor. Press Run Python, then try changing it.";
      });
      item.append(heading, subtitle, facts, open);
      exploreResults.append(item);
    }
  }

  surpriseButton.addEventListener("click", () => {
    let pick = surprises[Math.floor(Math.random() * surprises.length)];
    if (pick === exploreQuery.value && surprises.length > 1) {
      pick = surprises[(surprises.indexOf(pick) + 1) % surprises.length];
    }
    exploreQuery.value = pick;
    exploreForm.requestSubmit();
  });

  function showQuestion() {
    const question = quizQuestions[quizIndex];
    quizProgress.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length} · Score ${quizScore}`;
    quizPrompt.textContent = question.prompt;
    quizFeedback.textContent = "";
    quizNext.hidden = true;
    quizChoices.replaceChildren();
    for (const choice of question.choices) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "atlas-quiz-choice";
      button.textContent = choice;
      button.addEventListener("click", () => answerQuestion(button, choice));
      quizChoices.append(button);
    }
    quizPrompt.focus();
  }

  function answerQuestion(chosen, choice) {
    const question = quizQuestions[quizIndex];
    const right = choice === question.answer;
    if (right) {
      quizScore += 1;
    }
    for (const button of quizChoices.querySelectorAll("button")) {
      button.disabled = true;
      if (button.textContent === question.answer) {
        button.dataset.state = "right";
      } else if (button === chosen) {
        button.dataset.state = "wrong";
      }
    }
    quizFeedback.textContent = right ? "Correct!" : `Not quite: the answer is ${question.answer}.`;
    quizProgress.textContent = `Question ${quizIndex + 1} of ${quizQuestions.length} · Score ${quizScore}`;
    quizNext.textContent = quizIndex + 1 < quizQuestions.length ? "Next question" : "See your score";
    quizNext.hidden = false;
    quizNext.focus();
  }

  function startQuiz(message) {
    if (message.error || !message.questions.length) {
      quizCard.hidden = false;
      quizPrompt.textContent = "The quiz could not start. Try again.";
      return;
    }
    quizQuestions = message.questions;
    quizIndex = 0;
    quizScore = 0;
    quizCard.hidden = false;
    showQuestion();
  }

  quizButton.addEventListener("click", () => {
    if (!ready) {
      return;
    }
    activeQuiz += 1;
    quizCard.hidden = false;
    quizChoices.replaceChildren();
    quizNext.hidden = true;
    quizFeedback.textContent = "";
    quizProgress.textContent = "";
    quizPrompt.textContent = "Picking five questions…";
    worker.postMessage({ type: "quiz", id: activeQuiz, seed: `quiz-${Date.now()}` });
  });

  quizNext.addEventListener("click", () => {
    quizIndex += 1;
    if (quizIndex < quizQuestions.length) {
      showQuestion();
      return;
    }
    const cheer = quizScore === quizQuestions.length ? " Perfect!" : quizScore >= 3 ? " Well done!" : " Try another quiz!";
    quizProgress.textContent = "";
    quizPrompt.textContent = `You scored ${quizScore} out of ${quizQuestions.length}.${cheer}`;
    quizChoices.replaceChildren();
    quizFeedback.textContent = "";
    quizNext.hidden = true;
    quizButton.textContent = "Start another quiz";
    quizPrompt.focus();
  });

  exploreForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = exploreQuery.value.trim();
    if (!ready || !query) {
      return;
    }
    activeExplore += 1;
    exploreStatus.textContent = `Looking up "${query}"…`;
    worker.postMessage({ type: "explore", id: activeExplore, query });
  });

  runButton.addEventListener("click", runCode);
  stopButton.addEventListener("click", stopRun);
  clearButton.addEventListener("click", () => clearOutput());
  resetButton.addEventListener("click", () => createWorker());
  copyButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(editor.value);
      copyButton.textContent = "Copied";
      window.setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1200);
    } catch {
      editor.focus();
      editor.select();
      copyButton.textContent = "Selected";
    }
  });

  editor.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      runCode();
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      const start = editor.selectionStart;
      const end = editor.selectionEnd;
      editor.setRangeText("    ", start, end, "end");
    }
  });

  window.addEventListener("hashchange", () => {
    const parameters = new URLSearchParams(window.location.hash.slice(1));
    const requested = presets.find((preset) => preset.id === parameters.get("recipe"));
    if (requested) {
      selectPreset(requested, false);
    }
  });

  renderPresets();
  selectPreset(selectedPreset, false);
  createWorker();
})();
