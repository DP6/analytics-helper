var gulp     = require('gulp');
var concat   = require('gulp-concat');
var beautify = require('gulp-beautify');
var include  = require("gulp-include");
var gulpsync = require('gulp-sync')(gulp);
var strip    = require('gulp-strip-comments');

gulp.task('gtm-modules', function () {
  return gulp.src(['./core/modules/*.js', './gtm/modules/*js'])
    .pipe(concat('gtm-modules.js'))
    .pipe(beautify({indent_size: 2}))
    .pipe(strip())
    .on('error', console.log)
    .pipe(gulp.dest('./gtm'));
});
 
gulp.task("build-gtm", function () {
  gulp.src("./gtm/main.js")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("build/gtm"));
});
 
gulp.task("default", gulpsync.sync(["gtm-modules", "build-gtm"]));
 