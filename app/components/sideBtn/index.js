import angular from 'angular';
import template from './index.html';
import Canvas2image from '../../libs/canvas2image';

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

  saveToImage() {
    var canvas = document.getElementById('plotitCanvas'),
        context = canvas.getContext('2d');

    Canvas2image.saveAsPNG(canvas);
  }

}

sideBtnCtrl.$inject = ['$location'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
