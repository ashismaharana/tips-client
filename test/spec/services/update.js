'use strict';

describe('Service: update', function () {

  // load the service's module
  beforeEach(module('tipsApp'));

  // instantiate service
  var update;
  beforeEach(inject(function (_update_) {
    update = _update_;
  }));

  it('should do something', function () {
    expect(!!update).toBe(true);
  });

});
