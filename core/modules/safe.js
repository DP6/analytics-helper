
/**
 * Função recomendada para portar todo o código de uma TAG.
 *caso aconteça algum erro, será reportado um erro no 
 *console com o nome da TAG.
 * @param {*} id nome da Tag
 * @param {*} callback função a ser executada dentro da safeFn
 * @param {*} immediate caso false, retorna a função ao invés 
 *de executar
 */
function safeFn (id, callback, immediate) {
    var safe = function() {
      try {
        callback(window[options.helperName], window.jQuery);
      } catch ($$e) {
        if (console && typeof console.error === 'function')
          console.error(id, $$e);
      }
    };

    return immediate === false ? safe : safe();
}
helper.safe = safe;
