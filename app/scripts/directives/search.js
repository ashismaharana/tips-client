'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:search
 * @description
 * # search
 */
angular.module('tipsApp')
  .directive('search', function () {
    return {
      restrict: 'E',
      templateUrl: '../../views/search-box.html'
    };
  });
