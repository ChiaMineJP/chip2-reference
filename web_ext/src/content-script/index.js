const browserWalletName = "chia-wallet";
const dAppOriginName = "chia-dApp";

window.onload = onLoadWindow;

async function onLoadWindow(){
  createServer();
  injectPageScript();
}

function injectPageScript(){
  const scriptEl = document.createElement("script");
  scriptEl.src = chrome.runtime.getURL("content-script/inject.js");
  scriptEl.onload = function(){
    this.remove();
  }
  document.head.appendChild(scriptEl);
}

function createServer(){
  window.addEventListener("message", async function onMessageFromPage(event){
    if(!event || typeof event !== "object" || typeof event.data !== "object" || !event.data){
      return;
    }
  
    const req = event.data;
    if(!req || req.origin !== dAppOriginName || req.to !== browserWalletName){
      return;
    }
    else if(!req.data || typeof req.data !== "object"){
      console.error("data property is invalid");
      return;
    }
    else if(!req.data.method){
      console.error("Name of method should be empty");
      return;
    }
  
    const {method: methodName, params} = req.data;
    chrome.runtime.sendMessage({method: methodName, params}, function(responseFromBackground){
      const {error, data} = responseFromBackground;
      if(error){
        const errorResponse = {
          type: "response",
          requestId: req.requestId,
          to: dAppOriginName,
          origin: browserWalletName,
          data: null,
          error: error,
        };
    
        window.postMessage(errorResponse);
        return;
      }
  
      const response = {
        type: "response",
        requestId: req.requestId,
        to: dAppOriginName,
        origin: browserWalletName,
        data: data,
        error: null,
      };
      
      window.postMessage(response);
    });
  });
}
