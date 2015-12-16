var gulp = require('gulp');
var runSequence = require('run-sequence');
var gutil = require('gulp-util');

gulp.task('dist', function (callback) {
  gutil.env.production = true;

  runSequence('clean', ['scripts:dist', 'styles:dist'], 'html', function () {
    runSequence('clean:post-dist', ['copy'], callback);
  });
});
