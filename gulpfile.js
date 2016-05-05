var gulp = require('gulp'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src([
    'app/js/app.js',
    'app/js/app.config.js',
    'app/**/*.module.js',
    'app/**/*.routes.js',
    'app/**/*.js',
    '!app/bower_components/**/*.js',
    '!app/components/**/*.js',
    '!app/Utils/angular-resizable/**/*.js',
    '!app/Utils/js/lib/*.js'])

    .pipe(gp_concat('eremedium.js'))
    .pipe(gulp.dest('app/dist'))
    .pipe(gp_rename('eremedium.min.js'))
    .pipe(gp_uglify())
    .pipe(gulp.dest('app/dist'));
});
