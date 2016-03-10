import angular from 'angular';
import template from './index.html';
import './index.scss';

let libraryTpl = () => {
  return {
    template: template,
    controller: 'libraryCtrl',
    controllerAs: 'library',
    bindToController: true,
    restrict: 'E'
  }
};

class libraryCtrl {
  constructor() {
    // this.title = 'plotit';
  }
}

export default {
  tpl: libraryTpl,
  controller: libraryCtrl
};
