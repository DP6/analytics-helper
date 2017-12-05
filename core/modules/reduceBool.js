function reduceBool(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) return true;
  }
  return false;
}