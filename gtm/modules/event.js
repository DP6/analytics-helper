
/**
 * Disparo personalizado de eventos
 * @param {*} category Categoria do evento
 * @param {*} action Ação do evento
 * @param {*} label Rótulo do evento
 * @param {*} value Valor do evento
 * @param {*} object Objeto para ser inserido no dataLayer
 * que pode ser utilizado para Enhanced Ecommerce, dentre outros.
 */
function event (category, action, label, value, object) {
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
}
helper.event = event;