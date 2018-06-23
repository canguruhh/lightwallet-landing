var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var browserSync = require('browser-sync').create();

// Set the banner content
var banner = ['/*!\n',
  ' * Copyright 2016-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ''
].join('');

gulp.task('html', function() {
  return gulp.src([
      '*.html',
      '*/*.html'
    ])
    .pipe(gulp.dest('./dist/'))
});


gulp.task('lang', function() {
  return gulp.src([
      './lang/*',
    ])
    .pipe(gulp.dest('./dist/lang'))
});

gulp.task('assets', function() {
  gulp.src([
      './images/*',
    ])
    .pipe(gulp.dest('./dist/images'))
  gulp.src([
      './icons/*',
    ])
    .pipe(gulp.dest('./dist/icons'))
});

// Copy third party libraries from /node_modules into /dist/vendor
gulp.task('vendor', function() {

  // Bootstrap
  gulp.src([
      './node_modules/bootstrap/dist/**/*',
    ])
    .pipe(gulp.dest('./dist/vendor/bootstrap'))

  // Font Awesome
  gulp.src([
      './node_modules/font-awesome/**/*'
    ])
    .pipe(gulp.dest('./dist/vendor/font-awesome'))

  // AngularJS
  gulp.src([
      './node_modules/angular/**/*'
    ])
    .pipe(gulp.dest('./dist/vendor/angular'))
  gulp.src([
      './node_modules/angular-translate/**/*'
    ])
    .pipe(gulp.dest('./dist/vendor/angular-translate'))
  gulp.src([
      './node_modules/angular-translate-loader-static-files/**/*'
    ])
    .pipe(gulp.dest('./dist/vendor/angular-translate-loader-static-files'))

  // jQuery
  gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./dist/vendor/jquery'))
});

// Compile SCSS
gulp.task('css:compile', function() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(gulp.dest('./css'))
});

gulp.task('css:copy', function() {
  return gulp.src([
      './css/*.min.css',
    ])
    .pipe(gulp.dest('./dist/css'))
});

// Minify CSS
gulp.task('css:minify', ['css:compile'], function() {
  return gulp.src([
      './css/*.css',
      '!./css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('css', ['css:compile', 'css:minify', 'css:copy']);

// Minify JavaScript
gulp.task('js:minify', function() {
  return gulp.src([
      './js/*.js',
      '!./js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

// JS
gulp.task('js', ['js:minify']);

// Default task
gulp.task('default', ['css', 'lang', 'js', 'vendor', 'html', 'assets']);

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });
});

// Dev task
gulp.task('dev', ['html', 'lang', 'css', 'js', 'browserSync'], function() {
  gulp.watch('./scss/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./lang/*.json', ['lang']);
  gulp.watch('./**/*.html', [ 'html', browserSync.reload ]);
});
