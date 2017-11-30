function reduceString(arr){
  var ret = '';
  for(var i = 0; i < arr.length; i++){
    var elm = arr[i];
    if(typeof elm === "string"){
      ret += elm;
    } else {
      throw "Esperado texto";
    }
  }
  return ret;
}