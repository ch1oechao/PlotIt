(function() {
  'use strict';

  var api = require('./api');

  module.exports = function(app) {

    app.get('/', api.index);

    app.get('/list', api.getImageList);

    app.post('/uptoken', api.genToken);

    app.post('/image', api.getImage);

    app.post('/save', api.saveImage);

    app.post('/update', api.updateImage);

    app.delete('/qiniu/:id', api.delImageFromQiniu);

    app.delete('/image/:id', api.deleteImage);

    app.post('/download', api.downloadImageFromQiniu);

    app.get('/*', (req, res) => {
      res.redirect('/');
    });
  }
  
})();
 