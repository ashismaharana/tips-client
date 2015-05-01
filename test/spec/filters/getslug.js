'use strict';

describe('Filter: getSlug', function () {

  // load the filter's module
  beforeEach(module('tipsApp'));

  // initialize a new instance of the filter before each test
  var getSlug;
  beforeEach(inject(function ($filter) {
    getSlug = $filter('getSlug');
  }));

  it('should return the input prefixed with "getSlug filter:"', function () {
    var text = 'angularjs';
    expect(getSlug(text)).toBe('getSlug filter: ' + text);
  });

});
