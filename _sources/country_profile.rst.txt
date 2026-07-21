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

.. list-table:: Version 0.2.1 profile availability
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
   * - Official local names
     - 2 / 248
     - Five reviewed records for Brazil and Switzerland

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

``country.names`` contains sourced name records with a kind and preferred
marker. ``country.aliases`` is the convenient tuple used for familiar alternate
queries. Common display names may differ from formal UN M49 names while the
formal source value remains available.

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
the profile. It does not currently map each returned value to one source. Core
profiles reference UN M49 and GeoNames; the reviewed local-name records carry a
separate UNGEGN source reference on each record.

Immutability
------------

Public models are frozen dataclasses. This prevents one part of an application
from silently changing a shared geographic record. Use :meth:`Country.to_dict
<pyworldatlas.Country.to_dict>` when mutable JSON-compatible data is needed.

.. note::

   Population is a source snapshot rather than a live estimate. Language values
   are source codes, and ``observed_timezones`` contains zones seen on bundled
   capital/major-city records rather than claiming exhaustive legal coverage.
   The current sources do not classify political entity type, so every
   ``Country.status`` is ``CountryStatus.OTHER``. Government, leaders,
   historical statistics, and culture remain later work.
