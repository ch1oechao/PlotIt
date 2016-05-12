(function() {
  'use strict';

  var qiniu = require('qiniu');
  var client = new qiniu.rs.Client();

  var config = require('../credentials')['qiniu'];

  qiniu.conf.ACCESS_KEY = config.ACCESS_KEY;
  qiniu.conf.SECRET_KEY = config.SECRET_KEY;

  exports.config = config;

  // 生成 token
  exports.uptoken = function(key) {
    var putPolicy = new qiniu.rs.PutPolicy2({
      scope: config.bucket,
      saveKey: !!key ? key : null
    });
    return putPolicy.token();
  }

  // 上传文件
  exports.uploadFile = function(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, res) {
      if (!err) {
        // 上传成功
        console.log(res.hash, res.key, res.persisenetId);
      } else {
        // 上传失败
        console.log(err);
      }
    });
  }

  // 获取文件信息
  exports.getFileInfo = function(key) {
    client.stat(config.bucket, key, function(err, res) {
      if (!err) {
        console.log(res.hash, res.fsize, res.putTime, res.mimeType);
      } else {
        console.log(err);
      }
    });
  }

  // 删除文件
  exports.deleteFile = function(key, fn) {
    client.remove(config.bucket, key, function(err) {
      if (!err) {
        var res = {success: true};
        if (fn) {
          fn(res);
        } else {
          return res;
        }
        console.log('Qiniu delete file... is OK !');
      } else {
        console.log(err);
      }
    });
  }

  // 文件下载
  exports.getDownloadUrl = function(key) {
    var policy = new qiniu.rs.GetPolicy(),
        curTime = +new Date(),
        url = config.domain + key + '?' + curTime;
    // return policy.makeRequest(url);
    return url + '?attname=';
  }

})();
