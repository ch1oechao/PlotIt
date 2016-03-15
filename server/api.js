(function() {
  'use strict';

  var mongoose = require('mongoose'),
      qiniu = require('qiniu'),
      qnServer = require('./qiniu.server'),
      Pic = mongoose.model('Pic');

  exports.index = function(req, res, next) {
    res.render('index');
  };

  exports.getPics = function(req, res) {
    Pic.fetch(function(err, pics) {
      if (err) {
        throw err;
      }
      res.send({
        list: pics
      });
    })
  };

  exports.genToken = function(req, res) {
    var key = req.body.key;
    res.header('Cache-Control', 'max-age=0, private, must-revalidate');
    res.header('Pragma', 'no-cache');
    res.header('Expires', 0);
    res.json({
      uptoken: qnServer.uptoken()
    });
  };

  exports.saveImage = function(req, res) {
    var reqData = req.body;
    if (reqData.fileName && reqData.imageSrc) {
      res.send({
        status: 'OK'
      })
    }
  };

})();
 