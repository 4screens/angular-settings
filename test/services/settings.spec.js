'use strict';

describe( '4screens.settings', function() {
  var SettingsService;

  beforeEach( module('4screens.settings') );

  beforeEach( inject(function( _SettingsService_ ) {
    SettingsService = _SettingsService_;
  }));

  describe( 'settings service', function() {

    it( 'should be defined', function() {
      expect( SettingsService ).toBeDefined();
    });

    it( 'should respond to hello method', function() {
      expect( SettingsService.hello() ).toEqual('world');
    });

  });

});