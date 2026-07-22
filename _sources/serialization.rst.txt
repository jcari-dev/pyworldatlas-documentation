Serialization
=============

Country models serialize to JSON-compatible primitives without exposing SQLite
rows or implementation details.

Dictionary output
-----------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     data = atlas.country("DO").to_dict()
   >>> data["codes"]["alpha2"]
   'DO'
   >>> data["capitals"][0]["name"]
   'Santo Domingo'
   >>> (data["name"], data["official_name"], data["formal_name"])
   ('Dominican Republic', 'Dominican Republic', 'Dominican Republic')

JSON output
-----------

.. doctest::

   >>> import json
   >>> with Atlas() as atlas:
   ...     payload = atlas.country("JP").to_json()
   >>> json.loads(payload)["name"]
   'Japan'

Tuples become JSON arrays and enums become their string values.
``include_history`` is accepted for compatibility but currently has no effect
because historical series are not bundled.

English ``formal_name`` is serialized as a string for the 240 covered profiles
and as JSON ``null`` for the eight profiles outside the source intersection.
The language-specific formal value remains inside each ``local_names`` record.

Local-name provenance
---------------------

Local-name records keep their evidence kind, language status, script,
romanization, source, and exact locator when a country is serialized:

.. doctest::

   >>> with Atlas() as atlas:
   ...     india = atlas.country("India").to_dict()
   >>> hindi = next(name for name in india["local_names"] if name["language_code"] == "hi")
   >>> (hindi["text"], hindi["script_code"], hindi["romanized_short_name"])
   ('भारत', 'Deva', 'Bhārat')
   >>> (hindi["kind"], hindi["language_status"])
   ('national_official', 'official')
   >>> hindi["source"]["id"]
   'ungegn-country-names-2017'
   >>> 'PDF page 44' in hindi["source_locator"]
   True

Discovery values
----------------

Discovery cards and flashcards expose the same ``to_dict()`` and ``to_json()``
conveniences:

.. doctest::

   >>> with Atlas() as atlas:
   ...     card = atlas.country("Japan").discovery_card()
   ...     flashcard = atlas.flashcards(topic="capitals", count=1, seed=42)[0]
   >>> card.to_dict()["country"]["alpha2"]
   'JP'
   >>> json.loads(flashcard.to_json())["answer"]
   'Kuwait City'

Border paths
------------

``BorderPathResult`` serializes compact country references rather than full
country profiles. This keeps a path payload small and detached from SQLite:

.. doctest::

   >>> with Atlas() as atlas:
   ...     path = atlas.border_path("Portugal", "China")
   >>> path.names
   ('Portugal', 'Spain', 'France', 'Germany', 'Poland', 'Russia', 'China')
   >>> path.to_dict()["countries"][0]
   {'name': 'Portugal', 'alpha2': 'PT', 'alpha3': 'PRT', 'numeric': '620'}
   >>> json.loads(path.to_json())["crossings"]
   6
