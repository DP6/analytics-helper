'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const beautify = require('gulp-beautify');
const include = require('gulp-include');
const strip = require('gulp-strip-comments');
const del = require('del');

gulp.task('gtm-modules', () =>
  gulp
  .src(['./core/modules/*.js', './gtm/modules/*js'])
  .pipe(concat('gtm-modules.js'))
  .pipe(beautify({
    indent_size: 2
  }))
  .pipe(strip())
  .on('error', console.log)
  .pipe(gulp.dest('./tmp'))
);

gulp.task('build-gtm', () =>
  gulp
  .src('./gtm/main.js')
  .pipe(include({
    includePaths: ['/tmp', '/gtm'].map(path => __dirname + path),
    hardFail: true
  }))
  .on('error', console.log)
  .pipe(gulp.dest('./build/gtm'))
);

gulp.task('clean', () => del(['./tmp']));

gulp.task('default', gulp.series(['clean', 'gtm-modules', 'build-gtm', 'clean']));
