var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var concat = require('gulp-concat');
var htmlMinify = require('gulp-minify-html');
var gutil = require('gulp-util');

var common = require('../common');

gulp.task('templates', function () {
  return gulp
    .src([
      'src/components/**/*.html',
      'src/views/**/*.html'
    ])
    .pipe(common.getPreprocess())
    .pipe(htmlMinify())
    .pipe(templateCache({
      standalone: true,
      module: 'templates'
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('.tmp/generated-scripts'));
});
