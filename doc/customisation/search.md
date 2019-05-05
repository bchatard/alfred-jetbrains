# Search

### How-to

1. Create a JSON file somewhere
2. This JSON file need to follow the same structure of [Fuse.js](https://fusejs.io/).
3. Open the workflow, and go to the workflow configuration window (the icon like this [x])
4. Add new environment variable:
   - name: `jb_search_customisation_file`
   - value: the path to your JSON file (relative to your home - ex: `/.config/alfred-jetbrains/search.json`)

Example:

```json
{
  "keys": [
    { "name": "title", "weight": 1 },
    { "name": "subtitle", "weight": 0.1 }
  ]
}
```
