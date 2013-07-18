({
  appDir: '../',
  baseUrl: ".",
  dir: '../form-render-dist'
  , modules: [
    { name: 'main' }
  ]
  , shim: {
    "jquery.expose": {
      deps: ['jquery'],
      exports: 'jQuery.expose'
    },
    "jquery.overlay": {
      deps: ['jquery'],
      exports: 'jQuery.overlay'
    },
    "jquery.dateinput": {
      deps: ['jquery'],
      exports: 'jQuery.dateinput'
    },
    "jquery.datepicker": {
      deps: ['jquery', 'bootstrap'],
      exports: 'jQuery.datepicker'
    },
    "jquery.ajaxsubmit": {
      deps: ['jquery'],
      exports: 'jQuery.ajaxSubmit'
    },
    "jquery.birthdaypicker": {
      deps: ['jquery'],
      exports: 'jQuery.birthdaypicker'
    },
  }
  , paths: {
    // Major libraries
    jquery: 'libs/jquery/jquery-min',
    underscore: 'libs/underscore/underscore-min', // https://github.com/amdjs
    lodash: 'libs/lodash/lodash', // alternative to underscore
    backbone: 'libs/backbone/backbone-min', // https://github.com/amdjs
    bootstrap: 'libs/bootstrap/bootstrap',

    // Backbone Plugin
    modelbinder: 'libs/backbone-binder/Backbone.ModelBinder.min',
    validation: 'libs/backbone-validation/backbone-validation-amd',

    // jQuery Plugin
    "jquery.expose": 'libs/jquery-tools/jquery.tools.expose.min',
    "jquery.overlay": 'libs/jquery-tools/jquery.tools.overlay.min',
    "jquery.dateinput": 'libs/jquery-tools/jquery.tools.dateinput.min',
    "jquery.ajaxsubmit": 'libs/jquery-form-plugin/jquery.form.min',
    "jquery.birthdaypicker": 'libs/jquery-form-plugin/bdate-picker',

    // Bootstrap Plugin
    "jquery.datepicker": 'libs/bootstrap-datepicker/bootstrap-datepicker',

    // Require.js plugins
    text: 'libs/require/text',

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: 'templates',
    views: 'views'
  }
})
