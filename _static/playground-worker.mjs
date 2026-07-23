import { loadPyodide } from "https://cdn.jsdelivr.net/pyodide/v314.0.2/full/pyodide.mjs";

const PYODIDE_INDEX = "https://cdn.jsdelivr.net/pyodide/v314.0.2/full/";

let pyodide = null;
let readyPromise = null;

function post(type, detail = {}) {
  self.postMessage({ type, ...detail });
}

async function initialize(requirement) {
  post("status", { message: "Loading Python runtime…" });
  pyodide = await loadPyodide({
    indexURL: PYODIDE_INDEX,
    stdout: () => {},
    stderr: () => {},
  });

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

  post("status", { message: "Opening the bundled atlas…" });
  const details = await pyodide.runPythonAsync(`
import json
import platform
import pyworldatlas
from pyworldatlas import Atlas

with Atlas() as _atlas:
    _info = _atlas.dataset_info()
    json.dumps({
        "python": platform.python_version(),
        "library": pyworldatlas.__version__,
        "dataset": _info.dataset_version,
        "profiles": len(_atlas),
    })
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
        message: error instanceof Error ? error.message : String(error),
      });
      throw error;
    });
    return;
  }

  if (message.type === "run") {
    void runCode(message.id, message.code);
  }
});
