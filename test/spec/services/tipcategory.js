'use strict';

describe('Service: tipCategory', function () {

  // load the service's module
  beforeEach(module('tipsApp'));

  // instantiate service
  var tipCategory;
  beforeEach(inject(function (_tipCategory_) {
    tipCategory = _tipCategory_;
  }));

  it('should do something', function () {
    expect(!!tipCategory).toBe(true);
  });

});
