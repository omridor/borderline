'use strict';
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    env = gutil.env.type || 'dev',
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    nodemon = require('gulp-nodemon'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    concatCss = require('gulp-concat-css'),
    livereload = require('gulp-livereload'),
    paths = {
      js: ['client/js/**/*.js'],
      staticHtml: ['client/views/static/**/*.html'],
      ejsTemplates: ['client/views/**/*.ejs'],
      scss: ['client/scss/**/*.scss'],
      serverJs:['server/**/*.js']
    };  

// Build css
gulp.task('build-css', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(concatCss('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/static/css'))
    .pipe(env === 'dev' ? livereload() : gutil.noop());
});

// Copy static html files to dist folder
gulp.task('html', function() {
  return gulp.src(paths.staticHtml)
    .pipe(gulp.dest('./dist/static/views'))
    .pipe(env === 'dev' ? livereload() : gutil.noop());
});

// Copy ejs files to dist folder
gulp.task('ejs', function() {
  return gulp.src(paths.ejsTemplates)
    .pipe(gulp.dest('./dist/ejs'))
    .pipe(env === 'dev' ? livereload() : gutil.noop());
});

// Concat (and optionally minify) js
gulp.task('build-js', function() {
  return gulp.src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(env === 'prod' ? uglify() : gutil.noop()) 
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/static/js'))
    .pipe(env === 'dev' ? livereload() : gutil.noop());
});

// Watch client sources, update dist folder. Browser will livereload.
gulp.task('watch', function() {
  livereload.listen({interval:500});
  gulp.watch(paths.js, ['build-js']);
  gulp.watch(paths.serverJs, ['jshint']);
  gulp.watch(paths.scss, ['build-css']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.html, ['ejs']);
});

// browserify task is done when all client sources are available in dist.
gulp.task('browserify', ['build-js', 'build-css', 'html', 'ejs']);

// default task starts the server and watch.
gulp.task('default', ['start', 'watch']);

// Server will restart if server code modified. 
gulp.task('start', ['browserify'], function () {
  nodemon({
    script: 'server.js',
    watch: ['server', 'server.js', 'config.js'],
    ext: 'js html ejs',
    env: { 'NODE_ENV': 'development' }
  }).on('restart', function () {
    console.log('restarted!');
  });
});


