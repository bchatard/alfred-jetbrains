# Troubleshooting

- ["Can't find application path for xxx"](#cant-find-application-path-for)
- [NVM](#nvm)

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
