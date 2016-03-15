import angular from 'angular';
import qiniuC from '../../libs/qiniu.client';
import template from './index.html';
import './index.scss';

let panelTpl = () => {
  return {
    template: template,
    controller: 'panelCtrl',
    controllerAs: 'panel',
    bindToController: true,
    restrict: 'E'
  }
};

class panelCtrl {
  constructor($scope, Upload, $timeout, $http) {
    this.$scope = $scope;
    this.Upload = Upload;
    this.$timeout = $timeout;
    this.$http = $http;
    this.hasPic = false;
    
    this.$scope.$watch('panel.files', this.upload(this.files));
  }

  _getToken(fn) {
    this.$http({
      method: 'get',
      url: '/uptoken',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).success((res) => {
      var token = res.uptoken;
      if (fn) {
        fn(token)
      } else {
        return token;
      }
    }).error((err) => {
      console.log(err);
    })
  }

  upload(files) {
    var self = this,
        reader = new FileReader(),
        domain = 'http://7xrwkg.com1.z0.glb.clouddn.com/';

    return (files) => {
      if (files && files.length) {

        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if (!file.$error) {

            // render image
            self.imgSrc = window.URL.createObjectURL(file);
            self.hasPic = true;
            self.renderToCanvas(self.imgSrc);

            // save image to mongoDB
            self._getToken((token) => {
              qiniuC.uploadImage(file, token, file.name, (imgSrc) => {
                // save fileName & imgSrc
                self.saveToMongoDB(file.name, imgSrc);
              });
            });

          }
        }
      }
    }
  }

  saveToMongoDB(fileName, imgSrc) {
    this.$http({
      method: 'post',
      url: '/save',
      data: {
        fileName: fileName,
        imageSrc: imgSrc
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      transformRequest: (obj) => {
        var str = [];
        for (var p in obj) {
          str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
        }
        return str.join('&');
      }
    }).success((res) => {
      console.log(res);
    }).error((err) => {
      console.log(err);
    });
  }

  renderToCanvas(imgSrc) {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d'),
        image = new Image()
        image.src = imgSrc;

    image.onload = () => {

      var $panel = document.getElementsByClassName('panel-canvas')[0],
          panelW = $panel.clientWidth,
          panelH = $panel.clientHeight,
          imageW = image.width,
          imageH = image.height,
          scale;

      context.clearRect(0, 0, canvas.width, canvas.height);

      canvas.width = panelW;
      canvas.height = panelH;

      if (imageW > imageH) {
        scale = imageW / panelW;
      } else {
        scale = imageH / panelH;
      }

      imageW = imageW / scale;
      imageH = imageH / scale;

      var dx = (panelW - imageW) / 2,
          dy = (panelH - imageH) / 2;

      context.drawImage(image, dx, dy, imageW, imageH);
    } 
  }
}

panelCtrl.$inject = ['$scope', 'Upload', '$timeout', '$http'];

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
