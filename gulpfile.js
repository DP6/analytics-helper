'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var beautify = require('gulp-beautify');
var include = require('gulp-include');
var strip = require('gulp-strip-comments');
var del = require('del');
var replace = require('gulp-replace');

gulp.task('gtm-modules', function() {
  return gulp.src(['./core/modules/*.js', './gtm/modules/*js'])
    .pipe(replace(/module.exports[a-z-A-Z.]*\s*=\s*([a-zA-Z\-_]+;|([a-zA-Z\-_:.={},\n\s]+);+)/g, ''))
    .pipe(concat('gtm-modules.js'))
    .pipe(beautify({
        indent_size: 2,
        max_preserve_newlines: 2
    }))
    .pipe(strip())
    .on('error', console.log)
    .pipe(gulp.dest('./tmp'));
});

gulp.task('build-gtm', function() {
  return gulp.src('./gtm/main.js')
    .pipe(replace(/module.exports\s*=\s*[a-zA-Z]+;/g, ''))
    .pipe(include({
      hardFail: true,
      includePaths: [
        __dirname + '/tmp',
        __dirname + '/gtm',
      ]
    }))
    .on('error', console.log)
    .pipe(gulp.dest('./build/gtm'));
});

gulp.task('clean', function() {
  return del(['./tmp']);
});

gulp.task('default', gulp.series(['clean', 'gtm-modules', 'build-gtm', 'clean']));