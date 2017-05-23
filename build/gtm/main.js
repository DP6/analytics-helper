;(function () {
  var helper = {};
  var options = {
    helperName: 'analyticsHelper',
    debug: false,
    containerID: '',
    customNamePageview: 'ga_pageview',
    customNameEvent: 'ga_event'
  };

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
  
  /**
   * Documentation for principal function of this helper
   * @param {*} tagName 
   * @param {*} callback 
   * @param {*} immediate 
   */
  function scope (id, callback, immediate) {
    var safe = function() {
      try {
        callback(helper);
      } catch ($$e) {
        if (console && typeof console.error === 'function')
          console.error(id, $$e);
      }
    };
    return immediate === false ? safe : safe();
  }

  window[options.helperName] = {
    scope: scope
  };
}());