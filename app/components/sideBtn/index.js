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

    // 是否更改
    if (canvas && this.isChange) {

      var imageBase64 = this._convertCanvasToBase64(canvas);

      // upload to Qiniu
      

      // save to  mongoDB
      var img = {
        name: '',
        imageSrc: ''
      }
      this.Service.savePic(img, (res) => {
        console.log(res);
      });

      // Canvas2image.saveAsPNG(canvas);
      
    } else {
      this.turnToHome();
    }

  }

  _convertCanvasToBase64(canvas) {
    return canvas.toDataURL();
  }

}

sideBtnCtrl.$inject = ['$location', 'Service', '$rootScope'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
