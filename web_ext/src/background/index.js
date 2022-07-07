const methods = {};

chrome.runtime.onMessage.addListener(onMessageFromContentScript);

function onMessageFromContentScript(request, sender, sendResponse){
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
  
  const method = methods[methodName];
  if(!method){
    sendResponse({
      error: `Unknown method ${methodName}. Available methods are ${Object.keys(methods).join(", ")}`,
      data: null,
    });
    return;
  }
  const returnedValue = method(params);
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

defineMethod(async function chainId(){
  return "testnetX";
});
