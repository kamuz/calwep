// Require plugins
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync'),
    cleanCSS = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    tinypng = require('gulp-tinypng');

// Define path
var htmlSource = [
    'html/**'
]
var scssSource = [
    'css/sass/**.scss',
];
var sassOutput = 'css/src';
var cssSource = [
    'libs/bootstrap/css/grid.css',
    'css/src/main.css'
];
var jsSource = [
    // Dependencies
    'libs/jquery/jquery.js',
    'libs/match-height/matchHeight.js',
    // Init
    // 'js/src/main.js',
];
var imgSource = './img/src/**';

// Compile HTML
gulp.task('html', function() {
    return gulp.src('html/*.html')
    .pipe(rigger())
    .pipe(gulp.dest("./"))
    .pipe(browserSync.reload({stream: true}));
});

// Compile SCSS
gulp.task('sass', function() {
    return gulp.src(scssSource)
    .pipe(sass())
    .pipe(gulp.dest(sassOutput))
    .pipe(browserSync.reload({stream: true}));
});

// Concat and minify CSS
gulp.task('css', function() {
    return gulp.src(cssSource)
    .pipe(concat('main.min.css'))
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(cleanCSS())
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream: true}));
});

// Concat and minify JavaScript
gulp.task('js', function() {
    return gulp.src(jsSource)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'))
    .pipe(browserSync.reload({stream: true}));
});

// Optimize images
gulp.task('img', function () {
    gulp.src(imgSource)
    .pipe(tinypng('6QQtqJynHzqSdj4TDHsjnvDmTND1gg46'))
    .pipe(gulp.dest('./img'));
});

// Setup Browsersync
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: './'
        },
    });
});

// Watchers
gulp.task('watch', ['html', 'sass', 'css', 'js', 'browser-sync'], function() {
    gulp.watch(htmlSource, ['html']);
    gulp.watch(scssSource, ['sass']);
    gulp.watch(cssSource, ['css']);
    gulp.watch(jsSource, ['js']);
    gulp.watch(htmlSource, browserSync.reload);
});

// Default Task
gulp.task('default', ['watch']);