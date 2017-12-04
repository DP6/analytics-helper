#  Referência técnica -- Analytics Helper para o Google Tag Manager

Este documento introduz as APIs e funcionalidades desenvolvidas para o suporte ao Google Tag Manager. São importantes algumas configurações do lado da própria ferramenta para que o código implementado na tag do Analytics Helper tenha o comportamento esperado. Mais detalhes sobre [aqui]().

## Objeto options

Localizado no começo do código *javascript*, o objeto `options` contém as configurações globais do *Analytics Helper*. Os valores padrões servem na maioria dos casos, e devem ser alterados com cautela e de forma consciente.

```javascript
    var options = {
      helperName: 'analyticsHelper',
      dataLayerName: 'dataLayer',
      debug: ({{Container ID}} || ''),
      waitQueue: true,
      containerID: ({{Container ID}} || ''),
      exceptionEvent: 'gtm_dataQuality_event',
      exceptionCategory: 'GTM Exception',
      customNamePageview: 'ga_pageview',
      customNameEvent: 'ga_event',
      errorSampleRate: 1
    };
```

### init(opt_options)

Chame esta função para inicializar o Analytics Helper com opções diferentes das padrões. Recebe como argumento o objeto `opt_options`, que possui as seguintes chaves:

* `helperName` -- Por padrão `"analyticsHelper"`. 
   Uma string que indentifica o nome da instância do _Analytics Helper_ no objeto _window_ do navegator. O tagueamento não é afetado pela mudança desse valor, se feito pela função `safeFn` (recomendado).

* `dataLayerName` -- Por padrão `"dataLayer"`.
  Uma string que identifica o nome da instância da *camada de dados* no objeto _window_ do navegador. Deve ser o mesmo valor configurado no *snippet* do GTM para que as funções de interface do *Analytics Helper* (ex: `getDataLayer`) funcionem.

* `debug` -- Por padrão é a variavél `{{Debug Mode}}` do GTM. Se desabilitada, é `false`.
  Um booleano que sinaliza para o *Analytics Helper* se o contexto atual é de depuração ou produção. Caso verdadeiro, os eventos serão disparados apenas via `console.log`, sem envios para o GA.

* `waitQueue` -- Por padrão é `true`
  Um booleano que sinaliza para o *Analytics Helper* se ele deve utilizar uma fila de espera nos eventos. Caso verdadeiro, todos eventos serão empilhados numa estrutura interna até que ocorra o primeiro pageview na página. Recomendamos que essa opção esteja sempre ativada, pois evita inconsistências nos relatórios do GA.

* `containerID` -- Por padrão é a variável `{{Container ID}}` do GTM. Se desabilitada, é a string vazia `''`.
  Uma string que deve ser equivalente ao ID do contêiner do GTM onde o *Analytics Helper* foi configurado (GTM-XXXXX). Não deve ser outro valor.

* `exceptionEvent` -- Por padrão `"gtm_dataQuality_event"`.
  Uma string que identifica o evento enviado à camada de dados caso ocorra alguma exceção no código do GTM. Esta opção suporta a ideia da coleta para um GA de *Data Quality* **(mais detalhes à adicionar)**.

* `exceptionCategory` -- Por padrão  `"GTM Exception"`.
  Uma string que indica qual o valor que deve ser preenchido na chave `"event_category"` do evento enviado à camada de dados caso ocorra alguma exceção no código do GTM. Esta opção suporta a ideia da coleta para um GA de *Data Quality* **(mais detalhes à adicionar)**.

* `customNamePageview` -- Por padrão `"ga_pageview"`.
  Uma string que identifica o evento enviado à camada de dados toda vez que a função `pageview` (ver abaixo) for chamada.

* `customNameEvent` -- Por padrão `"ga_event"`.
  Uma string que identifica o evento enviado à camada de dados toda vez que a função `event` (ver abaixo) for chamada.

* `errorSampleRate` -- Por padrão `1` .
  Deve ser um inteiro entre 0 e 1, que controla o nível de amostragem dos erros enviados ao GA de *Data Quality* **(mais detalhes à adicionar)**. Serve para controlar a coleta em ambientes onde o volume de disparos é muito grande.

## API

### Coleta GA

#### pageview(path, object)
Utilizada para o disparo de pageview personalizado.

##### Parâmetros
 * `path` [opcional]: 
    String - Path do pageview
 * `object` [opcional]: 
    Object - Objeto que será atribuído ao pageview. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas.

##### Exemplo de código
```javascript
analyticsHelper.pageview('/post/finalizou-leitura', {
  'dimension1' : "Area Abetra",
  'dimension2' : "Data Science"
});
```

#### event(category, action, label, value, object)
Utilizado para o disparo de eventos.

##### Parâmetros
* `category`[obrigatório]: 
String - Categoria do evento
* `action`[obrigatório]: 
String - Ação do evento
* `label` [opcional]:
String - Rótulo do evento
* `value` [opcional]:
String - Valor do evento
* `object` [opcional]: 
Object - Objeto que será atribuído ao evento. Pode ser utilizado para passar objetos de Enhanced Ecommerce, além de métricas e dimensões personalizadas.

##### Exemplo de código
```javascript
analyticsHelper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', 'MeuValor', {
  dimension1: 'São Paulo'
});
```

### Utilidades

#### getDataLayer(key)
Retorna qualquer objeto contido no dataLayer exposto no ambiente.

##### Argumentos
* `key` [obrigatório]: 
String - Chave do objeto a ser recuperado

##### Retorno
 `Retorno` - **String ou Integer com valor dá variável**

##### Exemplo de código
```javascript
dataLayer.push({
  meuObjeto: 'valor',
  meuOutroObjeto: 'outroValor'
});

analyticsHelper.getDataLayer('meuObjeto'); // valor
```

#### getKey(key, opt_root)
Encontra um objeto ou valor pela chave informada. Caso alguma das chaves em cadeia não existir, a função retorna undefined, evitando assim o lançamento de exceptions.

##### Argumentos
* `key` [obrigatório]: 
String - Chave do object a ser encontrado
* `opt_root` [opcional]:
Object - Objeto que possui a chave a ser encontrada

##### Retorno
 `Retorno` - **String, Integer ou Object com o valor encontrado**

##### Exemplo com objeto no escopo global
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

##### Exemplo com objeto-raiz passado por parâmetro
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

#### sanitize(text, capitalized)
Retona um texto sem caracteres especiais, assentos espaços ou letras maiusculas (opcionalmente).

##### Argumentos
* `text` [obrigatório]: 
String - String para ser tratada
* `captalized` [opcional]:
Boolean - Define a forma com que a String será tratada.
    - true: Coloca a String como PascalCase.
    - false: Coloca a String como lowercase com todos os espaços transformados em underline.

##### Retorno
 `Retorno` - **String com texto limpo**

##### Exemplo de código
```javascript
analyticsHelper.sanitize('Minha String Suja'); // minha_string_suja
analyticsHelper.sanitize('Minha String Suja', true); // MinhaStringSuja
```

#### cookie(name, value, opts)
Cria um cookie ou retona seu valor.

##### Argumentos
* `name` [obrigatório]: 
String - Nome do cookie
* `value` [opcional]:
String - Valor do cookie
* `opts` [opcional]:
Object - Um objeto que pode conteros seguintes parametros:
    - exdays [opcional]: Integer - Número de dias para a expiração
    - domain [opcional]: String - Dominio ao qual o cookie deve ser atribuido
    - path [opcional]: String - Path do site ao qual o cookie deve ser atribuido

##### Retorno
 `Retorno` - **String com texto do cookie ou a criação de um cookie**

##### Exemplo de criação de cookie
```javascript
analyticsHelper.cookie('meuCookie', 'meuValor', {
  exdays: 3, // Dias para expiração
  domain: 'meudominio.com.br', // Domínio que o cookie atribuído
  path: '/meu-path' // Path do cookie
}); // meuCookie=meuValor; expires=Sun, 16 Oct 2016 19:18:17 GMT; domain=meudominio.com.br; path=/meu-path
```

##### Exemplo de recuperar valor de um cookie
```javascript
analyticsHelper.cookie('meuCookie'); // meuValor
```

### SafeFn

Função recomendada para portar todo o código de uma TAG. Caso aconteça algum erro, será reportado um erro no console ou será enviado um evento de exception para um GA específico.

A função de callback pode receber um parâmetro que dentro de seu escopo representará um novo "helper interno", com uma API estendida (mais detalhes abaixo).

#### Argumentos da função
* `id`
  String que identifica o código em caso de exception.

* `callback` 
  Função a ser executada dentro do escopo seguro, o primeiro parêmetro (Opcional) retorna o helper interno, com outros funções.

* `immediate` (Opcional)
  Variável booleana, em caso de false, retorna a função ao invés de executa-la.

##### Exemplo de código

```javascript
analyticsHelper.safeFn('GA - Nome da Tag', function (helper) {
  helper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo', 'MeuValor', {
    dimension1: 'São Paulo'
  });
});
```

#### O que é Quality Assurance?

### Helper interno
#### on(event, selector, callback)

A função on serve para executar um callback ao executar algum evento em um elemento HTML específico. Em caso de não haver jQuery na página, ele se baseia na função querySelector do javascript, e por conta disso, é preciso ficar atento a compatibilidade dos navegadores. Não é recomendado a utilização desta função em páginas que oferecem suporte a IE 8.

#### Argumentos
* `event`
String do evento que ira executar o callback, exemplos: 'mousedown', 'click'.

* `selector` 
String do Seletor CSS que irá buscar os elementos que executarão o callback no disparo do evento.

* `callback`
Função executada no disparo do evento.

##### Exemplo de código

```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.on('mousedown', '#botaoX', function () {
    helper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
  });
});
```

#### push(obj)
A função push insere o objeto no dataLayer do GTM configurado. Em caso de modo debug, a cada push, é apresentado os dados inseridos e o nome da tag responsável pela inserção.

##### Argumentos
* `obj`
Objeto com os dados a serem inseridos.

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.push({
    event: 'myEvent'
  });
});
```

#### wrap(elm, func, params)
A Função wrap serve de substituto para ambientes sem jQuery, gerando um objeto com algumas das suas funções facilitadoras para manipular o DOM. Além desta utilidade, a função wrap funciona também como um map, bastando enviar uma função como segundo paramêtro.

##### Argumentos
* `elm`
String, elemento HTML ou Array de elementos HTML. Em caso de String, o mesmo é utilizado como seletor CSS, trazendo todos os elementos que cruzarem com o seletor. Caso contrário, o wrap funcionará a partir dos elemento enviados.

* `func` (Opcional)
Função que executará com base em cada elemento enviado no primeiro paramêtro ou coletado por seu seletor. Recebe o seguinte parâmetro:
  * `elm`
    O elemento HTML que está sendo processado pela função.

* `params` (Opcional)
Parametros da função enviada no segundo parametro.

##### Retorno

##### Exemplos de código
```javascript
// Apenas um elemento
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.on('mousedown', '#botaoX', function () {
    var text = helper.wrap(this).text({santize: true});
    helper.event('Categoria', 'Ação', 'Label_' + text);
  });
});

// Múltiplos elementos, passando callback
analyticsHelper.safeFn('Nome da Tag', function(helper){
  var urls = helper.wrap('a', function(elm){
    return elm.href;
  });
});
```

### Objeto Wrap

Objeto gerado pela função wrap, inclui diversas funções que ajudam na manipulação do DOM

#### Atributo nodes
Array de elementos HTML ou NodeList que será a base das funções

#### hasClass(className, reduce)
Função que verifica se o elemento HTML tem a classe passada por parâmetro.

##### Argumentos
* `className`
String do nome da classe a ser batida com o elemento.

* `reduce`
Boolean que em caso de true, retorna um boolean quando qualquer um dos elementos conter a classe.

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.on('mousedown', '.button', function () {
    if(helper.wrap(this).hasClass('myClass' , true)){
      helper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    }
  });
});
```

#### matches(selector, reduce)
Função que verifica se o elemento HTML confere com o seletor.

##### Argumentos
* `selector`
String do seletor CSS que baterá com o elemento HTML.

* `reduce`
Boolean que em caso de true, retorna um boolean quando qualquer um dos elementos bater com o seletor.

##### Retorno

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.on('mousedown', '.button', function () {
    if(helper.wrap(this).matches('.myClass' , true)){
      helper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo');
    }
  });
});
```

#### closest(selector)
Função que retorna o elemento mais próximo verticalmente com o seletor passado por parâmetro.

##### Argumentos
* `selector`
String do seletor CSS que baterá com o elemento HTML.

##### Retorno

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
  helper.on('mousedown', '.button', function () {
    var text = helper.wrap(this).closest('div.parentDivWithText').text({sanitize: true, onlyFirst: true});
      helper.event('MinhaCategoria', 'MinhaAcao', 'MeuRotulo' + text);
    });
  });
});
```

#### text(opt)
Função que retorna o texto do elemento

##### Argumentos
* `opt`
Objeto de configuração que modifica o retorno da função. Os seguintes campos podem ser alterados:

  * `sanitize`
Boolean que em caso de true retorna o valor sanitiziado pela função sanitize.

  * `onlyFirst`
Boolean que em caso de true retorna somente o texto direto do elemento e não de todos os seus filhos.

  * `onlyText`
Boolean que em caso de true retorna o texto concatenado ao invés de um array de Strings

##### Retorno

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
    var text = helper.wrap('#myId').text({
        sanitize: true, 
        onlyFirst: true, 
        onlyText: true
    });
    helper.pageview(text);
});
```

#### find(sel)
Função que retorna um objeto Wrap de todos os elementos que batem com o seletor.

##### Argumentos
* `sel`
String do seletor CSS que baterá com o elemento HTML.

##### Retorno

##### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
    var text = helper.wrap('#myId').find('.myClass').text();
    helper.pageview(text);
});
```

#### map(func, params)
Função que executa um código para cada elemento.

##### Argumentos
* `func`
Função a ser executada, pode receber um parâmetro que será a referência do elemento iterado.

* `params`
Array de parametros utilizados na função.

#### Exemplo de código
```javascript
analyticsHelper.safeFn('Nome da Tag', function(helper){
    var sources = helper.wrap('img').map(function(elm){
        return elm.src;
    });
});
```
