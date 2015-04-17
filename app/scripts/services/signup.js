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

  	this.postSignup = function(user, cb){
  	 	$http.post('/api/signup', user)
    		.success(function(data) {
    		    cb(null, data);
    		})
    		.error(function(data) {
    		    cb(data, null);
    		});
  	};
  });