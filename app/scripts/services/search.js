'use strict';

/**
 * @ngdoc service
 * @name tipsApp.search
 * @description
 * # search
 * Service in the tipsApp.
 */
angular.module('searchServices', ['ngResource'])
  .service('Search', function ($resource, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function

     	this.searchGet = function(search, cb){
     		return $http.get('/api/tip/search?title='+ search)
     		.success(function(data) {
			    cb(null, data);
			})
			.error(function(error){
				cb(error);
			})
	 	};
  });
