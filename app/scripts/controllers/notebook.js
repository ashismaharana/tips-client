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
		$scope.signupView = false;

		$scope.signin = false;

		$scope.user = $cookieStore.get('current_user');
		
    //user nav active path
    // function widgetsController($scope, $route) {
        $scope.$route = $route;
    // }

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

					//get user notebook
					Notebook.getNoteBook($scope.user.id, null, function(err, data){
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
		Notebook.getNoteBook($scope.user.id, null, function(err, data){
			if(err){
				// console.log(err);
				$scope.myNoteBookData = [];
			} else {
				// console.log(data);
				$scope.myNoteBookData = data;
				var notebookData = $scope.myNoteBookData
				console.log(notebookData);


			angular.forEach(notebookData, function(value,key){
				if(value.tip_ids){
					// console.log(value.tip_ids);
					var tipIds = value.tip_ids;
					console.log("TIPID",tipIds);
						
					tipIds.forEach(function(tipId){

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
					})
				}
			})

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
