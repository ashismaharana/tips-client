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
          	return $http.get(this.url + '/tips-by-user/'+ userId)
        		// .success(function(tips){
            //     console.log('Get User Tips success:', tips);
        		//   cb(null, tips);
        		// })
        		// .error(function(data){
        		//   cb(data, null);
        		// });
        };

        //get popular tips of opened tip popup
        this.getPopularTips = function(userId, cb){
            return $http.get(this.url + '/popular-tips-by-user/' + userId);
        };

        this.getUserDetails = function(userId, cb){
            // console.log('user Details',userId);
            $http.get(this.url + '/user/' + userId)
            .success(function(user){
              // console.log(user);
              cb(null, user);
            })
            .error(function(data){
              cb(data, null);
            });
        };

  });