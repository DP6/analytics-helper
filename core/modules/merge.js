
/**
 * Utilizada como facilitadora para o merge
 * @param {*} obj 
 * @param {*} key 
 */
function has (obj, key) {
  return hasOwnProperty.call(obj, key);
}

/**
 * Responsável por mesclar objetos 
 * @param {*} obj Objeto inicial
 * @param {*} obj2 Objeto a ser incrementado caso não exista no obj
 */
function merge (obj, obj2) {
  if (obj2) {
    for (var key in obj2) {
      if (has(obj2, key)) {
        obj[key] = obj2[key];
      }
    }
  }
  return obj;
}