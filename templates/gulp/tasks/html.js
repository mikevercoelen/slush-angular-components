var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
var htmlMinify = require('gulp-minify-html');
var gutil = require('gulp-util');
var preprocess = require('gulp-preprocess');

var common = require('../common');

gulp.task('html', ['load-env'], function () {
  return gulp
    .src('src/*.html')
    .pipe(common.getPreprocess())
    .pipe(gulp.dest('.tmp'));
});

gulp.task('html:dist', ['html'], function () {
  var stylesManifest = require('../../target/dist/styles/rev-manifest.json');
  var scriptsManifest = require('../../target/dist/scripts/rev-manifest.json');

  return gulp
    .src('.tmp/*.html')
    .pipe(htmlReplace({
      css: 'styles/' + stylesManifest['main.css'],
      js: 'scripts/' + scriptsManifest['app.js']
    }))
    .pipe(htmlMinify({
      empty: false,
      cdate: false,
      comments: false,
      conditionals: false,
      spare: false,
      quotes: true,
      loose: false
    }))
    .pipe(gulp.dest('target/dist'));
});
