function internalMap(elms, func, exArgs) {
  var returnList = [];
  for (var index = 0; index < elms.length; index++) {
    var args = [elms[index]].concat(exArgs);
    returnList.push(func.apply(this, args));
  }
  return returnList;
}