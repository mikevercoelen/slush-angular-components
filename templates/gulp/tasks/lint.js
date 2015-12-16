var gulp = require('gulp');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp
    .src([
      'src/components/**/*.js',
      'src/views/**/*.js',
      'src/module.js'
    ])
    .pipe(eslint())
    .pipe(eslint.format());
});
