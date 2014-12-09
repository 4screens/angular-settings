'use strict';

angular.module('4screens.settings').factory( 'SettingsSocialhubService',
  function( $http, CONFIG ) {
    return {
      get: function( widgetId ) {
        CONFIG.frontend.socialhubWidget.id = widgetId;
        return $http.get( CONFIG.backend.domain + CONFIG.frontend.socialhubWidget.get.replace( ':widgetId', widgetId ) ).then(function( res ) {
          return res.data;
        });
      }
    };
  }
);
