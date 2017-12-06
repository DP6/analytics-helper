var arrConcat = Array.prototype.concat;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var fn = {};
var options = {
  helperName: 'analyticsHelper',
  dataLayerName: 'dataLayer',
  debug: ({{Debug Mode}} || ''),
  waitQueue: true,
  containerID: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  errorSampleRate: 1
};

var internal = {
  _sentPageview: false,
  _eventQueue: []
}