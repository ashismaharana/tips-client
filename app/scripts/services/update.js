'use strict';

/**
 * @ngdoc service
 * @name tipsApp.update
 * @description
 * # update
 * Service in the tipsApp.
 */
angular.module('updateServices', ['ngResource'])
  .service('Update', function ($resource, $http) {

  	this.postUpdate = function( user, cb){
  		$http.put('/api/user-profile/' + user.id, user)//api user.id send to update the user
  		.success(function(data){
  			cb(null, data);
  		})
  		.error(function(data){
  			cb(data, null);
  		});
  	};
  });