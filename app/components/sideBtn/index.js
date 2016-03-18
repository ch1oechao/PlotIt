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
  constructor($location, Service, $rootScope, $route) {
    this.$location = $location;
    this.Service = Service;
    this.CanvasUtil = new CanvasUtil();
    this.$rootScope = $rootScope;
    this.$route = $route;
    this.isPlot = false;
    this.isChange = false;
  }

  turnToCanvas() {
    this.$location.url('/plot');
  }

  turnToHome(isLoading) {
    if (!isLoading) {
      this.$location.url('/home');  
    }
  }

  undoImage(isLoading) {
    var self = this;

    if (this.isPlot && !isLoading) {
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

  updateImage(isLoading) {

    if (isLoading) {
      return;
    }

    var canvas = this.CanvasUtil.$canvas,
        paths = (this.$location.$$path).split('/'),
        id = paths[paths.length - 1],
        curImage;

    // 判断 id 是否正确
    if (id.length === 24) {
      var pics = this.$rootScope.pics;
      pics.map((item) => {
        if (item._id === id) {
          curImage = item;
        }
      });
    }

    // isNewImage && this.isChange
    if (curImage) {

      var imageBase64 = this.CanvasUtil.convertToBase64(canvas, curImage.size);

      // get Qiniu token
      this.Service.genToken((token) => {
        // delete origin pic from qiniu
        this.Service.deletePicFromQiniu(curImage._id, (res) => {
          if (res && res.success) {
            // upload new base64 pic to qiniu
            qiniuC.uploadBase64(imageBase64, token, curImage.key, (res) => {
              if (res.key === curImage.key) {
                this.turnToHome();
                this.$route.reload();
              }
            });
          }
        });
      });

    } else {
      this.turnToHome();
    }
    
  }

}

sideBtnCtrl.$inject = ['$location', 'Service', '$rootScope', '$route'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
