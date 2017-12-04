  function localHelperFactory(id, args) {
    var localHelper = {
      event: function(category, action, label, value, object){
        return event(category, action, label, value, object, id);
      },
      pageview: function(path, object){
        return pageview(path, object, id);
      },
      safeFn: function (id, callback, opt) {
        return safeFn(id, callback, opt);
      },
      on: function (event, selector, callback, parent) {
        return on(id, event, selector, callback, parent);
      },
      wrap: function(elm){
        if (typeof elm === 'string'){
          elm = find(window.document, elm);
        } else if(elm instanceof HTMLElement){
          elm = [elm];
        } else if((elm instanceof Array || elm instanceof NodeList) === false){
          throw 'wrap: Esperado receber seletor, elemento HTML, NodeList ou Array';
        }

        return {
          hasClass: function(className, reduce){
            var arr = internalMap(elm, hasClass, [className]);
            if(reduce){
              return reduceBool(arr);
            }
            return arr;
          },
          matches: function(selector, reduce){
            var arr = internalMap(elm, matches, [selector]);
            if(reduce){
              return reduceBool(arr);
            }
            return arr;
          },
          closest: function(selector){
            return internalMap(elm, closest, [selector]);
          },
          text: function(opt){
            var arr = internalMap(elm, text, [opt]);
            if(opt && opt.onlyText){
              return reduceString(arr);
            }
            return arr;
          },
          find: function(sel){
            var elms = internalMap(elm, find, [sel]);
            return localHelper.wrap(flatten(elms));
          },
          map: function(func, params){
            return internalMap(elm, func, params);
          },
          nodes: elm
        };
      },
      sanitize: sanitize,
      getDataLayer: getDataLayer,
      cookie: cookie,
      getKey: getKey,
      id: id,
      args: args,
      fn: fn
    };
    return localHelper;
  }