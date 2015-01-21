'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:TestCtrl
 * @description
 * # TestCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  .controller('TestCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
