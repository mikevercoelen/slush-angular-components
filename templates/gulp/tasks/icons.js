var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var rename = require('gulp-rename');
var gutil = require('gulp-util');

var runTimestamp = Math.round(Date.now() / 1000);

gulp.task('icons', ['load-env'], function (callback) {
  gulp
    .src([
      'src/icons/*.svg',
      '!src/icons/_*.svg'
    ])
    .pipe(iconfont({
      fontName: 'icons',
      fontPath: '../fonts/',
      formats: ['ttf', 'eot', 'woff', 'svg'],
      timestamp: runTimestamp,
      normalize: true
    }))
    .on('glyphs', function (glyphs, options) {
      glyphs.forEach(function (glyph) {
        glyph.character = glyph.unicode[0].charCodeAt(0).toString(16);
      });

      gulp
        .src('gulp/icons.template.scss')
        .pipe(consolidate('lodash', {
          glyphs: glyphs,
          fontName: options.fontName,
          fontPath: options.fontPath
        }))
        .pipe(rename('icons.scss'))
        .pipe(gulp.dest('.tmp/generated'));
    })
    .pipe(gulp.dest('.tmp/fonts'))
    .once('end', callback);
});
