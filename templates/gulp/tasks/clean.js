var gulp = require('gulp');
var del = require('del');

gulp.task('clean', function (callback) {
  del(['.tmp', 'target']).then(function () {
    callback();
  });
});

gulp.task('clean:post-dist', function (callback) {
  del(['target/dist/*/rev-manifest.json']).then(function () {
    callback();
  });
});
