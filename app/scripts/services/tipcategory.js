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

  		this.tipCategoryId = function(){
  			return $resource('/api/tips-by-category/' + category_id);
  		};
  });