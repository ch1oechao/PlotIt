(function() {
  'use strict';

  var api = require('./api');

  module.exports = function(app) {

    app.get('/', api.index);

    app.get('/images', api.getImages);

    app.get('/uptoken', api.genToken);

    app.post('/save', api.saveImage);

    app.post('/item', api.getItem);

    app.get('/*', (req, res) => {
      res.redirect('/');
    });
  }
  
})();
 