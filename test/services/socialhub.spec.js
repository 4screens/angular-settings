'use strict';

describe( '4screens.settings', function() {
  var SettingsSocialhubService
    , CONFIGMock
    , httpMock;

  beforeEach( module('4screens.settings') );

  // Here we create a dummy/mock service, to determine if they were caused.
  beforeEach( function() {
    CONFIGMock = {
      'backend': {
        'domain': '/backend/domain'
      },
      'frontend': {
        'socialhubWidget': {
          'get': '/frontend/socialhubWidget/:widgetId'
        }
      },
    };
    module(function( $provide ) {
      $provide.value( 'CONFIG', CONFIGMock );
    });
  } );

  beforeEach( inject(function( $injector, _SettingsSocialhubService_, _CONFIG_ ) {
    SettingsSocialhubService = _SettingsSocialhubService_;

    // Set up the mock http service responses
    httpMock = $injector.get('$httpBackend');
    // backend definition common for all tests
    httpMock.when('GET', CONFIGMock.backend.domain + CONFIGMock.frontend.socialhubWidget.get.replace(':widgetId', 123) ).respond({
      data: 'socialhubWidgetData'
    });

  }));

  describe( 'settings service', function() {

    it( 'should be defined', function() {
      expect( SettingsSocialhubService ).toBeDefined();
    });

    it( 'should respond to get method', function() {
      expect( SettingsSocialhubService.get ).toBeDefined();
    });

    it( 'should respond to get request', function() {
      SettingsSocialhubService.get( 123 ).then(function( res ) {
        expect( res.data ).toBe('socialhubWidgetData');
      });
      httpMock.flush();
    });

  });

});