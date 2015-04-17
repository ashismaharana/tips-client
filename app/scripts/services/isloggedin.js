'use strict';

/**
 * @ngdoc service
 * @name tipsApp.IsLoggedIn
 * @description
 * # isLoggedIn
 * Service in the tipsApp.
 */
angular.module('IsLoggedInServices', ['ngResource'])

  .service('IsLoggedIn', function ($resource) {

    this.LoggedIn = function() {
    	//return $resource(this.url + '/user/islogedin').get();
    	return $resource('/api/user/islogedin');
    	// return $resource(this.url + '/user/islogedin').query(); //error due to .query 
    };
  });