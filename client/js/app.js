var app = angular.module('borderlineApp',['ngResource', 'ui.router']);
app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('report', {
      url: '/report',
      templateUrl: '/views/report.html',
      controller: 'reportsController'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/views/admin.html',
      controller: 'reportsController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/views/home.html'
    });

  $urlRouterProvider.otherwise('home');

  $locationProvider.html5Mode(true);
}]);
