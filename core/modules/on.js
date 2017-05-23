
/**
 * Documentation for function
 * @param {*} event 
 * @param {*} selector 
 * @param {*} callback 
 */
function on (event, selector, callback) {
  // TODO
  callback(document.querySelector(selector));
}
helper.on = on;