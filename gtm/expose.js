function expose() {
  window[options.helperName] = {
    scope: scope
  };
}