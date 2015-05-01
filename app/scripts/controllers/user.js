'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')

	.controller('UserCtrl', function ($scope, $http, $modal, $log, $location, $cookieStore, $rootScope, Signup, Vote, Login, Category, Tip, Signout, Update, TipsUser, Notebook, $route) {

		//get tips and categories data to show
		// $scope.tips = Tip.getTips();  
		// $scope.categories = Category.query();


    //user nav active path
        $scope.$route = $route;

        $(window).load(function() {
    		$('#loading').hide();
  		});


		var path = $location.url();
		// console.log(path);
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
			// console.log($scope.user);
			TipsUser.getUserTips($scope.user.id).then(function(tipsSuccessResponse){
				var tips = tipsSuccessResponse.data;
				// console.log("Tips Response", tips);
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
							setTimeout(function(){callFreeWall('#freewall');},10);//added the freewall
					
				},function(categoryFailResponse){

				});
			},function(tipsErrorReponse){

			})
		}
		  

		// used for signup service
		$scope.signup = function(signupUser){
			console.log('signup user', signupUser);
			if(signupUser.firstName != null && signupUser.email != null && signupUser.password){
				Signup.postSignup(signupUser, function(err, userRecord){
					if(err){
						console.log(err);
						$scope.err = err;
					} else {
						console.log('user is ', userRecord);
						if(userRecord){
							$scope.user = userRecord;
							$('.bs-example-modal-sm1').modal('hide');
							$('.bs-example-modal-sm').modal('show');
						}	

						// if($scope.user){
						// 	console.log('user hahaha')
						// 	// $modalInstance.close($scope.selected.item);
						// }

						// console.log($scope.signin);
						// alert('welcome ', userRecord);
						// $scope.signin = !$scope.signin;
						// if($scope.signupView){
						// 	$scope.signupView = !$scope.signupView ;
						// }
					}
				});
			} else{
				// alert("fill the form");
			}

		};


		// used for Login service
		$scope.login = function (user){
			// console.log(user);
			// console.log( 'email',user.email,'user.password',user.password)
			if($scope.user.email && user.password){
				Login.postLogin(user, function(err, userRecord){
					if(err){
						// console.log(err);
						$scope.err = err;
					} else {
						// console.log('User is', userRecord);
						// $scope.user = userRecord;
						if(userRecord.id){
							$cookieStore.put('current_user', userRecord);
							
							// console.log('if userRecord',userRecord);
							 $(".ng-scope").removeClass('modal-open');
							// $rootScope.isLoggedIn = true;
							$location.path('/user');
						} else {
							// console.log('else userRecord',userRecord);
							$cookieStore.put('current_user', null);
							// $rootScope.isLoggedIn = false;
						} 
					}
				});
			}else{
				console.log("not entered")
			}
		};


		//forgot password
		$scope.forgotpassword = function(forgotuser){
			console.log(forgotuser)
			Login.resetRequest(forgotuser, function(err, responceRequest){
				console.log(responceRequest)
			})
		};


		// used for Signout service
		$scope.signOut = function(){
			// check if the current user is existing 
			if($cookieStore.get('current_user')){
					console.log('is signOut? :');

			// if exists, send a request to server and destroy the current session
				var isSignedOut = Signout.destroySession(function(err, data){
					// console.log('is session destroyed? :', data);
					// on successful removal of session, delete the cookie ( make current user null )
					$cookieStore.remove('current_user');
					// $rootScope.isLoggedIn = false;
					$location.path('/');
				});
			}
		};


	//thumbs up
	    $scope.thumbsUp = function(idx, tipId){
	    	if($scope.user){
				// console.log($scope.user); 
				console.log('tip id is :',tipId);  
				// var voted = Vote.upVote(tipId);
				Vote.upVote(tipId, function(err, data){
					if(err){
						console.log(err);
					} else {
						console.log('data is >>:', data);
						$scope.tips[idx].thumbs_up = data.thumbs_up;
					}
				})
	    	}
	    };

	//thumbs down
	    $scope.thumbsDown = function(idx, tipId){
	    	if($scope.user){
				// console.log($scope.user); 
				console.log('tip id is :',tipId);  	
				Vote.downVote(tipId, function(err, data){
					console.log('data is :', data);
					if(err){
						console.log("Error in down voting", err);
					} else {
						console.log('data is <<:', data);
						$scope.tips[idx].thumbs_down = data.thumbs_down;
					}
				});
	    	}
	    };


//tipdescription

	$scope.getMyTipDescription = function(index, tip){
		// console.log(tip.categoryTitle);
		// console.log(tip.title);
		// console.log(tip.description);
		$scope.myCurrentTip = tip;
		console.log(index);
		$scope.indexDel = index;
		$scope.mtt = tip;
	};

	$scope.saveEditTip = function(myCurrentTip){
		// console.log(myCurrentTip.id);
		// var id = myCurrentTip.id;
		// delete.myCurrentTip.categoryTitle;
		console.log(myCurrentTip.categoryTitle);
		Tip.putTip (myCurrentTip, function( err, tipEdited){
			if(!err){
				$scope.myCurrentTip = tipEdited;
				setTimeout(function(){callFreeWall('#freewall');},10);//added the freewall
			}	else{
				alert(err);
			}

		})
	};


// Profile Delete
	$scope.deleteTips = function(index, tipId){
		console.log(tipId);
		console.log(index);
		var r = confirm("Are you sure to delete the tip ? \n You won't be able to recover your tip");
		if (r == true) {
		    console.log("You pressed OK!");
		    Tip.deleteTip(tipId, function(err, deleteResponse){
		    	if(err){
		    		console.log(err);
		    	}else{
					console.log('Delete Res:',deleteResponse);
					setTimeout(function(){callFreeWall('#freewall');},50);//freewall call
				    $('#deleted').modal('toggle');
				    console.log(tipId);
		    	}
			});
		} else{

		}
	}

	})//end

//directive used here
	// .directive('login',function(){
	// 	return{
	// 		templateUrl: 'views/signin.html'
	// 	};
	// })

	// .directive('signup',function(){
	// 	return{
	// 		templateUrl: 'views/signup.html'
	// 	};
	// });



