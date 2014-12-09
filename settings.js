/*
 4screens-settings v0.0.1
 (c) 2014 Nopattern sp. z o.o.
 License: proprietary
*/
'use strict';

angular.module( '4screens.settings', [] );

'use strict';

angular.module('4screens.settings').factory( 'SettingsSocialhubService',
  ["$http", "CONFIG", function( $http, CONFIG ) {
    return {
      get: function( widgetId ) {
        CONFIG.frontend.socialhubWidget.id = widgetId;
        return $http.get( CONFIG.backend.domain + CONFIG.frontend.socialhubWidget.get.replace( ':widgetId', widgetId ) ).then(function( res ) {
          return res.data;
        });
      }
    };
  }]
);
