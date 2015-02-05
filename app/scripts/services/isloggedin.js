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
    this.url = 'http://localhost:1337',

    this.LoggedIn = function() {
    	//return $resource(this.url + '/user/islogedin').get();
    	return $resource(this.url + '/user/islogedin');
    	// return $resource(this.url + '/user/islogedin').query(); //error due to .query 
    };
  });