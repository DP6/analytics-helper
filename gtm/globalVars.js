var options = {
  debug: {{Debug Mode}} || false,
  containerID: {{Container ID}} || '',
  customNamePageview: 'ga_pageview',
  customNameEvent: 'ga_event'
};

var log = {
  info: function (info) {
    if (options.debug) {
      console.log('INFO: ', info);
    }
  },
  error: function (error) {
    if (options.debug) {
      console.log(error);
    }
  }
};