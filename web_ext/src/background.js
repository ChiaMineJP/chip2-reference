try{
  importScripts(
    "background/const.js",
    "background/types.js",
    "background/util.js",
    "background/StateManager.js",
    "background/api.js",
    "background/listener/action.js",
    "background/listener/content-script.js",
    "background/main.js",
  )
} catch(e){
  console.error(e);
}
