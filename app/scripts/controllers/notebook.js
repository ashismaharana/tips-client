'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:NotebookCtrl
 * @description
 * # NotebookCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  .controller('NotebookCtrl', function ($scope, $http, $cookieStore, Category, Tip, Signout, Signup, Login, Notebook,  $rootScope, $location, $route, TipsUser, Follow, editableOptions ) {
    

	  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'

    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
		// console.log("Notebook Controller!!");

		$scope.signupView = false;

		$scope.signin = false;

		$scope.user = $cookieStore.get('current_user');
		
    //user nav active path
    // function widgetsController($scope, $route) {
        $scope.$route = $route;
    // }

    // $scope.getNotebookTips = function(){
    // 	//$scope.notebookTips = [];
    // 	$scope.notebookTips = [
    // 	 {"id": "nb1", "notebook_name": "NB1", "tips": [{"id": "tip1", 'title': "Tip1 NB1"}, {"id": "tip2", 'title': "Tip2 NB2"}]},
    // 	 {"id": "nb2", "notebook_name": "NB2", "tips": [{"id": "tip2", 'title': "Tip2 NB2"}]},
    // 	 {"id": "nb3", 'notebook_name': "NB3", "tips": [{"id": "tip3", 'title': "Tip3 NB3"}]}
    // 	];

        
    // 	// [
    // 	   //   {id: notebook1Id, tips: [{id: tipId, ..}]},
    // 	   //   {id: notebook2Id, tips: [{id: tipId, ..}]},
    // 	   //   {id: notebook3Id, tips: [{id: tipId, ..}]},
    // 	// ]
    // };
    //$scope.getNotebookTips();

    //create user notebook
	$scope.myNoteBook = function(notebook){
		console.log($scope.user.id);
		console.log(notebook);
		
		if($scope.create){
			Notebook.createNoteBook(notebook, function(err, mynb){
				if(err){
						// console.log('no',err);
						// console.log(err);
				} else {
					// console.log('notebook name', mynb);
					
					$scope.create={
						 'notebook_name': ''
					}
					$scope.create = false;
					
					callGetTipsNb();//call the get tips

					// //get user notebook
					// Notebook.getNoteBook($scope.user.id, null, function(err, data){
					// 	$scope.myNoteBookData = data;
					// });  
				}
			});
		} else {
			$scope.create = true;
			$scope.notebook = {
     			'notebook_name': ''
			}	
		}
	};

	//get the categories
	Category.getCategories().then(function(categoryResponse){
		$scope.categories = categoryResponse.data;
	});

	// var count = 0;

	//get user notebook
		callGetTipsNb();//call the get tips
	function callGetTipsNb(){
		if($scope.user){
			Notebook.getNoteBook($scope.user.id, null, function(err, data){
			// console.log('-------------------<<<<<----------------get NoteBook---------ctrl-------------------------')
				if(err){
					console.log(err);
					$scope.myNoteBookData = [];
				} else {
					// console.log(data);
					var notebookData = data;
					angular.forEach(notebookData, function(value,key){
						if(value.tip_ids){
							var tipIds = value.tip_ids;


							Tip.getTips(tipIds).then(function(tipsSuccessResponse){
								var tips = tipsSuccessResponse.data; 

								tips.forEach(function(tip){
								  $scope.categories.forEach(function(category){
									if(category.id === tip.category_id){
									  tip.categoryTitle = category.title;
									}
								  });
								});	
								
								setTimeout(function(){
								  callFreeWall("#nb-section-" + value.id);
								},50);//freewall call

								// setTimeout(function(){callFreeWall('');},50);//freewall call

								console.log();

								value["tips"] = tips;
							});
								// },function(tipsErrorReponse){
									// console.log(tipsErrorReponse)
								// });	
							//})
						}
					//}
					}, notebookData);

					//console.log("NB Data", notebookData);
					$scope.myNoteBookData = notebookData;
				}
			});  
		};
	};

	$scope.tipDescriptionNb = function($index, nbtip){
		$scope.nbTipDetails = nbtip;
		console.log($scope.nbTipDetails)
		if($scope.nbTipDetails){

			// userDetails
			var userCreatedByIdNb = $scope.nbTipDetails.created_by;
			TipsUser.getUserDetails(userCreatedByIdNb, function(err, data){
				if(err){
					console.log(err);
				} else {
					console.log(data);
					$rootScope.userIsNb = data;
				}
			});

			//popular tip of the user
			TipsUser.getPopularTips(userCreatedByIdNb).then(function(userTip){
				var popularTipsOfUserNb = userTip.data;
				Category.getCategories().then(function(categoryResponse){
					$scope.categories = categoryResponse.data;
					popularTipsOfUserNb.forEach(function(popularTip){
						$scope.categories.forEach(function(category){
							if(category.id === popularTip.category_id){
								popularTip.categoryTitle = category.title;
							}
						});
					});	
					$scope.popularTipsOfUserNb = popularTipsOfUserNb;
						console.log($scope.popularTipsOfUserNb);
					// setTimeout(function(){callFreeWall();},300);//added the freewall

				},function(categoryFailResponse){
					console.log('categoryFailResponse');
					});
			},function(tipsErrorReponse){
					console.log('tipsErrorReponse');
			});

		}//END

	};

	$scope.addToNbNb = function(addToNbPopUpNb){
		$scope.addToNbPopUpNb = !$scope.addToNbPopUpNb;
	}
	$scope.popularTipOfUserNb = function(popularTipNb){
		console.log(popularTipNb);
		$scope.nbTipDetails = popularTipNb;
	}

	$scope.followUserNb = function(userIs, nbTipDetails){
		// var userData ={ user_id: $scope.createdBy, tip_id: $scope.tipId }	
		// console.log('Data:', userData );
		// console.log('userIs.id:', userIs.id );
		// console.log('category_id:', tipDetails.category_id );
		if($scope.user){
			console.log(nbTipDetails);
			var user_id = $scope.user.id ;
			var tip_category_id = nbTipDetails.category_id ;

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
	};
	
	// tipsApp.run(function(editableOptions) {
	//   editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
	// });


	$scope.updateNotebook = function(notebookId ,notebookedit){
		// alert('notebookedit');
		console.log($scope.notebookedit);
		console.log(notebookedit);
		console.log(notebookedit.notebook_name);

		Notebook.renameNotebook(notebookId, notebookedit, function(err, updateNotebookResponse){
			console.log(updateNotebookResponse);
		})
		// console.log('renameNotebookEdit',renameNotebookEdit);
		// $scope.one = !$scope.one;
	};




	$scope.deleteNotebook = function($index, notebookId){
		console.log($index)
		
		var r = confirm("Are you sure to delete the notebook ? \n You won't be able to recover your data");
		if (r == true) {
		    console.log("You pressed OK!");
		    Notebook.deleteNotebook(notebookId, function(err, deleteResponse){
		    	if(err){
		    		console.log(err);
		    	}else{
					$scope.myNoteBookData.splice($index, 1);
					console.log(deleteResponse);
		    	}
			});
		} else {
		    console.log("You pressed Cancel!");
		}
		
	};


		// Get the list of user ids the current user is following.
		// if($cookieStore.get('current_user')){
		// 	Follow.followingGet($scope.user.id, function(err, followingList){
		// 		if(!err){
		// 			$scope.userFollowings = followingList;
		// 		} else{
		// 			$scope.userFollowings = [];
		// 		}
		// 	});

		// 	Notebook.getNoteBook($scope.user.id, null, function(err, data){
		// 		$scope.myNoteBookData = data;

		// 	    // console.log('all notebook', $scope.myNoteBookData);

		// 	}); 
		// }
});
