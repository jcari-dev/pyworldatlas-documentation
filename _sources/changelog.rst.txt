Changelog
=========

0.1.0 — 2026-07-20
------------------

- Rebuilt the project from scratch around a standard-library runtime and one
  generated SQLite database.
- Added lookup, aliases, standard identifiers, and UN regions for 248 countries
  and areas.
- Added 241 primary-capital records and 6,265 major-city records from GeoNames,
  with explicit missing values for areas without usable capitals.
- Added a separate deterministic source-ingestion project with raw manifests,
  normalized records, provenance, validation, and reproducibility checks.
- Added clean-wheel installation tests, executable examples, and documentation
  generated from the installed wheel.
- Added a comprehensive VS Code playground that audits every exposed record.
- Added a polished, source-owned Sphinx documentation experience.

Legacy releases
---------------

Versions 0.0.1 through 0.0.12 belong to the legacy prototype. PyPI retains their
release history, while 0.1.0 begins the new source-aware architecture.
