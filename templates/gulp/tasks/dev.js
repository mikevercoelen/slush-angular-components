var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('dev', ['clean'], function () {
  gutil.env.production = false;
  gulp.start('browser-sync');
});
