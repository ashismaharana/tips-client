'use strict';

/**
 * @ngdoc filter
 * @name tipsApp.filter:getSlug
 * @function
 * @description
 * # getSlug
 * Filter in the tipsApp.
 */
angular.module('tipsApp')
  .filter('getSlug', function ($speakingurl) {
    return function (input) {
      return 'getSlug filter: ' + $speakingurl.getSlug(input);
    };
  });
