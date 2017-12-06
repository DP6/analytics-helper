/**
 * Utilizado para disparar pageviews virtuais
 * @param {*} path Valor do pagepath do disparo
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
function pageview(path, object, id) {
  try {
    log('info', {
      path: path,
      object: object,
      _tag: id
    });
    window[options.dataLayerName].push(merge({
      event: options.customNamePageview,
      path: path
    }, object));
  } catch (err) {
    log('warn', err);
  }
}