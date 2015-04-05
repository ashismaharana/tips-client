'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */


angular.module('tipsApp')

	.controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $location,  Tip, Category, IsLoggedIn, Signup, Signout, Notebook, TipsUser,  $animate, $route, Follow ) {
		
		console.log("Main Controller!!");
		//current user
		$scope.user = $cookieStore.get('current_user');
		
		//log in user
		if($scope.user){
			var user_id = $scope.user.id ;
		}

    //user nav active path
    // function widgetsController($scope, $route) {
        $scope.$route = $route;
    // }


		//categories wise tip from nav category list
		$scope.allCategories = function(category){
			console.log(category.id);

			Category.getTipByCategories(category.id).then(function(categoryWiseTip){
				var categoryTips = categoryWiseTip.data;
				// console.log('what',categoryTips);
				Category.getCategories().then(function(getListOfCategory){
					var categories = getListOfCategory.data;
					// console.log('what',categories);
					categoryTips.forEach(function(categoryTip){
						$scope.categories.forEach(function(category){
							if(category.id === categoryTip.category_id){
								categoryTip.categoryTitle = category.title;
							}
						});
					});
						$scope.categoryWiseTips = categoryTips;
						setTimeout(function(){callFreeWall();},50);//freewall call
						console.log('ok lets see',categoryTips);
						$scope.tips = categoryTips;
				});	
			})
		}
		
		// get tips from server
		// $(function(){
		// 	var wall = new freewall('#main-con');
		// 	wall.fitwidth();
		// })
		
		callGetTips();//call the get tips
		function callGetTips(){
			// $scope.$watch(function(scope) { return scope.tips.myVar },
   //            function(newValue, oldValue) {
   //                document.getElementById("").innerHTML =
   //                    "" + newValue + "";
   //            }
   //           );
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
						setTimeout(function(){callFreeWall();},50);//freewall call
				},function(categoryFailResponse){
				});

			},function(tipsErrorReponse){
				// console.log(tipsErrorReponse)
			});
		}

		// selection
		$scope.isSelected = function(id){
			console.log("Id is ", id);
		}

		$scope.updateSelection = function($event, id){
			console.log("ldsjfkldsjglksdjgklsdjg", id);
		}


//tip description in popop
		$scope.tipdescription = function(idx, tip){
			console.log(tip);
			$scope.tipDetailsDiv = true;
			$scope.tipDetails = tip;
			$scope.tipIndex = idx;


			console.log('-----------------user id----------------',user_id)


			//tip viewer
				var tipId = tip.id;
				// console.log('tipx',tipId);
				// Increase view count
				Tip.postView(tipId, function(err, data){
					if(err){
						console.log(err);
					} else{
					$scope.tips[idx].view = data[0].view;
					}
				});

			//notebook
				//get notebook for show and add the tip to notebook	
				//var tipParams = {tip_id: tipId};	
				// console.log('Who is the user',$scope.user.id);
				if($scope.user){
					// Notebook.getNoteBook($scope.user.id, tipId, function(err, data){
					Notebook.getNoteBook($scope.user.id, tipId, function(err, data){
						// console.log('all notebook',data);
						$scope.myNoteBookData = data;
					}); 

					//notebook popup
					$scope.addToNbPopUp = false;

					$scope.addToNb = function(addToNbPopUp){
						$scope.share = false;
						$scope.addToNbPopUp = !$scope.addToNbPopUp;

						$scope.addOrDeleteTipForNotebook = function(tipIdx, notebook){
							console.log("adding tipIdx",tipIdx);
							console.log("adding notebook",notebook);
							//$scope.notebookAdd = [];
							console.log('ok what',notebook);
							// Send a request to the backend with the tip id and notebook id
							Notebook.addTipToNotebook(tipIdx, notebook, function(err, tip){
								console.log("TIP::::::", tip);
							});

							    //$scope.data = [];

							    // $scope.addItem = function () {
							    //     var c = $scope.data.length + 1;
							    //     var item = new String('Item ' + c)
							    //     $scope.data.splice(0, 0, item);
							    // };
						}
					}
				}

		//share
				$scope.share = false;
				$scope.shareBtn = function(){
					$scope.addToNbPopUp = false;
					$scope.share = !$scope.share;

				}



				console.log('INFO tip is: ', tip.created_by);
				//tips of the created_by user
					var userCreatedById = tip.created_by;
					console.log('userCreatedById >>>----------------->', userCreatedById);

					if(userCreatedById){
						TipsUser.getUserDetails(userCreatedById, function(err, data){
							if(err){
								console.log(err);
							} else {
								// console.log(data);
								$scope.userIs = data;
							}
						});
			

						//popular tip of the user
							TipsUser.getPopularTips(userCreatedById).then(function(userTip){
								var popularTipsOfUser = userTip.data;
								Category.getCategories().then(function(categoryResponse){
									$scope.categories = categoryResponse.data;
									popularTipsOfUser.forEach(function(popularTip){
										$scope.categories.forEach(function(category){
											if(category.id === popularTip.category_id){
												popularTip.categoryTitle = category.title;
											}
										});
									});	
									$scope.popularTipsOfUser = popularTipsOfUser;
										// console.log($scope.tips);
									// setTimeout(function(){callFreeWall();},300);//added the freewall

								},function(categoryFailResponse){
									console.log('categoryFailResponse');
									});
							},function(tipsErrorReponse){
									console.log('tipsErrorReponse');
							});


						//category wise tip
						console.log('tip category id :',tip.category_id);

						var categoryId = tip.category_id
						if(categoryId){
							// console.log(categoryId);

							Category.getTipByCategories(categoryId).then(function(categoryWiseTip){
								var categoryTips = categoryWiseTip.data;
								// console.log('what',categoryTips);
								Category.getCategories().then(function(getListOfCategory){
									var categories = getListOfCategory.data;
									// console.log('what',categories);
									categoryTips.forEach(function(categoryTip){
										$scope.categories.forEach(function(category){
											if(category.id === categoryTip.category_id){
												categoryTip.categoryTitle = category.title;
											}
										});
									});
									$scope.categoryWiseTips = categoryTips;
									console.log('category wise 	Tips',categoryTips);
									setTimeout(function(){callFreeWall1();},50);//freewall call
								});	
							})
						}
					}//END

				// onclick view the fulltip
					$scope.popularTipOfUser =  function(popularTip){
						// console.log('my tip',popularTip);
						$scope.tipDetails = popularTip;
					}

				//onclick view the fulltip
					$scope.categoryWiseTipsShow = function(categoryTip){
						// console.log('click ',categoryTip);
						$scope.tipDetails = categoryTip;
						
					}

				
					// var selectCheckbox = function(index, notebookId){
					// 	 var idString = 'notebook'+index;
					// 	console.log(idString, notebookId);
					// }
		 
				//follow
					$scope.createdBy = $scope.tipDetails.created_by;
						// console.log('* created_by :',$scope.createdBy);
					$scope.tipId = $scope.tipDetails.id;
						// console.log('* tipId :',$scope.tipId);
					
					// check if the user is following current tips creator or not
					if($scope.user){
						var userFollowings = $scope.userFollowings;
						if(userFollowings.indexOf($scope.tipDetails.created_by) != -1){
							$scope.isFollowing = true;
						} else {
							$scope.isFollowing = false;
						}
					}

					$scope.followUser = function(userIs, tipDetails){
						// var userData ={ user_id: $scope.createdBy, tip_id: $scope.tipId }	
						// console.log('Data:', userData );
						// console.log('userIs.id:', userIs.id );
						// console.log('category_id:', tipDetails.category_id );
						if($scope.user){

							var user_id = userIs.id ;
							var tip_category_id = tipDetails.category_id ;

					//follow post
							// var userData = { user_id: userIs.id , tip_id: tipDetails.id  }	
							// console.log('user data : : : : : : : : : ',userData);
							Follow.followCreate(tip_category_id, user_id,  function(err, follow){
								if(err){	
									// console.log('err in follow create');
								}  else{
									// If the current user was following the tip owner
									if($scope.isFollowing == true){
										// Delete tip owner's id from list of followings
										$scope.userFollowings.splice($scope.userFollowings.indexOf(tipDetails.created_by), 1);
									} else {
										$scope.userFollowings.push(tipDetails.created_by);
									}
									//$scope.like = !$scope.like;
									$scope.isFollowing = !$scope.isFollowing;
									// console.log('followed now',follow);
									// console.log('user id',follow.followers);
									// console.log('user id',userCreatedById);
								}
							});

						}else{
							alert('login');
						}
					}

				// get follow
					// if($scope.user){
					// 	Follow.followingGet(user_id, function(err, getfollowing){
					// 		if(!err){
					// 			var cby = $scope.tipDetails.created_by;
					// 			// var userFollowing ={}
					// 			// $scope. = getfollowing
					// 			for( var i=0; i < getfollowing.length ; i++){
					// 				if(cby == getfollowing[i]){
					// 					// console.log('ddqwdqwdqwdqwdqwdqwdqw',cby);
					// 					$scope.like = cby;
					// 					break;
					// 				}
									
					// 			} 
					// 		} 
					// 	});
					// }

					// if($scope.createdBy && tipId){
					// 	// console.log($scope.created_by);
					// 	// console.log($scope.tipId);
					// 	var userData ={ user_id: $scope.createdBy, tip_id: $scope.tipId }	
					// 	console.log('Data:', userData );
					// }

				// add the viewer

		};
//end tip description

	// Get the list of user ids the current user is following.
		if($cookieStore.get('current_user')){
			Follow.followingGet(user_id, function(err, followingList){
				if(!err){
					$scope.userFollowings = followingList;
				} else{
					$scope.userFollowings = [];
				}
			});
		}


		//user of the opened tip
		$scope.userInfo = function (userIs){
			console.log(userIs);
		}

		// console.log($scope.tips);
		// console.log('MainCtrl');
    	$scope.user = $cookieStore.get('current_user');

	   	
	   	// console.log($scope.categories);
	   	if($cookieStore.get('current_user')){
	      $rootScope.isLoggedIn = true;
	   	} else {
	      $rootScope.isLoggedIn = false;
	   	}



//scroll and lode old tips
		$(function(){
		   $(window).scroll(function(){
		       if($(document).height()==$(window).scrollTop()+$(window).height()){
		           // alert('I am at the bottom');
				   // callGetTips();//call the get tips

		       }
		   });
		});





	      
	})//end the controller
		
	.directive('categories', function() {
	  return {
	    templateUrl: 'views/categories.html'
	  };
	});
	
