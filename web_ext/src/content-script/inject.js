window.chia = function(){
  const browserWalletName = "chia-wallet";
  const dAppOriginName = "chia-dApp";
  const requestSessions = {};
  const eventListeners = {}; // {[name]: Array<eventHandler>}
  
  this.request = function request(method, params){
    return new Promise(function(resolve, reject){
      const requestId = getUniqueId();
      const requestData = {
        type: "request",
        requestId,
        origin: dAppOriginName,
        to: browserWalletName,
        data: {method, params},
      };
      requestSessions[requestId] = {
        requesting: true,
        error: null,
        requestedAt: Date.now(),
        respondedAt: null,
        requestData: requestData,
        responseData: null,
        callback: function(error, data){
          return error ? reject(error) : resolve(data);
        },
      };
      window.postMessage(requestData);
    });
  }
  
  this.on = function on(name, listener){
    if(typeof name !== "string" || !name || typeof listener !== "function"){
      return;
    }
    
    if(!eventListeners[name]){
      eventListeners[name] = [];
    }
    
    eventListeners[name].push(listener);
    
    window.postMessage({
      type: "register",
      origin: dAppOriginName,
      to: browserWalletName,
      data: {name: name},
    });
  }
  
  this.off = function off(name, listener){
    if(typeof name !== "string" || !name || typeof listener !== "function" || !eventListeners[name]){
      return;
    }
    
    const index = eventListeners[name].findIndex(function(el){
      return el === listener;
    });
    if(index > -1){
      eventListeners[name].splice(index, 1);
    }
  }
  
  window.addEventListener("message", function(event){
    const responseData = event.data;
    if(!responseData
      || typeof responseData !== "object"
      || responseData.origin !== browserWalletName
      || responseData.to !== dAppOriginName
    ){
      return;
    }
    
    if(responseData.type === "event"){
      const {name, args} = responseData.data;
      const listeners = eventListeners[name];
      if(listeners){
        for(const listener of listeners){
          try{
            listener.apply(listener, args);
          }
          catch(e){
            console.error("Event listener failed", e);
          }
        }
      }
    }
    else if(responseData.type === "response"){
      const {requestId} = responseData;
      const session = requestSessions[requestId];
      if(!session){
        return;
      }
  
      session.respondedAt = Date.now();
      session.requesting = false;
      session.responseData = responseData;
      session.callback(responseData.error, responseData.data);
  
      // @TODO Do something for `session`. Discard or log something from it.
  
      delete requestSessions[requestId];
    }
  });
  
  function getUniqueId(){
    let id = "";
    do {
      // @TODO Don't use this function in production. Please replace with more robust and efficient code.
      id = Math.random().toString().replace(/^0+\./, "");
    } while(requestSessions[id])
    
    return id;
  }
  
  return this;
}.call({});
