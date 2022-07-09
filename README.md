# CHIP-2 reference

## How to install the demo browser extension

1. Open a terminal. Clone this repository.  
```shell
cd /tmp/repos # Or whatever you want
git clone https://github.com/ChiaMineJP/chip2-reference   
``` 
2. Open Chrome browser. Open extension page as the following image.  
<img src="./web-ext/docs/images/install-extension-1.png" alt="" width="200" />
3. Enable developer mode  
<img src="./web-ext/docs/images/install-extension-2.png" alt="" width="200" />
4. Click "Load unpacked"  
<img src="./web-ext/docs/images/install-extension-3.png" alt="" width="100" />
5. Select `<git repos parent>/chip2-reference/web_ext/src`.
<img src="./web-ext/docs/images/install-extension-3.png" alt="" width="200" />
6. Now, when you open a new page, JavaScript on that page can access to `window.chia` API.
