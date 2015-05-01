'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:loginBtn
 * @description
 * # loginBtn
 */
angular.module('tipsApp')
  .directive('loginbtn', function () {
    return {
      restrict: 'E',
      templateUrl: '../../views/login.html'
    };
  });


