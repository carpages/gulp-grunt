var assert = require( 'chai' ).assert;
var path = require( 'path' );
var Gulp = require( 'gulp' ).Gulp;
var addGrunt = require( '../' );
require( 'mocha' );

describe( 'gulp-grunt', function() {
  var gulp;

  beforeEach( function() {
    gulp = new Gulp();
  });

  it( 'should load grunt tasks', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ) });

    assert.property( gulp.tasks, 'grunt-test' );
    assert.property( gulp.tasks, 'grunt-error' );
    assert.property( gulp.tasks, 'grunt-epic-error' );
  });

  it( 'should still run gulp tasks', function() {
    var ran = false;

    gulp.task( 'x', function() {
      ran = true;
    });

    gulp.start( 'x' );

    assert.isTrue( ran );
  });

  it( 'should work with another prefix', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ), prefix: 'gr-' });

    assert.property( gulp.tasks, 'gr-test' );
    assert.property( gulp.tasks, 'gr-error' );
    assert.property( gulp.tasks, 'gr-epic-error' );
  });

  it( 'should work with no prefix', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ), prefix: '' });

    assert.property( gulp.tasks, 'test' );
    assert.property( gulp.tasks, 'error' );
    assert.property( gulp.tasks, 'epic-error' );
  });

  it( 'should run grunt tasks, which fails', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ), force: false });

    gulp.task( 'grunt-testing', [ 'grunt-epic-error' ]);
    gulp.start( 'grunt-testing' );

    assert.isTrue( gulp.tasks['grunt-epic-error'].running );
  });

  it( 'should run grunt tasks', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ) });

    gulp.task( 'grunt-testing', [ 'grunt-test' ]);
    gulp.start( 'grunt-testing' );

    assert.isTrue( gulp.tasks['grunt-test'].running );
  });

  it( 'should handle errors gracefully', function() {
    addGrunt( gulp, { base: path.join( __dirname, 'fixtures' ) });

    gulp.task( 'grunt-testing', [ 'grunt-error' ]);
    gulp.start( 'grunt-testing' );

    assert.isTrue( gulp.tasks['grunt-error'].running );
  });
});
