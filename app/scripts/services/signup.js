'use strict';

/**
 * @ngdoc service
 * @name tipsApp.signup
 * @description
 * # signup
 * Service in the tipsApp.
 */
 angular.module('SignupServices', ['ngResource'])

  .service('Signup', function ($resource, $http) {
  	 this.url = 'http://localhost:1337',

  	this.postSignup = function(user, cb){
  		console.log('USER INPUT:', user);
  	 	// console.log('user in login service', user);
  	 	$http.post(this.url +'/signup', user)
		.success(function(data) {
		    console.log('INFO: After Signup the response is - ', data);
		    cb(null, data);
        console.log("INFO : Signup success", data);
		})
		.error(function(data) {
		    cb(data, null);
		});
  	};
  });