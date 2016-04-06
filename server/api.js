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
      uptoken: qnServer.uptoken(key)
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
      if (!err) {
        res.json(item);  
      } else {
        console.log(err);
        res.json({
          err: true
        });
      }
    });
  };

  exports.saveImage = function(req, res) {
    var reqData = req.body;
    if (reqData.name && reqData.key && reqData.imageSrc) {
      
      var pic = new picModel(reqData);
      pic.save(function(err, data) {
        if (!err) {
          res.json({
            success: true,
            pic: pic
          });
        } else {
          console.log(err);
        }
      });
    }
  };

  exports.updateImage = function(req, res) {
    var reqData = req.body,
        _id = reqData.id;

    if (_id) {

      Pic.findById(_id, function(err, pic) {

        delete reqData.id;

        Object.keys(reqData).map(function(item) {
          pic[item] = reqData[item];
        });

        Pic.update({_id: _id}, pic, function(err) {
          if (err) {
            console.log(err);
          }
          res.json({
            success: true
          });
        });

      });

    }

  };

  exports.deleteImage = function(req, res) {
    var id = req.params.id;
    Pic.findById({_id: id}, function(err, item) {
      var tag = 'changed_',
          key = tag + item.key;

      // del changeSrc
      qnServer.deleteFile(key);
      // del originSrc
      qnServer.deleteFile(item.key);
      // del img from mongoDB
      Pic.remove({_id: id}, function(err) {
        if (!err) {
          res.json({
            success: true
          });  
        } else {
          console.log(err);
        }
      });

    });
  }

  exports.delImageFromQiniu = function(req, res) {
    Pic.findById({_id: req.params.id}, function(err, item) {
      var tag = 'changed_',
          key = tag + item.key;
      qnServer.deleteFile(key, function(r) {
        if (r && r.success) {
          res.json({
            success: true
          });
        }
      });
    });
  };

  exports.downloadImageFromQiniu = function(req, res) {
    Pic.findById(req.body.id, function(err, item) {
      var key = item.key,
          tag = 'changed_';
      if (item.changeSrc) {
        key = tag + key;
      }
      var rqUrl = qnServer.getDownloadUrl(key);
      res.json({
        url: rqUrl
      });
    });
  }

})();
 