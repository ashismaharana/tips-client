'use strict';

angular.module('TipsServices', ['ngResource'])
 
.service('Tip', function($resource){
    this.url = 'http://localhost:1337',

    this.query = function(){
    	return $resource(this.url + '/tips').query();
    };
});