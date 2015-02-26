'use strict';

/**
 * @ngdoc service
 * @name tipsApp.notebook
 * @description
 * # notebook
 * Service in the tipsApp.
 */
angular.module('NoteBookService', ['ngResource'])
  .service('Notebook', function ($resource, $http) {
  		this.url = 'http://localhost:1337',

  		this.createNoteBook = function(mynb, cb){
			console.log('INFO: Before saving', mynb);
  			$http.post(this.url + '/user/notebook', mynb)
  			.success( function(data) {
  				console.log('INFO: After Saving', data);
  				cb(null, data);
  			})
  			.error( function(data){
  				cb(data, null);
  			});
  		};

  		this.getNoteBook = function(userId, cb){
  			// console.log(userId);
  			return  $http.get(this.url + '/notebook-by-user/' + userId)
  			 .success(function(mynotebook){
  			 	// console.log(mynotebook);
  			 	cb(null, mynotebook);
  			 })
  			 .error(function(data){
  			 	cb(data, null);
  			 });
  		};
  });