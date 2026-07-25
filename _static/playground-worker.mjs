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

async function runCode(id, code) {
  await readyPromise;
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
    return;
  }

  if (message.type === "run") {
    void runCode(message.id, message.code);
  }
});
