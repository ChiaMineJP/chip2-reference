const methods = {};
const stateManager = new StateManager();

chrome.runtime.onMessage.addListener(onMessage);

function onMessage(request, sender, sendResponse){
  if(isFromPopup(sender)){
    return onMessageFromPopup(request, sender, sendResponse);
  }
  return onMessageFromContentScript(request, sender, sendResponse);
}

function isFromPopup(sender){
  const popupUrl = `chrome-extension://${chrome.runtime.id}/popup/index.html`;
  return sender.url === popupUrl;
}

function onMessageFromPopup(request, sender, sendResponse){
  if(sender.id !== chrome.runtime.id){
    return;
  }
  
  if(!request || typeof request !== "object"){
    return;
  }
  
  const {method: methodName, params} = request;
  if(!methodName){
    console.error("Method name must be specified");
    return;
  }
  
  if(methodName === "setChainId"){
    if(typeof params === "object" && params){
      stateManager.setChainId(params.chainId);
    }
    return;
  }
}

function onMessageFromContentScript(message, sender, sendResponse){
  if(sender.id !== chrome.runtime.id){
    return;
  }
  
  if(!message || typeof message !== "object"){
    return;
  }
  
  if(message.type === "request"){
    if(typeof message.data !== "object" || !message.data){
      sendResponse({
        error: "Missing data property",
        data: null,
      });
      return;
    }
    
    const {method: methodName, params} = message.data;
    if(!methodName){
      sendResponse({
        error: "Method name must be specified",
        data: null,
      });
      return;
    }
  
    const method = methods[methodName];
    if(!method){
      sendResponse({
        error: `Unknown method ${methodName}. Available methods are ${Object.keys(methods).join(", ")}`,
        data: null,
      });
      return;
    }
  
    let returnedValue;
    try{
      returnedValue = method(params);
    }
    catch(e){
      sendResponse({
        error: e,
        data: null,
      });
      return;
    }
  
    if(isPromise(returnedValue)){
      returnedValue.then(function(resolvedValue){
        sendResponse({
          error: null,
          data: resolvedValue,
        });
      }).catch(error => {
        sendResponse({
          error: error,
          data: null,
        });
      });
      return true;
    }
  
    sendResponse({
      error: null,
      data: returnedValue,
    });
  }
  else if(message.type === "register"){
    if(typeof message.data !== "object" || !message.data){
      sendResponse({
        error: "Missing data property",
        data: null,
      });
      return;
    }
  
    const {name} = message.data;
    if(!name){
      sendResponse({
        error: "name must be present",
        data: null,
      });
      return;
    }
    
    
  }
}

function isPromise(target){
  return typeof target.then === "function";
}

function defineMethod(func_or_name, maybe_func = null){
  if(typeof func_or_name === "function"){
    if(!func_or_name.name){
      throw new Error("Function name is missing");
    }
    methods[func_or_name.name] = func_or_name;
    return;
  }
  else if(typeof func_or_name === "string" && typeof maybe_func === "function"){
    methods[func_or_name] = maybe_func;
    return;
  }
  throw new Error("Invalid arguments");
}

function StateManager(){
  let _chainId = "";
  
  this.getChainId = function(){
    return _chainId;
  };
  
  this.setChainId = function(chainId){
    _chainId = chainId;
  }
  
  this.onStateChanged = function(){
  
  }
  
  return this;
}

/**
 * @returns {string} - Return the current chainID
 */
defineMethod(async function chainId(params){
  //@TODO Not implemented yet
  return stateManager.getChainId();
});

/**
 * @returns {boolean} true if dAp has been approved
 */
defineMethod(async function connect(params){
  //@TODO Not implemented yet
  return true;
});

defineMethod(async function walletSwitchChain(params){
  //@TODO Not implemented yet
  const {chainId} = params;
  if(chainId !== "mainnet" || chainId !== "testnet10"){
    return;
  }
  stateManager.setChainId(chainId);
});
