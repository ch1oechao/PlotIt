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
  constructor($location) {
    this.location = $location;
    this.isPlot = false;
  }

  turnToCanvas() {
    this.isPlot = true;
    this.location.url('/plot');
  }

  turnToHome() {
    this.isPlot = false;
    this.location.url('/');
  }
}

sideBtnCtrl.$inject = ['$location'];

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
