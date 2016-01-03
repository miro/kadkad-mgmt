// # Imports
var gulp                    = require('gulp');
var browserSync             = require('browser-sync').create();
var sass                    = require('gulp-sass');
var autoprefixer            = require('gulp-autoprefixer');

var path                    = require('path');
var del                     = require('del');

var cfg = {
  assetsSrcDir: './src/assets',
  assetsTargetDir: './dist/assets'
};


// Static Server + watching scss/html files for dev use
gulp.task('serve', ['sass'], function() {
  browserSync.init({
    proxy: 'localhost:9010',
    open: false
  });

  gulp.watch('src/**/*.scss', ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('src/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('cleanAssets', function (callback) {
    del([path.join(cfg.assetsTargetDir, '**/*')], callback);
});

gulp.task('copyAssets', function() {
    return gulp.src(path.join(cfg.assetsSrcDir, '**/*'))
      .pipe(gulp.dest(cfg.assetsTargetDir));
});


gulp.task('default', ['serve']);
