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

function on(event, selector, callback) {
  callback(document.querySelector(selector));
}

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

function getDataLayer(key) {
  return google_tag_manager[options.containerID].dataLayer.get(key);
}

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