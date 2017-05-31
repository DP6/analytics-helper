
/**
 * Recupera uma chave do dataLayer utilizando o objeto 
 * padrão do GTM 'google_tag_manager'
 * Obs: Possui dependência com a ativação da variável 'container ID'
 * @param {*} key 
 */
function getDataLayer (key) {
  return google_tag_manager[options.containerID].dataLayer.get(key);
}
helper.getDataLayer = getDataLayer;