import angular from 'angular';
import template from './index.html';
import Plotit from '../../libs/plotit';
import './index.scss';

let paletteTpl = () => {
  return {
    template: template,
    controller: 'paletteCtrl',
    controllerAs: 'palette',
    bindToController: true,
    restrict: 'E',
    link: (scope, elements, attrs) => {
      var self = scope.palette,
          $scope = self.$scope;

      var $brightness = document.querySelector('#brightness');

      $scope.$watch('panel.PlotitUtil', self.setPlotitUtil.bind(self));
      $scope.$watch('panel.curImageSrc', self.setFilterImgSrc.bind(self));

      $scope.$watch('palette.brightness', self.processBrightness.bind(self));
      $scope.$watch('palette.saturation', self.processSaturation.bind(self));
      $scope.$watch('palette.contrast', self.processContrast.bind(self));
      $scope.$watch('palette.sepia', self.processSepia.bind(self));
      $scope.$watch('palette.noise', self.processNoise.bind(self));
      $scope.$watch('palette.blur', self.processBlur.bind(self));
    }
  }
};

class paletteCtrl {
  constructor($scope) {
    this.brand = 'PlotIt';
    this.$scope = $scope;
    this.isFilter = true;
    this.curTime = +(new Date()) + 1024;
    this.filterImgSrc = 'http://7xr6bj.com1.z0.glb.clouddn.com/01.jpg?imageView2/2/h/150/?' + this.curTime;
    this.Plotit = Plotit;
    // filters
    this.filters = [{
      name: 'Toaster',
      processor: 'toaster'
    }, {
      name: '1977',
      processor: '_1977'
    }, {
      name: 'Moon',
      processor: 'moon'
    }, {
      name: 'Aden',
      processor: 'aden'
    }, {
      name: 'Earlybird',
      processor: 'earlybird'
    }, {
      name: 'Walden',
      processor: 'walden'
    }, {
      name: 'X-pro II',
      processor: 'xpro2'
    }, {
      name: 'Lo-Fi',
      processor: 'lofi'
    }];

    // adjusters
    this.brightness = 0;
    this.saturation = 0;
    this.contrast = 0;
    this.sepia = 0;
    this.blur = 0;
    this.noise = 0;
  }

  setPlotitUtil(PlotitUtil) {
    this.PlotitUtil = PlotitUtil;
  }

  switchTab(isFilter) {
    this.isFilter = isFilter;
  }

  setFilterImgSrc(src) {
    if (src) {
      if (src.substr(0, 4) === 'http') {
        this.filterImgSrc = src + '?imageView2/2/h/150/?' + this.curTime;  
      } else {
        this.filterImgSrc = src;
      }
    }
  }

  renderFilter(processor) {
    this.curFilter = processor;
    this.PlotitUtil.resetImage();
    this.PlotitUtil.processFilter(processor, this.PlotitUtil.$canvas);
  }

  processBrightness(newVal, oldVal) {
    if (newVal !== 0) {
      this.PlotitUtil.processPixel('brightness', newVal - oldVal);
    }  
  }

  processSaturation(newVal, oldVal) {
    if (newVal !== 0) {
      this.PlotitUtil.processPixel('saturation', oldVal - newVal);
    }  
  }

  processContrast(newVal, oldVal) {
    if (newVal !== 0) {
      this.PlotitUtil.processPixel('contrast', newVal - oldVal);
    }  
  }

  processSepia(newVal, oldVal) {
    if (newVal !== 0) {
      this.PlotitUtil.processPixel('sepia', newVal - oldVal);
    }  
  }

  processNoise(val) {
    if (val !== 0) {
      this.PlotitUtil.processPixel('noise', val);  
    }
  }

  processBlur(newVal, oldVal) {
    if (newVal !== 0) {
      this.PlotitUtil.stackBlurImg(newVal - oldVal);
    }  
  }

}

paletteCtrl.$inject = ['$scope'];

export default {
  tpl: paletteTpl,
  controller: paletteCtrl
};
 