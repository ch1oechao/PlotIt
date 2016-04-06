routing.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

export default function routing($stateProvider, $urlRouterProvider, $locationProvider) {

  // $locationProvider.html5Mode(true);

  $urlRouterProvider.when('', '/home');
  $urlRouterProvider.when('/', '/home');
  // $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      template: require('./views/index.display.html')
    })
    .state('plot', {
      url: '/plot',
      template: require('./views/index.plot.html')
    })
    .state('/plot/:id', {
      url: '/plot/:id',
      template: require('./views/index.plot.html')
    })
}
 