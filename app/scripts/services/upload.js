'use strict';

/**
 * @ngdoc service
 * @name tipsApp.upload
 * @description
 * # upload
 * Service in the tipsApp.
 */
angular.module('uploadServices', ['ngResource'])
  .service('Upload', function ($resource, $http) {


  	this.postUpload = function( img, cb){
  		// console.log('INFO: Before upload---', img);
  		$http.put('/api/image/', img)
  		.success(function(data){
  			console.log('INFO: After upload', data);
  			cb(null, data);
  		})
  		.error(function(data){
  			cb(data, null);
  		});
  	};
	
  });
