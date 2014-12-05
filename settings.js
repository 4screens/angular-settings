/*
 4screens-settings v0.0.1
 (c) 2014 Nopattern sp. z o.o.
 License: proprietary
*/
'use strict';

angular.module( '4screens.settings', [] );

angular.module('4screens.settings').factory( 'SettingsService',
  function() {
    return {
      hello: function() {
        return 'world';
      }
    };
  }
);
