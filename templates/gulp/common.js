var combiner = require('stream-combiner2');
var browserSync = require('./tasks/browser-sync');
var gutil = require('gulp-util');
var preprocess = require('gulp-preprocess');

function getCombinerPipe (taskName, tasks) {
  var combined = combiner.obj(tasks);

  combined.on('error', function (error) {
    browserSync.notify('Styles error: ' + error.message);
    gutil.log(gutil.colors.red('Error'), error.message);
    this.emit('end');
  });

  return combined;
}

function getPreprocess () {
  return preprocess({
    context: getContext()
  })
}

function getContext () {
  var production = gutil.env.production;
  var context = {
    NODE_ENV: 'development',
    DEBUG: true
  };

  if (!production) {
    context.NODE_ENV = 'production';
    context.DEBUG = false;
  }

  return context;
}

module.exports = {
  getCombinerPipe: getCombinerPipe,
  getPreprocess: getPreprocess
};
