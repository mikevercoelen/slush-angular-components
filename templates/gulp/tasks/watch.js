var gulp = require('gulp');
var watch = require('gulp-watch');
var runSequence = require('run-sequence');

var browserSync = require('./browser-sync');

gulp.task('watch-recompile', function (callback) {
  runSequence(['styles', 'scripts:module', 'scripts:components', 'html'], callback);
});

gulp.task('watch', ['load-env'], function () {

  watch([
    'src/views/**/*.html',
    'src/components/**/*.html'
  ], function () {
    gulp.start('templates');
  });

  watch([
    'src/module.js',
    'src/*.html'
  ], function () {
    gulp.start('watch-recompile');
  });

  watch([
    'src/styles/**/*.scss',
    'src/components/**/*.scss',
    'src/views/**/*.scss',
    'src/icons/**/*'
  ], function () {
    gulp.start('styles');
  });

  watch([
    'src/components/**/*.js',
    'src/views/**/*.js'
  ], function () {
    gulp.start('scripts:components');
  });

  watch([
    'src/images/**/*',
    '.tmp/*.html',
    '.tmp/generated-scripts/module.js',
    '.tmp/generated-scripts/node_modules.js',
    '.tmp/generated-scripts/components.js',
    '.tmp/generated-scripts/templates.js'
  ], browserSync.reload);
});
