PyWorldAtlas
============

.. container:: atlas-hero

   .. container:: atlas-hero-text

      :atlas-kicker:`Offline · no account · made for learning`

      .. container:: atlas-hero-title

         The whole world, offline, in plain Python.

      .. container:: atlas-hero-copy

         Every country, 200,000 places, the sun, statistics since 1960, and 3D
         maps. Free, and it works without internet.

      .. raw:: html

         <nav class="atlas-project-links" aria-label="Get started">
           <a class="atlas-project-link atlas-project-link-primary" href="playground.html">Try it in your browser</a>
           <a class="atlas-project-link" href="quickstart.html">Quickstart</a>
           <a class="atlas-project-link" href="api.html">API reference</a>
         </nav>

   .. container:: atlas-hero-map

      .. image:: /_static/iceland-standard-map.png
         :alt: PyWorldAtlas Standard 3D elevation map of Iceland
         :target: maps.html

248 countries and areas · 200,000 places · 0 dependencies · Python 3.10 to
3.14 · version 0.13.1

Start in three lines
--------------------

.. code-block:: console

   python -m pip install pyworldatlas

.. rst-class:: atlas-try-these

.. doctest::

   >>> from pyworldatlas import Atlas
   >>> atlas = Atlas()
   >>> print(atlas.border_path("Portugal", "Poland"))
   Portugal → Spain → France → Germany → Poland (4 border crossings)

Lost? ``atlas.help()`` prints a dozen more things to try.

Pick your path
--------------

.. raw:: html

   <div class="atlas-doors">
     <a class="atlas-door" href="playground.html">
       <strong>I'm a student</strong>
       <span>Look things up, take a quiz, and change a little Python in your browser. No install.</span>
     </a>
     <a class="atlas-door" href="teaching.html">
       <strong>I'm a teacher</strong>
       <span>Quizzes that are the same for the whole class, lesson ideas, and offline use.</span>
     </a>
     <a class="atlas-door" href="quickstart.html">
       <strong>I'm a developer</strong>
       <span>Zero dependencies, typed and tested. Quickstart and the full API reference.</span>
     </a>
   </div>

.. _explore-the-atlas:

Try these
---------

Find anything by name:

.. rst-class:: atlas-try-these

.. doctest::

   >>> atlas.find("Kilimanjaro", limit=1)
   (Place(english_name='Mount Kilimanjaro', kind='mountain', country_code='TZ'),)

Measure the world:

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.distance_between("Paris", "Tokyo"))
   9,713 km

Quiz yourself:

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.quiz("capitals", region="Western Europe")[0])
   What is the capital of Switzerland?  1) Monaco  2) Bern  3) Amsterdam  4) Berlin

Rank countries:

.. rst-class:: atlas-try-these

.. doctest::

   >>> print(atlas.rank("coastline", limit=1)[0])
   #1 Canada: 202,080 km

See the terrain in 3D, after ``pyworldatlas get maps``:

.. code-block:: python

   atlas.map("Iceland").show(auto_rotate=True)

.. image:: /_static/iceland-rotation.gif
   :alt: Animated PyWorldAtlas Standard 3D elevation map of Iceland
   :target: maps.html

.. testcleanup::

   atlas.close()

Every guide is in the menu, from :doc:`country_profile` to :doc:`statistics`.
To learn where the data comes from, read :doc:`why`, :doc:`data_sources`, and
:doc:`educational_principles`.

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Start here

   quickstart
   playground
   installation

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Examples and learning

   learning
   quests
   cheatsheet
   teaching
   recipes

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Explore the atlas

   country_profile
   places
   landmarks
   statistics
   maps
   physical_geography
   reference_facts
   rankings
   local_names
   capitals_cities
   coordinates_distances
   sun
   borders
   discovery
   searching
   serialization

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Data and trust

   why
   educational_principles
   data_sources
   data_quality
   _generated/project_status
   roadmap

.. toctree::
   :hidden:
   :maxdepth: 2
   :caption: Reference

   api
   glossary
   changelog
