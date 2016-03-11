import angular from 'angular';
import template from './index.html';
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
  constructor() {
    
  }
}

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
