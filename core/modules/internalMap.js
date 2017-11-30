function internalMap(elms, func, exArgs){
  var ret = [];
  var elm, args;
  for(var index = 0; index < elms.length; index++){
    elm = elms[index];
    if (elm instanceof HTMLElement === false) throw 'internalMap: Esperado elemento HTML';
    args = [elm].concat(exArgs);
    ret.push(func.apply(this, args));
  }
  return ret;
}