Repository playground
=====================

The repository-level ``playground.py`` is the fastest way to inspect the
current checkout. Its default mode validates every country, capital, and stored
city record before demonstrating lookup, aliases, filtering, profile fields,
coordinate calculations, sources, and serialization.

The playground can run directly from a repository checkout before the package
is installed into the selected virtual environment. This convenience is limited
to the playground; normal applications should install the package first.

Focused modes are available from a terminal in the repository root:

.. code-block:: console

   python playground.py --audit-only
   python playground.py --country Japan
   python playground.py --json "Dominican Republic"
   python playground.py --country "United States" --all-cities

The full run prints every country profile. Use ``--audit-only`` for the shortest
all-record integrity check.
