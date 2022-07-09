# CHIP-2 reference

## How to install the demo browser extension

1. Open a terminal. Clone this repository.  
```shell
cd /tmp/repos # Or whatever you want
git clone https://github.com/ChiaMineJP/chip2-reference   
```
2. Open Chrome browser. Open extension page as the following image.  
<img src='https://github.com/ChiaMineJP/chip2-reference/blob/cc4336ec4044656044a8e0acbe1b4851f04f0ccc/web_ext/docs/images/install-extension-1.png?raw=true' alt='' width='600' />
3. Enable developer mode  
<img src='https://github.com/ChiaMineJP/chip2-reference/blob/cc4336ec4044656044a8e0acbe1b4851f04f0ccc/web_ext/docs/images/install-extension-2.png?raw=true' alt='' width='800' />
4. Click "Load unpacked"  
<img src='https://github.com/ChiaMineJP/chip2-reference/blob/cc4336ec4044656044a8e0acbe1b4851f04f0ccc/web_ext/docs/images/install-extension-3.png?raw=true' alt='' width='400' />
5. Select `Parent-of-github-repos/chip2-reference/web_ext/src`.  
<img src='https://github.com/ChiaMineJP/chip2-reference/blob/cc4336ec4044656044a8e0acbe1b4851f04f0ccc/web_ext/docs/images/install-extension-4.png?raw=true' alt='' width='800' />
6. Now, when you open a new page, JavaScript on that page can access to `window.chia` API.
