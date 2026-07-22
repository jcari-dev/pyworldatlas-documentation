PyWorldAtlas
============

PyWorldAtlas is a compact, source-aware world atlas for Python. It puts country
profiles, capitals, cities, coordinates, distances, reviewed land neighbors,
rankings, and learning tools into one bundled SQLite database that works fully
offline.

No API key. No runtime download. No third-party runtime dependency.

**Documented version:** 0.6.0 | **Dataset:** 2026.07.22.6 |
**Python:** 3.10–3.14 | **Profiles:** 248

Start with something interesting
--------------------------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.country("Brazil")
   ...     print(brazil.flag, brazil.name_in("pt"), "—", brazil.capital.name)
   ...     print(brazil.anthem.title)
   ...     print(brazil.motto.text, "—", brazil.motto.english_text)
   ...     print([item.capital.name for item in atlas.nearest_capitals("Tokyo", country="JP", limit=3)])
   🇧🇷 Brasil — Brasília
   Hino Nacional Brasileiro
   Ordem e Progresso — Order and Progress
   ['Seoul', 'Pyongyang', 'Beijing']

The installed wheel contains ordinary Python source and one read-only database.
Constructing :class:`~pyworldatlas.Atlas` never contacts a server and does not
load every country into memory.

Try these next
--------------

- :doc:`explore` — country postcards, rankings, nearby capitals, filters, and
  a repeatable quiz.
- :doc:`quickstart` — lookup, collections, names, coordinates, and borders in
  one guided session.
- :doc:`reference_facts` — anthem titles, reviewed mottos, demonyms, currencies,
  languages, timezones, postal formats, and provenance.
- :doc:`rankings` — exact filters, supported metrics, typed results, and distance
  semantics.

What is bundled
---------------

.. list-table:: Dataset 2026.07.22.6
   :header-rows: 1
   :widths: 62 38

   * - Records
     - Coverage
   * - Countries and areas
     - 248
   * - Primary capitals
     - 241 / 248
   * - Populated places
     - 6,265
   * - Selected local-language identities
     - 248 / 248
   * - Sourced English formal names
     - 240 / 248
   * - Anthem titles
     - 234 / 248
   * - Reviewed source-listed mottos
     - 32 / 248
   * - English demonym profiles
     - 227 / 248
   * - Country timezone profiles
     - 246 / 248, 417 records
   * - Country-language metadata
     - 722 records across 245 profiles
   * - Reviewed land-border relationships
     - 319

Designed for exploration
------------------------

PyWorldAtlas supports exact lookup and ranked search, immutable typed models,
Unicode local names and flag emoji, WGS84 coordinates, distance/bearing/midpoint
calculations, deterministic samples and flashcards, land-border paths, profile
filters, rankings, and nearest-capital queries. Public results serialize to
JSON-compatible dictionaries without losing their source context.

Educational scope
-----------------

PyWorldAtlas provides offline factual geography for education and reference.
It does not provide political commentary or opinion. Values follow documented
source conventions, missing data remains explicit, and every field family has
a defined source role and publication boundary. Read :doc:`educational_principles`
for the formal policy and :doc:`data_sources` for exact provenance.

Install
-------

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

The current source checkout can be installed with ``python -m pip install -e .``.

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Start here

   explore
   quickstart
   why
   installation
   educational_principles

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   reference_facts
   rankings
   local_names
   capitals_cities
   coordinates_distances
   borders
   discovery
   searching
   serialization

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Data and trust

   data_sources
   data_quality
   _generated/project_status
   roadmap

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Reference

   api
   changelog
