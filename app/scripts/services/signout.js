'use strict';

/**
 * @ngdoc service
 * @name tipsApp.signout
 * @description
 * # signout
 * Service in the tipsApp.
 */
angular.module('signoutServices', ['ngResource'] )
  .service('Signout', function ($resource, $http) {
  	  this.url = 'http://localhost:1337/signout',


    this.destroySession = function(cb){
    	// var a =  $resource(this.url + '/signout').get();
    	// console.log("signOUT", a);
    	// return a;

    	$http.delete(this.url)
		.success(function(data) {
		    // console.log("cb",data, status, headers, config);
		    console.log('FRo ' , data);
		    cb(null, data);
		})
		.error(function(data) {
		    cb('Error: ', data, null);

		});
    };
  });