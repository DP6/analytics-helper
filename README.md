# Analytics Helper

> Biblioteca auxiliar para implementação de Google Tag Manager.

<p align="center">
  <img src="http://bucket.dp6.io/dp6/analytics-helper/helper-00.png" alt="logo" width="549" height="403"/>
</p>

## Instalação
- Ativar variável de Debug Mode no GTM;
- Ativar variável de Container ID no GTM;
- Adicionar o script analytics-helper.js em uma tag do tipo Custom HTML:
<img src="http://bucket.dp6.io/dp6/analytics-helper/helper-01.png" alt="logo" />

- Adicionar a tag para ser disparada antes de qualquer:
<img src="http://bucket.dp6.io/dp6/analytics-helper/helper-02.png" alt="logo" />

<br/>

## API
###options
####helperName
Descrição: Nome personalizado que será utilizado no lugar do objeto Analytics Helper

Default: AnalyticsHelper


####debug
####containerID
####customNamePageview
####customNameEvent
###init(opt_options)
Para configurar o helper será necessário passar o objeto para a função de inicialização da API:

```js
analyticsHelper.init({
  helperName: 'nomeCustomizadoDoHelper',
  debug: true,
  customNamePageview: 'gaVirtualPageView',
  customNameEvent: 'gaEvent'
});

nomeCustomizadoDoHelper.event('categoria', 'evento', 'acao', {
  // objeto adicional ...
});
``` 
###pageview(path, object)
###event(category, action, label, object)
###sanitize(str, capitalized)
###getDataLayer(key)
###cookie(name, value, opts)

<br/>
