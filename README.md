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

- Adicionar a tag para ser disparada antes de qualquer tag que utilizar o Analytics Helper:
<img src="http://bucket.dp6.io/dp6/analytics-helper/helper-02.png" alt="logo" />

<br/>

## API
### init(opt_options)
Função utilizada para inicializar os valores do objeto analyticsHelper.
 * `opt_options`: Object
   * `helperName`: String - Default: **analyticsHelper** - Nome atribuído ao objeto global do helper. Utilizado em casos de múltiplos helpers no mesmo ambiente. 
   * `debug`: Boolean - Default: **GTM Debug Mode** - Se os disparos serão exibidos ou não no console do ambiente. É ativado automaticamente no modo de visualização do GTM.
   * `containerID`: String - Default: **GTM Container ID** - Identificador do container do GTM. É atribuído automaticamente através da varíavel de container ID do GTM. 
   * `customNamePageview`: String - Default: **ga_pageview** - Nome do evento a ser disparado ao GTM quando houver o disparo de um pageview através da função *pageview(path, obj)*.
   * `customNameEvent`: String - Default: **ga_event** - Nome do evento a ser disparado ao GTM quando houver o disparo de um evento através da função *event(category, action, label, obj)*.

**Exemplo**
```javascript
analyticsHelper.init({
  helperName: 'meuHelper',
  debug: false,
  containerID: 'GTM-XXX',
  customNamePageview: 'meuEventoPageView',
  customNameEvent: 'MeuEvento'
});
```

<br/>
   
### pageview(path, object)
Utilizada para o disparo de pageview personalizado.
 * `path`: String - Path do pageview
 * `object`: Object - Objeto que será atribuído ao pageview. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas.

**Necessária configuração de variável no GTM**

Uma variável do tipo camada de dados nomeada como *path* deve ser criada no GTM para receber o pathname do pageview.

**Exemplo**
```javascript
analyticsHelper.pageview('/sucesso-de-compra', {
  'ecommerce': {
    'purchase': {
      'actionField': {
        'id': 'T12345',
        'affiliation': 'Online Store',
        'revenue': '35.43',
        'tax': '4.90',
        'shipping': '5.99',
        'coupon': 'SUMMER_SALE'
      },
      'products': [{                            
        'name': 'Triblend Android T-Shirt',     
        'id': '12345',
        'price': '15.25',
        'brand': 'Google',
        'category': 'Apparel',
        'variant': 'Gray',
        'quantity': 1,
        'coupon': ''                            
      }]
    }
  }
});
```
<br/>
### event(category, action, label, value, object)
Utilizado para o disparo de eventos.
 * `category`: String - Categoria do evento
 * `action`: String - Ação do evento
 * `label`: String - Rótulo do evento
 * `value`: String - Valor do evento
 * `object`: Object - Objeto que será atribuído ao evento. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas.
 
**Necessária configuração de variáveis no GTM**

As variáveis *eventCategory*, *eventAction*, *eventLabel* e *eventValue*, todas do tipo camada de dados devem ser criadas no GTM.

**Exemplo**
```javascript
analyticsHelper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', 'MeuValor', {
  dimension1: 'São Paulo'
});
```

<br/>
### sanitize(str, capitalized)
Utilizado para limpar textos, como na coleta de texto em seletores.
* `str`: String - String para ser tratada
* `captalized`: Boolean - Define a forma com que a String será tratada.
	* true: Coloca a String como PascalCase. 
	* false: Coloca a String como lowercase com todos os espaços transformados em underline.

**Exemplo**
```javascript
analyticsHelper.sanitize('Minha String Suja'); // minha_string_suja
analyticsHelper.sanitize('Minha String Suja', true); // MinhaStringSuja
```

<br/>
### getDataLayer(key)
Retorna qualquer objeto contido no dataLayer exposto no ambiente.
 * `key`: String - Chave do objeto a ser recuperado

**Exemplo**
```javascript
dataLayer.push({
  meuObjeto: 'valor',
  meuOutroObjeto: 'outroValor'
});

analyticsHelper.getDataLayer('meuObjeto'); // valor
```

<br/>
### cookie(name, value, opts)
Cria um cookie ou recupera um existente.
 * `name`: String - Nome do cookie 
 * `value`: String - Valor do cookie
 * `opts`: Object - expires, domain, path do cookie

**Exemplo**
```javascript
// Cria um cookie
analyticsHelper.cookie('meuCookie', 'meuValor', {
  exdays: 3, // Dias para expiração
  domain: 'meudominio.com.br', // Domínio que o cookie atribuído
  path: '/meu-path' // Path do cookie
}); // meuCookie=meuValor; expires=Sun, 16 Oct 2016 19:18:17 GMT; domain=meudominio.com.br; path=/meu-path

// Recupera um cookie existente
analyticsHelper.cookie('meuCookie'); // meuValor
```

<br/>
### getKey(key, opt_root)
Encontra um objeto ou valor pela chave informada. Caso alguma das chaves em cadeia não existir, a função retorna undefined, evitando assim o lançamento de exceptions. 
 * `key`: String - Chave do object a ser encontrado 
 * `opt_root`: Object - Objeto que possui a chave a ser encontrada (opcional)

**Exemplo com objeto no escopo global**
```javascript
var objeto = {
  meuObjeto: {
    meuArray: [{
      minhaChave: 'encontrei meu valor'
    }]
  }
};

analyticsHelper.getKey('objeto.meuObjeto.meuArray.0.minhaChave'); // encontrei meu valor
analyticsHelper.getKey('objeto.chaveNaoExistente.meuArray.0.minhaChave'); // undefined
```

**Exemplo com objeto-raiz passado por parâmetro**
```javascript
var objeto = {
  meuObjeto: {
    meuArray: [{
      minhaChave: 'encontrei meu valor'
    }]
  }
};

analyticsHelper.getKey('meuObjeto.meuArray.0', objeto); // Object {minhaChave: "encontrei meu valor"}
```

<br/>
### persist(key, value)
Salva um dado para acessar na próxima página.
 * `key`: String - Chave do dado
 * `value`: Any - Valor a salvar
**Exemplo gravação**
```javascript
analyticsHelper.persist("valor1", 123);
analyticsHelper.persist("valor2", {teste: 42});
```

**Exemplo consulta na próxima página**
```javascript
console.log(analyticsHelper.persist("valor1") + analyticsHelper.persist("valor2"));
```
