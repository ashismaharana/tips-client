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
		this.url = 'http://localhost:1337/tips',

		// console.log('create it',postCreate);

		this.postCreate = function(tip, cb){
			console.log('INFO: Before saving', tip);
			$http.post(this.url, tip)
			.success(function(data) {
				console.log('INFO: After saving', data);
				cb(null, data);
			})
			.error(function(data){
				cb(data, null);
			});
		};

		this.getTips = function(){
	    	return $resource(this.url).query();
	    };

	});