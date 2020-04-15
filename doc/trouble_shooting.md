# Troubleshooting
[NVM](#nvm)

---
## NVM

- If you get this message: 'Couldn't find the `node` binaray',  
 You should create symbolic link file in `/usr/local/bin`.
    
    Actually I manage node using `nvm`, so I just did:  
    ```shell  
      sudo ln -s `which node` /usr/local/bin/node  
    ```
