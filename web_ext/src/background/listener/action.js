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
  
  if(methodName === "getChainId"){
    const chainId = stateManager.getChainId();
    sendResponse({
      error: null,
      data: {chainId},
    });
  }
  if(methodName === "setChainId"){
    if(typeof params === "object" && params){
      stateManager.setChainId(params.chainId);
    }
    return;
  }
}
