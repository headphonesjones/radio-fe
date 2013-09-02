exports.config =
  # See docs at http://brunch.readthedocs.org/en/latest/config.html.
  modules:
    definition: false
    wrapper: false
  paths:
    public: '_public'
  files:
    javascripts:
      joinTo:
        'js/app.js': /^app/
        'js/vendor.js': (path) -> path.indexOf("vendor") isnt -1 and path.indexOf("modernizr") is -1
        'js/modernizr.js': (path) -> path.indexOf('modernizr') isnt -1
        'test/scenarios.js': /^test(\/|\\)e2e/
      order:
        before: [
          'vendor/scripts/console-helper.js'
          'vendor/scripts/angular/angular.js'
        ]

    stylesheets:
      joinTo:
        'css/app.css': (path) -> path.indexOf("sports") is -1
     #   'css/app.css': /^(app|vendor)/ 
        'css/sports.css': (path) -> path.indexOf("sports") isnt -1
    templates:
      joinTo: 'js/templates.js'

  plugins:
    jade:
      pretty: yes # Adds pretty-indentation whitespaces to output (false by default)

  # Enable or disable minifying of result js / css files.
  # minify: true