Country profiles
================

A :class:`~pyworldatlas.Country` is an immutable, typed view of one country in
the bundled dataset. Fields are regular Python attributes rather than nested
dictionary keys.

Profile example
---------------

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> japan = atlas.country("Japan")
   >>> japan
   Country(name='Japan', alpha2='JP')
   >>> japan.official_name
   'Japan'
   >>> japan.formal_name
   'Japan'
   >>> japan.has_distinct_formal_name
   False
   >>> japan.codes.alpha2
   'JP'
   >>> japan.codes.alpha3
   'JPN'
   >>> japan.codes.numeric
   '392'
   >>> japan.flag
   '🇯🇵'
   >>> japan.flag_emoji
   '🇯🇵'
   >>> japan.continent
   'Asia'
   >>> japan.region
   'Eastern Asia'
   >>> japan.subregion
   'Eastern Asia'
   >>> japan.area_km2
   377835.0
   >>> japan.population
   126529100
   >>> round(japan.population_density, 2)
   334.88
   >>> (japan.currency.code, japan.currency.name)
   ('JPY', 'Yen')
   >>> japan.calling_codes
   ('+81',)
   >>> japan.top_level_domain
   '.jp'
   >>> [language.code for language in japan.languages]
   ['ja']
   >>> japan.observed_timezones
   ('Asia/Tokyo',)

Current field coverage
----------------------

.. list-table:: Current profile availability
   :header-rows: 1
   :widths: 44 18 38

   * - Field family
     - Profiles
     - Meaning
   * - Population snapshot
     - 248 / 248
     - Captured GeoNames country value
   * - Currency
     - 247 / 248
     - Source code and name when present
   * - Language codes
     - 245 / 248
     - Source codes; no display-name expansion
   * - Calling codes
     - 243 / 248
     - International dialing prefixes
   * - Country-code top-level domain
     - 248 / 248
     - Source internet-domain value
   * - Observed timezones
     - 242 / 248
     - Zones found on bundled capital and city records
   * - Primary-capital coordinates
     - 241 / 248
     - WGS84 location of the selected primary capital
   * - Selected local identity
     - 248 / 248
     - One sourced local name per record across 80 languages and 21 scripts
   * - English formal name
     - 240 / 248
     - 195 distinct long forms and 45 source-equal short/formal forms
   * - Reviewed national official forms
     - 10 / 248
     - UNGEGN short/formal evidence for the selected language

Availability is field-specific. Code should handle optional scalar fields and
empty collection fields even when a familiar country currently has values.

Convenience and discovery views
-------------------------------

``language_codes``, ``currency_code``, and ``major_city_count`` provide common
read-only projections without changing the underlying typed values.
``population_density`` is calculated from the captured population and area
snapshots. :meth:`Country.discovery_card <pyworldatlas.Country.discovery_card>`
creates a compact serializable teaching view; see :doc:`discovery`.

Names and aliases
-----------------

``country.name`` is the familiar English display name, ``official_name`` is the
canonical English UN M49 identity, and ``formal_name`` is the sourced English
long form. The last field is ``None`` for eight areas outside the source
intersection. :meth:`~pyworldatlas.Atlas.countries_with_formal_names` discovers
the 240 covered profiles.

``country.names`` contains sourced English lookup names with a kind and
preferred marker. ``country.aliases`` is the convenient tuple used for familiar
alternate queries. ``country.local_names`` is separate: it contains one sourced
local identity record with language, script, evidence kind, and an exact source
locator. Reviewed UNGEGN records additionally carry local formal names and
source-provided romanization. See :doc:`local_names` for the complete contract
and multilingual examples.

Capital and cities
------------------

.. doctest::

   >>> japan.capital
   Capital(name='Tokyo', country_code='JP')
   >>> japan.capital.coordinates.as_tuple()
   (35.6895, 139.69171)
   >>> japan.capital.timezone_id
   'Asia/Tokyo'
   >>> len(japan.major_cities) > 100
   True

Sources
-------

``country.sources`` lists the source snapshots that contributed somewhere in
the profile. Field-level provenance is stored by the generated dataset, while
the public profile exposes a source summary. Core profiles reference UN M49 and
GeoNames; English formal names add Factbook, UN Protocol, or Wikidata where
used. Each local identity carries its own CLDR or UNGEGN source reference and
exact locator.

Immutability
------------

Public models are frozen dataclasses. This prevents one part of an application
from silently changing a shared geographic record. Use :meth:`Country.to_dict
<pyworldatlas.Country.to_dict>` when mutable JSON-compatible data is needed.

.. note::

   Population is a source snapshot rather than a live estimate. Language values
   are source codes, and ``observed_timezones`` contains zones seen on bundled
   capital/major-city records rather than claiming exhaustive legal coverage.
   The public model does not expose an entity-recognition or legal-status
   classification. The words *country* and *area* follow the documented source
   scope.
