'use strict';

/**
 * @ngdoc service
 * @name tipsApp.vote
 * @description
 * # vote
 * Service in the tipsApp.
 */
angular.module('VoteService', ['ngResource'])
  .service('Vote', function ($resource, $http) {

  	this.upVote = function(tipId, cb){
  		$http.post('/api/tips/' + tipId + '/vote-up' )
  		.success( function(data) {
  			console.log('Success upVote',data);
  			cb(null, data[0]); // data returns an array of object
  		})
  		.error(function(data){
        console.log('ERROR while upvoting',data);
  			cb(data, null);
  		});
  	};

  	this.downVote = function(tipId, cb){
  	 $http.post('/api/tips/' + tipId + '/vote-down')
	  	.success( function(data) {
        console.log('Success downVote',data);
	  			cb(null, data[0]);
	  		})
	  		.error(function (data){
          console.log('ERROR while down voting',data);
	  			cb(data, null);
	  		});
	  	};
  	});
