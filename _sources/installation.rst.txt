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

Optional 3D maps
----------------

Install the recommended Standard global map edition together with the core
package:

.. code-block:: console

   python -m pip install "pyworldatlas[maps]"

For the smallest download, install Overview instead:

.. code-block:: console

   python -m pip install "pyworldatlas[maps-overview]"

Both editions work offline after installation and cover all 248 atlas
profiles. See :doc:`maps` for the exact sizes, resolution, API, and data limits.

.. note::

   Extras use square brackets. Quoting the requirement keeps the command
   portable across common terminals and shells.

Install a source checkout
-------------------------

Create or activate a virtual environment, open a terminal in the repository
root, and install the projects in editable mode:

.. code-block:: console

   python -m pip install -e . -e pipeline -e packages/mapview -e packages/mapdata-overview -e packages/mapdata-standard

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

   python -m pip install --no-index --no-deps dist/pyworldatlas-0.9.4-py3-none-any.whl

Verify the installation
-----------------------

.. doctest::

   >>> import pyworldatlas
   >>> pyworldatlas.__version__
   '0.9.4'
   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     print(atlas.country("DO").capital.name)
   Santo Domingo
