/**
 * Verifica se determinado elemento satisfaz dado seletor.
 * @param {*} elm Elemento pai
 * @param {*} selector Seletor
 */
function match (elm, seletor) {
  if (typeof jQuery === "function") return jQuery(elm).is(seletor);
  var elms = elm.parentNode.querySelectorAll(seletor);

  for (var i = 0; i < elms.length; i++) {
    if (elms[i] === elm) {
      return true;
    }
  }
  return false;
}

/**
 * Procura, a partir de dado elemento, pelo elemento pai mais próximo 
 * a ele que satisfaça dado seletor. Caso não haja, retorna undefined.
 * @param {*} elm Elemento inicial
 * @param {*} selector Seletor
 */
function closest (elm, seletor) {
  if (typeof jQuery === "function") return jQuery(elm).closest(seletor)[0];
  var parent = elm.parentNode;

  while (parent != document) {
    if (this.match(parent, seletor)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return undefined;
}
helper.match = match;
