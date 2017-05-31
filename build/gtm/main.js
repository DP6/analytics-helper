;(function () {
  var helper = {};
  var options = {
    debug: {{Debug Mode}} || false,
    containerID: {{Container ID}} || '',
    customNamePageview: 'ga_pageview',
    customNameEvent: 'ga_event'
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
    // Instanciar o GA
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date();
    // Instanciar dataLayer
    window.dataLayer=window.dataLayer || [];
    

  function getCookie(key) {
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
  
  function setCookie(name, value, opts) {
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
  
  function cookie(name, value, opts) {
    if (typeof value === 'undefined')
      return getCookie(name);
  
    return setCookie(name, value, opts);
  }
  helper.cookie = cookie;
  
  function getKey(key, opt_root) {
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
  
  function has(obj, key) {
    return hasOwnProperty.call(obj, key);
  }
  
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
  helper.merge = merge;
  
  function on(event, selector, callback) {
    callback(document.querySelector(selector));
  }
  helper.on = on;
  
  function sanitize(str, capitalized) {
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
      return split.join(' ');
    }
  
    return str.replace(/_+/g, '_');
  }
  helper.sanitize = sanitize;
  
  function event(category, action, label, value, object) {
    object = object || {};
    object.eventNoInteraction = object.eventNoInteraction || false;
    log.info({
      category: category,
      action: action,
      label: label,
      object: object
    });
    dataLayer.push(merge({
      event: options.customNameEvent,
      eventCategory: category,
      eventAction: action,
      eventValue: value,
      eventLabel: label
    }, object));
  }
  helper.event = event;
  
  function getDataLayer(key) {
    return google_tag_manager[options.containerID].dataLayer.get(key);
  }
  helper.getDataLayer = getDataLayer;
  
  function pageview(path, object) {
    log.info({
      path: path,
      object: object
    });
    dataLayer.push(merge({
      event: options.customNamePageview,
      path: path
    }, object));
  }
  helper.pageview = pageview;
  
  /**
   * Objetivo da função é encapsular o tagueamento no GTM.
   * Utilizar o scoped no lugar de um try/catch
   * @param {*} tagName Nome da tag que está chamando a função  
   * @param {*} callback Função executada no escopo seguro do Helper
   * @param {*} immediate Se a função recebida no parâmetro callback
   * deve ser execurada imediatamente ou após o retorno de scoped
   */
  function scoped (tagName, callback, immediate) {
    var safe = function() {
      try {
        callback(helper);
      } catch ($$e) {
        if (console && typeof console.error === 'function')
          // TODO Data Quality
          console.error(tagName, $$e);
      }
    };
    return immediate === false ? safe : safe();
  }

  window.analyticsHelper = {
    scoped: scoped
  };
}());