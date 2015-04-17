'use strict';

angular.module('CategoriesServices', ['ngResource'])

.service('Category', function($resource, $http){
    // this.query = function(){
    // 	return $resource(this.url + '/tips/categories').query();
    // };

    this.getCategories = function(){
    	return $http.get('/api/tips/categories');
    }

    this.getTipByCategories = function(categoryId){
    	return $http.get('/api/tips-by-category/' + categoryId);
    }
});