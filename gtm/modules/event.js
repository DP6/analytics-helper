/**
 * Disparo personalizado de eventos
 * @param {*} category Categoria do evento
 * @param {*} action Ação do evento
 * @param {*} label Rótulo do evento
 * @param {*} value Valor do evento
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
function event(category, action, label, value, object, id) {
  try {
    if (options.sentPageview === false && options.waitQueue) {
      return options.eventQueue.push(arguments);
    }

    object = object || {};
    object.eventNoInteraction = object.eventNoInteraction || false;
    log('info', {
      category: category,
      action: action,
      label: label,
      object: object,
      tag: id
    });
    window[options.dataLayerName].push(merge({
      event: options.customNameEvent,
      eventCategory: category,
      eventAction: action,
      eventValue: value,
      eventLabel: label
    }, object));
  } catch (err) {
    log('warn', err);
  }
}