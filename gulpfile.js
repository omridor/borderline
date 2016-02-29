'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  nodemon = require('gulp-nodemon'),
  concat = require('gulp-concat'),
  scsslint = require('gulp-scss-lint'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  concatCss = require('gulp-concat-css'),
  paths = {
    js: ['client/js/**/*.js'],
    html: ['client/views/**/*.html'],
    scss: ['client/scss/**/*.scss'],
  };

var env = gutil.env.type === 'prod' || 'dev';

  
// default task starts the server and watch.
gulp.task('default', ['start', 'watch']);

// jshint task
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Build css
gulp.task('build-css', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

// scss lint
gulp.task('scss-lint', function () {
  return gulp.src(paths.scss)
    .pipe(scsslint());
});

// Copy html files to dist folder
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist/views'))
    .pipe(livereload());
});

// Concat (and optionally minify) js
gulp.task('build-js', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type prod'
      .pipe(env === 'prod' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

// Watch client sources, update dist folder. Browser will livereload.
gulp.task('watch', function() {
  livereload.listen({interval:500});
  gulp.watch(paths.js, ['jshint', 'build-js']);
  gulp.watch(paths.scss, ['scss-lint', 'build-css']);
  gulp.watch(paths.html, ['html']);
});

// browserify task is done when all client sources are available in dist.
gulp.task('browserify', ['build-js', 'build-css', 'html']);

// Server will restart if server code modified. 
gulp.task('start', ['browserify'], function () {
  nodemon({
    script: 'server.js',
    watch: 'server',
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log('restarted!')
  });
});


