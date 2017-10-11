
/**
 *Executa um callback ao executar algum evento 
 *em um elemento HTML específico.
 * @param {*} event Evento que ira executar o callback, exemplos: 
 *'mousedown', 'click'.
 * @param {*} selector Seletor CSS que irá buscar os elementos 
 *que executarão o callback no disparo do evento.
 * @param {*} callback Função executada no disparo do evento.
 */
function on (event, selector, callback) {
  if (typeof jQuery === "function") {
    var elem = jQuery(selector);
    if (typeof elem.on === "function") {
      return elem.on(event, callback);
    } else if (typeof elem.bind === "function") {
      return elem.bind(event, callback);
    }
  }

  var array;
  if(typeof selector === "string") {
    array = document.querySelectorAll(selector);
  } else if(typeof selector.length === "undefined" || selector === window) {
    /* window pode ser um Array de frames, caso em que não queremos que seja iterado */
    array = [selector];
  } else {
    array = selector;
  }

  for (var count = 0; count < array.length; count++) {
    var elm = array[count];
    if (typeof elm.addEventListener === "function") {
      elm.addEventListener(event, callback);
    } else {
      elm.attachEvent("on" + event, callback);
    }
  }
}

/**
 *Executa um callback ao executar algum evento 
 *em um elemento HTML específico que possa estar 
 *inicialmente oculto ou se ocultar em uma página responsiva.
 * @param {*} event Evento que ira executar o callback, exemplos: 
 *'mousedown', 'click'.
 * @param {*} selector Seletor CSS que irá buscar os elementos 
 *que executarão o callback no disparo do evento.
 * @param {*} handler Função executada no disparo do evento.
 * @param {*} parent elemento presente inicialmente na página 
 *e que não é ocultado. Defaut é o document da página.
 */
function delegate (event, selector, handler, parent) {
  if (typeof jQuery === "function") {
    var elem = jQuery(parent || document);
    if (typeof elem.on === "function") {
      return elem.on(event, selector, handler);
    } else if (typeof elem.delegate === "function") {
      return elem.delegate(selector, event, handler);
    }
  }
  if (typeof document.addEventListener === "function") {
    var method = "addEventListener";
  } else {
    var method = "attachEvent";
    event = "on" + event;
  }
  (parent || document)[method](event, function (e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      // loop parent nodes from the target to the delegation node
      if (match(target, selector)) {
        handler.call(target, e);
        break;
      }
    }
  }, false);
}
helper.on = on;
