import angular from 'angular';
import template from './index.html';
import './index.scss';

let panelTpl = () => {
  return {
    template: template,
    controller: 'panelCtrl',
    controllerAs: 'panel',
    bindToController: true,
    restrict: 'E'
  }
};

class panelCtrl {
  constructor() {
    // this.title = 'plotit';
  }
}

export default {
  tpl: panelTpl,
  controller: panelCtrl
};
