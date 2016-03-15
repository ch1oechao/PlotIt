import angular from 'angular';
import template from './index.html';
import Canvas2image from '../../libs/canvas2image';
import qiniuC from '../../libs/qiniu.client';
import './index.scss';

let sideBtnTpl = () => {
  return {
    template: template,
    controller: 'sideBtnCtrl',
    controllerAs: 'sideBtn',
    bindToController: true,
    restrict: 'E'
  }
};

class sideBtnCtrl {
  constructor($location, $http) {
    this.$location = $location;
    this.$http = $http;
    this.isPlot = false;
  }

  turnToCanvas() {
    this.isPlot = true;
    this.$location.url('/plot');
  }

  turnToHome() {
    this.isPlot = false;
    this.$location.url('/');
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

  saveToImage() {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d');

    var imageBase64 = this._convertCanvasToBase64(canvas);

    // this.$http({
    //   method: 'post',
    //   url: '/save',
    //   data: {
    //     imgBase: 'imageBase64'
    //   },
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    //   },
    //   transformRequest: (obj) => {
    //     var str = [];
    //     for (var p in obj) {
    //       str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    //     }
    //     return str.join('&');
    //   }
    // }).success((res) => {
    //   console.log(res);
    // }).error((err) => {
    //   console.log(err);
    // });

    // this._getToken((token) => {
    //   qiniuC.uploadImage(image, token, '12345.png');
    // });
    
    // Canvas2image.saveAsPNG(canvas);
  }

  _convertCanvasToBase64(canvas) {
    return canvas.toDataURL();
  }

}

sideBtnCtrl.$inject = ['$location', '$http'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
