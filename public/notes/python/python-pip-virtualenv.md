# PIP and Virtual Environment

> Package management

## pip Commands

```bash
pip install package         # Install
pip install -r reqs.txt  # From requirements
pip install package==1.0  # Specific version
pip list                 # List installed
pip show package         # Show info
pip uninstall package    # Uninstall
pip freeze > reqs.txt    # Export
```

## Requirements File

```
package1>=1.0
package2==2.0
package3
```

## Virtual Environment

```bash
python -m venv myenv

# Activate
source myenv/bin/activate     # Linux/Mac
myenv\Scripts\activate      # Windows
```

## pyproject.toml

```toml
[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.build_meta"

[project]
name = "mypackage"
version = "1.0.0"
dependencies = ["flask>=2.0"]
```

## poetry

```bash
poetry init
poetry add package
poetry install
```

## pipenv

```bash
pipenv install
pipenv run python script.py
```