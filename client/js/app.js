'use strict';

angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'dialogs.main', 'mgo-angular-wizard'])
.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state('form', {
      url: '/form',
      templateUrl: '/dist/views/form.html',
      controller: 'FormController',
      controllerAs: 'vm'
    })
    .state('preFormLogin', {
      url: '/login',
      templateUrl: '/dist/views/preFormLogin.html'
    })
    .state('warning', {
      url: '/warning',
      templateUrl: '/dist/views/warning.html'
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
    .state('faq', {
      url: '/faq',
      templateUrl: '/dist/views/faq.html'
    })
    .state('about', {
      url: '/about',
      templateUrl: '/dist/views/about.html'
    })
    .state('done', {
      url: '/done',
      templateUrl: '/dist/views/done.html'
    });

  $urlRouterProvider.otherwise('home');

  $locationProvider.html5Mode(true);
}]);
