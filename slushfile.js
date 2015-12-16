var gulp = require('gulp');
var install = require('gulp-install');
var conflict = require('gulp-conflict');
var template = require('gulp-template');
var rename = require('gulp-rename');
var _ = require('underscore.string');
var inquirer = require('inquirer');
var merge = require('merge-stream');
var async = require('async');

var isTrue = function(v){
  return (v == "yes" || v == "true") ? true : false;
}

gulp.task('default', function (callback) {
  var prompts = [{
    name: 'appName',
    message: 'What is the name?',
    default: 'angular-components-app'
  }, {
    name: 'moduleName',
    message: 'What is the name of the main Angular.js module?',
    default: 'app'
  }, {
    name: 'appVersion',
    message: 'What is the version?',
    default: '0.0.1'
  }, {
    name: 'appDescription',
    message: 'What is the description?',
    default: 'My Angular Components app'
  }, {
    name: 'appRepository',
    message: 'What is the repo?',
    default: ''
  }, {
    name: 'appAuthor',
    message: 'Name of the author?',
    default: 'Your name'
  }, {
    name: 'appEmail',
    message: 'Author email?',
    default: 'your-email@mail.com'
  }];

  inquirer.prompt(prompts, function (answers) {
    if (!answers.appName) {
      return callback();
    }

    answers.moduleName = _.slugify(answers.moduleName);
    answers.appName = _.slugify(answers.appName);
    answers.appAuthorSlug = _.slugify(answers.appAuthor);

    async.series([
      function (callback) {
        gulp
          .src(__dirname + '/templates/gulp/icons.template.scss')
          .pipe(conflict('./gulp/'))
          .pipe(gulp.dest('./gulp/'))
          .on('end', callback);
      },
      function (callback) {
        gulp
          .src([
            __dirname + '/templates/**',
            '!' + __dirname + '/templates/gulp/icons.template.scss'
          ])
          .pipe(template(answers))
          .pipe(rename(function(file) {
            if (file.basename[0] === '@') {
              file.basename = '.' + file.basename.slice(1);
            }
          }))
          .pipe(conflict('./'))
          .pipe(gulp.dest('./'))
          .pipe(install())
          .on('end', callback);
      },
      function (error) {
        if (error) {
          return callback(error);
        }

        callback();
      }
    ]);
  });
});
