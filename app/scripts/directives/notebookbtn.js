'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:notebookbtn
 * @description
 * # notebookbtn
 */
angular.module('tipsApp')
  .directive('notebookbtn', function () {
    return {
      restrict: 'E',
      templateUrl:'../../views/notebook-btn.html'
      
    };
  });
