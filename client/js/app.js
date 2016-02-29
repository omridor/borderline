var app = angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap', 'ui.bootstrap']);
app.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('report', {
      url: '/report',
      templateUrl: '/dist/views/report.html',
      controller: 'ReportSubmissionController'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/dist/views/admin.html',
      controller: 'AdminController'
    })
    .state('home', {
      url: '/home',
      templateUrl: '/dist/views/home.html'
    })
    .state('done', {
      url: '/done',
      templateUrl: '/dist/views/done.html'
    });

  $urlRouterProvider.otherwise('home');

  $locationProvider.html5Mode(true);
}]);
