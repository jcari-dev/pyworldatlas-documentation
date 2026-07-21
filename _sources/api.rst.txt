API reference
=============

The public surface is deliberately exported from ``pyworldatlas``. Private
database and normalization helpers are implementation details.

Atlas
-----

.. autoclass:: pyworldatlas.Atlas
   :members:
   :special-members: __getitem__, __contains__, __len__, __iter__, __enter__, __exit__
   :exclude-members: __weakref__

Country models
--------------

.. autoclass:: pyworldatlas.Country
   :members:

.. autoclass:: pyworldatlas.CountryCodes
   :members:

.. autoclass:: pyworldatlas.CountryStatus
   :members:

.. autoclass:: pyworldatlas.LocalizedName
   :members:

Geographic models
-----------------

.. autoclass:: pyworldatlas.Coordinate
   :members:

.. autoclass:: pyworldatlas.Area
   :members:

.. autoclass:: pyworldatlas.Geography
   :members:

.. autoclass:: pyworldatlas.Capital
   :members:

.. autoclass:: pyworldatlas.City
   :members:

Results and metadata
--------------------

.. autoclass:: pyworldatlas.CountryMatch
   :members:

.. autoclass:: pyworldatlas.DatasetInfo
   :members:

.. autoclass:: pyworldatlas.SourceReference
   :members:

Exceptions
----------

.. autoexception:: pyworldatlas.AtlasError
.. autoexception:: pyworldatlas.AtlasClosedError
.. autoexception:: pyworldatlas.DatasetError
.. autoexception:: pyworldatlas.DatasetNotFoundError
.. autoexception:: pyworldatlas.DatasetVersionError
.. autoexception:: pyworldatlas.DatasetIntegrityError
.. autoexception:: pyworldatlas.CountryNotFoundError
.. autoexception:: pyworldatlas.AmbiguousCountryError
.. autoexception:: pyworldatlas.PlaceNotFoundError
.. autoexception:: pyworldatlas.AmbiguousPlaceError
.. autoexception:: pyworldatlas.CapitalNotFoundError
