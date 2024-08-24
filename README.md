
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
profile = atlas.get_country_profile("United States")

# Display the profile information
print(profile)
```

Example output:

```python
{
    'capital': {
        'name': 'Washington, D.C.',
        'coordinates_degree_east': -77.0369,
        'coordinates_degree_north': 38.9072,
        'is_largest_city': False,
    },
    'largest_city': {
        'name': 'New York City',
        'coordinates_degree_east': -74.0060,
        'coordinates_degree_north': 40.7128,
    },
    'driving_side': 'Right',
    'calling_code': '+1',
    'iso_3166_code': 'US',
    'internet_tld': '.us',
}
```

## Documentation

Comprehensive documentation is available, including examples, API references, and more. Visit the [pyworldatlas Documentation](https://jcari-dev.github.io/pyworldatlas-documentation/index.html) to get started.

## Contributing

Contributions are welcome! If you'd like to contribute, please check out the [Contributing Guide](https://jcari-dev.github.io/pyworldatlas-documentation/contributing.html) for details.

## License

This project is licensed under the MIT License. See the [LICENSE](https://jcari-dev.github.io/pyworldatlas-documentation/license.html) file for more information.

## Links

- [Documentation](https://jcari-dev.github.io/pyworldatlas-documentation/index.html)
- [PyPI Page](https://pypi.org/project/pyworldatlas/)
- [Issue Tracker](https://github.com/jcari-dev/pyworldatlas-issue-tracker)
