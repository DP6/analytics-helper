function delegate(id, event, selector, oldHandler, parent) {
  if (typeof jQuery === "function") {
    var elm = jQuery(parent || document);
    var handler = safeFn(id, oldHandler, {
      event: event,
      selector: selector,
      immediate: false
    });
    if (typeof elm.on === "function") {
      return elm.on(event, selector, handler);
    } else if (typeof elm.delegate === "function") {
      return elm.delegate(selector, event, handler);
    }
  }

  var method;

  if (typeof parent === 'string') {
    parent = document.querySelectorAll(parent);
  }

  if (typeof document.addEventListener === "function") {
    method = "addEventListener";
  } else {
    method = "attachEvent";
    event = "on" + event;
  }

  function handler(e) {
    for (var target = e.target; target && target != this; target = target.parentNode) {
      if (matches(target, selector)) {
        var handler = safeFn(id, oldHandler, {
          event: event,
          selector: selector,
          immediate: false
        });
        handler.call(target, e);
        break;
      }
    }
  }

  if (Object.prototype.toString.call(parent) === '[object NodeList]') {
    for (var parentIndex = 0; parentIndex <= parent.length - 1; parentIndex++) {
      (parent[parentIndex] || document)[method](event, handler, false);
    }
  } else {
    (parent || document)[method](event, handler, false);
  }
}