function main(){
  chrome.runtime.onMessage.addListener(function onMessage(request, sender, sendResponse){
    if(isFromPopup(sender)){
      return onMessageFromPopup(request, sender, sendResponse);
    }
    return onMessageFromContentScript(request, sender, sendResponse);
  });
  
  chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
    stateManager.removeListenerTab("", tabId);
  });
}

// entry point
main();
