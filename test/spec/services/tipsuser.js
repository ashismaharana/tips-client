'use strict';

describe('Service: tipsUser', function () {

  // load the service's module
  beforeEach(module('tipsApp'));

  // instantiate service
  var tipsUser;
  beforeEach(inject(function (_tipsUser_) {
    tipsUser = _tipsUser_;
  }));

  it('should do something', function () {
    expect(!!tipsUser).toBe(true);
  });

});
