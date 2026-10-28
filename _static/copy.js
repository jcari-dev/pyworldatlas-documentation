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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
