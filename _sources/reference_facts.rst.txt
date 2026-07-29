Country reference facts
=======================

Typed, source-aware facts make each country profile useful as a small offline
reference. An optional fact is absent when it is outside the captured source
scope; the package does not fill gaps with guesses.

Anthem titles
-------------

``Country.anthem`` returns the first :class:`~pyworldatlas.NationalAnthem`, and
``Country.anthems`` retains the complete tuple.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> japan = atlas.country("Japan")
   >>> (japan.anthem.title, japan.anthem.english_title)
   ('Kimigayo', 'His Majesty’s Reign')
   >>> japan.anthem.source.id
   'cia-world-factbook-2025'

Only titles and an optional source-provided English title are bundled. Lyrics,
audio, contributor credits, and adoption histories are outside this release.

Reviewed mottos
---------------

``Country.motto`` returns a reviewed :class:`~pyworldatlas.NationalMotto` when
one is in the accepted source layer.

.. doctest::

   >>> brazil = atlas.country("Brazil")
   >>> (brazil.motto.text, brazil.motto.english_text, brazil.motto.language_code)
   ('Ordem e Progresso', 'Order and Progress', 'pt')
   >>> atlas.country("China").motto is None
   True

Motto coverage is deliberately conservative. The model calls these
*source-listed* national mottos and does not infer constitutional, statutory,
traditional, or current legal status. Every captured Wikidata statement has an
explicit include or exclude review decision.

Demonyms
--------

English noun and adjective forms are preserved as printed by the source.

.. doctest::

   >>> (japan.demonym.noun, japan.demonym.adjective)
   ('Japanese (singular and plural)', 'Japanese')

Practical metadata
------------------

Currency, language, timezone, and postal records are typed objects rather than
unlabelled strings.

.. doctest::

   >>> (japan.currency.code, japan.currency.name, japan.currency.symbol)
   ('JPY', 'Japanese Yen', '¥')
   >>> japan.currency.minor_unit_digits
   0
   >>> [(language.code, language.name, language.script_code) for language in japan.languages]
   [('ja', 'Japanese', 'Jpan')]
   >>> japan.timezone_ids
   ('Asia/Tokyo',)
   >>> (japan.postal_code.format, japan.postal_code.regex)
   ('###-####', '^\\d{3}-\\d{4}$')
   >>> atlas.close()

``Country.observed_timezones`` remains available for compatibility and lists
zones observed on bundled cities. ``Country.timezones`` is the country-level
timezone table, with January, July, and raw UTC offsets from the captured
GeoNames file.

Coverage
--------

.. list-table:: Bundled reference coverage
   :header-rows: 1
   :widths: 45 20 35

   * - Field family
     - Profiles
     - Source boundary
   * - Anthem titles
     - 234 / 248
     - Structured Factbook field only
   * - Reviewed mottos
     - 32 / 248
     - Included item-valued Wikidata statements
   * - English demonyms
     - 227 / 248
     - Structured Factbook field only
   * - Country timezone profiles
     - 246 / 248
     - 417 GeoNames timezone records
   * - Postal-code formats
     - 176 / 248
     - GeoNames display format and optional regular expression
   * - Currency records
     - 247 / 248
     - CLDR English name, symbol when available, and minor-unit digits
   * - Country-language records
     - 722 records across 245 profiles
     - CLDR names/scripts with IANA name fallback

Source inspection
-----------------

Fact-bearing models expose a ``source`` object. It includes the stable source
identifier, homepage, retrieval date, captured version, license information,
and notes when available. Anthem, motto, and demonym records also keep the exact
source locator used by the builder.

.. literalinclude:: ../../examples/country_reference.py
   :language: python
   :linenos:
