/**
 * Procura no atributo class de um dado elemento 
 * alguma classe que contenha determinado nome. 
 * Caso exista, retorna true caso haja e 
 * false caso contrário.
 * @param {*} e Elemento no qual se realiza a verificação
 * @param {*} className Classe para qual verifica-se a 
 * existência no elemento
 */
function hasClass (e, className) {
  if (e.className.indexOf(className) >= 0) {
    return true;
  }
  return false;
}

/**
 * Procura no atributo class de um dado elemento
 * alguma class que contenha determinado nome.
 * Caso exista, retorna a primeira class que 
 * satisfaça a busca, caso não exista retorna vazio.
 * @param {*} elm Elemento em cujo atributo se 
 * realiza a busca
 * @param {*} name Fragmento o qual deseja-se achar em 
 * alguma das classes do elemento
 */
function getFullClassName(elm, name) {
  var classes = elm.className.split(' ');

  for (var i = 0; i < classes.length; i++) {
    if (classes[i].indexOf(name) != - 1) {
      return classes[i];
    }
  }

  return "";
}
helper.hasClass = hasClass;
