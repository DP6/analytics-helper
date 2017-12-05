var arrConcat = Array.prototype.concat;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var fn = {};
var options = {
  helperName: 'analyticsHelper',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || ''),
  waitQueue: true,
  eventQueue: [],
  containerID: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  errorSampleRate: 1
};