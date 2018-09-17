;(function () {
  'use strict';
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var jQuery = window.jQuery;
  var fn = {};
  var options = {
    helperName: 'analyticsHelper',
    dataLayerName: 'dataLayer',
    debug: ({{Debug Mode}} || false),
    waitQueue: true,
    containerId: ({{Container ID}} || ''),
    exceptionEvent: 'gtm_dataQuality_event',
    exceptionCategory: 'GTM Exception',
    customNamePageview: 'ga_pageview',
    customNameEvent: 'ga_event',
    customNameTiming: 'ga_timing',
    errorSampleRate: 1,
    gtmCleanup: function(gtmId) {
      helper.setDataLayer('ecommerce', undefined);
      helper.setDataLayer('noInteraction', undefined);
    }
  };
  var internal = {
    sentPageview: false
  };
  var helper = {
    internal: internal,
    init: init,
    pageview: pageview,
    event: event,
    timing: timing,
    sanitize: sanitize,
    getDataLayer: getDataLayer,
    setDataLayer: setDataLayer,
    cookie: cookie,
    getKey: getKey,
    safeFn: safeFn,
    fn: fn,
    options: options
  };
  function closest(elm, seletor) {
    if ('closest' in elm) return elm.closest(seletor);
    if (typeof jQuery === 'function') return jQuery(elm).closest(seletor)[0];
  
    var parent = elm.parentNode;
  
    while (parent != document) {
      if (matches(parent, seletor)) {
        return parent;
      }
      parent = parent.parentNode;
    }
    return undefined;
  }
  
  
  module.exports = closest;
  function getCookie(key) {
    key = ('; ' + key + '=');
    var cookie = ('; ' + document.cookie);
    var index = cookie.indexOf(key);
    var end;
    if (index === -1) {
      return '';
    }
    cookie = cookie.substring(index + key.length);
    end = cookie.indexOf(';');
    return window.unescape(end === -1 ? cookie : cookie.substring(0, end));
  }
  
  function setCookie(name, value, opts) {
    var exdate, cookie;
    opts = opts || {};
  
    cookie = name + "=" + window.escape(value);
    if (opts.exdays) {
      exdate = new Date();
      exdate.setDate(exdate.getDate() + opts.exdays);
      cookie += "; expires=" + exdate.toUTCString();
    }
    if (opts.domain) {
      cookie += "; domain=" + opts.domain;
    }
    cookie += "; path=" + (opts.path || '/');
    return (document.cookie = cookie);
  }
  
  function cookie(name, value, opts) {
    if (typeof value === 'undefined')
      return getCookie(name);
  
    return setCookie(name, value, opts);
  }
  
  module.exports = setCookie;
  module.exports = getCookie;
  module.exports = cookie;
  
  function delegate(id, event, selector, oldHandler, parent) {
    var method, elm, handler;
    if (typeof jQuery === "function") {
      elm = jQuery(parent || document);
      handler = safeFn(id, oldHandler, {
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
  
    if (typeof parent === 'string') {
      parent = document.querySelectorAll(parent);
    }
  
    if (typeof document.addEventListener === "function") {
      method = "addEventListener";
    } else {
      method = "attachEvent";
      event = "on" + event;
    }
  
    handler = function(e) {
      for (var target = e.target; target && target !== this; target = target.parentNode) {
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
    };
  
    if (Object.prototype.toString.call(parent) === '[object NodeList]') {
      for (var parentIndex = 0; parentIndex <= parent.length - 1; parentIndex++) {
        (parent[parentIndex] || document)[method](event, handler, false);
      }
    } else {
      (parent || document)[method](event, handler, false);
    }
  }
  
  module.exports = delegate;
  
  function find(element, selector) {
    return element.querySelectorAll(selector);
  }
  
  module.exports = find;
  
  function flatten(arrs) {
    var currentArray, currentElement, i, j;
    var result = [];
  
    if (arrs.length === 1) return arrs[0];
  
    while (arrs.length > 0) {
      currentArray = arrs.shift();
      for (i = 0; currentArray.length > i; i++) {
        currentElement = currentArray[i];
        j = 0;
        while (j < result.length && currentElement !== result[j]) {
          j += 1;
        }
        if (j === result.length) result.push(currentElement);
      }
    }
  
    return result;
  }
  
  module.exports = flatten;
  function getKey(key, opt_root) {
    if (!key || typeof key !== 'string') return undefined;
  
    var result = opt_root || window;
    var splitKey = key.split('.');
  
    for (var i = 0; i < splitKey.length && result != null; i++) {
      if (has(result, splitKey[i])) {
        result = result[splitKey[i]];
      } else {
        return undefined;
      }
    }
    return result;
  }
  
  module.exports = getKey;
  
  function has(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  
  module.exports = has;
  function hasClass(e, className) {
    if ('classList' in e) return e.classList.contains(className);
  
    return new RegExp('\\b' + className + '\\b').test(e.className);
  }
  
  module.exports = hasClass;
  
  function init(opt_options) {
    options = merge(options, opt_options);
    expose();
  }
  
  module.exports = init;
  
  function internalMap(elms, func, exArgs) {
    var ret = [];
    var elm, args;
    for (var index = 0; index < elms.length; index++) {
      elm = elms[index];
      if (elm instanceof HTMLElement === false) throw 'internalMap: Esperado elemento HTML';
      args = [elm].concat(exArgs);
      ret.push(func.apply(null, args));
    }
    return ret;
  }
  
  module.exports = internalMap;
  
  function log(type, info, obj) {
    if (options.debug && typeof getKey('console.' + type) === 'function') {
      console[type](info, obj);
    }
  }
  
  module.exports = log;
  
  function matches(elm, seletor) {
    if ('matches' in elm) return elm.matches(seletor);
    if (typeof jQuery === "function") return jQuery(elm).is(seletor);
  
    var elms = elm.parentNode.querySelectorAll(seletor);
  
    for (var i = 0; i < elms.length; i++) {
      if (elms[i] === elm) {
        return true;
      }
    }
    return false;
  }
  
  module.exports = matches;
  
  function merge(obj, obj2) {
    if (obj2) {
      for (var key in obj2) {
        if (has(obj2, key)) {
          obj[key] = obj2[key];
        }
      }
    }
    return obj;
  }
  
  
  module.exports = merge;
  
  function on(id, event, selector, oldCallback, parent) {
    var count, array, elm, callback;
  
    if (parent) return delegate(id, event, selector, oldCallback, parent);
  
    callback = safeFn(id, oldCallback, {
      event: event,
      selector: selector,
      immediate: false
    });
  
    if (typeof jQuery === "function") {
      elm = jQuery(selector);
  
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
  
      if (typeof elm.addEventListener === "function") {
        elm.addEventListener(event, callback);
      } else {
        elm.attachEvent("on" + event, callback);
      }
    }
  }
  
  
  module.exports = on;
  
  function reduceBool(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i]) return true;
    }
    return false;
  }
  
  module.exports = reduceBool;
  
  function sanitize(str, opts) {
    var split, i, spacer;
  
    if (!str) return '';
    opts = opts || {};
  
    spacer = typeof opts.spacer === 'string' ? opts.spacer : '_';
  
    str = str.toLowerCase()
      .replace(/^\s+/, '')
      .replace(/\s+$/, '')
      .replace(/\s+/g, '_')
      .replace(/[áàâãåäæª]/g, 'a')
      .replace(/[éèêëЄ€]/g, 'e')
      .replace(/[íìîï]/g, 'i')
      .replace(/[óòôõöøº]/g, 'o')
      .replace(/[úùûü]/g, 'u')
      .replace(/[ç¢©]/g, 'c')
      .replace(/[^a-z0-9_\-]/g, '_');
  
    if (opts.capitalized) {
      split = str.replace(/^_+|_+$/g, '').split(/_+/g);
      for (i = 0; i < split.length; i++) {
        if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
      }
      return split.join(spacer);
    }
  
    return str.replace(/^_+|_+$/g, '').replace(/_+/g, spacer);
  }
  
  module.exports = sanitize;
  
  function text(elm, opt) {
    var i, text, children;
    opt = opt || {};
  
    if (opt.onlyFirst) {
      children = elm.childNodes;
      text = '';
  
      for (i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
          text += children[i].nodeValue;
        }
      }
    } else {
      text = elm.innerText || elm.textContent || elm.innerHTML.replace(/<[^>]+>/g, '');
    }
  
    return opt.sanitize ? sanitize(text, opts.sanitize) : text;
  }
  
  
  module.exports = text;
  function getDataLayer(key) {
    try {
      return google_tag_manager[options.containerId].dataLayer.get(key);
    } catch ($$e) {
      log('warn', 'Function getDataLayer: Object ' + key + ' is not defined');
    }
  }
  
  function setDataLayer(key, value) {
    try {
      return google_tag_manager[options.containerId].dataLayer.set(key, value);
    } catch ($$e) {
      log('warn', $$e);
    }
  }
  internal.eventQueue = [];
  
  function event(category, action, label, value, object, id) {
    try {
      if (internal.sentPageview === false && options.waitQueue) {
        log('Info', 'The event (' + arguments + ') has been add to the queue');
        return internal.eventQueue.push(arguments);
      }
  
      if (value != null && typeof value === 'object') {
        object = value;
        value = undefined;
      } else {
        object = object || {};
      }
  
      var result = {
        event: options.customNameEvent,
        eventCategory: category,
        eventAction: action,
        eventValue: value,
        eventLabel: label,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }
  
  function localHelperFactory(conf) {
    var localHelper = {
      event: function(category, action, label, value, object) {
        return event(category, action, label, value, object, conf.id);
      },
      pageview: function(path, object) {
        return pageview(path, object, conf.id);
      },
      timing: function(category, variable, value, label, object) {
        return timing(category, variable, value, label, object, conf.id);
      },
      safeFn: function(id, callback, opts) {
        return safeFn(conf.id, callback, opts);
      },
      on: function(event, selector, callback, parent) {
        return on(conf.id, event, selector, callback, parent);
      },
      delegate: function(event, selector, callback) {
        return on(conf.id, event, selector, callback, document.body);
      },
      wrap: function(elm) {
        if (typeof elm === 'string') {
          elm = find(window.document, elm);
        } else if (elm instanceof HTMLElement) {
          elm = [elm];
        } else if ((elm instanceof Array || elm instanceof NodeList) === false) {
          throw 'wrap: Esperado receber seletor, elemento HTML, NodeList ou Array';
        }
  
        return {
          hasClass: function(className, opts) {
            var arr = internalMap(elm, hasClass, [className]);
            return (opts && opts.toArray) ? arr : reduceBool(arr);
          },
          matches: function(selector, opts) {
            var arr = internalMap(elm, matches, [selector]);
            return (opts && opts.toArray) ? arr : reduceBool(arr);
          },
          closest: function(selector) {
            return localHelper.wrap(internalMap(elm, closest, [selector]));
          },
          text: function(opts) {
            var arr = internalMap(elm, text, [opts]);
            return (opts && opts.toArray) ? arr : arr.join('');
          },
          find: function(sel) {
            var elms = internalMap(elm, find, [sel]);
            return localHelper.wrap(flatten(elms));
          },
          map: function(func, params) {
            return internalMap(elm, func, params);
          },
          nodes: elm
        };
      },
      sanitize: sanitize,
      getDataLayer: getDataLayer,
      setDataLayer: setDataLayer,
      cookie: cookie,
      getKey: getKey,
      id: conf.id,
      args: conf.args,
      fn: fn,
      _event: conf.event,
      _selector: conf.selector
    };
    return localHelper;
  }
  function pageview(path, object, id) {
    try {
      var result = {
        event: options.customNamePageview,
        path: path,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }
  
  function safeFn(id, callback, opt) {
    opt = opt || {};
    var safe = function() {
      try {
        callback.call(this === window ? null : this, localHelperFactory({
          id: id,
          args: arguments,
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
          log('warn', 'Exception: ', {
            exception: $$e,
            tag: id,
            event: (opt.event || undefined),
            selector: (opt.selector || undefined)
          });
        }
      }
    };
  
    return opt.immediate === false ? safe : safe();
  }
  internal.timingQueue = [];
  
  function timing(category, variable, value, label, object, id) {
    try {
      if (internal.sentPageview === false && options.waitQueue) {
        log('Info', 'The timing event (' + arguments + ') has been add to the queue');
        return internal.timingQueue.push(arguments);
      }
  
      object = object || {};
  
      var result = {
        event: options.customNameTiming,
        timingCategory: category,
        timingVariable: variable,
        timingValue: value,
        timingLabel: label,
        _tag: id
      };
  
      if (options.gtmCleanup) {
        result.eventCallback = options.gtmCleanup;
      }
  
      log('info', result, object);
      window[options.dataLayerName].push(merge(result, object));
    } catch (err) {
      log('warn', err);
    }
  }
  function expose() {
    if (window[options.helperName] && !options.overwriteHelper) return;
    window[options.helperName] = helper;
  }
  
  expose();
}());