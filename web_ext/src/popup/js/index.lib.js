async function prepareButton(){
  // Set page jump button behaviour.
  // When there are tabs which shows a specific page, jump to the page
  // on button click. Otherwise, it creates a new tab for the page and jump to it.
  const button = document.querySelector("#jump-button");
  button.addEventListener("click", () => {
    chrome.tabs.query({
      url: ["https://github.com/ChiaMineJP/*"],
    }, (tabs) => {
      if(tabs.length > 0){
        const tab = tabs[0];
        chrome.tabs.update(tab.id, {active: true});
      }
      else{
        chrome.tabs.create({url: "https://github.com/ChiaMineJP"});
      }
    });
  });
}
