'use strict';

/**
 * @ngdoc overview
 * @name tipsApp
 * @description
 * # tipsApp
 *
 * Main module of the application.
 */
angular
  .module('tipsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'TipsServices',
    'CategoriesServices'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      }) 
      .when('/sign', {
        templateUrl: 'views/sign.html',
        controller: 'TestCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
