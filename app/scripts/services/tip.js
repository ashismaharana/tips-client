'use strict';

angular.module('TipsServices', ['ngResource'])
 
.service('Tip', function($resource){
    this.url = 'http://localhost:1337',

    this.getTips = function(){
    	return $resource(this.url + '/tips').query();
    };

    // this.getCategories = function(){
    // 	return $resource(this.url + '/tips/categories').query();
    // };

});