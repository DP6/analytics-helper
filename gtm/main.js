;(function () {
  var helper = {};
  //=require globalVars.js
  
  //=require initialization.js

  //=require gtm-modules.js
  
  /**
   * Objetivo da função é encapsular o tagueamento no GTM.
   * Utilizar o scoped no lugar de um try/catch
   * @param {*} tagName Nome da tag que está chamando a função  
   * @param {*} callback Função executada no escopo seguro do Helper
   * @param {*} immediate Se a função recebida no parâmetro callback
   * deve ser execurada imediatamente ou após o retorno de scoped
   */
  function scoped (tagName, callback, immediate) {
    var safe = function() {
      try {
        callback(helper);
      } catch ($$e) {
        if (console && typeof console.error === 'function')
          // TODO Data Quality
          console.error(tagName, $$e);
      }
    };
    return immediate === false ? safe : safe();
  }

  window.analyticsHelper = {
    scoped: scoped
  };
}());