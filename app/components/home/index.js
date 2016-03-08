import angular from 'angular';
import './index.scss';

let home = () => {
  return {
    template: require('./index.html'),
    controller: 'homeCtrl',
    controllerAs: 'home'
  }
};

class homeCtrl {
  constructor() {
    // this.title = 'plotit';
  }
}

const MODULE_NAME = 'plotit';

angular.module(MODULE_NAME, [])
  .directive('home', home)
  .controller('homeCtrl', homeCtrl);

export default MODULE_NAME;
