import angular from 'angular';
import template from './index.html';
import './index.scss';

let sidebarTpl = () => {
  return {
    template: template,
    controller: 'sidebarCtrl',
    controllerAs: 'sidebar',
    bindToController: true,
    restrict: 'E'
  }
};

class sidebarCtrl {
  constructor() {
    this.brand = 'PlotIt';
  }
}

export default {
  tpl: sidebarTpl,
  controller: sidebarCtrl
};
