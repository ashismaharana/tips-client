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
			Signup.postSignup(signupUser, function(err, userRecord){
				if(err){
					console.log(err);
					$scope.err = err;
				} else {
					console.log('user is ', userRecord);	
					$scope.user = userRecord;
					$('.bs-example-modal-sm1').modal('hide');
					$('.bs-example-modal-sm').modal('show');

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
		};


		// used for Login service
		$scope.login = function (user){
			// console.log( 'email',user.email,'user.password',user.password)
			if( !user.email && !user.password){
				console.log("not entered")
			}
			if(user.email && user.password){
				Login.postLogin(user, function(err, userRecord){
					if(err){
						console.log(err);
						$scope.err = err;
					} else {
						console.log('User is', userRecord);
						
						// $scope.user = userRecord;

						if(userRecord.id){
							$cookieStore.put('current_user', userRecord);
							
							console.log('if userRecord',userRecord);
							 $(".ng-scope").removeClass('modal-open');
							// $rootScope.isLoggedIn = true;
							$location.path('/user');
						} else {
							console.log('else userRecord',userRecord);
							$cookieStore.put('current_user', null);
							// $rootScope.isLoggedIn = false;
						} 
					}
				});
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
					console.log('is session destroyed? :', data);
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

		$scope.mtt = tip;
	}

	$scope.saveEditTip = function(myCurrentTip){
		// console.log(myCurrentTip.id);
		// var id = myCurrentTip.id;
		Tip.putTip (myCurrentTip, function( err, tipEdited){
			if(!err){
				$scope.myCurrentTip = tipEdited;
			}	else{
				alert(err);
			}

		})
	}


	// $ecope.notSaveEditTip = function(){
	// 	// $scope.mtt = tip;
	// }


		// //create user notebook
		// $scope.myNoteBook = function(notebook){
		// 	console.log($scope.user.id);
		// 	console.log(notebook);
			
		// 	if($scope.create){
		// 		Notebook.createNoteBook(notebook, function(err, mynb){
		// 			if(err){
		// 					console.log('no',err);
		// 					console.log(err);
		// 			} else {
		// 				// console.log('notebook name', mynb);
						
		// 				$scope.create={
		// 					 'notebook_name': ''
		// 				}
		// 				$scope.create = false;

		// 				//get user notebook
		// 				Notebook.getNoteBook($scope.user.id, null, function(err, data){
		// 					$scope.myNoteBookData = data;
		// 				});  
		// 			}
		// 		});
		// 	} else {
		// 		$scope.create = true;
		// 		$scope.notebook={
	 //     			'notebook_name': ''
		// 		}	
		// 	}
		// };

		// //get user notebook
		// if($scope.user && $scope.user.id){
		// 	// console.log($scope.user.id); 
		// 	Notebook.getNoteBook($scope.user.id, null, function(err, data){
		// 		if(err){
		// 			// console.log(err);
		// 			$scope.myNoteBookData = [];
		// 		} else {
		// 			// console.log(data);
		// 			$scope.myNoteBookData = data;
		// 			var notebookData = $scope.myNoteBookData
		// 			console.log(notebookData);


		// 			angular.forEach(notebookData, function(value,key){
		// 				if(value.tip_ids)
		// 					console.log('tip_ids :',value.tip_ids);
		// 			})

		// 			// for(var i = 0; i < notebookData.length; i++){
		// 			// 	console.log('length is:',data.length);
		// 			// notebookData.forEach
		// 			// 	notebookData.forEach(function(notebook){

		// 				// $scope.categories.forEach(function(category){
		// 				// 	if(category.id === categoryTip.category_id){
		// 				// 		categoryTip.categoryTitle = category.title;
		// 				// 	}
		// 				// });
		// 				// });

		// 				// console.log("All notebook with tips id",data[0].tip_ids);
		// 		}

		// 			// console.log($scope.myNoteBookData);
				
		// 	});  

		// }

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





	// function callFreeWall(){
 //        var wall = new freewall("#freewall");
 //        wall.reset({

	//         selector: '.brick',
	//         cellW: 220,
	//         cellH: 'auto',
	//         gutterY: 15,
	//         gutterX: 15,
	//         animate: true,
	//         delay: 0, 
	//         rightToLeft: true,
	//         // keepOrder: true,
	//         // draggable: true,
	//         // cacheSize: true, // caches the original size of block;

	// 	    onResize: function() {
	// 	        console.log("HI main ctrl");
	// 	        wall.fitWidth();
	// 	    }

 //      	});
 //      		 wall.container.find('.brick').load(function() {
	// 			// debugger;
	// 			console.log('brick img')
	// 			wall.fitWidth();
	// 		});
 //      		  wall.fitWidth();

 //   	}
