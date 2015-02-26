'use strict';

describe('Service: notebook', function () {

  // load the service's module
  beforeEach(module('tipsApp'));

  // instantiate service
  var notebook;
  beforeEach(inject(function (_notebook_) {
    notebook = _notebook_;
  }));

  it('should do something', function () {
    expect(!!notebook).toBe(true);
  });

});
