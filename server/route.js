(function() {
  'use strict';
  var ctrl = require('./controller');

  module.exports = function(app) {
    app.get('/', ctrl.home.index);

    app.get('/*', (req, res) => {
      res.redirect('/');
    });
  }
})();
 