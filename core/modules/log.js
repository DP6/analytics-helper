function log(type, info) {
  if (options.debug && typeof getKey('console.' + type) === 'function') {
    console[type](info);
  }
}