import angular from 'angular';
import './index.scss';

let sideBtnTpl = () => {
  return {
    template: require('./index.html'),
    controller: 'sideBtnCtrl',
    controllerAs: 'sideBtn'
  }
};

class sideBtnCtrl {
  constructor() {
    // this.title = 'plotit';
  }
}

export default {
  tpl: sideBtnTpl,
  controller: sideBtnCtrl
};
