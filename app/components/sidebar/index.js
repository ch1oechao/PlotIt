import angular from 'angular';
import './index.scss';

let sidebarTpl = () => {
  return {
    template: require('./index.html'),
    controller: 'sidebarCtrl',
    controllerAs: 'sidebar'
  }
};

class sidebarCtrl {
  constructor() {
    // this.title = 'plotit';
  }
}

export default {
  tpl: sidebarTpl,
  controller: sidebarCtrl
};
