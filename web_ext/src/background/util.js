function defineMethod(func_or_name, maybe_func = null){
  if(typeof func_or_name === "function"){
    if(!func_or_name.name){
      throw new Error("Function name is missing");
    }
    APIs[func_or_name.name] = func_or_name;
    return;
  }
  else if(typeof func_or_name === "string" && typeof maybe_func === "function"){
    APIs[func_or_name] = maybe_func;
    return;
  }
  throw new Error("Invalid arguments");
}

function isPromise(target){
  return typeof target.then === "function";
}

function isFromPopup(sender){
  const popupUrl = `chrome-extension://${chrome.runtime.id}/popup/index.html`;
  return sender.url === popupUrl;
}
