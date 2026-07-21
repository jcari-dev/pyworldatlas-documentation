VS Code playground
==================

The repository-level ``playground.py`` is the fastest way to inspect the
current release. Its default mode validates every country and every stored
capital and city
record before demonstrating lookup, aliases, filtering, country profiles,
sources, and serialization.

The playground can run directly from a repository checkout before the package
is installed into the selected virtual environment. This convenience is limited
to the playground; normal applications should install the package first.

In VS Code, press ``F5`` and select **PyWorldAtlas: Full Playground**.

Focused modes are available from any VS Code terminal:

.. code-block:: console

   python playground.py --audit-only
   python playground.py --country Japan
   python playground.py --json "Dominican Republic"
   python playground.py --country "United States" --all-cities

The full run intentionally prints a substantial report. Use ``--audit-only``
for the fastest all-record integrity check.
