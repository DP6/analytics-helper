/**
 * Recupera uma chave do dataLayer utilizando o objeto 
 * padrão do GTM 'google_tag_manager'
 * Obs: Possui dependência com a ativação da variável 'container ID'
 * @param {*} key 
 */
function getDataLayer(key) {    
    try{
        return window.google_tag_manager[options.containerID].dataLayer.get(key);
    }catch(err){
        log('warn', 'Function getDataLayer: Object '+key+' is not defined');
        return undefined;
    }
  }