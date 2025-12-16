# Customise keywords

You can change the Alfred keyword used to trigger each JetBrains product from the workflow’s configuration panel.

### How to change

1. Open Alfred Preferences.
2. Go to Workflows → _JetBrains - Open project_.
3. Click _Configure Workflow..._ (top‑left) to open the user configuration panel.
4. Edit the field for the product you want to change, e.g. “Keyword to trigger PhpStorm.”
   - Leave the field empty to disable that product in the workflow.
5. Close the panel — changes are saved automatically.

Only one keyword per product is supported. Keep your keywords unique to avoid conflicts with other products or workflows.

### Default keywords

- Android Studio: `studio`
- AppCode: `appcode` (sunset by JetBrains; no further support here)
- Aqua: `aqua`
- CLion / CLion Nova: `clion` (defaults to CLion “Standard” unless you change the edition; see the [Edition customization](/doc/customisation/edition.md) doc)
- DataGrip: `datagrip`
- DataSpell: `dataspell`
- Fleet: `fleet`
- GoLand: `goland`
- IntelliJ IDEA: `idea` (defaults to Community Edition; can be changed via [Edition customization](/doc/customisation/edition.md))
- PhpStorm: `pstorm`
- PyCharm: `pycharm` (defaults to Community Edition; can be changed via [Edition customization](/doc/customisation/edition.md))
- Rider: `rider`
- RubyMine: `rubymine`
- RustRover: `rustrover`
- WebStorm: `wstorm`
- Writerside: `writerside`

### Tips

- Use short, memorable keywords (lower‑case letters and numbers are safest).
- If a keyword doesn’t respond, ensure it isn’t used by another Alfred workflow.

### Examples

- Prefer `ij` for IntelliJ: set IntelliJ keyword to `ij` → open with “ij <project name>”.
- Disable RubyMine: clear the RubyMine keyword field.
