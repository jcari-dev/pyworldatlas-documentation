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
   377915.0
   >>> japan.population
   126529100
   >>> round(japan.population_density, 2)
   334.81
   >>> (japan.currency.code, japan.currency.name, japan.currency.symbol)
   ('JPY', 'Japanese Yen', '¥')
   >>> japan.calling_codes
   ('+81',)
   >>> japan.top_level_domain
   '.jp'
   >>> [(language.code, language.name, language.script_code) for language in japan.languages]
   [('ja', 'Japanese', 'Jpan')]
   >>> japan.observed_timezones
   ('Asia/Tokyo',)
   >>> japan.timezone_ids
   ('Asia/Tokyo',)
   >>> japan.anthem.title
   'Kimigayo'
   >>> japan.demonym.adjective
   'Japanese'

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
   * - Anthem titles
     - 234 / 248
     - Structured source title and optional English title
   * - Reviewed mottos
     - 32 / 248
     - Conservative reviewed source-listed layer
   * - English demonyms
     - 227 / 248
     - Source-preserved noun and adjective
   * - Country timezone profiles
     - 246 / 248
     - Complete captured GeoNames timezone table
   * - Postal-code formats
     - 176 / 248
     - Display pattern and optional regular expression
   * - Total-area profiles
     - 248 / 248
     - Factbook value with GeoNames fallback outside the source intersection
   * - Land area and coastline
     - 238 / 248 each
     - Structured measurements from the pinned Factbook snapshot
   * - Highest and lowest points
     - 240 / 248 each
     - Named point and elevation in metres
   * - Mean elevation
     - 166 / 248
     - Source-reported mean elevation when available
   * - Source-listed major rivers
     - 188 records across 80 profiles
     - Named source entries; not an exhaustive inventory
   * - Source-listed major lakes
     - 187 records across 69 profiles
     - Named source entries; not an exhaustive inventory
   * - Plain-language climate summaries
     - 240 / 248
     - Short source descriptions
   * - Köppen-Geiger profiles
     - 241 / 248
     - Latitude-area-weighted classes from the 1991–2020 raster

Availability is field-specific. Code should handle optional scalar fields and
empty collection fields even when a familiar country currently has values.

Convenience and discovery views
-------------------------------

``language_codes``, ``currency_code``, ``timezone_ids``, and
``major_city_count`` provide common
read-only projections without changing the underlying typed values.
``population_density`` is calculated from the captured population and total
area snapshots. Physical conveniences include ``land_area_km2``,
``water_area_km2``, ``water_percent``, ``coastline_km``,
``mean_elevation_m``, ``highest_point``, ``lowest_point``, ``rivers``,
``lakes``, ``climate``, ``is_coastal``, and ``is_landlocked``.
:meth:`Country.discovery_card <pyworldatlas.Country.discovery_card>`
creates a compact serializable teaching view; see :doc:`discovery`.
``anthem``, ``motto``, and ``demonym`` return the first optional typed record;
their complete tuples remain available as ``anthems``, ``mottos``, and
``demonyms``. See :doc:`reference_facts`.

Physical geography
------------------

.. doctest::

   >>> japan.land_area_km2, japan.water_area_km2, round(japan.water_percent, 2)
   (364485.0, 13430.0, 3.55)
   >>> japan.coastline_km, japan.mean_elevation_m
   (29751.0, 438.0)
   >>> (japan.highest_point.name, japan.highest_point.elevation_m)
   ('Mount Fuji', 3776.0)
   >>> japan.climate.zone_codes
   ('Cfa', 'Dfb', 'Dfa', 'Af', 'Dfc')

``Country.physical`` groups coastline, elevation points, rivers, lakes, climate,
and direct source metadata in one :class:`~pyworldatlas.PhysicalGeography`
record. Area components remain under ``Country.geography.area`` as
:class:`~pyworldatlas.Area`. See :doc:`physical_geography` for the complete
contract and interpretation cautions.

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
the profile. Fact-bearing models also carry their own ``SourceReference``;
anthem, motto, and demonym records retain exact locators. Core profiles
reference UN M49 and GeoNames; English formal names add Factbook, UN Protocol,
or Wikidata where used. Physical profiles add the Factbook and, where covered,
Köppen-Geiger sources. Each local identity carries its own CLDR or UNGEGN source
reference and exact locator.

Immutability
------------

Public models are frozen dataclasses. This prevents one part of an application
from silently changing a shared geographic record. Use :meth:`Country.to_dict
<pyworldatlas.Country.to_dict>` when mutable JSON-compatible data is needed.

.. note::

   Population is a source snapshot rather than a live estimate. Language values
   are source metadata rather than legal-language claims. ``observed_timezones``
   contains zones seen on bundled places, while ``timezones`` is the captured
   country-level timezone table.
   The public model does not expose an entity-recognition or legal-status
   classification. The words *country* and *area* follow the documented source
   scope.
