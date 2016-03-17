(function() {
  'use strict';

  var mongoose = require('mongoose'),
      picModel = require('./model'),
      qiniu = require('qiniu'),
      qnServer = require('./qiniu.server'),
      Pic = mongoose.model('Pic');

  exports.index = function(req, res) {
    res.render('index');
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

  exports.getImageList = function(req, res) {
    Pic.fetch(function(err, pics) {
      if (!err) {
        res.json({
          list: pics
        });
      } else {
        console.log(err);
      }
    });
  };

  exports.getImage = function(req, res) {
    var _id = req.body.id;
    Pic.findById(_id, function(err, item) {
      res.json(item);
    });
  };

  exports.saveImage = function(req, res) {
    var reqData = req.body;
    if (reqData.name && reqData.imageSrc) {
      
      var pic = new picModel(reqData);

      pic.save(function(err) {
        if (err) {
          console.log(err);
        }
        res.json({
          success: true
        })
      });
    }
  };

  exports.delImageFromQiniu = function(req, res, next) {
    var id = req.params.id;
    Pic.findById({_id: id}, function(err, item) {
      qnServer.deleteFile(item.name);
      next();
    });
  };

  exports.delImageFromDB = function(req, res) {
    var id = req.params.id;
    Pic.remove({_id: id}, function(err) {
      if (!err) {
        res.json({
          success: true
        });  
      } else {
        console.log(err);
      }
    }); 
  };

  exports.downloadImageFromQiniu = function(req, res) {
    var id = req.body.id;
    Pic.findById({_id: id}, function(err, item) {
      var rqUrl = qnServer.getDownloadUrl(item.name);
      res.json({
        url: rqUrl
      });
    });
  }

})();
 