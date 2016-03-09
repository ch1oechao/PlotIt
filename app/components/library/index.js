import angular from 'angular';
import './index.scss';

let libraryTpl = () => {
  return {
    template: require('./index.html'),
    controller: 'libraryCtrl',
    controllerAs: 'library'
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
