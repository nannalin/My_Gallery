var gulp = require('gulp');
// requires the gulp-sass plugin
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
// gulp-useref concatenates any number of CSS and JavaScript files into a single file by looking for a comment that starts with "<!--build:" and ends with "<!--endbuild-->"
var useref = require('gulp-useref');
// gulp-uglify plugin to help with minifying JavaScript files
var uglify = require('gulp-uglify');
// gulp-if to ensure that we only attempt to minify JavaScript files.
var gulpIf = require('gulp-if');
// minify the concatenated CSS file
var cssnano = require('gulp-cssnano');
// optimizing images
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');

var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss and children dirs
		.pipe(sass()) // using gulp-sass to concert Sass to CSS
		.pipe(gulp.dest('app/css'))
		.pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']); 
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/images'))
});

// copy fonts to dist
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
})

gulp.task('build', function (callback) {
  runSequence('sass', 
    ['useref', 'images', 'fonts'],
    callback
  )
})

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})


