'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')

  .controller('SessionCtrl', function ($scope, $http, $modal, $log, $location, $cookieStore, $rootScope, Signup, Login, IsLoggedIn, Category) {
    $scope.signupView = false;
    $scope.signin = false;
    // console.log($modal);

    $scope.loggedIn = IsLoggedIn.LoggedIn();

    // console.log($scope.loggedIn);//user logged in or not
    
    // $scope.login = Login.login($scope.user);
        $scope.login = function (user){
          console.log('user', user);
          // $http.post('http://localhost:1337/login', function())
            Login.postLogin(user, function(err, userRecord){
              	if(err){
              		console.log(err);
              		alert(err);
              	} else {
                	console.log('user is ', userRecord);
                	// alert('user is ', userRecord);
            		$scope.user = userRecord;
                    // alert('welcome ',userRecord.firstName);

                    if(userRecord.id){
                      // Store the current user in a cookie
                      $cookieStore.put("current_user", userRecord);
                      // Set the root scope isLoggedIn to true
                      $rootScope.isLoggedIn = true;
                      // Redirect the user to a location
                      $location.path('/user');

                        // $scope.signin = !$scope.signin ;
                        // $scope.signInBtn = !$scope.signInBtn;
                        // console.log('user id is : ', userRecord.id);
                    } else {
                      // Delete the current user in a cookie
                      $cookieStore.put("current_user", null);
                      // Set the root scope isLoggedIn to false
                      $rootScope.isLoggedIn = false;
                    } 
              	}
            });
        };

    $scope.signup = function(user){
    	console.log('user', user);
      	Signup.postSignup(user, function(err, userRecord){
    		if(err){
    			console.log(err);
    		} else {
    			console.log('user is ', userRecord);
    			// alert('welcome ', userRecord);
    		}
   		});
 	  };
    
  })

  .directive('login',function(){
    return{
      templateUrl: 'views/signin.html'
    };
  })

  .directive('signup',function(){
    return{
      templateUrl: 'views/signup.html'
    };
  })

  // .directive('user-nav',function(){
  //   return{
  //     templateUrl: 'views/user-nav.html'
  //   };
  // });


