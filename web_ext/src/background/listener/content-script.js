function onMessageFromContentScript(message, sender, sendResponse){
  if(
    sender.id !== chrome.runtime.id
    || !message
    || typeof message !== "object"
    || !sender.tab
    || !sender.tab.id
  ){
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
    
    const method = APIs[methodName];
    if(!method){
      sendResponse({
        error: `Unknown method ${methodName}. Available APIs are ${Object.keys(APIs).join(", ")}`,
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
        // Since by the `Structured Clone Algorithm` cannot preserve `Error` instance,
        // here extract information from `Error` and compose error string.
        if(error instanceof Error){
          error = `${error.name}\r\n${error.message}`;
        }
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
  else if(message.type === "register" || message.type === "unregister"){
    if(!message.data || typeof message.data !== "object" || !message.data.name || typeof message.data.name !== "string"){
      sendResponse({
        error: "name must be present",
        data: null,
      });
      return;
    }
    
    const {name} = message.data;
    if(message.type === "register"){
      stateManager.addListenerTab(name, sender.tab.id);
    }
    else{
      stateManager.removeListenerTab(name, sender.tab.id);
    }
    sendResponse({
      error: null,
      data: "ok",
    });
  }
}
