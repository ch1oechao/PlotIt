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
    if (reqData.name && reqData.key && reqData.imageSrc) {
      
      var pic = new picModel(reqData);

      pic.save(function(err) {
        if (err) {
          console.log(err);
        }
        res.json({
          success: true
        });
      });
    }
  };

  exports.updateImage = function(req, res) {
    var reqData = req.body;

    if (reqData.id && reqData.key && reqData.imageSrc) {
      // delete origin image
      // Pic.findById(reqData.id, function(err, item) {
      //   // delete origin key
      //   qnServer.deleteFile(item.key);
      // });

      // update MongoDB
      var id = reqData.id;
      delete reqData.id;
      Pic.update({_id: id}, {
        $set: reqData
      }, function(err) {
        if (err) {
          console.log(err);
        }
        res.json({
          success: true
        });
      });
    }
  };


  exports.delImageFromQiniu = function(req, res, next) {
    Pic.findById(req.params.id, function(err, item) {
      qnServer.deleteFile(item.key);
      next();
    });
  };

  exports.delImageFromDB = function(req, res) {
    Pic.remove(req.params.id, function(err) {
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
    Pic.findById(req.body.id, function(err, item) {
      var rqUrl = qnServer.getDownloadUrl(item.key);
      res.json({
        url: rqUrl
      });
    });
  }

})();
 