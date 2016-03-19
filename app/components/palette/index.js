import angular from 'angular';
import template from './index.html';
import './index.scss';

let paletteTpl = () => {
  return {
    template: template,
    controller: 'paletteCtrl',
    controllerAs: 'palette',
    bindToController: true,
    restrict: 'E',
    link: (scope, element, attrs) => {
      var self = scope.palette;
      self.$scope.$watch('panel.curImageSrc', self.setFilterImgSrc.bind(self));
    }
  }
};

class paletteCtrl {
  constructor($scope) {
    this.brand = 'PlotIt';
    this.$scope = $scope;
    this.isFilter = true;
    this.filterImgSrc = 'http://7xrwkg.com1.z0.glb.clouddn.com/13.jpg?imageView2/2/h/150';
    
    // filters
    // none

    // adjusters
    this.brightness = 0;
    this.saturation = 0;
    this.contrast = 0;
    this.hue = 0;
    this.exposure = 0;
    this.blur = 0;
    this.sharpen = 0;
    this.noise = 0;
  }

  switchTab(isFilter) {
    this.isFilter = isFilter;
  }

  setFilterImgSrc(src) {
    if (src) {
      this.filterImgSrc = src;
    }
  }

}

paletteCtrl.$inject = ['$scope'];

export default {
  tpl: paletteTpl,
  controller: paletteCtrl
};
 