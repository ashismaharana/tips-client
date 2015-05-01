'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  
  	.controller('ProfileCtrl', function ($scope, $http, $cookieStore, Update, $route, Tip, $upload, Upload, PopdownAPI) {

    //user nav active path
    // function widgetsController($scope, $route) {
        $scope.$route = $route;
    // }

		$scope.user = $cookieStore.get('current_user');

	// profile.html 
		$scope.profile = true;
		$scope.update = function(user){
            // delete user['avatar'];
            // delete user['image'];
			console.log('user', user);
			Update.postUpdate(user, function(err, userUpdate){
				if(err){
						console.log(err);
				} else {
					console.log(userUpdate);
					// var updateUser = userUpdate[0];
					// console.log(updateUser);
					// // console.log('cookie user',$cookieStore.get('current_user'));
					$cookieStore.put('current_user', userUpdate);
					console.log('INFO: user update :', $cookieStore.get('current_user'));
					$scope.profile = true;
					// PopdownAPI.success('Save profile');

				}
			});
		};

	//go for profile edit
		$scope.profile = true;
		$scope.profileEdit = function(){
			console.log('profile');
			$scope.profile = false;
		};

	//profile edit cancel
		$scope.updateCancel = function(){
			$scope.profile = true;
		};
		
		$(document).ready(function(){
			$(".editHover").hide();
			$(".modal-content").hover(function(){
				$(".editHover").fadeIn(200);
			},
			function(){
				$(".editHover").fadeOut(200);	
			}
			);
		});

		// add profile image
		$scope.uploadImage = function(image){
			var imgElement = image;
			var img = imgElement.files[0];
			console.log("Image file: ", img);

			if(img){
				var imgData = {};
				imgData.image_name = img.name;
				imgData.ext = img.type.split("/")[1];
				
				var FR = new FileReader();
				FR.readAsDataURL(img);

				FR.onload = function(e){
					imgData.data = e.target.result.split(",")[1];
					// console.log("DATA is : ", imgData.data);
					Upload.postUpload(imgData, function(err, userWithImage){
						if(!err){
							$cookieStore.put('current_user', userWithImage);
						console.log('upload avatar',userWithImage.avatar);
						// setTimeout(function(){
							$('.user-profile-img').attr('src',userWithImage.avatar);
							$('.profile-img').attr('src',userWithImage.avatar);
						// },5000)
						}else{
							console.log(err);
						}
					});
				}
			}
		}

		// $scope.upload = function (files) {

  //       console.log('test2 - current_user', $cookieStore.get('current_user'));

  //       if (files && files.length) {
  //           for (var i = 0; i < files.length; i++) {
  //               var file = files[i];

  //               console.log("Uploading... file", file);
                
  //               $scope.img = file;

  //               $upload.upload({
  //               	method: 'put',
  //                   url: '/api/image',
  //                   // url: 'http://localhost:1337/user/' + $cookieStore.get('current_user').id + '/uploadPicture2',

  //                   fields: {
  //                       'username': $scope.username,
  //                       'avatar': file
  //                   },
  //                   file: file
  //               }).progress(function (evt) {
  //                   var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
  //                   console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
  //               }).success(function (data, status, headers, config) {
  //               	console.log("What the haha!!!!!");
  //                   console.log('file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data));
  //                   $cookieStore.get('current_user');


  //    //                Update.postUpdate({file: data}, function(err, userUpdate){
		// 			// 	if(err){
		// 			// 		console.log(err);
		// 			// 	} else {
		// 			// 		console.log('cookie user',$cookieStore.get('current_user'));
		// 			// 		//$cookieStore.put('current_user', userUpdate);
		// 			// 		console.log('INFO: user update :', userUpdate);
		// 			// 		// $location.path('/');
		// 			// 		$scope.profile = true;
		// 			// 	}
		// 			// });

  //               });
  //           }
  //       }
  //   }


	// // tip Delete
	// 	$scope.deleteTips = function($index, tipId){
	// 		console.log(tipId);
	// 		console.log($index);
	// 		var r = confirm("Are you sure to delete the tip ? \n You won't be able to recover your tip");
	// 		if (r == true) {
	// 		    console.log("You pressed OK!");
	// 		    Tip.deleteTip(tipId, function(err, deleteResponse){
	// 		    	if(err){
	// 		    		console.log(err);
	// 		    	}else{
	// 					console.log('Delete Res:',deleteResponse);
	// 					setTimeout(function(){callFreeWall('#freewall');},50);//freewall call
	// 				    $('#deleted').modal('toggle');
	// 				    console.log(tipId);
	// 					$scope.tip.splice($index, 1);
	// 		    	}
	// 			});
	// 		} else{

	// 		}
	// 	}

	// $(".modal-content").on("hover",function(){
	// $(".modal-content").fadeIn(); or $(".modal-content").slideDown();
	// },function(){
	// 	$("modal-content").fadeOut(); or $("modal-content").slideUp();
	// });
	//upload profile img
		// $scope.uploadFile = function(myFile){
		// 	console.log('myFile',myFile);
		// 	console.log('upload',myFile);

		// }
	// $('.user-profile-img').attr('src','https://s3-us-west-1.amazonaws.com/tipslydev/avatar/550ed75541c31aa834aaa879-61648.jpeg');

	});
