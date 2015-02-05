'use strict';

/**
 * @ngdoc directive
 * @name tipsApp.directive:validpassword
 * @description
 * # validpassword
 */

// angular.module('tipsApp')
//   .directive('validPasswordC',function () {
//     return {
//       require: 'ngModel',
//       link: function postLink(scope, element, attrs, ctrl, ) {
//       	ctrl.$parsers.unshift(function (viewValue, $scope) {
//             var noMatch = viewValue != scope.signup_email.password.$viewValue
//             ctrl.$setValidity('noMatch', !noMatch)
//         })
//       }
//     }
//   })


// var app = angular.module('myapp', ['UserValidation']);

// angular.module('UserValidation', [])
// .directive('validPasswordC', function () {
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