'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  
  	.controller('ProfileCtrl', function ($scope, $http, $cookieStore, Update, $route) {

    //user nav active path
    // function widgetsController($scope, $route) {
        $scope.$route = $route;
    // }


		$scope.user = $cookieStore.get('current_user');

	// profile.html 
		$scope.profile = true;
		$scope.update = function(user){
			console.log('user', user);
			Update.postUpdate(user, function(err, userUpdate){
				if(err){
						console.log(err);
				} else {
					console.log('cookie user',$cookieStore.get('current_user'));
					$cookieStore.put('current_user', userUpdate);
					console.log('INFO: user update :', userUpdate);
					// $location.path('/');
					$scope.profile = true;
				}
			});
		};

	//go for profile edit
		$scope.profile = true;
		$scope.profileEdit = function(){
			console.log('profile');
			$scope.profile = false;
		};

	//profile edit cancel
		$scope.updateCancel = function(){
			$scope.profile = true;
		};
		
	});
