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
    'CategoriesServices',
    'LoginServices',
    'SignupServices',
    'ui.bootstrap',
    'TipsServices',
    'IsLoggedInServices',
    'signoutServices'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/nav', {
        templateUrl: 'views/nav.html',
        controller: 'MainCtrl',
        resolve: resolve
      })
      .when('/user', {
        templateUrl: 'views/user.html',
        controller: 'MainCtrl',
        resolve: resolve
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'UserCtrl',
        resolve: resolve
      })
      .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'TipsCtrl',
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


 var resolve = {
    data:function($rootScope, $q, $http, $location,  $cookieStore, IsLoggedIn, Login){
        var deferred = $q.defer();
        var current_user = $cookieStore.get("current_user");
        if(current_user){
          console.log("eceeceecece",current_user)
          $rootScope.isLoggedIn = true;
          deferred.resolve(current_user);
        } else{
          $rootScope.isLoggedIn = false;
          deferred.reject();
          $location.path('/');
        };
        //this.url = 'http://localhost:1337',

        // Check cookie if there is already current user is there or not

        // if currentUser is NOT present
        // Block / Redirect to Signin Page
        // else just do nothing

        // $http({method: 'GET', url: 'http://localhost:1337/user/islogedin'})
        //     .success(function(user) {
        //         if(!user){
        //             //$location.path('/sign');
        //             console.log("Not Logged in.");
        //             $location.path('/');
        //          // console.log($scope.lastName);
        //         } else {
        //             console.log("Logged In!!");
        //         }
        //         $rootScope.user = user.User;
        //         deferred.resolve(user);
        //         console.log(user);
                    
        //     })
        //     .error(function(data){
        //         deferred.reject();
        //         $location.path('/login');
        //     });
        //  return deferred.promise;
    }
  };