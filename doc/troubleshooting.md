# Troubleshooting

* [NVM](#nvm)

---

## NVM

If you get this message: "Couldn't find the `node` binary".
It's maybe du to non existing node version available globally.
You should create symbolic link file in your PATH (eg: `/usr/local/bin`):
```shell  
$ sudo ln -s $(which node) /usr/local/bin/node
```
