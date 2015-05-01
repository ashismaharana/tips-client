'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:TipsCtrl
 * @description
 * # TipsCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
    .controller('TipsCtrl', function ($scope,  $cookieStore, $rootScope, $location, Tip, Category, Signout ,$route) {
        
        $scope.user = $cookieStore.get('current_user');
        
        //user nav active path
        // function widgetsController($scope, $route) {
            $scope.$route = $route;
        // }

        Category.getCategories().then(function(categoryResponse){
            console.log('categoryResponse', categoryResponse.data);
            $scope.categories = categoryResponse.data;
        });
        
        // console
        $scope.create = function (tip){
            // console.log('create before description', tip);
            // tip["description"] = CKEDITOR.instances.ashis.getData()
            // console.log('create after description', tip);
        	Tip.postCreate(tip, function(err, createdTip){
        		if(err){
        			console.log(err);
        		} else {
        			console.log('tips is', createdTip);
                    // alert('tip save ', createdTip);
                    $location.path('/user');
        		}
        	});
        };

        //new createNew button
        $scope.createNew = function (tip){
            console.log('createNew', tip);
            Tip.postCreate(tip, function(err, createdTip){
                if(err){
                    console.log(err);
                } else {
                    console.log('Tip is :', createdTip);
                    // alert('tip save ', createdTip);
                    $scope.tip = {
                     'categories': '',
                     'title': '',
                     'description': '',
                      // $scope.registrForm.$setPristine();
                    };
                }
            });
        };


        // CKEDITOR.replace( 'ashis', {
        //     filebrowserBrowseUrl: '/api/tips',
        //     filebrowserUploadUrl: '/api/tips',
        //     filebrowserImageWindowWidth: '640',
        //     filebrowserImageWindowHeight: '480'
        // });var editor = CKEDITOR.replace( 'editor1' );


    })

    .directive('create',function(){
	    return{
	      templateUrl: 'views/create.html'
	    };

  	});

