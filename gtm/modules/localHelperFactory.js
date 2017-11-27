function localHelperFactory(id, args) {
  return {
    event: function(category, action, label, value, object) {
      return event(category, action, label, value, object, id);
    },
    pageview: function(path, object) {
      return pageview(path, object, id);
    },
    safeFn: function(id, callback, opt) {
      return safeFn(id, callback, opt);
    },
    on: function(event, selector, callback, parent) {
      return on(id, event, selector, callback, parent);
    },
    wrap: function(elm, func, params) {
      if (typeof elm === 'string') {
        elm = document.querySelectorAll(elm);
      }

      if (func && typeof func === 'function') {
        return internalMap(elm, func, params);
      }

      if (typeof elm === 'object' && (elm instanceof HTMLElement || elm instanceof NodeList)) {
        return {
          hasClass: function(className) {
            if (elm instanceof NodeList) {
              return internalMap(elm, hasClass, [className]);
            } else {
              return hasClass(elm, className);
            }
          },
          matches: function(selector) {
            if (elm instanceof NodeList) {
              return internalMap(elm, matches, [selector]);
            } else {
              return matches(elm, selector);
            }
          },
          closest: function(selector) {
            if (elm instanceof NodeList) {
              return internalMap(elm, closest, [selector]);
            } else {
              return closest(elm, selector);
            }
          },
          text: function(opt) {
            if (elm instanceof NodeList) {
              return internalMap(elm, text, [opt]);
            } else {
              return text(elm, opt);
            }
          },
          map: function(func, params) {
            return internalMap(elm, func, params);
          },
          nodes: elm
        };
      } else if (elm) {
        throw 'Esperado receber seletor, elmento HTML ou NodeList';
      }
      return null;
    },
    push: function(obj) {
      return push(obj, id);
    },
    sanitize: sanitize,
    getDataLayer: getDataLayer,
    cookie: cookie,
    getKey: getKey,
    id: id,
    args: args,
    fn: fn
  };
}