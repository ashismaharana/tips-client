'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */


angular.module('tipsApp')

	.controller('MainCtrl', function ($scope, $cookieStore, $rootScope, $location,  Tip, Category, IsLoggedIn, Signup, Signout, Notebook, TipsUser,  $animate, $route ) {
		
		//current user
		$scope.user = $cookieStore.get('current_user');

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
						setTimeout(function(){callFreeWall();},100);//freewall call
						console.log('ok lets see',categoryTips);
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
						setTimeout(function(){callFreeWall();},100);//freewall call
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

				console.log('INFO tip is: ', tip.created_by);
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
						// console.log('tip is nea',tip.category_id);
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
										// setTimeout(function(){callFreeWall();},100);//freewall call
									});
										$scope.categoryWiseTips = categoryTips;
										console.log('category wise 	Tips',categoryTips);
										setTimeout(function(){callFreeWall();},100);//freewall call
								});	
										setTimeout(function(){callFreeWall();},100);//freewall call
							})
						}
					}//END

				// onclick view the fulltip
					$scope.popularTipOfUser =  function(popularTip){
						console.log('my tip',popularTip);
						$scope.tipDetails = popularTip;
					}

				//onclick view the fulltip
					$scope.categoryWiseTipsShow = function(categoryTip){
						console.log('click ',categoryTip);
						$scope.tipDetails = categoryTip;
					}

				
					// var selectCheckbox = function(index, notebookId){
					// 	 var idString = 'notebook'+index;
					// 	console.log(idString, notebookId);
					// }
		 
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
				// $(function () {
			 //        $('.item').popover({
			 //            placement: 'top',
			 //            html: true,
			 //            content: function () {
			 //            	console.log('test1');
			 //                return $(this).find('.filters').html();
			 //            }
			 //        });

			        // $('#count').click(function() {
			        //     var filter = $('.item input[type=checkbox]:checked').map(function () {
			        //     	console.log('test2');
			        //         return this.value;
			        //     }).get();
			        //     $('#res').text(filter);
			        //     	console.log('test3');

			        // })
			    // }) 

		};//end tip description




		//user of the opened tip
		$scope.userInfo = function (userIs){
			console.log(userIs);
		}

		// console.log($scope.tips);
		// console.log('MainCtrl');
    	$scope.user = $cookieStore.get('current_user');
		// console.log($scope.user);   	


	   	// $scope.categories = Category.query();
	   	

	   	// console.log('wekdhweku');
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

		// $scope.signIn = function(){
	 //        console.log($scope.signin); 
  //   			if(!IsLoggedIn.LoggedIn()){
  //   				console.log('user');
  //   				// $scope.signInBtn = true;
  //   			}else{
  //   				// user 
  //   			}   //loggedIn
			       
		//         // console.log($scope.lastName);

	 //        $scope.signin = !$scope.signin;
	 //         if($scope.signupView){
	 //         	$scope.signupView = !$scope.signupView ;
	 //         }
	 //    };

// 
	    // $scope.signUpClick = function(){
	    //   $scope.signupView = !$scope.signupView ;
	    //   $scope.signin = !$scope.signin;
	    //   console.log($scope.signupView);
	    // };




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



	    // $( document ).ready(function() {
	        // setTimeout(function(){wall.fitWidth()},300);
	    // });
		

		$(function(){
		   $(window).scroll(function(){
		       if($(document).height()==$(window).scrollTop()+$(window).height()){
		           // alert('I am at the bottom');
				   callGetTips();//call the get tips

		       }
		   });
		});
	      
	})//end the controller
		
	.directive('categories', function() {
	  return {
	    templateUrl: 'views/categories.html'
	  };
	});
	

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

	