# Analytics Helper

O Analytics Helper tem como objetivo facilitar a implementação, a manutenção e a padronização de *tags* no contexto de *digital analytics*.

Um exemplo dos esforços envolvidos no suporte à padronização está na implementação de funções similares às da biblioteca jQuery, comumente utilizada em projetos de tagueamento. Deste modo, mesmo na ausência desta, será possível garantir o padrão e qualidade da coleta dos dados (Consultar a tabela de compatibilidade). Caso da jQuery exista, o Analytics Helper simplesmente delega a execução para ela, ou seja, o código nos dois casos será o mesmo.

Resumindo, o utilize o Analytics Helper para:
* Ter acesso à funções de manipulação do DOM sem depender da jQuery;
* Enviar automaticamente alertas e eventos para o Google Analytics indicando possíveis erros de JavaScript no tagueamento;
* Funções simplificadas para coleta de dados;
* Padronização do código das tags.

## Como utilizar?

### Estendendo o Analytics Helper

### Compatibilidade

O Analytics Helper depende da função nativa `querySelectorAll`. Os navegadores com suporte a essa funcionalidade são:

| Chrome | Firefox | IE | Opera | Safari |
|--------|---------|----|-------|--------|
|      1 |     3.5 |  8 |    10 |    3.2 |

## Tag Managers

Inicialmente, na versão 1.0, a biblioteca dá suporte para o Google Tag Manager com envio de dados para o Google Analytics, mas está planejado o suporte para demais ferramentas do mercado também.

### Google Tag Manager
