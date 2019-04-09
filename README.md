JetBrains: Open project
========================

__Alfred3__ workflow to easily open your projects with your favorite JetBrains product.


## Requirements
You need [Node.js 8+](https://nodejs.org) and [Alfred 3.5+](https://www.alfredapp.com) with the paid [Powerpack](https://www.alfredapp.com/powerpack/) upgrade.

This workflow need one of JetBrains products (__2019.1+__), and its [shell script](#init-shell-script) to works


## Installation / Update
```shell
$ npm install -g @bchatard/alfred-jetbrains
```

Thanks to [Alfy](https://github.com/sindresorhus/alfy) and [alfred-notifier](https://github.com/SamVerschueren/alfred-notifier), you will be notify when a new version is available.

You can also install [alfred-updater](https://github.com/SamVerschueren/alfred-updater) to update all your "Alfy Workflow".

### Init shell script
* Via JetBrains Toolbox:
    * Open the JetBrains Toolbox window, and then click on the parameter icon;
    * In the following form, enable _Generate shell scripts_, and set a path for script
    * More info: [Toolbox App 1.11: What’s New.](https://blog.jetbrains.com/blog/2018/08/23/toolbox-app-1-11-whats-new/)
* Via Product
    * [Help welcomed](https://github.com/bchatard/alfred-jetbrains/issues/1)


## How to use
* Open Alfred with your usual hotkey
* Type keyword (example `pstorm`) followed by your project name
![jetbrains-projects-secret-light](https://raw.githubusercontent.com/bchatard/alfred-jetbrains/master/doc/img/jetbrains-projects-secret-light.png)


### Default Keywords
 * AppCode: `appcode`;
 * CLion: `clion`;
 * DataGrip: `datagrip`;
 * GoLand: `goland`;
 * IntelliJ Idea: `idea`;
 * PhpStorm: `pstorm`;
 * PyCharm: `pycharm`;
 * WebStorm: `wstorm`;
 * Rider: [Help wanted](https://github.com/bchatard/alfred-jetbrains/issues/5);
 * RubyMine: `rubymine`;


### Supported versions
I test with this products/versions:

* AppCode: 2019.1;
* CLion: 2019.1;
* DataGrip: 2019.1;
* GoLand: 2019.1;
* IntelliJ Idea CE: 2019.1;
* PhpStorm: 2019.1;
* PyCharm: 2019.1;
* WebStorm: 2019.1;
* RubyMine: 2019.1;

v2018.3 works if you generate shell script through Toolbox (it works for me for PhpStorm)

For other versions:
* Very old PhpStorm (and only PhpStorm), you can use my first workflow: [PhpStorm Alfred Workflow](https://github.com/bchatard/phpstorm-alfred-workflow)
* Prior 2019, you can use my previous workflow: [JetBrains Alfred Workflow](https://github.com/bchatard/jetbrains-alfred-workflow)


## JetBrains Actions
With keyword `jb` you can access to some actions for this workflow.


### Clean Projects Cache
Some information are cached for better performance. You can change cache lifetime (see [environment variable](#workflow-environment-variables)). This command flush all cache.


## Customisation
> @todo

## Known issue
It's an early version


## Workflow Environment Variables
* `jb_product_cache_lifetime`: cache lifetime in seconds for "product data" (application path, bin path etc) [default: 86400 seconds]
* `jb_project_cache_lifetime`: cache lifetime in seconds for project list (one cache per app) [default: 3600 seconds]


## Changelog
[Changelog](https://github.com/bchatard/alfred-jetbrains/releases)


## License
[MIT](LICENSE) © [bchartard](https://github.com/bchatard)
