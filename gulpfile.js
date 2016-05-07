var gulp = require('gulp'),
    useref = require('gulp-useref'),
    util = require('gulp-util'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    lazypipe = require('lazypipe'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    del = require('del'),
    ngConfig = require('gulp-ng-config');

// Parse html and create min.js/min.css
gulp.task('useref', function() {
  if (util.env.type === 'dev') return; // do nothing on dev environments
  return gulp.src('app/**/*.html')
    .pipe(useref({}, lazypipe().pipe(sourcemaps.init, { loadMaps: true })))
    .pipe(sourcemaps.write('maps'))
//    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(gulp.dest('dist'));
});

gulp.task('copyImages', function() {
  return gulp.src('app/**/*.{jpg,png,gif}')
    .pipe(gulp.dest('dist'));
});

gulp.task('copyFonts', function() {
  return gulp.src('app/**/*.{ttf,otf}')
    .pipe(gulp.dest('dist'));
})

gulp.task('copyWacomMem', function() {
  return gulp.src('app/Utils/js/lib/*.mem', {base: 'app/Utils/js/lib'})
    .pipe(gulp.dest('dist'));
});

gulp.task('loadConfig', function() {
  var type = util.env.type || "dev";
  var base_dir = type == "dev" ? "app" : "dist";
  gulp.src('app/config.json')
    .pipe(ngConfig('ERemediumWebApp.config', {
      environment: type,
      createModule: false,
    }))
    .pipe(gulp.dest(base_dir + "/js"));
});

gulp.task('build', ['useref', 'copyWacomMem', 'copyImages', 'copyFonts', 'loadConfig']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src(['app/**/*.js', '!app/bower_components/**/*.js', '!app/components/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch(['app/**/*.js', '!app/bower_components/**/*.js', '!app/components/**/*.js'], ['jshint']);
});

// define the default task and add the watch task to it
gulp.task('default', ['watch']);
