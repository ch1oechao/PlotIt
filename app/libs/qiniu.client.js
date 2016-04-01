import Base64 from './base64';

(function() {

  var config = {
    ACCESS_KEY: '-L7HvCAanSlX7WOP-9w0UzRmzUddhgC2Sgmj__Km',
    SECRET_KEY: 'y0DwGOrEO-1sAop0QGpLqI0zXPRGSUQgR8JB7Le1',
    bucket: 'plotit',
    uptoken_url: 'uptoken',
    domain: 'http://7xrwkg.com1.z0.glb.clouddn.com/'
  };

  exports.config = config;

  // 上传图片文件
  exports.uploadImage = function(f, token, key, cb) {
    var Qiniu_UploadUrl = 'http://up.qiniu.com',
        xhr = new XMLHttpRequest();

    xhr.open('POST', Qiniu_UploadUrl, true);

    var formData, startDate;

    formData = new FormData();
    if (key !== null && key !== undefined) formData.append('key', key);
    formData.append('token', token);
    formData.append('file', f);
    
    var taking;
    xhr.upload.addEventListener("progress", function(evt) {
      if (evt.lengthComputable) {
        var nowDate = new Date().getTime();
        taking = nowDate - startDate;
        var x = (evt.loaded) / 1024;
        var y = taking / 1000;
        var uploadSpeed = (x / y);
        var formatSpeed;
        if (uploadSpeed > 1024) {
            formatSpeed = (uploadSpeed / 1024).toFixed(2) + "Mb\/s";
        } else {
            formatSpeed = uploadSpeed.toFixed(2) + "Kb\/s";
        }
      }
    }, false);

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200 && xhr.responseText != "") {
          var blkRet = JSON.parse(xhr.responseText);

          if (cb) {
            cb(config.domain + blkRet.key);
          } else {
            return config.domain + blkRet.key;  
          } 
      }
    };

    startDate = new Date().getTime();
    xhr.send(formData);
  };

  // 上传 Base64 编码
  exports.uploadBase64 = function(pic, token, key, cb) {
    var url = 'http://up.qiniu.com/putb64/-1/key/' + Base64.encode(key),
        xhr = new XMLHttpRequest(),
        upToken = 'UpToken ' + token;

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var blkRet = JSON.parse(xhr.responseText);
        if (cb) {
          cb(blkRet);
        } else {
          return blkRet;
        }
      }
    }

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.setRequestHeader('Authorization', upToken);
    xhr.send(pic);

  }

})();
