'use strict';

var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-uglifycss'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('gulp-pngmin'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    concat = require('gulp-concat'),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        jsx: 'build/js/jsx/',
        json: 'build/js/json/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src: {
        html: '*.html',
        js: 'js/*.js',
        jsx: 'js/jsx/*.js',
        json: 'js/json/*.json',
        style: 'style/main.scss',
        img: 'img/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    watch: {
        html: '*.html',
        js: 'js/**/*.js',
        jsx: 'js/jsx/*.js',
        json: 'js/json/*.json',
        style: 'style/**/*.scss',
        img: 'img/**/*.*',
        fonts: 'fonts/**/*.*'
    },
    clean: './build'
};

var config = {
    server: { baseDir: "./build" },
    tunnel: false,
    host: 'localhost',
    port: 9000,
    logPrefix: "lenymo"
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(sourcemaps.init()) 
        .pipe(uglify()) 
        .pipe(sourcemaps.write()) 
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true,
            errLogToConsole: true
        }))
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('image', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('jsx:build', function() {
    gulp.src(path.src.jsx)
        .pipe(gulp.dest(path.build.jsx))
});

gulp.task('json:build', function() {
    gulp.src(path.src.json)
        .pipe(gulp.dest(path.build.json))
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'jsx:build',
    'json:build',
    'style:build',
    'fonts:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.style], function(event, cb) {
        gulp.start('style:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.jsx], function(event, cb) {
        gulp.start('jsx:build');
    });
    watch([path.watch.json], function(event, cb) {
        gulp.start('json:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image');
    });
    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
    watch([path.build.js], function(){
        gulp.src(path.build.js)
            .pipe(reload({stream: true}));
    });
});


gulp.task('default', ['build', 'webserver', 'watch']);