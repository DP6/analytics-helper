  function on(id, event, selector, oldCallback, parent) {
    var count, array, elm, callback;

    if (parent) return delegate(id, event, selector, oldCallback, parent);

    if (typeof jQuery === "function") {
      elm = jQuery(selector);
      callback = safeFn(id, oldCallback, {
        event: event,
        selector: selector,
        immediate: false
      });
      if (typeof elm.on === "function") {
        return elm.on(event, callback);
      } else if (typeof elm.bind === "function") {
        return elm.bind(event, callback);
      }
    }

    if (typeof selector === "string") {
      array = document.querySelectorAll(selector);
    } else if (typeof selector.length === "undefined" || selector === window) {
      array = [selector];
    } else {
      array = selector;
    }

    for (count = 0; count < array.length; count++) {
      elm = array[count];
      callback = safeFn(id, oldCallback, {
        event: event,
        selector: selector,
        immediate: false
      });
      if (typeof elm.addEventListener === "function") {
        elm.addEventListener(event, callback);
      } else {
        elm.attachEvent("on" + event, callback);
      }
    }
  }