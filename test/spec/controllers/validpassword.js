'use strict';

describe('Controller: ValidpasswordCtrl', function () {

  // load the controller's module
  beforeEach(module('tipsApp'));

  var ValidpasswordCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ValidpasswordCtrl = $controller('ValidpasswordCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
