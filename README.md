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

Now, when you open a new page, JavaScript on that page can access to `window.chia` API.  
Note: This is just a demo so no actual communication to chia-blockchain happens.  
If you're interested, you can develop actual intervention to chia-blockchain by updating content of https://github.com/ChiaMineJP/chip2-reference/blob/main/web_ext/src/background/api.js

## Demo
See https://github.com/ChiaMineJP/chip2-reference/blob/e92991b7fc0f8a4acf4dc523cfcb5135876f9fd8/web_ext/docs/images/demo-1.mp4  
Sorry, the file is 16MB and GitHub cannot play this mp4 directly. Just a 5 minutes instruction on how to install the demo extension and what can be tested with it.
