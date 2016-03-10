import angular from 'angular';
import template from './index.html';
import './index.scss';

let paletteTpl = () => {
  return {
    template: template,
    controller: 'paletteCtrl',
    controllerAs: 'palette',
    bindToController: true,
    restrict: 'E'
  }
};

class paletteCtrl {
  constructor() {
    this.brand = 'PlotIt';
  }
}

export default {
  tpl: paletteTpl,
  controller: paletteCtrl
};
