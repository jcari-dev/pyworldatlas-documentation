Playground
==========

Run the published package without installing Python. The playground starts a
private Python session in your browser, installs PyWorldAtlas from PyPI, and
keeps that session alive while you explore.

.. raw:: html

   <div id="atlas-playground" class="atlas-playground" data-package="pyworldatlas==0.12.0">
     <div class="atlas-playground-header">
       <div>
         <p class="atlas-playground-eyebrow">Python in your browser</p>
         <h2>Explore the atlas</h2>
         <p>Look up any country or place, or choose one of eighteen complete recipes and write your own Python. Press <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>Enter</kbd> to run it.</p>
       </div>
       <div class="atlas-runtime-status" data-role="status" data-state="loading" aria-live="polite">
         <span class="atlas-status-dot" aria-hidden="true"></span>
         <span data-role="status-text">Preparing Python…</span>
       </div>
     </div>

     <div class="atlas-runtime-facts" aria-label="Playground runtime">
       <span>Python <strong data-role="python-version">starting</strong></span>
       <span>PyWorldAtlas <strong data-role="library-version">0.12.0</strong></span>
       <span>Dataset <strong data-role="dataset-version">bundled</strong></span>
       <span>Recipes <strong>18 ready</strong></span>
     </div>

     <section class="atlas-explore" aria-labelledby="atlas-explore-title">
       <h3 id="atlas-explore-title" class="atlas-control-label">Look up anything</h3>
       <form class="atlas-explore-form" data-role="explore-form" role="search">
         <label class="visually-hidden" for="atlas-explore-query">A country, city, mountain, lake, or landmark</label>
         <input id="atlas-explore-query" data-role="explore-query" type="search" autocomplete="off"
                placeholder="Try Japan, Everest, or Lake Titicaca" disabled>
         <button type="submit" class="atlas-button atlas-button-run" data-action="explore" disabled>Explore</button>
       </form>
       <p class="atlas-explore-status" data-role="explore-status" aria-live="polite"></p>
       <ol class="atlas-explore-results" data-role="explore-results"></ol>
     </section>

     <div class="atlas-preset-section">
       <p class="atlas-control-label">Ready-to-run recipe library</p>
       <div class="atlas-preset-list" data-role="presets"></div>
     </div>

     <div class="atlas-playground-workspace">
       <section class="atlas-code-panel" aria-label="Python editor">
         <div class="atlas-panel-toolbar">
           <span><span class="atlas-language-dot" aria-hidden="true"></span> <span data-role="filename">world_snapshot.py</span></span>
           <div class="atlas-toolbar-actions">
             <button type="button" class="atlas-button atlas-button-quiet" data-action="copy">Copy</button>
             <button type="button" class="atlas-button atlas-button-quiet" data-action="reset">Reset Python</button>
           </div>
         </div>
         <label class="visually-hidden" for="atlas-code-editor">Python code</label>
         <textarea id="atlas-code-editor" data-role="editor" spellcheck="false" autocomplete="off" autocapitalize="off"></textarea>
         <div class="atlas-editor-actions">
           <span data-role="editor-hint">Your session persists between runs.</span>
           <div>
             <button type="button" class="atlas-button atlas-button-stop" data-action="stop" disabled>Stop</button>
             <button type="button" class="atlas-button atlas-button-run" data-action="run" disabled>Run Python <span aria-hidden="true">▶</span></button>
           </div>
         </div>
       </section>

       <section class="atlas-output-panel" aria-label="Python output">
         <div class="atlas-panel-toolbar">
           <span>Output</span>
           <button type="button" class="atlas-button atlas-button-quiet" data-action="clear">Clear</button>
         </div>
         <pre data-role="output" tabindex="0" aria-live="polite"><span class="atlas-output-muted">Python is starting. The first load can take a moment.</span></pre>
       </section>
     </div>

     <noscript>
       <p class="atlas-playground-fallback">JavaScript is required for the browser playground. The package itself works normally in any supported local Python installation.</p>
     </noscript>
   </div>

What is running?
----------------

This is the real ``pyworldatlas==0.12.0`` wheel published on PyPI, not a
JavaScript imitation or a remote demonstration API. `Pyodide`_ runs CPython in
WebAssembly, while a module Web Worker keeps execution away from the page's
interface. After startup, country queries read the same bundled SQLite database
used by a normal installation.

The first visit downloads the Python runtime from a pinned public CDN, with a
second provider available if the first cannot be reached, and the wheel from
PyPI. Code entered in the editor is evaluated on your device; this project does
not receive its contents. Each run has a 20-second safety limit, and interactive
``input()`` calls are not supported.

.. _Pyodide: https://pyodide.org/

Things worth trying
-------------------

**Look up anything** answers in plain cards: type a country, city, mountain,
lake, or landmark. Each card has **Open in the editor**, which loads the Python
that produced it, so you can see how it works and change it.

The eighteen guided programs cover five different ways to use the package:

* **Meet the world:** summarize the atlas, build a rich country dossier,
  compare profiles, and cross original writing systems.
* **Measure and connect:** calculate distance, bearing, and midpoint; locate
  nearby capitals; follow a land-border path; and connect profiles through
  source-listed rivers and lakes.
* **Analyze the atlas:** build multi-metric leaderboards, visualize represented
  climate shares, inspect populated places, and combine search with filters.
* **Learn and build:** generate repeatable quiz material and export portable,
  Unicode-preserving JSON.
* **Every place on Earth:** search 200,000 places by name, see what is nearby,
  work out sunrise and day length anywhere, and compare travel basics.

Change a country name, adjust a ranking, or combine two examples. The Python
session persists until you select **Reset Python** or close the page.
The :doc:`recipes` page presents the strongest programs as normal copy-ready
Python alongside direct links back to the matching interactive recipe.

Use the package locally
-----------------------

For projects, notebooks, and unrestricted sessions, install the package in a
normal Python environment:

.. code-block:: console

   python -m pip install pyworldatlas

Then continue with the :doc:`quickstart` or the complete :doc:`api` reference.
Local installations need no network connection at runtime.
