(() => {
  "use strict";

  // Text to copy from one code block: for interactive examples, only the code
  // after the ">>>" and "..." prompts, so it can be pasted straight into Python.
  function codeOf(pre) {
    const text = pre.innerText.replace(/\n$/, "");
    const lines = text.split("\n");
    if (!lines.some((line) => line.startsWith(">>> "))) {
      return text;
    }
    return lines
      .filter((line) => line.startsWith(">>> ") || line.startsWith("... ") || line === "...")
      .map((line) => line.slice(4))
      .join("\n");
  }

  const prelude = "from datetime import date\nfrom pyworldatlas import Atlas\n\natlas = Atlas()\n\n";
  const statement = /^(?:import|from|for|while|with|if|def|class|try|print\(|[A-Za-z_][\w.]*(?:\s*,\s*[A-Za-z_][\w.]*)*\s*=[^=])/;

  // A doctest block as a script for the playground: lines that show a value
  // in the docs are wrapped in print() so the script shows it too.
  function scriptOf(pre) {
    // textContent, not innerText: an answer inside a closed <details> has no
    // rendered text yet.
    const lines = pre.textContent.replace(/\n$/, "").split("\n");
    const code = [];
    lines.forEach((line, index) => {
      if (line.startsWith(">>> ")) {
        const source = line.slice(4).replace(/\s*#\s*doctest:.*$/, "");
        const next = lines[index + 1];
        const shows = next !== undefined && next.trim() !== "" && !next.startsWith(">>> ") && !next.startsWith("...");
        code.push(shows && !statement.test(source) ? `print(${source})` : source);
      } else if (line.startsWith("... ") || line === "...") {
        code.push(line.slice(4));
      }
    });
    const body = code.filter((line) => !/^(?:from datetime import date|from pyworldatlas import Atlas|atlas = Atlas\(\)|atlas\.close\(\))$/.test(line));
    const script = body.join("\n").trim();
    if (!script) {
      return null;
    }
    const start = script.includes("date(") ? prelude : prelude.replace("from datetime import date\n", "");
    return `${start}${script}\n`;
  }

  function addTryLink(block) {
    const pre = block.querySelector("pre");
    if (!pre || block.parentElement.querySelector(".atlas-try") || !pre.textContent.includes(">>> ")) {
      return;
    }
    const script = scriptOf(pre);
    if (!script) {
      return;
    }
    const link = document.createElement("a");
    link.className = "atlas-try";
    link.href = `playground.html#example=${encodeURIComponent(script)}`;
    link.textContent = "Try it ▶";
    link.setAttribute("aria-label", "Try it in the browser playground");
    block.after(link);
  }

  function addButton(block) {
    const pre = block.querySelector("pre");
    if (!pre || block.querySelector(".atlas-copy")) {
      return;
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "atlas-copy";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy this code");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeOf(pre));
        button.textContent = "Copied";
      } catch (error) {
        button.textContent = "Select and copy";
      }
      window.setTimeout(() => { button.textContent = "Copy"; }, 1800);
    });
    block.classList.add("atlas-copyable");
    block.append(button);
  }

  function start() {
    document.querySelectorAll(".rst-content div.highlight").forEach(addButton);
    document.querySelectorAll(".rst-content .atlas-try-these div.highlight").forEach(addTryLink);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
