function prepareButton(){
  // Set page jump button behaviour.
  // When there are tabs which shows a specific page, jump to the page
  // on button click. Otherwise, it creates a new tab for the page and jump to it.
  const buttonEl = document.querySelector("#jump-button");
  buttonEl.addEventListener("click", () => {
    chrome.tabs.query({
      url: ["https://github.com/ChiaMineJP/chip2-reference"],
    }, (tabs) => {
      if(tabs.length > 0){
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {active: true});
      }
      else{
        chrome.tabs.create({url: "https://github.com/ChiaMineJP/chip2-reference"});
      }
    });
  });
}

function prepareChainSelector(){
  const selectEl = document.getElementById("chainId-selector");
  const optionsEl = selectEl.querySelectorAll("option");
  let prevValue = "";
  
  function changeSelected(value){
    chrome.runtime.sendMessage({
      method: "setChainId",
      params: {chainId: value},
    });
    
    optionsEl.forEach(optionEl => {
      if(optionEl.value === value){
        optionEl.setAttribute("selected", "true");
      }
      else{
        optionEl.removeAttribute("selected");
      }
    });
  }
  
  selectEl.onchange = function(event){
    const newValue = event.currentTarget.value;
    changeSelected(newValue);
    prevValue = newValue;
  };
  
  const getChainIdRequest = {
    method: "getChainId",
  };
  chrome.runtime.sendMessage(getChainIdRequest, function(responseFromBackground){
    const {error, data} = responseFromBackground;
    if(error){
      console.error(error);
      return;
    }
    const {chainId} = data;
    changeSelected(chainId);
  });
}
