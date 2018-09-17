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