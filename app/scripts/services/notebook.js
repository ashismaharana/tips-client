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

//create new notebook
  		this.createNoteBook = function(mynb, cb){
			console.log('INFO: Before saving', mynb);
  			$http.post('/api/user/notebook', mynb)
  			.success( function(data) {
  				console.log('INFO: After Saving', data);
  				cb(null, data);
  			})
  			.error( function(data){
  				cb(data, null);
  			});
  		};

// get notebook
  		this.getNoteBook = function(userId, tipId, cb){
  			return $http.get('/api/notebook-by-user/' + userId + '?tip_id=' + tipId)
  			  .success(function(mynotebook){
  			 	  cb(null, mynotebook);
  			  })
  			  .error(function(data){
  			 	  cb(data, null);
  			 });
  		};

//add tips to notebook
      this.addTipToNotebook = function(tipid, notebookid, cb){
        console.log('INFO: Before saving tip to notebook ', tipid, notebookid);
        // var tipid = ( typeof(tipid) == "string" ? [tipid] : tipid );
        $http.put('/api/user/notebook/' + notebookid, {tip_id: tipid})
        .success( function(data) {
          console.log('INFO: After Saving tip to notebook', data);
          cb(null, data);
        })
        .error( function(data){
          cb(data, null);
        });
      };

// rename the notebook
      this.renameNotebook = function(id,notebook, cb){
        console.log(id);
        $http.put('/api/user/notebook/' + id, notebook)
        .success(function(data){
          cb(null, data);
        })
        .error(function(data){
          cb(data, null);
        });
      };

// delete this notebook
      this.deleteNotebook = function(NotebookId, cb){
        $http.delete('/api/user/notebook/' + NotebookId)
        .success(function(data){
          cb(null, data);
        })
        .error(function(data){
          cb(data, null);
        });
      };
  });