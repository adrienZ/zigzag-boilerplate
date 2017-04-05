// =======================================================================//
// !  DEPENDENCIES                                                        //
// =======================================================================//
const gulp = require('gulp')
const path = require('path')

// =======================================================================//
// !  CONFIG URLS                                                         //
// =======================================================================//
const BASE_URL = path.join(__dirname);
const APP_URL = BASE_URL + '/app/';
const APP_ASSETS_URL = BASE_URL + '/app/src/';
const DIST_URL = BASE_URL + '/dist/';
const DIST_ASSETS_URL = BASE_URL + '/dist/src/';

// =======================================================================//
// !  CONFIG ASSETS                                                       //
// =======================================================================//
gulp.task('importDatas', () => {
  gulp.src(APP_ASSETS_URL + 'datas/*.json').pipe(gulp.dest(DIST_URL + 'datas'));
});
gulp.task('importImages', () => {
  gulp.src(APP_ASSETS_URL + 'media/img/**/*').pipe(gulp.dest(DIST_ASSETS_URL + 'media/img/'));
});
gulp.task('importVideos', () => {
  gulp.src(APP_ASSETS_URL + 'media/video/**/*').pipe(gulp.dest(DIST_ASSETS_URL + 'media/video/'));
});
gulp.task('importFonts', () => {
  gulp.src(APP_ASSETS_URL + 'media/fonts/**/*').pipe(gulp.dest(DIST_ASSETS_URL + 'media/fonts/'));
});
gulp.task('importBowerLibs', () => {
  gulp.src(APP_ASSETS_URL + 'bower_vendor/**/*').pipe(gulp.dest(DIST_ASSETS_URL + 'bower_vendor/'));
});

// =======================================================================//
// ! PROD                                                                 //
// =======================================================================//
gulp.task('build', ['importImages', 'importDatas', 'importVideos', 'importFonts', 'importBowerLibs']);
