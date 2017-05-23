;(function () {
  var helper = {};
  //=require options.js

  //=require gtm-modules.js
  
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