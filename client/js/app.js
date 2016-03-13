'use strict';

angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'dialogs.main', 'ngAnimate'])
.config([
'$stateProvider',
'$urlRouterProvider',
'$locationProvider',
function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
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
    .state('form', {
      url: '/form',
      templateUrl: '/dist/views/form.html',
      controller: 'FormSubmissionController'
    })
    .state('form.warning', {
      url: '/warning',
      templateUrl: '/dist/views/subform1-warning.html',
    })
    .state('form.login', {
      url: '/login',
      templateUrl: '/dist/views/subform2-login.html',
    })
    .state('form.incident', {
      url: '/incident',
      templateUrl: '/dist/views/subform3-incident.html',
    })
    .state('form.ids', {
      url: '/ids',
      templateUrl: '/dist/views/subform4-ids.html',
    })
    .state('form.confirm', {
      url: '/confirm',
      templateUrl: '/dist/views/subform5-confirm.html',
    })
    .state('form.done', {
      url: '/done',
      templateUrl: '/dist/views/subform6-done.html'
    });

  $urlRouterProvider.otherwise('home');

  $locationProvider.html5Mode(true);
}]);
