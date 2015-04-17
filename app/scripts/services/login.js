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

  	this.postLogin = function(user, cb){
  	 	// console.log('user in login service', user);
  	 	$http.post('/api/login' , user)
		.success(function(data) {
			// console.log("success"); return false;
			// console.log('INFO: AFTER LOGIN RESPONSE',data, "status", status, 'header', headers, 'config', config);
		    // this callback will be called asynchronously
		    // when the response is available
		    // console.log("cb",data, status, headers, config);
		    cb(null, data);
	        // console.log(data);
		    
		})
		// .error(function(data, status, headers, config) {
		.error(function(data) {
			// console.log("error"); return false;
			// console.log('ERROR: AFTER LOGIN RESPONSE',data, status, headers, config);
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    cb(data);
	        // console.log($scope.lastName)

		});
  	};

  	this.resetRequest = function(userMail, cb){
  	 	$http.post('/api/reset' , userMail)
		.success(function(data) {
		    cb(null, data);
		})
		.error(function(data){
			cb(data);
		})
  	}
  	
  });