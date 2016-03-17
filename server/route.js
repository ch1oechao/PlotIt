(function() {
  'use strict';

  var api = require('./api');

  module.exports = function(app) {

    app.get('/', api.index);

    app.get('/list', api.getImageList);

    app.get('/uptoken', api.genToken);

    app.post('/image', api.getImage);

    app.post('/save', api.saveImage);

    app.post('/update', api.updateImage);

    app.delete('/image/:id', api.delImageFromQiniu, api.delImageFromDB);

    app.post('/download', api.downloadImageFromQiniu);

    app.get('/*', (req, res) => {
      res.redirect('/');
    });
  }
  
})();
 