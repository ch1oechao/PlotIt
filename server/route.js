(function() {
  'use strict';

  var api = require('./api');

  module.exports = function(app) {

    app.get('/', api.index);

    app.get('/pics', api.getPics);

    app.get('/*', (req, res) => {
      res.redirect('/');
    });
  }
  
})();
 