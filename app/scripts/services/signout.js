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

    this.destroySession = function(cb){

      $http.delete('/api/signout')
    		.success(function(data) {
    		    cb(null, data);
    		})
    		.error(function(data) {
    		    cb('Error: ', data, null);
  		  });
      };
  });