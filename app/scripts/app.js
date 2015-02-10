'use strict';

/**
 * @ngdoc overview
 * @name tipsApp
 * @description
 * # tipsApp
 *
 * Main module of the application.
 */


 var resolve = {
    data:function($rootScope, $q, $http, $location,  $cookieStore, IsLoggedIn, Login){
        var deferred = $q.defer();
        var currentUser = $cookieStore.get('current_user');
        if(currentUser){
          console.log('Hi user',currentUser);
          $rootScope.isLoggedIn = true;
          deferred.resolve(currentUser);
        } else{
          $rootScope.isLoggedIn = false;
          deferred.reject();
          $location.path('/');
        }
    }
  };



angular
  .module('tipsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'TipsServices',
    'CategoriesServices',
    'LoginServices',
    'SignupServices',
    'ui.bootstrap',
    'IsLoggedInServices',
    'signoutServices',
    'updateServices',
    'TipsUserServices'
    // 'tipCategoryServices'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'MainCtrl',
        resolve: resolve
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'TipsCtrl',
        resolve: resolve
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'SessionCtrl',
        resolve: resolve
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'SessionCtrl',
        resolve: resolve
      })
      .when('/notebook', {
        templateUrl: 'views/notebook.html',
        controller: 'SessionCtrl',
        resolve: resolve
      })      
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        resolve: resolve
      }) 
      .when('/signin', {
        templateUrl: 'views/sign.html',
        controller: 'SessionCtrl'
        // resolve:resolve
      })
      .otherwise({
        redirectTo: '/'  
      });
  });

