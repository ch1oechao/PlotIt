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
            this.PlotitUtil.renderImage(item.imageSrc);
          }
        });
      }
    }

  }

  updateImage(isLoading) {

    if (isLoading) {
      return;
    }

    var paths = (this.$location.$$path).split('/'),
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

      var size = curImage.size,
          imageBase64 = this.PlotitUtil.convertToBase64(size);

      // get Qiniu token
      this.Service.genToken((token) => {
        // delete origin pic from qiniu
        this.Service.deletePicFromQiniu(curImage._id, (res) => {
          if (res && res.success) {
            // upload new base64 pic to qiniu
            QiniuC.uploadBase64(imageBase64, token, curImage.key, (res) => {
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

sideBtnCtrl.$inject = ['$scope', '$location', 'Service', '$rootScope', '$route'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
