'use strict';

angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'dialogs.main', 'ngMessages'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // UI router is nested in /form, so all following states are in path /form/**  
  $stateProvider
    .state('general', {
      url: '/general',
      templateUrl: 'form-general.html'
    })

    .state('location', {
      url: '/location',
      templateUrl: 'form-location.html'
    })
    
    .state('ids', {
      url: '/ids',
      templateUrl: 'form-ids.html'
    })

    .state('confirm', {
      url: '/confirm',
      templateUrl: 'form-confirm.html'
    })

    .state('done', {
      url: '/done',
      templateUrl: 'form-done.html'
    });


  // Start in step 1 - 'general'  
  $urlRouterProvider.otherwise('general');
});