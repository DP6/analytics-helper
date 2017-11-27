function on(id, event, selector, oldCallback, parent) {
  if (parent) {
    delegate(id, event, selector, oldCallback, parent);
  } else {
    var elm;
    var callback;
    if (typeof jQuery === "function") {
      elm = window.jQuery(selector);
      callback = safeFn(id, oldCallback, { isLocal: true, event: event, selector: selector, immediate: false, elm: elm });
      if (typeof elm.on === "function") {
        return elm.on(event, callback);
      } else if (typeof elm.bind === "function") {
        return elm.bind(event, callback);
      }
    }

    var array;
    if (typeof selector === "string") {
      array = document.querySelectorAll(selector);
    } else if (typeof selector.length === "undefined" || selector === window) {
      array = [selector];
    } else {
      array = selector;
    }

    for (var count = 0; count < array.length; count++) {
      elm = array[count];
      callback = safeFn(id, oldCallback, { isLocal: true, event: event, selector: selector, immediate: false, elm: elm });
      if (typeof elm.addEventListener === "function") {
        elm.addEventListener(event, callback);
      } else {
        elm.attachEvent("on" + event, callback);
      }
    }
  }
}