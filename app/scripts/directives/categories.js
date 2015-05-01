'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:categories
 * @description
 * # categories
 */
angular.module('tipsApp')
  .directive('categories', function () {
    return {
      restrict: 'E',
	    templateUrl: 'views/categories.html'
    };
  });