function safeFn(id, callback, opt) {
  opt = opt || {};
  var safe = function() {
    try {
      callback.call(this === window ? null : this, localHelperFactory(id, arguments, {
        id: id,
        event: (opt.event || undefined),
        selector: (opt.selector || undefined)
      }));
    } catch ($$e) {
      if (!options.debug) {
        if (Math.random() <= options.errorSampleRate) {
          window[options.dataLayerName].push({
            event: options.exceptionEvent,
            dataQuality: {
              category: options.exceptionCategory,
              action: id,
              label: String($$e),
              event: (opt.event || undefined),
              selector: (opt.selector || undefined)
            }
          });
        }
      } else {
        var logObj = {
          exception: $$e,
          tag: id,
          event: (opt.event || undefined),
          selector: (opt.selector || undefined)
        }
        console.warn('Exception: ', logObj);
      }
    }
  };

  return opt.immediate === false ? safe : safe();
}