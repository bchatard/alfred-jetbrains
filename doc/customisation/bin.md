# Customise `bin` name

This workflow is shipped with "default" `bin` name for the different product. But if you change this default `bin`name, you need to update the workflow configuration.

### How-to

1. Create a JSON file somewhere (in your home folder)
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
    "bin": ["pstorm"]
  }
}
```
