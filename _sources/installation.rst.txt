Installation
============

Install the core package for country and place data, or add one optional map
edition for offline 3D terrain. The core package has no third-party runtime
dependencies and needs no API key.

Requirements
------------

- Python 3.10 through 3.14.
- No third-party runtime packages for the core atlas.
- No API key or network access after installation.

Install from PyPI
-----------------

For country profiles, cities, distances, learning tools, and every non-map
feature:

.. code-block:: console

   python -m pip install pyworldatlas

``pip`` selects the newest compatible release when the package is not already
installed. The ``--upgrade`` option is only needed when replacing an older
installed version:

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

Optional data packs
-------------------

The core package is complete on its own. Packs add more data, each installed
once with ``pyworldatlas get NAME`` and checked against a SHA-256 checksum
pinned in the library. ``pyworldatlas packs`` lists what is installed.

.. list-table::
   :header-rows: 1
   :widths: 24 52 24

   * - Pack
     - Adds
     - Download
   * - ``maps``
     - Standard 3D country maps (5 arc-minute terrain)
     - about 13 MB
   * - ``maps-lite``
     - Overview 3D country maps (20 arc-minute terrain)
     - about 7 MB
   * - ``places-explorer``
     - Every town over 1,000 people and every named natural feature
     - about 23 MB
   * - ``places-world``
     - Every remaining village, stream, hill, and local area
     - about 44 MB
   * - ``landmarks``
     - Airports with scheduled flights and World Heritage sites
     - about 0.15 MB
   * - ``statistics``
     - Eleven World Bank indicators for every country since 1960
     - about 0.15 MB

Optional 3D maps
----------------

Maps need no extra Python packages, only their data. Install the recommended
Standard map pack once:

.. code-block:: console

   pyworldatlas get maps

For the smallest download, install the Overview pack instead:

.. code-block:: console

   pyworldatlas get maps-lite

Both packs work offline after installation and cover all 248 atlas profiles.
Without internet access, install a copied pack file with
``pyworldatlas add pyworldatlas-maps.pack``. See :doc:`maps` for the exact sizes,
resolution, API, and data limits.

.. note::

   Older instructions used ``pip install "pyworldatlas[maps]"``. That still
   installs PyWorldAtlas and is harmless, but the map data now comes from
   ``pyworldatlas get maps``.

Install a source checkout
-------------------------

Create or activate a virtual environment, open a terminal in the repository
root, and install the projects in editable mode:

.. code-block:: console

   python -m pip install -e . -e pipeline

Documentation dependencies are optional:

.. code-block:: console

   python -m pip install -r docs/requirements.txt

Python 3.10 receives the compatible Sphinx 8.1 line; newer Python versions use
Sphinx 8.2. This distinction affects contributors only. The installed atlas has
no Sphinx dependency.

Install the built wheel offline
-------------------------------

Test the exact release artifact without consulting a package index:

.. code-block:: console

   python -m pip install --no-index --no-deps dist/pyworldatlas-0.13.0-py3-none-any.whl

Verify the installation
-----------------------

.. doctest::

   >>> import pyworldatlas
   >>> pyworldatlas.__version__
   '0.13.0'
   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     print(atlas.country("DO").capital.name)
   Santo Domingo

The installed terminal command provides a second quick check:

.. code-block:: console

   pyworldatlas --version
   pyworldatlas country DO

``python -m pyworldatlas`` is equivalent and remains available when a tool
does not place console scripts on the command search path.
