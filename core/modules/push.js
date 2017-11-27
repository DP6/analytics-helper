function push(obj, id) {
  var info = {
    'object': obj,
    'tag': id
  };
  if (options.debug) {
    log.info(info);
  }

  window[options.dataLayerName].push(obj);
}