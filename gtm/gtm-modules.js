/**
 * Documentation for function
 * @param {*} str 
 * @param {*} capitalized 
 */
function cookie(str, capitalized) {
  console.log('Cookie ugly for beautify');
}
helper.cookie = cookie;

/**
 * Documentation for function
 * @param {*} event 
 * @param {*} selector 
 * @param {*} callback 
 */
function on(event, selector, callback) {
  // TODO
  callback(document.querySelector(selector));
}
helper.on = on;

/**
 * Documentation for function
 * @param {*} str 
 * @param {*} capitalized 
 */
function sanitize(str, capitalized) {
  console.log('Sanitize to format with beautify');
}
helper.sanitize = sanitize;

function pageview() {

}
helper.pageview = pageview;