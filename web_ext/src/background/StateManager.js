const stateManager = new StateManager();

function StateManager(){
  let _chainId = "";
  let listeningTabs = {}; // {[name]: Set<tab.id>}
  
  this.getChainId = function(){
    return _chainId;
  }.bind(this);
  
  this.setChainId = function(chainId){
    _chainId = chainId;
    this.triggerEvent(events.chainChanged, [_chainId]);
  }.bind(this);
  
  this.addListenerTab = function(name, tabId){
    if(!listeningTabs[name]){
      listeningTabs[name] = new Set();
    }
    listeningTabs[name].add(tabId);
  }.bind(this);
  
  this.removeListenerTab = function(name, tabId){
    if(name){
      const tabs = listeningTabs[name];
      tabs.delete(tabId);
      return;
    }
    
    for(const tabs of Object.values(listeningTabs)){
      tabs.delete(tabId);
    }
  }.bind(this);
  
  this.triggerEvent = function(name, argsForListenerFunction){
    if(!Array.isArray(argsForListenerFunction)){
      console.error("argsForListenerFunction must be an array of arguments passed to event listener function");
      return;
    }
    
    const tabIds = listeningTabs[name];
    if(!tabIds || !tabIds.size){
      return;
    }
    for(const tabId of tabIds){
      const message = {
        type: "event",
        data: {
          name: name,
          args: argsForListenerFunction,
        },
      };
      chrome.tabs.sendMessage(tabId, message);
    }
  }.bind(this);
  
  return this;
}
