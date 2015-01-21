'use strict';

/**
 * @ngdoc function
 * @name tipsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tipsApp
 */

 // var baseUrl = 'http://localhost:1337/';

angular.module('tipsApp')

.controller('MainCtrl', function ($scope, Tip, Category) {
    $scope.tips = Tip.query();
   	$scope.categories = Category.query();
})

.directive('categories', function() {
  return {
    templateUrl: 'views/categories.html'
  };
});
