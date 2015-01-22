'use strict';

angular.module('CategoriesServices', ['ngResource'])

.service('Category', function($resource){
    this.url = 'http://localhost:1337',

    this.query = function(){
    	return $resource(this.url + '/tips/categories').query();
    };
});