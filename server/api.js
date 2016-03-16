(function() {
  'use strict';

  var mongoose = require('mongoose'),
      picModel = require('./model'),
      qiniu = require('qiniu'),
      qnServer = require('./qiniu.server'),
      Pic = mongoose.model('Pic');

  exports.index = function(req, res, next) {
    res.render('index');
  };

  exports.getImages = function(req, res) {
    Pic.fetch(function(err, pics) {
      if (err) {
        throw err;
      }
      res.send({
        list: pics
      });
    })
  };

  exports.getItem = function(req, res) {
    var _id = req.body.id;
    Pic.findById(_id, function(err, item) {
      res.send(item);
    });
  }

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
    if (reqData.name && reqData.imageSrc) {
      
      var pic = new picModel(reqData);

      pic.save(function(err) {
        if (!err) {
          res.send({
            status: 'OK'
          }) 
        } else {
          console.log(err);
        }
      });

    }
  };

})();
 