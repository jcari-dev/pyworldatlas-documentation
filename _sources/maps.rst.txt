Interactive 3D maps
===================

PyWorldAtlas can open a rotatable country terrain map directly from Python.
The viewer runs in the default browser because WebGL provides smooth,
cross-platform 3D interaction. Maps need no extra Python packages: PyWorldAtlas
builds each map with the standard library, and the map pack ships the browser
renderer. After the pack is installed everything is offline: ``show()`` writes a
local HTML document and opens that file.

.. warning::

   **Experimental feature.** Interactive 3D maps are under active development.
   River overlays and country geometry may be incomplete, generalized, or
   misplaced. Countries and areas containing islands, distant territories, or
   separated land areas may render unexpectedly. These maps must not be used
   for navigation, legal boundary interpretation, or authoritative geographic
   analysis. The map feature may still change in a minor release.

   **TL;DR:** The maps are fun, but right now this feature is a bug-shaped
   headache. It may settle down before 1.0, or it may be politely shown the
   door.

.. container:: atlas-map-showcase

   .. image:: /_static/iceland-rotation.gif
      :alt: Animated PyWorldAtlas Standard 3D elevation map of Iceland

   .. container:: atlas-map-showcase-copy

      **A complete turn from the real Standard-edition map of Iceland.** Rotate
      and zoom the live view, adjust terrain height, control river and capital
      labels, or switch from elevation to climate without contacting a server.

Install a map pack
------------------

The ordinary package stays small and dependency-free. Map data comes as a data
pack, installed once with one command:

.. list-table:: Map packs
   :header-rows: 1
   :widths: 30 22 14 34

   * - Command
     - Elevation sampling
     - Download
     - Best for
   * - ``pyworldatlas get maps-lite``
     - 20 arc-minutes
     - about 7.1 MB
     - Lessons, quick exploration, and modest computers
   * - ``pyworldatlas get maps``
     - 5 arc-minutes
     - about 13.3 MB
     - The recommended general-purpose experience

.. code-block:: console

   pyworldatlas get maps

``get`` downloads the pack from this release on GitHub, checks its SHA-256
fingerprint against the value pinned in the installed library, and refuses any
file that does not match. It is the only command that uses the network. On a
machine without internet, copy the ``.pack`` file over and install it with
``pyworldatlas add pyworldatlas-maps.pack``. ``pyworldatlas packs`` lists what is
installed; see :ref:`api-packs` for the pack folder and the Python API.

Overview (``maps-lite``) and Standard (``maps``) cover the same 248 profiles and
expose the same API. Standard samples the pinned elevation surface more densely
and uses a more detailed river layer.

Open your first map
-------------------

.. code-block:: python

   from pyworldatlas import Atlas

   with Atlas() as atlas:
       atlas.map("Iceland").show(auto_rotate=True)

That one call opens a full-window map with a single control panel:

- rotatable and zoomable 3D elevation that fills the window;
- **Color by** elevation or Köppen-Geiger climate;
- **Terrain height** from ``0.5×`` through ``3×``;
- **Show** toggles for the capital name, river lines, and river names;
- **Motion**: rotate or pause, with a ``0.25×`` to ``3×`` speed slider;
- **View**: reset the camera, or save a high-resolution PNG;
- generalized country outlines and source-provided river centerlines with hover
  details; and
- visible resolution, source, and navigation-use notes.

The page follows the reader's light or dark color scheme. On a phone the panel
becomes a sheet that opens from the bottom of the screen, and the legend moves
to a slim bar above the map.

``show()`` returns the generated :class:`~pathlib.Path`, so applications can
log or reuse the exact local document.

Rotation is off by default, keeping ordinary map use still and predictable.
Pass ``auto_rotate=True`` for presentations or demonstrations, and choose a
starting speed when wanted:

.. code-block:: python

   with Atlas() as atlas:
       atlas.map("Iceland").show(
           auto_rotate=True,
           rotation_speed=1.25,
       )

The browser controls can pause or change that speed at any time. Moving the
camera manually pauses automatic rotation, and browsers configured to reduce
motion do not start it automatically.

Select a quality explicitly
---------------------------

``quality="auto"`` is the default. It prefers Standard when installed and
otherwise uses Overview. An application can request a specific installed
edition when reproducibility matters:

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> with Atlas() as atlas:
   ...     brazil = atlas.map("BR", quality="overview")
   ...     print(brazil.country_name, brazil.quality, brazil.resolution_arc_minutes)
   Brazil overview 20

Use ``quality="standard"`` or ``quality="overview"``. A missing pack raises
:class:`~pyworldatlas.MapSupportNotInstalledError` with the exact ``pyworldatlas
get`` command rather than silently downloading data.

Notebooks, customization, and export
------------------------------------

Use :meth:`pyworldatlas.maps.CountryMap.to_dict` to obtain the complete
figure as plain plotly.js ``data`` and ``layout`` dictionaries. If the separate
``plotly`` package is installed, :meth:`~pyworldatlas.maps.CountryMap.figure`
returns a Plotly figure that displays inline in notebooks and supports normal
Plotly customization. It is the only map feature that needs ``plotly``:

.. code-block:: python

   with Atlas() as atlas:
       figure = atlas.map("Japan").figure()  # requires: pip install plotly
       figure.update_layout(height=760)
       figure.show()

Write a permanent, self-contained HTML document without opening it:

.. code-block:: python

   with Atlas() as atlas:
       atlas.map("Switzerland").write_html(
           "switzerland-map.html",
           auto_rotate=True,
           rotation_speed=0.75,
       )

The exported document embeds the renderer and selected country data. It does
not depend on a CDN or a running Python process. Select **Save PNG** in the
viewer to save a crisp 3200 × 1800 image of the current camera angle.

Create a documentation GIF
--------------------------

The repository includes a maintainer utility that renders one seamless turn
from the real map figure. GIF dependencies stay outside the published
package:

.. code-block:: console

   python -m pip install plotly Pillow kaleido
   python tools/create_map_gif.py Iceland --quality standard --seconds 6 --fps 10 --output docs/source/_static/iceland-rotation.gif

The default 960 × 600 render uses 128 colors to keep project-page downloads
reasonable. It uses a presentation-friendly perspective camera by default;
pass ``--projection orthographic`` to match the viewer's initial projection.
``--width``, ``--height``, ``--scale``, ``--zoom``, and ``--colors`` are
available when a different balance of sharpness and file size is needed.
Kaleido requires a supported local browser for static rendering.

Data meaning and limits
-----------------------

Elevation comes from the NOAA NCEI ETOPO 2022 ice-surface global relief model.
Standard samples the 60 arc-second source every five cells; Overview samples
the same pinned snapshot every twenty cells. The maps are educational relief
visualizations and are not suitable for navigation or site-level elevation
decisions.

Climate coloring uses the pinned Beck et al. 1991–2020 Köppen-Geiger raster.
Outlines and river centerlines use generalized Natural Earth data. The outline
supports visualization only: PyWorldAtlas does not expose boundary coordinates,
GeoJSON, point-in-country tests, or legal boundary claims through the public
API. Small islands and narrow coastlines can be visibly generalized at the
selected elevation resolution.

See :doc:`data_sources`, :doc:`data_quality`, and :doc:`educational_principles`
for the complete source, editorial, and interpretation policies.
