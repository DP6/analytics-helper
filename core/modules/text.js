  function text(elm, opt) {
    var text = '';
    if (opt && opt.onlyFirst) {
      var children = elm.childNodes;

      for (var i = 0; i < children.length; i++) {
        if (children[i].nodeType === 3) {
          text += children[i].nodeValue;
        }
      }
    } else {
      text = elm.innerText || elm.textContent || elm.innerHTML.replace(/<[^>]+>/g, '');
    }
    return (opt && opt.sanitize) ? sanitize(text) : text;
  }