function init(opt_options) {
  window[options.helperName] = undefined;
  options = merge(options, opt_options);
  window[options.helperName] = window[options.helperName] || {};
  window[options.helperName].options = options;
  expose();
}