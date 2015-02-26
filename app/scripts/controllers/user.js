'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')

	.controller('SessionCtrl', function ($scope, $http, $modal, $log, $location, $cookieStore, $rootScope, Signup, Login, IsLoggedIn, Category, Tip, Signout, Update, TipsUser, Notebook) {

		//get tips and categories data to show
		// $scope.tips = Tip.getTips();  
		// $scope.categories = Category.query();

		var path = $location.url();
		console.log(path);
		// if(path.indexOf("/profile")){
		// 	    console.log("uprofile")

		// 	}else if(path.indexOf("/dashboard")){
		// 	    console.log("/dashboard")
		// 	}

		$scope.signupView = false;
		$scope.signin = false;
		// console.log($modal);

		//the user is loggedin user
		$scope.user = $cookieStore.get('current_user');
		// console.log("INFO: user.id is",$cookieStore.get('current_user').id);

		// user tip
		if($scope.user){
			console.log($scope.user);
			TipsUser.getUserTips($scope.user.id).then(function(tipsSuccessResponse){
				var tips = tipsSuccessResponse.data;
				console.log("Tips Response", tips);
				
				Category.getCategories().then(function(categoryResponse){
					$scope.categories = categoryResponse.data;
					tips.forEach(function(tip){
						$scope.categories.forEach(function(category){
							if(category.id === tip.category_id){
								tip.categoryTitle = category.title;
							}
						});
					});	
					$scope.tipsOfUser = tips;
			},function(categoryFailResponse){

			});
		},function(tipsErrorReponse){
		})
		}
		
		//get user tip
		// if($scope.user && $scope.user.id){
		// 	TipsUser.getUserTips($scope.user.id, function(err, data){
		// 		if(err){
		// 			console.log('Error getting the tips for the user');
		// 			$scope.tipsOfUser = [];
		// 		} else {
		// 			$scope.tipsOfUser = data;
		// 		}
		// 	});
		// }
		

		$scope.signup = function(user){
			console.log('user', user);
			Signup.postSignup(user, function(err, userRecord){
				if(err){
						console.log(err);
				} else {
					console.log('user is ', userRecord);
						// $location.path('/user');
					// alert('welcome ', userRecord);
					$scope.signin = !$scope.signin;
					if($scope.signupView){
						$scope.signupView = !$scope.signupView ;
					}
				}
			});
		};

		$scope.login = function (user){
			Login.postLogin(user, function(err, userRecord){
				if(err){
					console.log(err);
				} else {
					console.log('user is ', userRecord);
				$scope.user = userRecord;

					if(userRecord.id){
						$cookieStore.put('current_user', userRecord);
						$rootScope.isLoggedIn = true;
						$location.path('/user');
					} else {
						$cookieStore.put('current_user', null);
						$rootScope.isLoggedIn = false;
					} 
				}
			});
		};

		
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



		// used for Signout service
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

		//create user notebook
		$scope.myNoteBook = function(notebook){
			console.log($scope.user.id);
			console.log(notebook);
			
			if($scope.create){
				Notebook.createNoteBook(notebook, function(err, mynb){
					if(err){
							console.log('no',err);
							console.log(err);
					} else {
						// console.log('notebook name', mynb);
						
						$scope.create={
							 'notebook_name': ''
						}
						$scope.create = false;

						//get user notebook
						Notebook.getNoteBook($scope.user.id, function(err, data){
							$scope.myNoteBookData = data;
						});  
					}
				});
			} else {
				$scope.create = true;
				$scope.notebook={
	     			'notebook_name': ''
						}	
			}
		};

		//get user notebook
		if($scope.user && $scope.user.id){
			// console.log($scope.user.id); 
			Notebook.getNoteBook($scope.user.id, function(err, data){
				if(err){
					// console.log(err);
					$scope.myNoteBookData = [];
				} else {
					// console.log(data);
					$scope.myNoteBookData = data;
					// console.log($scope.myNoteBookData);
				}
			});  
		}


	})//end

//directive used here
	.directive('login',function(){
		return{
			templateUrl: 'views/signin.html'
		};
	})

	.directive('signup',function(){
		return{
			templateUrl: 'views/signup.html'
		};
	});