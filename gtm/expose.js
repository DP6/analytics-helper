function expose() {
  if (window[options.helperName] && !options.overwriteHelper) return;
  window[options.helperName] = helper;
}

expose();
