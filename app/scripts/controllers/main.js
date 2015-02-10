'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */


angular.module('tipsApp')

	.controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $location,  Tip, Category, IsLoggedIn, Signout) {
		// get tips from server
		$scope.tips = Tip.getTips();	
		// console.log('MainCtrl');
		// console.log($scope.user);
		   	
	   	$scope.categories = Category.query();
	   	// console.log($scope.categories)
	   	if($cookieStore.get('current_user')){
	      $rootScope.isLoggedIn = true;
	   	} else {
	      $rootScope.isLoggedIn = false;
	   	}

		$scope.signIn = function(){
	        console.log($scope.signin); 
    			if(!IsLoggedIn.LoggedIn()){
    				console.log('user');
    				// $scope.signInBtn = true;
    			}else{
    				// user 
    			}   //loggedIn
			       
		        // console.log($scope.lastName);

	        $scope.signin = !$scope.signin;
	         if($scope.signupView){
	         	$scope.signupView = !$scope.signupView ;
	         }
	    };
	    $scope.signOut = function(){
	    	// check if the current user is existing 
	    	if($cookieStore.get('current_user')){
	    			console.log('is signOut? :');

	    	// if exists, send a request to server and destroy the current session
	    		var isSignedOut = Signout.destroySession(function(err, data){
	    			console.log('is session destroyed? :', data);
	    			// on successful removal of session, delete the cookie ( make current user null )
	    			$cookieStore.remove('current_user');
                    $rootScope.isLoggedIn = false;
	    			$location.path('/');
	    		});
	    	}
	    };

	    $scope.signUpClick = function(){
	      $scope.signupView = !$scope.signupView ;
	      $scope.signin = !$scope.signin;
	      console.log($scope.signupView);
	    };
	})

	.directive('categories', function() {
	  return {
	    templateUrl: 'views/categories.html'
	  };
	});