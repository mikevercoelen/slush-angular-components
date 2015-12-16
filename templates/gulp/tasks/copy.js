var gulp = require('gulp');

gulp.task('copy:fonts', function () {
  return gulp
    .src([
      '.tmp/fonts/*',
      'src/fonts/**/*'
    ])
    .pipe(gulp.dest('target/dist/fonts'));
});

gulp.task('copy:images', function () {
  return gulp
    .src('src/images/**/*')
    .pipe(gulp.dest('target/dist/images'));
});

gulp.task('copy', ['copy:fonts', 'copy:images']);
