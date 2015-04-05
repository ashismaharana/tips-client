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

	 	this.getTips = function(tip_ids){
	 		if(tip_ids){
		 		return $http.get(this.url + '/tips?tip_ids=' + tip_ids );
		 		// var r = $http(method: 'GET', url: this.url + '/tips',
		 		// 	params: {
		 		// 	  tip_ids: JSON.stringify(tip_ids)
		 		// 	});
		 		// return r;
		 	// 	var x = $http(
 			// 	  method: 'GET',
  		// 		  url: this.url + '/tips',
  		// 		  params: {
    // 				tip_ids: JSON.stringify(tip_ids) // tip ids is [1, 2, 3, 4]
  		// 		  }
				// )
				// return x;
	 		} else {
		 		return $http.get(this.url + '/tips');
	 		}
	 	};

	//this is for create thumb function
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

	//edit tip
	 	this.putTip = function(tip, cb){
	 		console.log(tip);
	 		return $http.put(this.url + '/tips/' + tip.id, tip)
	 		.success(function(tip){
	 			cb(null, tip);
	 		})
	 		.error(function(tip){
	 			cb(tip, null)
	 		});
	 	}

	});