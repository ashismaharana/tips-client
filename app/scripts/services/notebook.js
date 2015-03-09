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

  		this.getNoteBook = function(userId, tipId, cb){
        // console.log("kdfgjkldsgjklvdsfsdfds", userId, tipId);
  			// console.log(userId);
        // $http({
        //   url: this.url + '/notebook-by-user/' + userId,
        //   method: "GET",
        //   params: tipParams
        // });
  			return $http.get(this.url + '/notebook-by-user/' + userId + '?tip_id=' + tipId)
  			  .success(function(mynotebook){
  			 	  // console.log("jkdsgkgksldg", mynotebook);
  			 	  cb(null, mynotebook);
  			  })
  			 .error(function(data){
  			 	  cb(data, null);
  			 });
  		};

      this.addTipToNotebook = function(tipid, notebookid, cb){
        console.log('INFO: Before saving tip to notebook ', tipid, notebookid);
        // var tipid = ( typeof(tipid) == "string" ? [tipid] : tipid );
        $http.put(this.url + '/user/notebook/' + notebookid, {tip_id: tipid})
        .success( function(data) {
          console.log('INFO: After Saving tip to notebook', data);
          cb(null, data);
        })
        .error( function(data){
          cb(data, null);
        });
      };
  });