## Issue Tracker

Here for the Issue tracker? Please find it here: [pyworldatlas-issue-tracker](https://github.com/jcari-dev/pyworldatlas-issue-tracker)

# pyworldatlas

**pyworldatlas** is a lightweight and comprehensive Python package that compiles detailed data about every country in the world. Whether you're building applications that require accurate global data or simply need quick access to country profiles, pyworldatlas provides an efficient and easy-to-use interface.

## Key Features

- Extensive country data including official names, population, geography, government, GDP, and more.
- Lightweight and efficient, ensuring fast access to country information.
- No external dependencies, making it easy to install and integrate into any Python project.
- Provides detailed country profiles in a simple dictionary format.

## Installation

You can install `pyworldatlas` from PyPI using pip:

```bash
pip install pyworldatlas
```

## Basic Usage

Once installed, using pyworldatlas is straightforward. Here's a quick example of how to fetch a country's profile:

```python
import pyworldatlas as pwa

atlas = pwa.Atlas()

# Fetch the profile of a country by name
profile = atlas.get_country_profile("Albania")

# Display the profile information
print(profile)
```

Example output:

```python
{
    "capital": {
        "name": "Tirana",
        "coordinates_degree_east": 19.49,
        "coordinates_degree_north": 41.19,
        "is_largest_city": True
    },
    "area": {
        "total_km2_including_disputed_territories": None,
        "total_km2_internationally_recognized": 28748.0,
        "water_percentage": 4.7
    },
    "driving_side": "Right",
    "calling_code": "355",
    "iso_3166_code": "AL",
    "internet_tld": ".al",
    "population": {
        "total": 2994667,
        "density_km2": 111.1,
        "date_year": 2011
    },
    "gini_index": {
        "value": 26.7,
        "year": 2005
    },
    "gdp": {
        "ppp_trillions": 0.025035,
        "ppp_per_capita": 7780.0,
        "nominal_total_trillions": 0.013292,
        "nominal_per_capita": 4131.0,
        "ppp_gdp_year": 2011,
        "nominal_gdp_year": 2011
    },
    "government": {
        "president": "Bajram Begaj",
        "prime_minister": "Edi Rama",
        "declaration_of_state_sovereignty": "1912-11-28",
        "other_leader_title": None,
        "other_leader": None,
        "government_type": "Parliamentary republic",
        "president_assumed_office": "2022-07-24",
        "prime_minister_assumed_office": "2013-09-15",
        "other_leader_assumed_office": None
    },
    "official_names": {
        "Albanian": "Republika e Shqipërisë",
        "English": "Republic of Albania"
    },
    "anthem": {
        "Albanian": "Himni i Flamurit",
        "English": "Hymn to the Flag"
    },
    "motto": {
        "Albanian": "Ti, Shqipëri, më jep nder, më jep emrin Shqiptar",
        "English": "You, Albania, give me honor, give me the name Albanian"
    },
    "religion": {
        "Islam": 50.67,
        "Christianity": 16.02,
        "Non-denominational": 13.83,
        "Atheism": 3.55,
        "Others": 0.15,
        "Undeclared": 15.77
    },
    "ethnic_groups": {
        "Albanians": 98.2,
        "Others": 1.8
    },
    "languages": {
        "official_languages": ["Albanian"],
        "recognized_languages": []
    },
    "currency": {
        "name": "Lek",
        "symbol": "L",
        "iso_code": "ALL"
    },
    "continent": "Europe",
    "timezones": {
        "UTC+1": {"DST": 1},
        "UTC+2": {"DST": 1}
    }
}

```

## Documentation

Comprehensive documentation is available, including examples, API references, and more. Visit the [pyworldatlas Documentation](https://jcari-dev.github.io/pyworldatlas-documentation/index.html) to get started.

## Contributing

If you'd like to contribute, please check out the [Contributing Page](https://jcari-dev.github.io/pyworldatlas-documentation/contributing.html) for details.

## License

This project is licensed under the MIT License. See the [LICENSE](https://jcari-dev.github.io/pyworldatlas-documentation/license.html) file for more information.

## Links

- [Documentation](https://jcari-dev.github.io/pyworldatlas-documentation/index.html)
- [PyPI Page](https://pypi.org/project/pyworldatlas/)
- [Issue Tracker](https://github.com/jcari-dev/pyworldatlas-issue-tracker)
