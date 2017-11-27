'use strict';

var gulp     = require('gulp');
var concat   = require('gulp-concat');
var beautify = require('gulp-beautify');
var include  = require('gulp-include');
var gulpsync = require('gulp-sync')(gulp);
var strip    = require('gulp-strip-comments');
var minify   = require('gulp-minify');
var del      = require('del');

gulp.task('gtm-modules', function () {
  return gulp.src(['./core/modules/*.js', './gtm/modules/*js'])
    .pipe(concat('gtm-modules.js'))
    .pipe(beautify({indent_size: 2}))
    .pipe(strip())
    .on('error', console.log)
    .pipe(gulp.dest('./gtm'));
});

gulp.task('compress', function() {
  return gulp.src(['./gtm/gtm-modules.js', './gtm/expose.js'])
    .pipe(minify({
        ext:{
            src:'.js',
            min:'.min.js'
        },
        exclude: [],
        ignoreFiles: []
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./gtm/tmp'));
});
 
gulp.task('build-gtm', function () {
  return gulp.src('./gtm/main.js')
  .pipe(include())
  .on('error', console.log)
  .pipe(gulp.dest('build/gtm'));
});

gulp.task('clean', function () {
  return del(['gtm/tmp']);
});
 
gulp.task('default', gulpsync.sync(['gtm-modules', 'compress', 'build-gtm', 'clean']));
 