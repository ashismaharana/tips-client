'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */


angular.module('tipsApp')

.controller('MainCtrl', function ($scope, Tip, Category) {
    $scope.tips = Tip.getTips();
   // console.log($scope.tips);
   	$scope.categories = Category.query();
   //console.log($scope.categories);
})
.directive('categories', function() {
  return {
    templateUrl: 'views/categories.html'
  };
});