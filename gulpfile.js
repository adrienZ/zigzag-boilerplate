let gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('autoprefixer'),
    uglify = require('gulp-uglify'),
    webpack = require('webpack-stream'),
    sync = require('browser-sync').create(),
    csscomb = require('gulp-csscomb'),
    postcss = require('gulp-postcss');

var processors = [autoprefixer];

gulp.task('webpack', () => {
    gulp.src('./app/src/js/main.js').pipe(webpack(require('./webpack.config.js'))).pipe(gulp.dest('./app/dist/js/'));
});

gulp.task('vendor', () => {
    gulp.src('app/src/vendor/**/*.js').pipe(uglify()).pipe(gulp.dest('app/dist/vendor'))
});
gulp.task('tet', () => {


gulp.task('sass', () => {
    gulp.src('app/src/sass/*.scss').pipe(sass().on('error', sass.logError)).pipe(postcss(processors)).pipe(csscomb()).pipe(gulp.dest('app/dist/css')).pipe(sync.stream());
});

// Launch hot relaod
gulp.task('sync', () => {
    sync.init({
        server: {
            baseDir: 'app'
        }
    })
})

gulp.task("importDatas", () => {

    gulp.src("./app/src/datas/*.json").pipe(gulp.dest("./app/dist/datas"));

});
gulp.task("importImages", () => {

  gulp.src("./app/src/img/**/*").pipe(gulp.dest("./app/dist/media/img"));

});
gulp.task("importVideos", () => {

    gulp.src("./app/src/video/**/*").pipe(gulp.dest("./app/dist/media/video"));

});

gulp.task('build', [
    'importImages',
    'importDatas',
    'importVideos',
    'sass',
    'vendor',
    'importFonts'
], () => {
    gulp.src('./app/src/js/main.js').pipe(webpack(require('./webpack.build.config.js'))).pipe(gulp.dest('app/dist/js/'));
});


gulp.task('prod', [
  'build'
], () => {
  gulp.src("./app/*.html").pipe(gulp.dest("./PRODUCTION/"));
  gulp.src("./app/dist/**/*").pipe(gulp.dest("./PRODUCTION/dist/"));
});




gulp.task('dev', [
    'sync', 'sass', 'webpack'
], () => {
    gulp.watch('app/src/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', sync.reload);
    gulp.watch('app/src/js/**/*.js', ['webpack']);
    gulp.watch('app/src/templates/*.hbs', ['templates'])
    // Other watchers
});


gulp.task('default', ["dev"])

gulp.task("importFonts", () => {
    gulp.src("./app/src/media/fonts/*").pipe(gulp.dest("./app/dist/media/fonts/"));
});
