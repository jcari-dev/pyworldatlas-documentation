Local names and writing systems
===============================

PyWorldAtlas can show every bundled country or area in English and in one
selected local language. Names remain ordinary Unicode strings, so Arabic,
Chinese, Devanagari, Japanese, Cyrillic, and Latin text work offline without a
translation service.

Coverage at a glance
--------------------

The 0.5.0 dataset separates four claims that are easy to confuse:

.. list-table::
   :header-rows: 1

   * - Layer
     - Coverage
     - Source
   * - English identity
     - 248 / 248 countries and areas
     - United Nations M49
   * - English formal name
     - 240 / 248 profiles
     - World Factbook base, five UN Protocol excerpts, three Wikidata statements
   * - Selected local display name
     - 248 / 248 countries and areas
     - Unicode CLDR 48.2, with 10 reviewed UNGEGN replacements
   * - Reviewed national official short and formal name
     - 10 / 248 records in the current development batch
     - UNGEGN ``E/CONF.105/13/CRP.13``

The local display-name layer is complete. The narrower national-official local
layer remains a reviewed workstream and is never silently filled with a
convenient translation. English formal names are a separate 240-profile layer.

Understand the English fields
-----------------------------

``name``, ``official_name``, and ``formal_name`` are related but not
interchangeable:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> turkey = atlas.country("TR")
   >>> turkey.name
   'Turkey'
   >>> turkey.official_name
   'Türkiye'
   >>> turkey.formal_name
   'Republic of Türkiye'
   >>> turkey.has_distinct_formal_name
   True

``name`` is the familiar English atlas label. ``official_name`` retains the
canonical English UN M49 identity. ``formal_name`` is the sourced English long
form. Japan demonstrates that a sourced formal identity may equal the short
form:

.. doctest::

   >>> japan = atlas.country("JP")
   >>> (japan.name, japan.official_name, japan.formal_name)
   ('Japan', 'Japan', 'Japan')
   >>> japan.has_distinct_formal_name
   False
   >>> len(atlas.countries_with_formal_names())
   240

Eight areas outside the captured English formal-name source intersection return
``None``. A false ``has_distinct_formal_name`` therefore does not by itself mean
that a profile is covered; inspect ``formal_name`` when the distinction matters.

Start with one country
----------------------

The English name is the normal :class:`~pyworldatlas.Country` identity. Use
:meth:`~pyworldatlas.Country.name_in` for the selected local-language record:

.. doctest::

   >>> saudi = atlas.country("Saudi Arabia")
   >>> saudi.name
   'Saudi Arabia'
   >>> saudi.local_name_languages
   ('ar',)
   >>> saudi.name_in("ar")
   'المملكة العربية السعودية'
   >>> saudi.local_name("AR").script_code
   'Arab'

Language matching is case-insensitive and exact. The method does not translate
at runtime and does not substitute a different language when the requested code
is absent.

Explore writing systems
-----------------------

The same API returns text in many scripts:

.. doctest::

   >>> atlas.country("United Arab Emirates").name_in("ar")
   'الإمارات العربية المتحدة'
   >>> atlas.country("China").name_in("zh")
   '中国'
   >>> atlas.country("India").name_in("hi")
   'भारत'
   >>> atlas.country("Japan").name_in("ja")
   '日本'

Inspect the evidence level
--------------------------

:meth:`~pyworldatlas.Country.local_name` returns an immutable
:class:`~pyworldatlas.LocalizedName`. Its ``kind`` explains what the source
actually supports.

``locale_display``
   A Unicode CLDR territory display name in a selected official or de-facto
   official language. It is suitable for labels, interfaces, search, lessons,
   and maps. It is not presented as a diplomatic formal name.

``national_official``
   A visually reviewed UNGEGN national official short name with its formal form
   and source-provided romanization when available.

For example, Andorra has complete local display coverage but its formal Catalan
name is not in the reviewed UNGEGN layer:

.. doctest::

   >>> andorra = atlas.country("Andorra").local_name("ca")
   >>> (andorra.short_name, andorra.kind, andorra.language_status)
   ('Andorra', 'locale_display', 'official')
   >>> andorra.formal_name is None
   True
   >>> andorra.source.id
   'unicode-cldr-48.2'
   >>> "common/main/ca.xml" in andorra.source_locator
   True

The Dominican Republic already has a reviewed national official record:

.. doctest::

   >>> dominican = atlas.country("DO").local_name("es")
   >>> (dominican.short_name, dominican.formal_name)
   ('República Dominicana', 'República Dominicana')
   >>> dominican.kind
   'national_official'
   >>> dominican.is_national_official
   True
   >>> dominican.source.id
   'ungegn-country-names-2017'
   >>> 'PDF page 30' in dominican.source_locator
   True

Romanization is source data
---------------------------

Romanization is present only when UNGEGN prints it. PyWorldAtlas never creates
one at runtime:

.. doctest::

   >>> china = atlas.country("China")
   >>> china.romanized_name_in("zh")
   'Zhongguo'
   >>> china.romanized_official_name_in("zh")
   'Zhonghua Renmin Gongheguo'
   >>> india = atlas.country("India")
   >>> india.romanized_name_in("hi")
   'Bhārat'
   >>> andorra.romanized_short_name is None
   True

Discover coverage
-----------------

:meth:`~pyworldatlas.Atlas.countries_with_local_names` can filter the complete
identity layer by BCP 47 language code or ISO 15924 script code:

.. doctest::

   >>> len(atlas.countries_with_local_names())
   248
   >>> len(atlas.countries_with_local_names(name_kind="national_official"))
   10
   >>> len(atlas.countries_with_local_names(name_kind="locale_display"))
   238
   >>> len(atlas.countries_with_local_names(language_code="es"))
   20
   >>> [country.name for country in atlas.countries_with_local_names(script_code="Jpan")]
   ['Japan']
   >>> len(atlas.countries_with_local_names(script_code="Arab"))
   25

Results are alphabetical. Each country or area currently contributes exactly
one selected local identity, matching the deliberately small identity contract.

How the language is selected
----------------------------

The CLDR extractor uses a deterministic rule:

1. Prefer a language marked ``official``.
2. Then consider ``de_facto_official`` and ``official_regional``.
3. Within the same status, prefer the language with the highest recorded
   population percentage.
4. If that locale does not contain the territory name, try the next eligible
   language.

Four remote or uninhabited areas do not have an applicable official-language
selection in CLDR. Their useful administrative display name remains available,
but ``is_official_language`` is ``False`` and ``language_status`` explains why:

.. doctest::

   >>> antarctica = atlas.country("Antarctica").local_names[0]
   >>> (antarctica.short_name, antarctica.is_official_language)
   ('Antarctica', False)
   >>> antarctica.language_status
   'not_applicable'

Source and review rules
-----------------------

- Preserve source Unicode in NFC form.
- Record the exact CLDR locale/XPath or UNGEGN PDF entry and page.
- Keep display names and national official names as different evidence levels.
- Keep formal names and romanizations missing until the authoritative source
  supplies them.
- Never infer a broader legal classification from a localized display label.

The English ``Country.formal_name`` layer follows its own source policy. Do not
use it as a substitute for ``official_name_in(language_code)``; the latter is a
local-language field with a stricter national-official evidence kind.

See :doc:`data_sources` for licensing, versioning, and source roles. The full
contract and later anthem, motto, and reference-date boundaries are recorded in
``docs/project/COUNTRY_IDENTITY_DATA_SPEC.md`` in the source repository.

Try the example
---------------

.. literalinclude:: ../../examples/country_identity.py
   :language: python
   :linenos:

.. doctest::

   >>> atlas.close()
