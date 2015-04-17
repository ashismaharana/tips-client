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
    data:function($rootScope, $q, $cookieStore, $location){
        var deferred = $q.defer();
        var currentUser = $cookieStore.get('current_user');
        if(currentUser){
          console.log('Hi User',currentUser);
          // $rootScope.isLoggedIn = true;
          deferred.resolve(currentUser);
        } else{
          // $rootScope.isLoggedIn = false;
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
    'TipsUserServices',
    'VoteService',
    'NoteBookService',
    'FollowService',
    'searchServices',
    'xeditable'
  ])

  .config(function ($routeProvider, $locationProvider) {

    // use the HTML5 History API & set HTM5 mode true
    // $locationProvider.html5Mode(true);
    
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'MainCtrl',
        activetab: 'user',
        resolve: resolve
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'TipsCtrl',
        activetab: 'create',
        resolve: resolve,
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl',
        activetab: 'profile',
        resolve: resolve
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl',
        activetab: 'dashboard',
        resolve: resolve
      })
      .when('/notebook', {
        templateUrl: 'views/notebook.html',
        controller: 'NotebookCtrl',
        activetab: 'notebook',
        resolve: resolve
      })    

      // .when('/about', {
      //   templateUrl: 'views/about.html',
      //   controller: 'AboutCtrl',
      //   resolve: resolve
      // }) 
      // .when('/signin', {
      //   templateUrl: 'views/sign.html',
      //   controller: 'UserCtrl'
      //   // resolve:resolve
      // })
      .otherwise({
        redirectTo: '/'  
      });
      
      // use the HTML5 History API
      $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
      });
  });

