routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');
  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      template: require('../views/index.display.html'),
      onEnter: () => {
        console.log('enter HOME');
      }
    })
    .state('plot', {
      url: '/plot',
      template: require('../views/index.plot.html'),
      onEnter: () => {
        console.log('enter CANVAS');
      }
    })
}
 