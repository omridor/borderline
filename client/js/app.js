'use strict';

angular.module('borderlineApp',['ngResource', 'ui.router', 'formly', 'formlyBootstrap', 'ui.bootstrap', 'dialogs.main', 'ngMessages', 'gm.datepickerMultiSelect', 'checklist-model'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // UI router is nested in /form, so all following states are in path /form/**  
  $stateProvider
    .state('when', {
      url: '/when',
      templateUrl: 'form-when.html'
    })

    .state('where', {
      url: '/where',
      templateUrl: 'form-where.html'
    })
    
    .state('what', {
      url: '/what',
      templateUrl: 'form-what.html'
    })

    .state('who', {
      url: '/who',
      templateUrl: 'form-who.html'
    })

    .state('how', {
      url: '/how',
      templateUrl: 'form-how.html'
    })

    .state('done', {
      url: '/done',
      templateUrl: 'form-done.html'
    });


  // Start in step 1 - 'when'  
  $urlRouterProvider.otherwise('what');
});