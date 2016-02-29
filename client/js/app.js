var app = angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap']);
app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('report', {
      url: '/report',
      templateUrl: '/dist/views/report.html',
      controller: 'reportSubmissionController'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/dist/views/admin.html',
      controller: 'adminController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/dist/views/home.html'
    });

  $urlRouterProvider.otherwise('home');

  $locationProvider.html5Mode(true);
}]);
