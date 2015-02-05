'use strict';

/**
 * @ngdoc service
 * @name tipsApp.login
 * @description
 * # login
 * Service in the tipsApp.
 */

angular.module('LoginServices', ['ngResource'])

  .service('Login', function ($resource, $http) {
  	 this.url = 'http://localhost:1337/login',

  	this.postLogin = function(user, cb){
  	 	console.log('user in login service', user);
  	 	$http.post(this.url , user)
		.success(function(data) {
		    // this callback will be called asynchronously
		    // when the response is available
		    // console.log("cb",data, status, headers, config);
		    cb(null, data);
	        // console.log(data);
		    
		})
		.error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    cb(data, null);
	        // console.log($scope.lastName)

		});
  	};
  });
