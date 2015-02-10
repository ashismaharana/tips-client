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
    this.url = 'http://localhost:1337/user/',

  	this.postUpdate = function( user, cb){
  		console.log('INFO: Before update', user);
  		$http.put(this.url + user.id, user)//api user.id send to update the user
  		.success(function(data){
  			console.log('INFO: After update ', data);
  			cb(null, data);
  		})
  		.error(function(data){
  			cb(data, null);
  		});
  	};
  });