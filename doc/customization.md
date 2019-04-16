# Customization

Some customization can be made:

- change shell script name (aka `bin`)
- change product _Preferences_ folder name (not recommended)

### How-to

1. Create a JSON file somewhere
2. This JSON file need to follow the same structure of the _[original configuration file](https://github.com/bchatard/alfred-jetbrains/blob/master/src/products.json)_ (same key).
3. Open the workflow, and go to the workflow configuration window (the icon like this [x])
4. Add new environment variable:
   - name: `jb_product_customisation_file`
   - value: the path to your JSON file (relative to your home - ex: `/.config/alfred-jetbrains/custom.json`)

Examples:

- Change `bin` name for PhpStorm

```json
{
  "PhpStorm": {
    "bin": "pstorm"
  }
}
```

- Change preferences for PyCharm from Professional (default) to Community:

```json
{
  "PyCharmPro": {
    "preferences": "PyCharmCE"
  }
}
```
