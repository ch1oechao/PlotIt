import angular from 'angular';
import template from './index.html';
import CanvasUtil from '../../libs/canvas.util';
import Canvas2image from '../../libs/canvas2image';
import qiniuC from '../../libs/qiniu.client';
import './index.scss';

let sideBtnTpl = () => {
  return {
    template: template,
    controller: 'sideBtnCtrl',
    controllerAs: 'sideBtn',
    bindToController: true,
    restrict: 'E',
    link: (scope, element, attrs) => {
      if (attrs.sideState === 'plot') {
        scope.sideBtn.isPlot = true;
      } else {
        scope.sideBtn.isPlot = false;
      }
    }
  }
};

class sideBtnCtrl {
  constructor($location, Service, $rootScope) {
    this.$location = $location;
    this.Service = Service;
    this.CanvasUtil = new CanvasUtil();
    this.$rootScope = $rootScope;
    this.isPlot = false;
    this.isChange = false;
  }

  turnToCanvas() {
    this.$location.url('/plot');
  }

  turnToHome() {
    this.$location.url('/');
  }

  undoImage() {
    var self = this;
    if (this.isPlot) {
      var paths = (this.$location.$$path).split('/'),
          id = paths[paths.length - 1];
      // 判断 id 是否正确
      if (id.length === 24) {
        var pics = this.$rootScope.pics;
        pics.map((item) => {
          if (item._id === id) {
            this.CanvasUtil.render(item.imageSrc);
          }
        });
      }
    }
  }

  updateImage() {
    var canvas = this.CanvasUtil.$canvas;

    // 是否更改 && this.isChange
    var paths = (this.$location.$$path).split('/'),
        id = paths[paths.length - 1],
        imageSize = -1,
        curImage;

    // 判断 id 是否正确
    if (id.length === 24) {
      var pics = this.$rootScope.pics;
      pics.map((item) => {
        if (item._id === id) {
          curImage = item;
          imageSize = item.size;
        }
      });
    }

    // isNewImage
    if (curImage) {
      var imageBase64 = this.CanvasUtil.convertToBase64(canvas, imageSize);

      // upload to Qiniu
      this.Service.genToken((token) => {
        qiniuC.uploadBase64(imageBase64, token, (res) => {

          // save to  mongoDB
          var changeData = angular.extend(res, {
            id: curImage._id,
            imageSrc: qiniuC.config.domain + res.key
          });

          this.Service.updatePic(changeData, (res) => {
            if (res && res.success) {
              console.log('save');
              this.turnToHome();
            }
          });

        });

      });

    } else {
      this.turnToHome();
    }
    
  }

}

sideBtnCtrl.$inject = ['$location', 'Service', '$rootScope'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
