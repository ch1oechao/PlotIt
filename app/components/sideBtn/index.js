import angular from 'angular';
import template from './index.html';
import QiniuC from '../../libs/qiniu.client';
import './index.scss';

let sideBtnTpl = () => {
  return {
    template: template,
    controller: 'sideBtnCtrl',
    controllerAs: 'sideBtn',
    bindToController: true,
    restrict: 'E',
    link: (scope, element, attrs) => {

      var self = scope.sideBtn;

      if (attrs.sideState === 'plot') {
        self.isPlot = true;
      } else {
        self.isPlot = false;
      }

      self.$scope.$watch('panel.PlotitUtil', self.setPlotitUtil.bind(self));

      self.$scope.$watch('panel.newImage', self.getNewImage.bind(self));

      self.$scope.$watch('palette.brightness', self.watchBrightness.bind(self));
      self.$scope.$watch('palette.saturation', self.watchSaturation.bind(self));
      self.$scope.$watch('palette.contrast', self.watchContrast.bind(self));
      self.$scope.$watch('palette.sepia', self.watchSepia.bind(self));
      self.$scope.$watch('palette.blur', self.watchBlur.bind(self));
      self.$scope.$watch('palette.noise', self.watchNoise.bind(self));
      self.$scope.$watch('palette.curFilter', self.watchFilter.bind(self));
    }
  }
};

class sideBtnCtrl {
  constructor($scope, $location, Service, $rootScope, $route) {
    this.$scope = $scope;
    this.$location = $location;
    this.Service = Service;
    this.$rootScope = $rootScope;
    this.$route = $route;
    this.isPlot = false;
    this.isChange = false;
    this.imageConfig = {
      adjusters: {},
      filter: ''
    };
  }

  setPlotitUtil(PlotitUtil) {
    this.PlotitUtil = PlotitUtil;
  }

  turnToCanvas() {
    this.$location.url('/plot');
  }

  turnToHome(isLoading) {
    if (!isLoading) {
      this.$location.url('/home');  
    }
  }

  undoImage(isLoading, palette) {
    var self = this;

    // roll back all the palette config
    if (palette) {
      palette.brightness = 0;
      palette.saturation = 0;
      palette.contrast = 0;
      palette.sepia = 0;
      palette.blur = 0;
      palette.noise = 0;
      palette.curFilter = '';
    }

    if (this.isPlot && !isLoading) {
      var paths = (this.$location.$$path).split('/'),
          id = paths[paths.length - 1];
      // check the id
      if (id.length === 24) {
        var pics = this.$rootScope.pics;
        pics.map((item) => {
          if (item._id === id) {
            this.PlotitUtil.renderImage(item.imageSrc);
          }
        });
      }
    }

  }

  watchBrightness(val) {
    this.imageConfig.adjusters.brightness = val;
  }

  watchSaturation(val) {
    this.imageConfig.adjusters.saturation = val;
  }

  watchContrast(val) {
    this.imageConfig.adjusters.contrast = val;
  }

  watchSepia(val) {
    this.imageConfig.adjusters.sepia = val;
  }

  watchBlur(val) {
    this.imageConfig.adjusters.blur = val;
  }

  watchNoise(val) {
    this.imageConfig.adjusters.noise = val;
  }

  watchFilter(val) {
    this.imageConfig.filter = val;
  }

  getNewImage(val) {
    this.newImage = val;
  }

  updateImage(isLoading) {

    if (isLoading) {
      return;
    }

    var self = this,
        paths = (this.$location.$$path).split('/'),
        id = paths[paths.length - 1],
        curImage;

    // check the id
    if (id.length === 24) {
      var pics = this.$rootScope.pics;
      pics.map((item) => {
        if (item._id === id) {
          curImage = item;
        }
      });
    }

    // check image
    if (curImage || this.newImage) {

      var curImage = curImage || this.newImage,
          size = curImage.size,
          imageBase64 = this.PlotitUtil.convertToBase64(size);

      // get Qiniu token
      this.Service.genToken((token) => {

        // delete changed pic from qiniu
        this.Service.deletePicFromQiniu(curImage._id);
        
        var key = curImage.key,
            tag = 'changed_';

        // upload new base64 pic to qiniu
        QiniuC.uploadBase64(imageBase64, token, tag + key, (res) => {

          if (res.key === tag + key) {
            var src = QiniuC.config.domain + res.key,
                imageConfig = JSON.stringify(self.imageConfig || {});
            // update mongoDB
            self.Service.updatePic({
              id: curImage._id,
              changeSrc: src,
              imageConfig: imageConfig
            }, (res) => {
              if (res && res.success) {
                // back to home
                self.turnToHome();
                self.$route.reload();
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

sideBtnCtrl.$inject = ['$scope', '$location', 'Service', '$rootScope', '$route'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
