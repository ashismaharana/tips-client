'use strict';

/**
 * @ngdoc service
 * @name tipsApp.create
 * @description
 * # create
 * Service in the tipsApp.
 */
angular.module('TipsServices', ['ngResource'])
	.service('Tip', function ($resource, $http) {
		this.url = 'http://localhost:1337',

		// console.log('create it',postCreate);

		this.postCreate = function(tip, cb){
			console.log('INFO: Before saving', tip);
			$http.post(this.url + '/tips', tip)
			.success(function(data) {
				console.log('INFO: After saving', data);
				cb(null, data);
			})
			.error(function(data){
				cb(data, null);
			});
		};

	 	this.getTips = function(){
	 		return $http.get(this.url + '/tips');
	 	};

	 	this.postView = function(tipId, cb){
	 		// console.log('service tip',tipId);
	 		return $http.put(this.url + '/tips/' + tipId + '/view')
	 		.success(function(data) {
				cb(null, data);
			})
			.error(function(data){
				cb(data, null);
			});

	 	};

	});