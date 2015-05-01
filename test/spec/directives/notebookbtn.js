'use strict';

describe('Directive: notebookbtn', function () {

  // load the directive's module
  beforeEach(module('tipsApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<notebookbtn></notebookbtn>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the notebookbtn directive');
  }));
});
