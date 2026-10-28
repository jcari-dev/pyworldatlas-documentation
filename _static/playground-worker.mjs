const PYODIDE_VERSION = "314.0.3";
const PYODIDE_FULL_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;
const PYODIDE_PROVIDERS = Object.freeze([
  {
    label: "unpkg",
    moduleBase: `https://unpkg.com/pyodide@${PYODIDE_VERSION}/`,
    indexURL: `https://unpkg.com/pyodide@${PYODIDE_VERSION}/`,
    packageBaseUrl: PYODIDE_FULL_CDN,
  },
  {
    label: "jsDelivr",
    moduleBase: PYODIDE_FULL_CDN,
    indexURL: PYODIDE_FULL_CDN,
    packageBaseUrl: PYODIDE_FULL_CDN,
  },
]);

let pyodide = null;
let readyPromise = null;

function post(type, detail = {}) {
  self.postMessage({ type, ...detail });
}

function describeError(error) {
  return error instanceof Error ? error.message : String(error);
}

function withTimeout(task, milliseconds, label) {
  let timer = null;
  const timeout = new Promise((resolve, reject) => {
    timer = self.setTimeout(() => {
      reject(new Error(`${label} did not respond within ${milliseconds / 1000} seconds`));
    }, milliseconds);
  });

  return Promise.race([task, timeout]).finally(() => self.clearTimeout(timer));
}

async function loadBrowserPython() {
  const failures = [];

  for (const provider of PYODIDE_PROVIDERS) {
    post("status", { message: `Connecting to Python runtime via ${provider.label}…` });
    try {
      const module = await withTimeout(
        import(`${provider.moduleBase}pyodide.mjs`),
        7000,
        provider.label,
      );
      post("status", { message: `Loading Python runtime via ${provider.label}…` });
      return await module.loadPyodide({
        indexURL: provider.indexURL,
        packageBaseUrl: provider.packageBaseUrl,
        stdout: () => {},
        stderr: () => {},
      });
    } catch (error) {
      failures.push(`${provider.label}: ${describeError(error)}`);
    }
  }

  throw new Error(`No Python runtime provider was available. ${failures.join(" | ")}`);
}

async function configureBrowserDatabase() {
  await pyodide.runPythonAsync(`
import sys

if sys.platform == "emscripten":
    import pyworldatlas.database as _atlas_database

    _atlas_sqlite_connect = _atlas_database.sqlite3.connect

    def _atlas_browser_connect(database, *args, **kwargs):
        if isinstance(database, str) and database.startswith("file:") and kwargs.get("uri"):
            database = database[5:].split("?", 1)[0]
            kwargs["uri"] = False
        return _atlas_sqlite_connect(database, *args, **kwargs)

    _atlas_database.sqlite3.connect = _atlas_browser_connect
`);
}

async function initialize(requirement) {
  post("status", { message: "Starting the browser Python worker…" });
  pyodide = await loadBrowserPython();

  post("status", { message: "Installing PyWorldAtlas from PyPI…" });
  await pyodide.loadPackage("micropip");
  pyodide.globals.set("_playground_requirement", requirement);
  try {
    await pyodide.runPythonAsync(`
import micropip
await micropip.install(_playground_requirement, deps=False)
`);
  } finally {
    pyodide.globals.delete("_playground_requirement");
  }

  post("status", { message: "Preparing browser-safe dataset access…" });
  await configureBrowserDatabase();

  post("status", { message: "Opening the bundled atlas…" });
  const details = await pyodide.runPythonAsync(`
import json
import platform
import pyworldatlas
from pyworldatlas import Atlas

with Atlas() as _atlas:
    _info = _atlas.dataset_info()
    _details = {
        "python": platform.python_version(),
        "library": pyworldatlas.__version__,
        "dataset": _info.dataset_version,
        "profiles": len(_atlas),
    }
json.dumps(_details)
`);

  post("ready", { details: JSON.parse(details) });
}

const EXPLORE_HELPERS = `
import json as _json
from datetime import date as _date
from pyworldatlas import Atlas as _Atlas, Country as _Country

_explore_atlas = _Atlas()


def _explore_sun(where):
    try:
        sun = _explore_atlas.sun(where, _date.today())
    except Exception:
        return None
    if sun.sunrise is None:
        return "Midnight sun today" if sun.day_length_hours >= 24 else "Polar night today"
    return f"{sun.daylight} of daylight today"


def _explore(query):
    cards = []
    for item in _explore_atlas.lookup(query, limit=5):
        facts = []
        if isinstance(item, _Country):
            if item.capital:
                facts.append(["Capital", item.capital.name])
            if item.continent:
                facts.append(["Continent", item.continent])
            if item.population:
                facts.append(["Population", f"{item.population:,}"])
            if item.area_km2:
                facts.append(["Area", f"{item.area_km2:,.0f} km²"])
            if item.languages:
                facts.append(["Languages", ", ".join(language.name for language in item.languages[:3])])
            if item.currency:
                facts.append(["Currency", item.currency.name or item.currency.code])
            travel = getattr(item, "travel", None)
            if travel is not None and travel.summary:
                facts.append(["Travel", travel.summary])
            sun = _explore_sun(item)
            if sun:
                facts.append(["Sun in the capital", sun])
            cards.append({
                "kind": "country", "title": f"{item.flag} {item.name}", "subtitle": "Country or area",
                "facts": facts,
                "code": f'from pyworldatlas import Atlas\\n\\nwith Atlas() as atlas:\\n    print(atlas.country("{item.alpha2}").summary())',
            })
        else:
            facts.append(["Kind", item.kind])
            facts.append(["Location", item.coordinates.format(precision=2)])
            if item.elevation_m is not None:
                facts.append(["Height", f"{item.elevation_m:,} m"])
            if item.population:
                facts.append(["Population", f"{item.population:,}"])
            nearby = [
                f"{result.place.english_name} ({result.distance:,.0f} km)"
                for result in _explore_atlas.places_near(item, limit=3)
            ]
            if nearby:
                facts.append(["Nearby", ", ".join(nearby)])
            sun = _explore_sun(item)
            if sun:
                facts.append(["Sun", sun])
            name = item.english_name.replace('"', '\\\\"')
            cards.append({
                "kind": "place", "title": item.english_name, "subtitle": item.kind.capitalize(),
                "facts": facts,
                "code": (
                    "from pyworldatlas import Atlas\\n\\nwith Atlas() as atlas:\\n"
                    f'    place = atlas.search_places("{name}", limit=1)[0]\\n'
                    "    print(place, place.coordinates.format())\\n"
                    "    for nearby in atlas.places_near(place, limit=5):\\n"
                    '        print(f"{nearby.distance:7.1f} km  {nearby.place}")'
                ),
            })
    return _json.dumps(cards, ensure_ascii=False)
`;
let warmPromise = null;

// Build the place index once, right after Python is ready, so the first
// search a learner types is already fast.
async function warmUp() {
  await pyodide.runPythonAsync(EXPLORE_HELPERS);
  await pyodide.runPythonAsync('_explore_atlas.search_places("a", limit=1)');
}

const QUIZ_HELPERS = `
import random as _random
from pyworldatlas import Atlas as _QuizAtlas

_quiz_atlas = _QuizAtlas()


def _quiz(seed):
    rng = _random.Random(seed)
    questions = []
    for topic in rng.sample(["capitals", "flags", "continents", "driving_sides"], 3):
        question = _quiz_atlas.quiz(topic=topic, count=1, choices=2 if topic == "driving_sides" else 4, seed=seed)[0]
        questions.append({"prompt": question.prompt, "choices": list(question.choices), "answer": question.answer})
    for topic in ("higher", "kinds"):
        question = _quiz_atlas.place_quiz(topic, count=1, seed=seed)[0]
        questions.append({"prompt": question.prompt, "choices": list(question.choices), "answer": question.answer})
    rng.shuffle(questions)
    return _json.dumps(questions, ensure_ascii=False)
`;
let quizReady = false;

async function quiz(id, seed) {
  await readyPromise;
  await warmPromise;
  try {
    if (!quizReady) {
      await pyodide.runPythonAsync(QUIZ_HELPERS);
      quizReady = true;
    }
    pyodide.globals.set("_quiz_seed", seed);
    const questions = await pyodide.runPythonAsync("_quiz(_quiz_seed)");
    post("quiz-result", { id, questions: JSON.parse(questions) });
  } catch (error) {
    post("quiz-result", { id, questions: [], error: describeError(error) });
  } finally {
    pyodide.globals.delete("_quiz_seed");
  }
}

async function explore(id, query) {
  await readyPromise;
  await warmPromise;
  const started = performance.now();
  try {
    pyodide.globals.set("_explore_query", query);
    const cards = await pyodide.runPythonAsync("_explore(_explore_query)");
    post("explore-result", { id, cards: JSON.parse(cards), elapsedMs: Math.round(performance.now() - started) });
  } catch (error) {
    post("explore-result", { id, cards: [], error: describeError(error) });
  } finally {
    pyodide.globals.delete("_explore_query");
  }
}

async function runCode(id, code) {
  await readyPromise;
  await warmPromise;
  const started = performance.now();

  pyodide.setStdout({
    batched: (value) => post("stream", { id, stream: "stdout", value }),
  });
  pyodide.setStderr({
    batched: (value) => post("stream", { id, stream: "stderr", value }),
  });

  try {
    const result = await pyodide.runPythonAsync(code, {
      filename: "<pyworldatlas-playground>",
    });
    if (result !== undefined && result !== null) {
      post("stream", { id, stream: "result", value: String(result) });
    }
    if (result && typeof result.destroy === "function") {
      result.destroy();
    }
    post("complete", {
      id,
      elapsedMs: Math.round(performance.now() - started),
    });
  } catch (error) {
    post("execution-error", {
      id,
      message: error instanceof Error ? error.message : String(error),
      elapsedMs: Math.round(performance.now() - started),
    });
  }
}

self.addEventListener("message", (event) => {
  const message = event.data;
  if (!message || typeof message.type !== "string") {
    return;
  }

  if (message.type === "initialize" && !readyPromise) {
    readyPromise = initialize(message.requirement).catch((error) => {
      post("fatal-error", {
        message: describeError(error),
      });
      throw error;
    });
    warmPromise = readyPromise.then(warmUp).catch(() => undefined);
    return;
  }

  if (message.type === "run") {
    void runCode(message.id, message.code);
  }

  if (message.type === "explore") {
    void explore(message.id, message.query);
  }

  if (message.type === "quiz") {
    void quiz(message.id, message.seed);
  }
});
