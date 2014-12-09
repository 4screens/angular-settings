/**
 * This file is subject to the terms and conditions defined in
 * file 'LICENSE' or 'LICENSE.txt', which is part of this source code package.
 */
var gulp = require('gulp')
, plugins = require('gulp-load-plugins')()
, pkg = require('./package.json')
, fs = require('fs')

, FILES = [
    './src/app.js',
    './src/services/socialhub.js'
  ]
, BANNER = './src/header.txt'
, MAIN = 'settings.js';

gulp.task( 'jscodesnifer', function() {
  return gulp.src( FILES )
    .pipe( plugins.jscodesniffer(
      { standard: 'Idiomatic', reporters: [ 'default', 'failer' ] }
    ) );
});

gulp.task( 'lint', ['jscodesnifer'], function() {
  return gulp.src( FILES )
    .pipe( plugins.jshint() )
    .pipe( plugins.jshint.reporter('jshint-stylish') );
} );

gulp.task( 'build', ['lint'], function() {
  return gulp.src( FILES )
    .pipe( plugins.concat( MAIN ) )
    .pipe( plugins.ngAnnotate() )
    .pipe( plugins.header( fs.readFileSync( BANNER, 'utf8' ), { pkg : pkg } ) )
    .pipe( gulp.dest('.') );
} );

gulp.task( 'minify', ['build'], function() {
  return gulp.src( MAIN )
    .pipe( plugins.plumber() )
    .pipe( plugins.uglify() )
    .pipe( plugins.rename({ extname: '.min.js' }) )
    .pipe( plugins.header( fs.readFileSync( BANNER, 'utf8' ), { pkg : pkg } ) )
    .pipe( gulp.dest('.') );
} );

gulp.task( 'copy', [ 'minify' ], function() {
  return gulp.src([ MAIN, MAIN.replace('.js', '.min.js') ])
    .pipe( gulp.dest('examples/client/vendor') );
} );

gulp.task( 'complexity', function() {
  return gulp.src( MAIN )
    .pipe( plugins.complexity() );
} );

gulp.task( 'watch', function() {
  gulp.watch( FILES, [ 'complexity', 'copy' ] );
} );

gulp.task( 'default', [ 'copy' ] );
