(function () {
  var options = {
    helperName: 'analyticsHelper',
    debug: {{Debug Mode}} || false,
    containerID: {{Container ID}} || '',
    customNamePageview: 'ga_pageview',
    customNameEvent: 'ga_event',
    persistCookie: "analyticsHelper.persist"
  };

  var log = {
    info: function (info) {
      if (options.debug) {
        console.log('INFO: ', info);
      }
    },
    error: function (error) {
      if (options.debug) {
        console.log(error);
      }
    }
  };

  window[options.helperName] = window[options.helperName] || {};

  function init (opt_options) {
    window[options.helperName] = undefined;
    options = merge(options, opt_options);
    window[options.helperName] = window[options.helperName] || {};
    window[options.helperName].options = options;
    expose();
  }

  function getDataLayer (key) {
    return google_tag_manager[options.containerID].dataLayer.get(key);
  }

  function has (obj, key) {
    return hasOwnProperty.call(obj, key);
  }

  function merge (obj, obj2) {
    if (obj2) {
      for (var key in obj2) {
        if (has(obj2, key)) {
          obj[key] = obj2[key];
        }
      }
    }
    return obj;
  }

  function pageview (path, object) {
    try {
      log.info({ path: path, object: object });
      dataLayer.push(merge({
        event: options.customNamePageview,
        path: path
      }, object));
    } catch (err) {
      log.info(err);
    }
  }

  function event (category, action, label, value, object) {
    try {
      object = object || {};
      object.eventNoInteraction = object.eventNoInteraction || false;
      log.info({ category: category, action: action, label: label, object: object });
      dataLayer.push(merge({
        event: options.customNameEvent,
        eventCategory: category,
        eventAction: action,
        eventValue: value,
        eventLabel: label
      }, object));
    } catch (err) {
      log.info(err);
    }
  }

  function sanitize (str, capitalized) {
    var split, i;
    if (!str) return '';

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

    if (capitalized) {
      split = str.split(/_+/g);
      for (i = 0; i < split.length; i++) {
        if (split[i]) split[i] = split[i][0].toUpperCase() + split[i].slice(1);
      }
      return split.join('');
    }

    return str.replace(/_+/g, '_');
  }

  function getCookie (key) {
    key = ('; ' + key + '=');
    var cookie = ('; ' + document.cookie);
    var index = cookie.indexOf(key);
    var end;
    if (index === -1) {
      return null;
    }
    cookie = cookie.substring(index + key.length);
    end = cookie.indexOf(';');
    return window.unescape(end === -1 ? cookie : cookie.substring(0, end));
  }

  function setCookie (name, value, opts) {
    var exdate, cookie;
    opts = opts || {};
    
    cookie = name + "=" + escape(value);
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

  function cookie (name, value, opts) {
    if (typeof value === 'undefined')
      return getCookie(name);

    return setCookie(name, value, opts);
  }
  
  function getKey (key, opt_root) {
    if (!key || typeof key !== 'string') return undefined;

    var result = opt_root || window;
    var splitKey = key.split('.');

    for (var i = 0; i < splitKey.length; i++) {
      if (result.hasOwnProperty(splitKey[i])) {
        result = result[splitKey[i]];
      } else {
        return undefined;
      }
    }
    return result;
  }
  
  var lastPagePersisted = (function() {
    var values = getCookie(options.persistCookie);
    try {
    	return JSON.parse(values) || {};
    } catch(e) {
    	return {};
    } 
  })();

  var thisPagePersisted = {};

  function persist (key, value) {
    if (typeof value === 'undefined') {
      return lastPagePersisted[key];
    }
    thisPagePersisted[key] = value;
    return setCookie(options.persistCookie, JSON.stringify(thisPagePersisted));
  }

 function safeFn (id, callback, immediate) {
      var safe = function() {
        try {
          callback(window[options.helperName], window.jQuery);
        } catch ($$e) {
          if (console && typeof console.error === 'function')
            console.error(id, $$e);
        }
      };

      return immediate === false ? safe : safe();
  }

    function on (event, selector, callback) {
      if (typeof jQuery === "function") {
        var elem = jQuery(selector);
        if (typeof elem.on === "function") {
          return elem.on(event, callback);
        } else if (typeof elem.bind === "function") {
          return elem.bind(event, callback);
        }
      }

      var array;
      if(typeof selector === "string") {
        array = document.querySelectorAll(selector);
      } else if(typeof selector.length === "undefined" || selector === window) {
        /* window pode ser um Array de frames, caso em que não queremos que seja iterado */
        array = [selector];
      } else {
        array = selector;
      }

      for (var count = 0; count < array.length; count++) {
        var elm = array[count];
        if (typeof elm.addEventListener === "function") {
          elm.addEventListener(event, callback);
        } else {
          elm.attachEvent("on" + event, callback);
        }
      }
    }

    function match (elm, seletor) {
      if (typeof jQuery === "function") return jQuery(elm).is(seletor);
      var elms = elm.parentNode.querySelectorAll(seletor);

      for (var i = 0; i < elms.length; i++) {
        if (elms[i] === elm) {
          return true;
        }
      }
      return false;
    }

    function closest (elm, seletor) {
      if (typeof jQuery === "function") return jQuery(elm).closest(seletor)[0];
      var parent = elm.parentNode;

      while (parent != document) {
        if (this.match(parent, seletor)) {
          return parent;
        }
        parent = parent.parentNode;
      }
      return undefined;
    }

    function hasClass (e, className) {
      if (e.className.indexOf(className) >= 0) {
        return true;
      }
      return false;
    }

    function getFullClassName(elm, name) {
      var classes = elm.className.split(' ');

      for (var i = 0; i < classes.length; i++) {
        if (classes[i].indexOf(name) != - 1) {
          return classes[i];
        }
      }

      return "";
    }

    function delegate (event, selector, handler, parent) {
      if (typeof jQuery === "function") {
        var elem = jQuery(parent || document);
        if (typeof elem.on === "function") {
          return elem.on(event, selector, handler);
        } else if (typeof elem.delegate === "function") {
          return elem.delegate(selector, event, handler);
        }
      }
      if (typeof document.addEventListener === "function") {
        var method = "addEventListener";
      } else {
        var method = "attachEvent";
        event = "on" + event;
      }
      (parent || document)[method](event, function (e) {
        for (var target = e.target; target && target != this; target = target.parentNode) {
          // loop parent nodes from the target to the delegation node
          if (match(target, selector)) {
            handler.call(target, e);
            break;
          }
        }
      }, false);
    }

  function expose () {
    window[options.helperName] = {
      init: init,
      pageview: pageview,
      event: event,
      sanitize: sanitize,
      options: options,
      getDataLayer: getDataLayer,
      cookie: cookie,
      getKey: getKey,
      persist: persist
    };
  }

  expose();
} ());
