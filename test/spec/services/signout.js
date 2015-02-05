'use strict';

describe('Service: signout', function () {

  // load the service's module
  beforeEach(module('tipsApp'));

  // instantiate service
  var signout;
  beforeEach(inject(function (_signout_) {
    signout = _signout_;
  }));

  it('should do something', function () {
    expect(!!signout).toBe(true);
  });

});
