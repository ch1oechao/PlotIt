import angular from 'angular';
import uirouter from 'angular-ui-router';

import './index.scss';

routes.$inject = ['$stateProvider'];


// directives
let newCanvas = () => {
  return {
    template: require('./index.html'),
    controller: 'newCanvasCtrl',
    controllerAs: 'newCanvas'
  }
};

// controller
class newCanvasCtrl {
  constructor() {
    this.name = 'haha';
  }
}
  
export default angular.module('app.newCanvas', [uirouter])
  .directive('newCanvas', newCanvas)
  .controller('newCanvasCtrl', newCanvasCtrl);
