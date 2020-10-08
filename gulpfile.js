const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
// const prefix = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const cleanCSS = require('gulp-clean-css');
const stripCssComments = require('gulp-strip-css-comments');


const scssPath = './app/sass/main.scss';
const scssAllFilesPath = './app/sass/**/*';
const cssPath = './build/css';

const bgrInputPath = './build/css/bgr/*';
const bgrOutputPath = './build/css/bgr/';

const jsInput = './app/js/**/*.js';

function prod() {
    return gulp.src([
        bgrInputPath
    ])
        .pipe(imagemin(
            {progressive: true}
        ))
        .pipe(gulp.dest(bgrOutputPath));
}


function style() {
    return gulp.src(scssPath)
        .pipe(sass())
        // .pipe(prefix('last 2 versions'))
        // .pipe(sass({outputStyle: 'compressed'}))
        .pipe(cleanCSS({level: 2}))
        .pipe(stripCssComments(
            {preserve: false}
        ))
        .pipe(gulp.dest(cssPath))
        .pipe(sass().on('error', sass.logError))
        .pipe(browserSync.stream());

}


function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch(scssAllFilesPath, style);
    gulp.watch('./*.html').on('change', browserSync.reload);

}


exports.style = style;
exports.prod = prod;
exports.watch = watch;
