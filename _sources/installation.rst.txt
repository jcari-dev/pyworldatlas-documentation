Installation
============

Requirements
------------

- Python 3.10 or newer for the 0.x release series.
- No third-party runtime packages.
- No API key or network access after installation.

Install from PyPI
-----------------

After release 0.1.0 is published:

.. code-block:: console

   python -m pip install pyworldatlas

.. important::

   PyPI currently serves the legacy 0.0.12 package until the new 0.1.0 release
   is published. Contributors testing this checkout should use the local wheel
   or editable installation below.

Install this checkout in VS Code
--------------------------------

Open the project folder, select a Python interpreter, create a ``.venv``, and
run this in VS Code's integrated terminal:

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

The strongest local installation test uses the exact wheel:

.. code-block:: console

   python -m pip install --no-index --no-deps dist/pyworldatlas-0.1.0-py3-none-any.whl

Verify the installation
-----------------------

.. doctest::

   >>> import pyworldatlas
   >>> pyworldatlas.__version__
   '0.1.0'
   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     print(atlas.country("DO").capital.name)
   Santo Domingo

