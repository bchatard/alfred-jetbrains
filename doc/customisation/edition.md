# Customise product Edition

JetBrains deliver different edition for some products (actually PyCharm and IntelliJIdea). This workflow works with a default edition for this case:

- for PyCharm, it's the Professional Edition
- for IntelliJIdea, it's the Ultimate Edition

If you work with a different edition you need to customise this workflow.

### How-to

1. Open the workflow, and go to the workflow configuration window (the icon like this [x])
2. Add new environment variable:
   - name: `jb_preferences_<product_key>`
   - value: the name of the preferences folder (see [available values](#available-preferences))

### Product keys

- PyCharm: `pycharm` (so environment variable will be `jb_preferences_pycharm`)
- IntelliJIdea: `intellijidea` (so environment variable will be `jb_preferences_intellijidea`)

### Available _Preferences_

- PyCharm
  - `PyCharm` for PyCharm Professional (default)
  - `PyCharmCE` for PyCharm Community
  - `PyCharmEdu` for PyCharm Edu
- IntelliJIdea
  - `IntelliJIdea` for IntelliJ Idea Ultimate Edition (default)
  - `IdeaIC` for IntelliJ Idea Community
  - `IdeaIE` for IntelliJ Idea Community Educational
