'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */


angular.module('tipsApp')

	.controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $location,  Tip, Category, IsLoggedIn, Signup, Signout, Vote, Notebook, TipsUser ) {
		
		//current user
		$scope.user = $cookieStore.get('current_user');
		
		// get tips from server
		// $(function(){
		// 	var wall = new freewall('#main-con');
		// 	wall.fitwidth();
		// })
		Tip.getTips().then(function(tipsSuccessResponse){
			var tips = tipsSuccessResponse.data; 
			Category.getCategories().then(function(categoryResponse){
					$scope.categories = categoryResponse.data;
					tips.forEach(function(tip){
						$scope.categories.forEach(function(category){
							if(category.id === tip.category_id){
								tip.categoryTitle = category.title;
							}
						});
					});	
					$scope.tips = tips;
					// console.log($scope.tips);
			},function(categoryFailResponse){
			});
		},function(tipsErrorReponse){
			// console.log(tipsErrorReponse)
		});	


		// selection
		$scope.isSelected = function(id){
			console.log("Id is ", id);
		}

		$scope.updateSelection = function($event, id){
			console.log("ldsjfkldsjglksdjgklsdjg", id);
		}

		//tip description
		$scope.tipdescription = function(idx, tip){
			console.log(tip);
			$scope.tipDetailsDiv = true;
			$scope.tipDetails = tip;
			$scope.tipIndex = idx;

		//tip viewer
			var tipId = tip.id;
			// console.log('tipx',tipId);
			Tip.postView(tipId, function(err, data){
				if(err){
					console.log(err);
				} else{
				$scope.tips[idx].view = data[0].view;
				}
			});

			//get notebook for show and add the tip to notebook		
			Notebook.getNoteBook($scope.user.id, function(err, data){
				$scope.myNoteBookData = data;
				console.log('all notebook',data);
				$scope.changeNotebook = function(){
			 		console.log("Dummy notebook");
			 		console.log("2Dummy notebook");
		 		}
			}); 

		//tips of the created_by user
			var userCreatedById = tip.created_by;
			// console.log('userCreatedById', userCreatedById);
			if(userCreatedById){
				TipsUser.getUserDetails(userCreatedById, function(err, data){
					if(err){
						console.log(err);
					} else {
						// console.log(data);
						$scope.userIs = data;
					}
				});

				TipsUser.getUserTips(userCreatedById, function(err, data){
					if(err){
						console.log('Error getting the tips for the user');
						$scope.popularTipsOfUser = [];
					} else {
						// console.log(data);
						$scope.popularTipsOfUser = data;
					}
				});
			}

			$scope.popularTipOfUser =  function(popularTip){
				console.log('my tip',popularTip);
				$scope.tipDetails = popularTip;
			}

			var selectCheckbox = function(index, notebookId){
				var idString = 'notebook'+index;
				console.log(idString, notebookId);
			}
 
		//follow
			// Follow.subscribe

			// $scope.createdBy = $scope.tipDetails.created_by;
			// $scope.tipId = $scope.tipDetails.id;
			// if($scope.createdBy){
			// 	// console.log($scope.created_by);
			// 	// console.log($scope.tipId);
			// 	var userData ={ user_id: $scope.createdBy, tip_id: $scope.tipId }	
			// 	console.log('Data:', userData );
			// }

			//add the viewer
 			//popup checkbox list
			$(function () {
		        $('.item').popover({
		            placement: 'top',
		            html: true,
		            content: function () {
		            	console.log('test1');
		                return $(this).find('.filters').html();
		            }
		        });

		        $('#count').click(function() {
		            var filter = $('input[type=checkbox]:checked').map(function () {
		            	console.log('test2');
		                return this.value;
		            }).get();
		            $('#res').text(filter);
		            	console.log('test3');
		        });

		        
		    });  

		}//end tip description

		//user of the opened tip
		$scope.userInfo = function (userIs){
			console.log(userIs);
		}

		// console.log($scope.tips);
		// console.log('MainCtrl');
    	$scope.user = $cookieStore.get('current_user');
		// console.log($scope.user);   	


	   	// $scope.categories = Category.query();
	   	

	   	console.log('wekdhweku');
	   	// for(var i=0;i<$scope.tips;i++){
	   	// 	console.log($scope.tips)

	   	// }
	   	// $scope.tips.forEach(function(tip){
	   	// 	console.log(tip);
	   	// 	$scope.categories.forEach(function(category){
	   	// 		console.log(category);
	   	// 		console.log(tip);
	   	// 	})
	   	// })

	   	
	   	// console.log($scope.categories);
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


	    $scope.signup = function(user){
	    	// console.log('user', user);
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

// 
	    $scope.signUpClick = function(){
	      $scope.signupView = !$scope.signupView ;
	      $scope.signin = !$scope.signin;
	      console.log($scope.signupView);
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


	// //popup checkbox list
	// $(function () {
	//     $('.item').popover({
	//         placement: 'top',
	//         html: true,
	//         content: function () {
	//             return $(this).find('.filters').html();
	//         }
	//     });

	//     $('#count').click(function() {
	//         var filter = $('.item input[type=checkbox]:checked').map(function () {
	//             return this.value;
	//         }).get();

	//         $('#res').text(filter);
	//     });
	// });    

	    //freewall 
	 //    var myVar = setTimeout(function(){myTimer()},2000);
		// function myTimer() {
		//     var wall = new freewall('.freewall-use');
		//     console.log('freewall');
		//     wall.reset({
		// 	  selector: '.tipcontainer',
		// 	  animate: true,
		// 	  cellW: 150,
		// 	  cellH: 'auto',
		// 	  gutterY: 15,
		// 	  gutterX: 15,
		// 	});
		// }



	})
		
	.directive('categories', function() {
	  return {
	    templateUrl: 'views/categories.html'
	  };
	});

	



