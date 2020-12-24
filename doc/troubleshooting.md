# Troubleshooting

- ["Can't find application path for xxx"](#cant-find-application-path-for)
- [NVM](#nvm)
- [Weird](#weird)

---

## Can't find application path for

If you get the message "Can't find application path for <Product Name>".

Try to check the following steps:

- Shell script exists in your `$PATH`?
- Shell script works via command line?

If every works fine please, add the content of your bin in the issue (`cat $(which <shell_script>)`)

## NVM

If you get this message: "Couldn't find the `node` binary".
It's maybe du to non existing node version available globally.

You should create symbolic link file in your PATH (eg: `/usr/local/bin`):

```shell
$ sudo ln -s $(which node) /usr/local/bin/node
```

## Weird

Sometimes (after an upgrade or for no real reason) workflow stop working...

So, try to reinstall workflow
```shell
npm uninstall -g @bchatard/alfred-jetbrains
rm -rf /usr/local/lib/node_modules/@bchatard/alfred-jetbrains
npm install -g @bchatard/alfred-jetbrains
```

(related [#110](https://github.com/bchatard/alfred-jetbrains/issues/110) ; [#188](https://github.com/bchatard/alfred-jetbrains/issues/188))
