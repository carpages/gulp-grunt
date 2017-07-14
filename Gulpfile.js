var gulp = require( 'gulp' );
var mocha = require( 'gulp-mocha' );

require( 'loud-rejection' )();

gulp.task( 'test', function( cb ) {
  gulp.src( 'test/*.js' ).pipe( mocha());
});
