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
    this.url = 'http://localhost:1337/',

  	this.upVote = function(tipId, cb){
  		// return $http.post(this.url+ 'tips/' + tipId + '/vote-up' )
  		$http.post(this.url+ 'tips/' + tipId + '/vote-up' )
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
  	 $http.post(this.url+ 'tips/' + tipId + '/vote-down')
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
