var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var filter = require('gulp-filter');
var rev = require('gulp-rev');
var minifyCss = require('gulp-minify-css');
var size = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('./browser-sync');

var common = require('../common');

var autoprefixerOptions = {
  browsers: ['last 2 versions'],
  cascade: false
};

gulp.task('styles', ['icons'], function () {
  return common.getCombinerPipe('styles', [
    gulp.src('src/styles/main.scss'),
    sourcemaps.init(),
      sassGlob(),
      sass({
        includePaths: ['node_modules']
      }),
      autoprefixer(autoprefixerOptions),
    sourcemaps.write(),
    gulp.dest('.tmp/generated-styles'),
    browserSync.stream()
  ]);
});

gulp.task('styles:dist', ['icons'], function () {
  var cssFilter = filter('*.css', {
    restore: true
  });

  return gulp
    .src('src/styles/main.scss')

    .pipe(sassGlob())
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(minifyCss())
    .pipe(size({
      gzip: true,
      title: 'main.css'
    }))
    .pipe(cssFilter)
    .pipe(rev())
    .pipe(cssFilter.restore)
    .pipe(gulp.dest('target/dist/styles'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('target/dist/styles'));
});
