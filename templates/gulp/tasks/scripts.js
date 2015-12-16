var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ngAnnotate = require('gulp-ng-annotate');
var assets = require('gulp-assets');
var filter = require('gulp-filter');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rev = require('gulp-rev');
var gulpif = require('gulp-if');
var runSequence = require('run-sequence');
var size = require('gulp-size');
var angularComponents = require('gulp-angular-components');
var babel = require('gulp-babel');

var common = require('../common');

gulp.task('scripts:node_modules', ['load-env'], function () {
  return gulp
    .src('src/index.html')
    .pipe(assets({
      js: 'node_modules',
      cwd: '../'
    }))
    .pipe(concat('node_modules.js'))
    .pipe(gulp.dest('.tmp/generated-scripts'));
});

gulp.task('scripts:module', ['lint', 'load-env'], function () {
  var production = gutil.env.production;

  return common.getCombinerPipe('scripts:module', [
    gulp.src('src/module.js'),

    gulpif(!production, sourcemaps.init()),
      common.getPreprocess(),
      ngAnnotate(),
    gulpif(!production, sourcemaps.write()),

    gulp.dest('.tmp/generated-scripts')
  ]);
});

gulp.task('scripts:components', ['lint', 'load-env'], function () {
  var production = gutil.env.production;

  return common.getCombinerPipe('scripts:components', [
    gulp.src([
      '!src/components/**/*.test.js',
      'src/components/**/*.js',
      'src/views/**/*.js'
    ]),

    gulpif(!production, sourcemaps.init()),
      common.getPreprocess(),
      angularComponents({
        moduleName: process.env.MODULE_NAME
      }),
      babel({
        presets: ['es2015']
      }),
      ngAnnotate(),
      concat('components.js'),
    gulpif(!production, sourcemaps.write()),

    gulp.dest('.tmp/generated-scripts')
  ]);
});

gulp.task('scripts', function (callback) {
  runSequence(['scripts:node_modules', 'scripts:module', 'scripts:components', 'templates'], callback);
});

gulp.task('scripts:dist', ['scripts'], function () {
  var jsFilter = filter('app.js', {
    restore: true
  });

  return gulp
    .src([
      'node_modules.js',
      'templates.js',
      'module.js',
      'components.js'
    ], {
      cwd: '.tmp/generated-scripts'
    })
    .pipe(concat('app.js'))
    .pipe(uglify())
    .pipe(size({
      gzip: true,
      title: 'app.js'
    }))
    .pipe(jsFilter)
    .pipe(rev())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('target/dist/scripts'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('target/dist/scripts'));
});
