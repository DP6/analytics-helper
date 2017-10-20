
/**
 * Utilizado para disparar pageviews virtuais
 * @param {*} path Valor do pagepath do disparo
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
function pageview (path, object) {
  log.info({ path: path, object: object });
  dataLayer.push(merge({
    event: options.customNamePageview,
    path: path
  }, object));
}