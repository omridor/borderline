'use strict';

var gulp = require('gulp'),
  gutil = require('gulp-util'),
  jshint = require('gulp-jshint'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  nodemon = require('nodemon'),
  paths = {
    js: ['client/js/**/*.js'],
    html: ['client/views/**/*.html'],
    scss: ['client/scss/**/*.html'],
  };

var env = gutil.env.type === 'prod' || 'dev';

  
// default task starts the watch
gulp.task('default', ['start']);

// jshint task
gulp.task('jshint', function() {
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(count('jshint', 'files lint free'));
});

// Build css
gulp.task('build-css', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/css'));
});

gulp.task('csslint', function () {
  return gulp.src(paths.scss)
    .pipe(plugins.csslint('.csslintrc'))
    .pipe(plugins.csslint.reporter())
    .pipe(count('csslint', 'files lint free'));
});


// Configure watch to launch tasks
gulp.task('watch', function() {
  gulp.watch(paths.js, ['jshint']);
  gulp.watch(paths.scss, ['build-css']);
});

// Concat and (optionally minify) js
gulp.task('build-js', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type prod'
      .pipe(env === 'prod' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('public/assets/js'));
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js',
    tasks: ['watch',
            'build-js',
            'build-css'],
    ext: 'js html',
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log('restarted!')
  });
});


