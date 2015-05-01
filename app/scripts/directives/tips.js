'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:tips
 * @description
 * # tips
 */
angular.module('tipsApp')
  .directive('tips', function () {
    return {
      restrict: 'E',
      templateUrl: '../../views/tips.html'
    };
  });
