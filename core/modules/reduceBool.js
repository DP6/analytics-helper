function reduceBool(arr){
  for(var i = 0; i < arr.length; i++){
    var elm = arr[i];
    if(typeof elm === "boolean"){
      if(elm){
		return true;
      }
    } else {
      throw "Esperado boolean";
    }
  }
  return false;
}