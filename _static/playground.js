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

    print("PYWORLDATLAS — WORLD SNAPSHOT")
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
    print(f"{country.flag}  {country.name_in('pt')} / {country.name}")
    print(f"Capital:       {country.capital.name}")
    print(f"Formal name:   {country.formal_name}")
    print(f"Anthem:        {country.anthem.title}")
    print(f"Motto:         {country.motto.text}")
    print(f"Highest point: {country.highest_point.name} ({country.highest_point.elevation_m:,.0f} m)")
    print(f"Climate:       {country.climate.dominant_zone.code} — {country.climate.dominant_zone.name}")
    print(f"Major rivers:  {', '.join(river.name for river in country.rivers[:3])}")`,
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
            f"{climate.code if climate else '—'}"
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

    print(f"Tokyo → Paris: {tokyo.distance_to(paris):,.0f} km")
    print(f"Initial bearing: {tokyo.bearing_to(paris):.1f}°")
    midpoint = tokyo.midpoint_to(paris)
    print(f"Great-circle midpoint: {midpoint.latitude:.3f}, {midpoint.longitude:.3f}")
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
    print(f"{country.flag} {country.name.upper()} — CLIMATE PROFILE")
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
      description: "Inspect populated places and coordinates",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    country = atlas.country("Japan")
    cities = atlas.major_cities(country.alpha2, limit=8)

    print(f"MAJOR POPULATED PLACES — {country.name.upper()}")
    for city in cities:
        population = f"{city.population:,}" if city.population else "not listed"
        lat, lon = city.coordinates.as_tuple()
        print(
            f"{city.name:<18} pop. {population:>12}  "
            f"({lat:>7.3f}, {lon:>8.3f})"
        )

    tokyo, osaka = cities[0], atlas.city("Osaka", country="JP")
    print(f"\\n{tokyo.name} → {osaka.name}: {tokyo.coordinates.distance_to(osaka.coordinates):,.0f} km")`,
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
      description: "Create a repeatable lesson set",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    cards = atlas.flashcards(
        topic="highest_points",
        count=5,
        seed="classroom-demo",
    )
    for number, card in enumerate(cards, 1):
        print(f"{number}. {card.prompt}")
        print(f"   Answer: {card.answer}\\n")`,
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
  ];

  let worker = null;
  let ready = false;
  let running = false;
  let activeRun = 0;
  let watchdog = null;
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
    watchdog = null;
    setStatus("loading", "Preparing Python…");
    setControls();
    editorHint.textContent = "The first load downloads the browser Python runtime.";
    if (message) {
      clearOutput(message);
    }

    worker = new Worker(workerUrl(), { type: "module", name: "pyworldatlas-playground" });
    worker.addEventListener("message", handleWorkerMessage);
    worker.addEventListener("error", (event) => {
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
      ready = true;
      pythonVersion.textContent = message.details.python;
      libraryVersion.textContent = message.details.library;
      datasetVersion.textContent = message.details.dataset;
      setStatus("ready", `Ready · ${message.details.profiles} profiles`);
      editorHint.textContent = "Your Python session persists between runs.";
      setControls();
      clearOutput("Ready. A complete recipe is already loaded—press Run Python.");
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
