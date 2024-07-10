  export default {

    CUSTOM_PLUGINS_PATH: __dirname + '/test/fixtures/custom-plugins',

    DEBUG: true,
    RICH_LOG_ENABLED: true,
    DISABLE_SERVE_STATIC: true,

    baseAppUrl: "http://localhost",
    port: 8080,

    RESPONSE_TIMEOUT: 1 * 100, //ms

    IGNORE_DOMAINS_RE: /blacklisted.*/
  };