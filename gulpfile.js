// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
let gulp = require('gulp'),
  sass = require('gulp-sass'),
  path = require('path'),
  autoprefixer = require('autoprefixer'),
  postcss = require('gulp-postcss');

// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//
const BASE_URL = path.join(__dirname);
const APP_URL = path.join(__dirname) + '/app/';
const APP_ASSETS_URL = path.join(__dirname) + '/app/src/';
const DIST_URL = path.join(__dirname) + '/dist/';
const DIST_ASSETS_URL = path.join(__dirname) + '/dist/src/';

// =======================================================================//
// !  CONFIG SASS                                                         //
// =======================================================================//
const processors = [autoprefixer];

gulp.task('sassDev', () => {
  return gulp
      .src(APP_ASSETS_URL + 'sass/*.scss')
      .pipe(sass().on('error', sass.logError)).pipe(postcss(processors))
      .pipe(gulp.dest(DIST_ASSETS_URL + 'css'));
});

gulp.task('sassProd', () => {
  return gulp
      .src(APP_ASSETS_URL + 'sass/*.scss')
      .pipe(sass({outputStyle: 'compressed'})
      .on('error', sass.logError)).pipe(postcss(processors))
      .pipe(gulp.dest(DIST_ASSETS_URL + 'css'));
});

gulp.task('sass', ['sassDev'], () => {
  return gulp.watch(APP_ASSETS_URL + 'sass/**/*.scss', ['sassDev']);
})
// =======================================================================//
// !  CONFIG ASSETS                                                       //
// =======================================================================//
gulp.task("importDatas", () => {
  gulp.src(APP_ASSETS_URL + "datas/*.json").pipe(gulp.dest(DIST_URL + "datas"));
});
gulp.task("importImages", () => {
  gulp.src(APP_ASSETS_URL + "media/img/**/*").pipe(gulp.dest(DIST_ASSETS_URL + "media/img/"));
});
gulp.task("importVideos", () => {
  gulp.src(APP_ASSETS_URL + "media/video/**/*").pipe(gulp.dest(DIST_ASSETS_URL + "media/video/"));
});
gulp.task("importFonts", () => {
  gulp.src(APP_ASSETS_URL + "media/fonts/**/*").pipe(gulp.dest(DIST_ASSETS_URL + "media/fonts/"));
});

// =======================================================================//
// ! PROD                                                                 //
// =======================================================================//
gulp.task('build', ['importImages', 'importDatas', 'importVideos', 'sassProd', 'importFonts']);
