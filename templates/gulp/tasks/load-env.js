var gulp = require('gulp');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

gulp.task('load-env', function (callback) {

  // load .env file
  var dotEnvFile = require('dotenv').load();

  if (!dotEnvFile) {
    this.emit('error', new PluginError('load-env', '.env file is missing. Create it at the root of your project.'));
  }

  var env = process.env;

  if (!env.MODULE_NAME) {
     this.emit('error', new PluginError('load-env', '.env file is missing required "MODULE_NAME" variable.'));
  }

  callback();
});
