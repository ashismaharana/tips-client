'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:TipsCtrl
 * @description
 * # TipsCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  .controller('TipsCtrl', function ($scope, Tip, Category, Signout, $cookieStore, $rootScope, $location) {
    
    $scope.categories = Category.query();
    $scope.create = function (tip){
    	console.log('create', tip);
    	Tip.postCreate(tip, function(err, createdTip){
    		if(err){
    			console.log(err);
    		} else {
    			console.log('tips is', createdTip);
    		}
    	});
    };
    $scope.signOut = function(){
            // check if the current user is existing 
            if($cookieStore.get("current_user")){
                    console.log("is signOut? :");

            // if exists, send a request to server and destroy the current session
                var isSignedOut = Signout.destroySession(function(err, data){
                    console.log("is session destroyed? :", data);
                    // on successful removal of session, delete the cookie ( make current user null )
                    $cookieStore.remove("current_user");
                    $rootScope.isLoggedIn = false;
                    $location.path('/');
                });
            }
        }

    })

    .directive('create',function(){
	    return{
	      templateUrl: 'views/create.html'
	    };
  	});