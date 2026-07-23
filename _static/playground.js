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

  const presets = [
    {
      id: "postcard",
      label: "Country postcard",
      description: "Names, culture, and physical geography",
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
      id: "distance",
      label: "Distance lab",
      description: "Coordinates and nearest capitals",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    tokyo = atlas.coordinates("Tokyo", country="JP")
    paris = atlas.coordinates("Paris", country="FR")

    print(f"Tokyo → Paris: {tokyo.distance_to(paris):,.0f} km")
    print(f"Initial bearing: {tokyo.bearing_to(paris):.1f}°")
    print("\\nNearest capitals to Tokyo:")
    for place in atlas.nearest_capitals("Tokyo", country="JP", limit=5):
        print(f"  {place.capital.name:<14} {place.distance:>7,.0f} km  ({place.country.name})")`,
    },
    {
      id: "land-path",
      label: "Land-path explorer",
      description: "Traverse the reviewed border graph",
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
      id: "rankings",
      label: "Rank and filter",
      description: "Compare complete sourced layers",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    print("Longest sourced coastlines:")
    for row in atlas.rank("coastline", limit=5):
        print(f"  {row.position}. {row.country.name:<18} {row.value:>10,.0f} {row.unit}")

    landlocked = atlas.countries(continent="Europe", coastal=False)
    print(f"\\nEuropean profiles with a sourced coastline of zero: {len(landlocked)}")
    print(", ".join(country.name for country in landlocked))

    cfb = atlas.countries(koppen_geiger_code="Cfb")
    print(f"\\nProfiles representing Köppen–Geiger Cfb: {len(cfb)}")`,
    },
    {
      id: "names",
      label: "Names and sources",
      description: "Original scripts with provenance",
      code: `from pyworldatlas import Atlas

with Atlas() as atlas:
    for query, language in [
        ("Dominican Republic", "es"),
        ("China", "zh"),
        ("Japan", "ja"),
    ]:
        country = atlas.country(query)
        local = country.local_name(language)
        print(f"{country.flag} {country.name}")
        print(f"  Local:     {local.short_name}")
        print(f"  Formal:    {local.formal_name or 'not supplied by this source'}")
        print(f"  Romanized: {local.romanized_short_name or 'not supplied by this source'}")
        print(f"  Source:    {local.source.name}")
        print()`,
    },
    {
      id: "quiz",
      label: "Repeatable quiz",
      description: "Learning prompts from real profiles",
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
  ];

  let worker = null;
  let ready = false;
  let running = false;
  let activeRun = 0;
  let watchdog = null;
  let selectedPreset = presets[0];

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
      clearOutput("Ready. Choose an example, edit it if you like, then run Python.");
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

  function selectPreset(preset) {
    selectedPreset = preset;
    editor.value = preset.code;
    for (const button of presetsElement.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(button.dataset.preset === preset.id));
    }
  }

  function renderPresets() {
    for (const preset of presets) {
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
      presetsElement.append(button);
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

  renderPresets();
  selectPreset(selectedPreset);
  createWorker();
})();
