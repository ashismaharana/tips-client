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

    this.url = 'http://localhost:1337/',

  	this.postUpload = function( img, cb){
  		console.log('INFO: Before update', img);
  		$http.put(this.url + user.id, img)//api user.id send to update the user
  		.success(function(data){
  			console.log('INFO: After update ', data);
  			cb(null, data);
  		})
  		.error(function(data){
  			cb(data, null);
  		});
  	};
	
  });
