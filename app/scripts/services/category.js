'use strict';

angular.module('CategoriesServices', ['ngResource'])

.service('Category', function($resource, $http){
    this.url = 'http://localhost:1337',

    // this.query = function(){
    // 	return $resource(this.url + '/tips/categories').query();
    // };

    this.getCategories = function(){
    	return $http.get(this.url + '/tips/categories');
    }
});