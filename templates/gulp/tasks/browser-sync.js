var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');

module.exports = browserSync;

gulp.task('browser-sync', ['html', 'scripts', 'styles', 'watch'], function (callback) {
  browserSync.init({
    server: {
      baseDir: ['.tmp'],

      // TODO: new browser-sync supports rewrite
      middleware: [historyApiFallback()],
      routes: {
        '/node_modules': 'node_modules',
        '/images': 'src/images',
        '/fonts': 'src/fonts'
      }
    }
  }, callback);
});
