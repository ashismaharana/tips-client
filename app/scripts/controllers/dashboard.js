'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the tipsApp
 */
angular.module('tipsApp')
  .controller('DashboardCtrl', function ($scope, $route) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    //user nav active path
    // function widgetsController($scope, $route) {
        // $scope.$route = $route;
    // }

    
  });
