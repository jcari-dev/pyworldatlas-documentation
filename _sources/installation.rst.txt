Installation
============

Requirements
------------

- Python 3.10 or newer for the 0.x release series.
- No third-party runtime packages.
- No API key or network access after installation.

Published package
-----------------

Install the latest published release from PyPI:

.. code-block:: console

   python -m pip install --upgrade pyworldatlas

Install a source checkout
-------------------------

Create or activate a virtual environment, open a terminal in the repository
root, and install the runtime and builder projects:

.. code-block:: console

   python -m pip install -e . -e pipeline

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

   python -m pip install --no-index --no-deps dist/pyworldatlas-0.6.0-py3-none-any.whl

Verify the installation
-----------------------

.. doctest::

   >>> import pyworldatlas
   >>> pyworldatlas.__version__
   '0.6.0'
   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     print(atlas.country("DO").capital.name)
   Santo Domingo
