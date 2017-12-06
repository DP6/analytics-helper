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
    if (internal._sentPageview === false && options.waitQueue) {
      return internal._eventQueue.push(arguments);
    }

    object = object || {};
    object.eventNoInteraction = object.eventNoInteraction || false;
    var eventObj = {
      event: options.customNameEvent,
      eventCategory: category,
      eventAction: action,
      eventValue: value,
      eventLabel: label,
      object: object,
      _tag: id
    };
    log('info', eventObj);
    window[options.dataLayerName].push(merge(eventObj, object));
  } catch (err) {
    log('warn', err);
  }
}