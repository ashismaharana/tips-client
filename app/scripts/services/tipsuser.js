'use strict';

/**
 * @ngdoc service
 * @name tipsApp.tipsUser
 * @description
 * # tipsUser
 * Service in the tipsApp.
 */
angular.module('TipsUserServices', ['ngResource'])
  .service('TipsUser', function ($resource, $http) {
  	  this.url = 'http://localhost:1337',
  	  
  	  this.getUserTips = function(userId, cb){
    	// console.log('INFO: user id is :-',userId);
    	// Fetch the tips for the user
      	$http.get(this.url + '/tips-by-user/'+ userId)
    		.success(function(tips){
    		  cb(null, tips);
    		})
    		.error(function(data){
    		  cb(data, null);
    		});
      }
  });