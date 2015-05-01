'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:SearchCtrl
 * @description
 * # SearchCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
	.controller('SearchCtrl', function ($scope, $location, Search, Category, $http, $rootScope, $cookieStore, Notebook, TipsUser, Follow, $route, Tip) {

// 	signout btm
	   	if($cookieStore.get('current_user')){
	      $rootScope.isLoggedIn = true;
	   	} else {
	      $rootScope.isLoggedIn = false;
	   	}

		$scope.user = $cookieStore.get('current_user');

//loader 
	$(document).ready(function() {
		$(".loader").fadeOut(1000);
	});

	$scope.suggests = function(val) {
	    return $http.get('/api/tip/suggest', {
	      params: {
	        term: val,
	        // sensor: false
	      }
	    }).then(function(response){
		    return response.data.map(function(item){
		        return item.text;
		    });
	    });
	}

	$scope.search = function(asyncSelected){

		Search.searchGet(asyncSelected, function(err, tipsresponse){
    		if(err){
        		console.log(err);
    		} else{
    			console.log(tipsresponse);
    			Category.getCategories().then(function(getListOfCategory){
				var categories = getListOfCategory.data;
					tipsresponse.forEach(function(tip){	
						categories.forEach(function(category){
							if(category.id = tip.category_id){
								tip.categoryTitle = category.title;
							}
						});
					})
				$location.path('/search');
				console.log(tipsresponse);
    			$rootScope.tips = tipsresponse;
				setTimeout(function(){callFreeWall('#freewall-tips');},50);//freewall call
    			});
    		}
    	});
	}







// search tips using jquery.autocomplete
	// $('#autocomplete').devbridgeAutocomplete({
	//     serviceUrl: '/api/tip/suggest',
	//     delimiter: /(,)\s*/, // regex or character
	//     autoSelectFirst: true,
	//     paramName: 'term',
	//     appendTo: '.autocomplete-list',
	    
	//     transformResult: function(response) {
	//     	console.log("RESPONSE",response);

	//     	// $scope.suggestions = response;
	//     	// console.log("Current Tips", $scope.tips);
	//         return {
	//             suggestions: $.map(JSON.parse(response), function(dataItem) {
	//                 return { value: dataItem.text, data: dataItem };
	//                 //return { value: dataItem.text };
	//             })
	//         };
	//     },
	//     onSelect: function (suggestion) {
	// 		// $location.path('/search');
 //        	// console.log(suggestion.value);
 //        	var search = suggestion.value;
 //        	// console.log(suggestion.data);
 //        	console.log(search);
 //        	Search.searchGet(search, function(err, tipsresponse){
 //        		if(err){
	//         		console.log(err);
 //        		} else{
 //        			console.log(tipsresponse);
 //        			Category.getCategories().then(function(getListOfCategory){
	// 				var categories = getListOfCategory.data;
	// 					tipsresponse.forEach(function(tip){	
	// 						categories.forEach(function(category){
	// 							if(category.id = tip.category_id){
	// 								tip.categoryTitle = category.title;
	// 							}
	// 						});
	// 					})
	// 				console.log(tipsresponse);
 //        			$scope.tips = tipsresponse;
	// 				setTimeout(function(){callFreeWall('#freewall-tips');},50);//freewall call

 //        			});
 //        		}
 //        	});
 //        	// $scope.$apply();     
 //    	}
    	
	// })
		



//tip description in popop
		$scope.tipdescription = function(idx, tip){
			console.log("INFO: Current Tip IS:", tip);
			$scope.tipDetailsDiv = true;
			$scope.tipDetails = tip;
			$scope.tipIndex = idx;
			console.log(idx);

			// console.log('-----------------user id----------------',user_id)

			var slug = getSlug(tip.id, {
				truncate: 20
			});
			console.log(slug);
			// window.location.href = window.location.href + "?" + slug
			
			//tip viewer
				var tipId = tip.id;
				// console.log('tipx',tipId);
				// Increase view count
				Tip.postView(tipId, function(err, data){
					if(err){
						console.log(err);
					} else{
						// console.log(data);
					$scope.tips[idx].view = data[0].view;
					}
				});

			//notebook
				//get notebook for show and add the tip to notebook	
				//var tipParams = {tip_id: tipId};	
				// console.log('Who is the user',$scope.user.id);
				if($scope.user){
					// Notebook.getNoteBook($scope.user.id, tipId, function(err, data){
					// Notebook.getNoteBook($scope.user.id, tipId, function(err, data){
					// 	// console.log('all notebook',data);
					// 	$scope.myNoteBookData = data;
					// }); 

					// $scope.tipDetails.notebook_ids = [];
					// var myNoteBooks = $scope.myNoteBookData;
					// var currentTip = $scope.tipDetails;

					//angular.forEach($scope.myNoteBookData, function(val, key){

					//});

					// for(var i = 0; i < myNoteBooks.length; i++){
					// 	if(myNoteBooks[i]["tip_ids"].indexOf(currentTip.id) != -1){
					// 		$scope.tipDetails.notebook_ids.push($scope.myNoteBookData[i]["id"]);
					// 	}
					// }
					//$scope.apply(function(){

						console.log("Notebook save ::", $scope.myNoteBookData);
						// angular.forEach($scope.myNoteBookData, function(value, key){

						// 	console.log("BEFORE VALUE: ", value);
						// 	console.log("DEBUG ", value.tip_ids, "current tip", $scope.tipDetails.id);

						// 	if(value.tip_ids.indexOf($scope.tipDetails.id) != -1){
						// 		value.isChecked = true;
						// 	} else {
						// 		value.isChecked = false;
						// 	}
						// 	console.log("AFTER VALUE: ", value);
						// }, $scope.myNoteBookData);
						// console.log("AFTER::", $scope.myNoteBookData);

					//});

					//notebook popup
					$scope.addToNbPopUp = false;

					$scope.addToNb = function(addToNbPopUp){
						$scope.share = false;
						$scope.addToNbPopUp = !$scope.addToNbPopUp;

						$scope.addOrDeleteTipForNotebook = function(tipIdx, notebook){
							console.log("adding tipIdx",tipIdx);
							console.log("adding notebook",notebook);
							//$scope.notebookAdd = [];
							
							// console.log('ok what',notebook);
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



				// console.log('INFO tip is: ', tip.created_by);
				//tips of the created_by user
					var userCreatedById = tip.created_by;
					// console.log('userCreatedById >>>----------------->', userCreatedById);

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
									setTimeout(function(){callFreeWall();},100);//added the freewall

								},function(categoryFailResponse){
									console.log('categoryFailResponse');
									});
							},function(tipsErrorReponse){
									console.log('tipsErrorReponse');
							});


						//category wise tip
						// console.log('tip category id :',tip.category_id);

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
										categories.forEach(function(category){
											if(category.id === categoryTip.category_id){
												categoryTip.categoryTitle = category.title;
											}
										});
									});
									$scope.categoryWiseTips = categoryTips;
									// console.log('category wise 	Tips',categoryTips);
									setTimeout(function(){callFreeWall('#freewall-category');},100);//freewall call
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

  });
