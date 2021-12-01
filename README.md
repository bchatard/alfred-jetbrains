# JetBrains: Open project

**Alfred3** & **Alfred4** workflow to easily open your projects with your favorite JetBrains product.

![npm version](https://img.shields.io/npm/v/@bchatard/alfred-jetbrains.svg?style=for-the-badge)
![npm downloads per week](https://img.shields.io/npm/dm/@bchatard/alfred-jetbrains.svg?style=for-the-badge)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=bchatard_alfred-jetbrains&metric=alert_status)](https://sonarcloud.io/dashboard?id=bchatard_alfred-jetbrains)

## Requirements

You need [Node.js 14+](https://nodejs.org) and [Alfred 4.6+](https://www.alfredapp.com) with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.

This workflow need one of JetBrains products (**2019.1+**), and its [shell script](#init-shell-script) to works

## Installation / Update

```shell
$ npm install -g @bchatard/alfred-jetbrains
```

Thanks to [Alfy](https://github.com/sindresorhus/alfy) and [alfred-notifier](https://github.com/SamVerschueren/alfred-notifier), you will be notified when a new version is available.

You can also install [alfred-updater](https://github.com/SamVerschueren/alfred-updater) to update all your "Alfy Workflow".

### Init shell script

- Via JetBrains Toolbox:
  - Open the JetBrains Toolbox window, and then click on the parameter icon;
  - In the following form, enable _Generate shell scripts_, and set a path for script
  - More info: [Toolbox App 1.11: What’s New.](https://blog.jetbrains.com/blog/2018/08/23/toolbox-app-1-11-whats-new/)
- Via Product
  ![Create Command-line Launcher](./doc/img/command_line_launcher.gif)

## How to use

- Open Alfred with your usual hotkey
- Type keyword (example `pstorm`) followed by your project name
  ![jetbrains-projects-secret-light](https://raw.githubusercontent.com/bchatard/alfred-jetbrains/master/doc/img/jetbrains-projects-secret-light.png)

<details>
<summary>Default Keywords</summary>

- AndroidStudio: `studio`;
- AppCode: `appcode`;
- CLion: `clion`;
- DataGrip: `datagrip`;
- GoLand: `goland`;
- IntelliJ Idea: `idea` (default to Ultimate Edition, see [customisation to change this](#customisation));
- PhpStorm: `pstorm`;
- PyCharm: `pycharm` (default to Professional Edition, see [customisation to change this](#customisation));
- WebStorm: `wstorm`;
- Rider: `rider`;
- RubyMine: `rubymine`;

</details>

<details>
<summary>Supported versions</summary>
I test with this products/versions:

- AndroidStudio: 3.+;
- AppCode: 2018.3 / 2019.+ / 2020.+;
- CLion: 2018.3 / 2019.+ / 2020.+;
- DataGrip: 2018.3 / 2019.+ / 2020.+;
- GoLand: 2018.3 / 2019.+ / 2020.+;
- IntelliJ Idea: 2018.3 / 2019.+ / 2020.+;
- PhpStorm: 2018.3 / 2019.+ / 2020.+;
- PyCharm: 2018.3 / 2019.+ / 2020.+;
- WebStorm: 2018.3 / 2019.+ / 2020.+;
- RubyMine: 2018.3 / 2019.+ / 2020.+;

For other versions:

- Very old PhpStorm (and only PhpStorm), you can use my first workflow: [PhpStorm Alfred Workflow](https://github.com/bchatard/phpstorm-alfred-workflow)
- Prior to 2019, you can use my previous workflow: [JetBrains Alfred Workflow](https://github.com/bchatard/jetbrains-alfred-workflow)

</details>

## Customisation

- [Change Product Edition](doc/customisation/edition.md)
- [Change `bin` name](doc/customisation/bin.md)

Some of JetBrains product are available in different editions (ex: PyCharm - Professional, Edu & Community).
In that case they share the same `bin` / `keyword`, so you need to customise the _Preferences_ folder to retrieve your projects.

- [Search](doc/customisation/search.md)

A search engine is used to retrieve relevant project. For some use cases, the default configuration is not optimal for you.

## JetBrains Actions

With keyword `jb` you can access to some actions for this workflow.

### Clean Projects Cache

Some information are cached for better performance. You can change cache lifetime (see [environment variable](#workflow-environment-variables)). This command flush all cache.

## Workflow Environment Variables

- `jb_product_cache_lifetime`: cache lifetime in seconds for "product data" (application path, bin path etc) [default: 86400 seconds]
- `jb_project_cache_lifetime`: cache lifetime in seconds for project list (one cache per app) [default: 3600 seconds]
- `jb_product_customisation_file`: path to JSON file for [product customisation](#customisation)
- `jb_search_customisation_file`: path to JSON file for [search customisation](#customisation)

## Changelog

[Changelog](https://github.com/bchatard/alfred-jetbrains/releases)

## License

[MIT](LICENSE) © [bchatard](https://github.com/bchatard)
