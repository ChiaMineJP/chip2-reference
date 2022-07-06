const browserWalletName = "chia-wallet";
const dAppOriginName = "chia-dApp";
const messageHandlers = {};

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
  window.addEventListener("message", onMessage);
}

async function onMessage(event){
  if(!event || typeof event !== "object" || typeof event.data !== "object" || !event.data){
    return;
  }
  
  const req = event.data;
  if(!req || req.origin !== dAppOriginName || req.to !== browserWalletName){
    return;
  }
  
  const {method: methodName, params} = req.data;
  const method = messageHandlers[methodName];
  if(!method){
    const errorResponse = {
      type: "response",
      requestId: req.requestId,
      to: dAppOriginName,
      origin: browserWalletName,
      data: null,
      error: `Unknown method ${methodName}. Available methods are ${Object.keys(messageHandlers).join(", ")}`,
    };
  
    window.postMessage(errorResponse);
    return;
  }
  
  const returnedValue = await method(params);
  const response = {
    type: "response",
    requestId: req.requestId,
    to: dAppOriginName,
    origin: browserWalletName,
    data: returnedValue,
    error: null,
  };
  window.postMessage(response);
}

function defineMessageHandler(func_or_name, maybe_func = null){
  if(typeof func_or_name === "function"){
    if(!func_or_name.name){
      throw new Error("Function name is missing");
    }
    messageHandlers[func_or_name.name] = func_or_name;
    return;
  }
  else if(typeof func_or_name === "string" && typeof maybe_func === "function"){
    messageHandlers[func_or_name] = maybe_func;
    return;
  }
  throw new Error("Invalid arguments");
}

defineMessageHandler(async function chainId(){
  return "testnetX";
});
