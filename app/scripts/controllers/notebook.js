'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:NotebookCtrl
 * @description
 * # NotebookCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  .controller('NotebookCtrl', function ($scope, $http, $cookieStore, Category, Tip, Signout, Signup, Login, Notebook,  $rootScope, $location, $route) {
    // $scope.awesomeThings = [
    //   'HTML5 Boilerplate',
    //   'AngularJS',
    //   'Karma'
    // ];
		console.log("Notebook Controller!!");

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

	// var count = 0;

	//get user notebook
	if($scope.user && $scope.user.id){
		console.log('-----------------------------------get NoteBook---------ctrl-------------------------')

		// console.log($scope.user.id); 
		Notebook.getNoteBook($scope.user.id, null, function(err, data){
		console.log('-------------------<<<<<----------------get NoteBook---------ctrl-------------------------')

			// count++;
			// console.log("Count", count);
			if(err){
				console.log(err);
				// $scope.myNoteBookData = [];
			} else {
				// console.log(data);

				var notebookData = data;
				$scope.myNoteBookData = notebookData;
				console.log("NB DATA--ctrl", notebookData);

			// angular.forEach(notebookData, function(value,key){
			// 	if(value.tip_ids){
			// 		// console.log(value.tip_ids);
			// 		var tipIds = value.tip_ids;
			// 		console.log("TIPID",tipIds);
						
			// 		tipIds.forEach(function(tipId){

			// 		Tip.getTips().then(function(tipsSuccessResponse){
			// 				var tips = tipsSuccessResponse.data; 

			// 				Category.getCategories().then(function(categoryResponse){
			// 						$scope.categories = categoryResponse.data;
			// 						tips.forEach(function(tip){
			// 							$scope.categories.forEach(function(category){
			// 								if(category.id === tip.category_id){
			// 									tip.categoryTitle = category.title;
			// 								}
			// 							});
			// 						});	
			// 						$scope.tips = tips;
			// 						// console.log($scope.tips);
			// 				},function(categoryFailResponse){
			// 				});
			// 			},function(tipsErrorReponse){
			// 				// console.log(tipsErrorReponse)
			// 			});	
			// 		})
			// 	}
			// })

				// for(var i = 0; i < notebookData.length; i++){
				// 	console.log('length is:',data.length);
				// notebookData.forEach
				// 	notebookData.forEach(function(notebook){

					// $scope.categories.forEach(function(category){
					// 	if(category.id === categoryTip.category_id){
					// 		categoryTip.categoryTitle = category.title;
					// 	}
					// });
					// });

					// console.log("All notebook with tips id",data[0].tip_ids);
			}

				// console.log($scope.myNoteBookData);
			
		});  

	};


});
