'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:compareTo
 * @description
 * # compareTo
 */

angular.module('tipsApp')
  .directive('compareTo', function() {
    return {
        require: 'ngModel',
        scope: {
            otherModelValue: '=compareTo'
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
              return modelValue == scope.otherModelValue;
            };
 
            scope.$watch('otherModelValue', function() {
              ngModel.$validate();
            });
        }
    };
});
  
// var app = angular.module('myapp', ['UserValidation']);

// angular.module('UserValidation', []).directive('validPasswordC', function () {
//     return {
//         require: 'ngModel',
//         link: function (scope, elm, attrs, ctrl) {
//             ctrl.$parsers.unshift(function (viewValue, $scope) {
//                 var noMatch = viewValue != scope.myForm.password.$viewValue
//                 ctrl.$setValidity('noMatch', !noMatch)
//             })
//         }
//     }
// })