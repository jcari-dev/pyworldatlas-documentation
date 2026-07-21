Official local names
====================

Version 0.2.1 includes reviewed official short and formal country names for
Brazil and Switzerland. These records are bundled in SQLite, remain available
after an :class:`~pyworldatlas.Atlas` closes, and require no network access.

Countries without bundled records return an empty tuple, and the convenience
methods return ``None``. No English fallback is supplied. Romanized forms are
returned only when the source provides them.

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> brazil = atlas.country("Brazil")
   >>> brazil.name_in("pt")
   'Brasil'
   >>> brazil.official_name_in("pt")
   'República Federativa do Brasil'
   >>> brazil.name_in("en") is None
   True
   >>> brazil.romanized_name_in("pt") is None
   True
   >>> swiss = atlas.country("Switzerland")
   >>> [(name.language_code, name.short_name) for name in swiss.local_names]
   [('de', 'Schweiz'), ('fr', 'Suisse'), ('it', 'Svizzera'), ('rm', 'Svizra')]
   >>> atlas.close()
   >>> swiss.official_name_in("rm")
   'Confederaziun svizra'

Each record in ``country.local_names`` includes a language code and display
name, ISO 15924 script code, short and formal forms, explicit romanization
fields, an official-language flag, and a :class:`~pyworldatlas.SourceReference`.

Source policy
-------------

The pilot is a reviewed transcription of the UNGEGN Working Group on Country
Names document ``E/CONF.105/13/CRP.13`` dated 17 July 2017. The exact PDF is
captured with a SHA-256 manifest, and every reviewed row carries an entry and
page locator.

Coverage boundary
-----------------

Coverage is currently limited to two countries and five records. An empty result
means that this dataset does not yet contain a reviewed record for the requested
country and language; it does not mean that no local name exists.
