Installation
============

The core PyWorldAtlas package has no third-party runtime dependencies. Install
the published wheel for ordinary use, add an optional map edition for offline
3D terrain, or use an editable checkout when contributing.

Requirements
------------

- Python 3.10 through 3.14 for the 0.9 release.
- No third-party runtime packages for the core atlas.
- No API key or network access after installation.

Published package
-----------------

Install the latest published release from PyPI:

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

Optional 3D maps
----------------

Install the recommended Standard global map edition:

.. code-block:: console

   python -m pip install --upgrade "pyworldatlas[maps]"

For the smallest download, install Overview instead:

.. code-block:: console

   python -m pip install --upgrade "pyworldatlas[maps-overview]"

Both editions work offline after installation and cover all 248 atlas
profiles. See :doc:`maps` for the exact sizes, resolution, API, and data limits.

Install a source checkout
-------------------------

Create or activate a virtual environment, open a terminal in the repository
root, and install the runtime and builder projects:

.. code-block:: console

   python -m pip install -e . -e pipeline -e packages/mapview -e packages/mapdata-overview -e packages/mapdata-standard

Documentation dependencies are optional:

.. code-block:: console

   python -m pip install -r docs/requirements.txt

Python 3.10 receives the compatible Sphinx 8.1 line; newer Python versions use
Sphinx 8.2. This distinction affects contributors only—the installed atlas has
no Sphinx dependency.

Install the built wheel offline
-------------------------------

Test the exact release artifact without consulting a package index:

.. code-block:: console

   python -m pip install --no-index --no-deps dist/pyworldatlas-0.9.2-py3-none-any.whl

Verify the installation
-----------------------

.. doctest::

   >>> import pyworldatlas
   >>> pyworldatlas.__version__
   '0.9.2'
   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     print(atlas.country("DO").capital.name)
   Santo Domingo
