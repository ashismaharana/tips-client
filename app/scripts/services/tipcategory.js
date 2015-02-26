'use strict';

/**
 * @ngdoc service
 * @name tipsApp.tipCategory
 * @description
 * # tipCategory
 * Service in the tipsApp.
 */
angular.module('tipCategoryServices', ['ngResource'])
  .service('tipCategory', function ($resource) {
  		this.url = 'http://localhost:1337',

  		this.tipCategoryId = function(){
  			return $resource(this.url + '/tips-by-category/' + category_id);
  		};
  });