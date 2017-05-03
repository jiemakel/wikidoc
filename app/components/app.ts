namespace app {
  'use strict'
  let m: angular.IModule = angular.module('app', [ 'http-auth-interceptor', 'ui.router', 'ui.bootstrap', 'ngPrettyJson' ])
  m.config(($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) => {
    $urlRouterProvider.otherwise('/')
    $stateProvider.state('main', {
      url: '/?title',
      template: '<main></main>'
      })
  })
  }
