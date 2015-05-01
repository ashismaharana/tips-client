var PopdownModule = angular.module('Popdown', []);

PopdownModule.factory('PopdownAPI', function() {
    return {
        status: null,
        message: null,
        success: function(msg) {
            this.status = 'success';
            this.message = msg;
        },
        error: function(msg) {
            this.status = 'error';
            this.message = msg;
        },
        clear: function() {
            this.status = null;
            this.message = null;
        }
    }
});

PopdownModule.directive('popdown', function() {
    return {
        restrict: 'E',
        scope: {},
        replace: true,
        controller: function($scope, PopdownAPI) {
            $scope.show = false;
            $scope.api = PopdownAPI;
            
            $scope.$watch('api.status', toggledisplay)
            $scope.$watch('api.message', toggledisplay)
            
            $scope.hide = function() {
                $scope.show = false;
                $scope.api.clear();
            };
            
            function toggledisplay() {
                $scope.show = !!($scope.api.status && $scope.api.message);               
            }
        },
        template: '<div class="alert alert-{{api.status}}" ng-show="show">' +
                  '  <button type="button" class="close" ng-click="hide()">&times;</button>' +
                  '  {{api.message}}' +
                  '</div>'
    }
})
