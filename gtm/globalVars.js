var options = {
  helperName: 'analyticsHelper',
  dataLayerName: 'dataLayer',
  debug: ({{Container ID}} || ''),
  waitQueue: true,
  sentPageview: false,
  eventQueue: [],
  containerID: ({{Container ID}} || ''),
  exceptionEvent: 'gtm_dataQuality_event',
  exceptionCategory: 'GTM Exception',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event',
  errorSampleRate: 1
};

var fn = {};

var log = {
  info: function (info) {
    if (options.debug) {
      console.info('INFO: ', info);
    }
  }
};