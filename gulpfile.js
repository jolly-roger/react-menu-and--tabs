'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var path = require('path');


gulp.task('babel', ['babel-web']);

gulp.task('babel-web', ['clear'], () => {
    return gulp.src('src/web/**/*.js')
        .pipe(babel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('build/web/es5'));
});

gulp.task('views', ['clear'], function () {
    return gulp.src('src/web/**/*.html')
        .pipe(gulp.dest('build/web'));
});

gulp.task('foundation', ['foundation-css', 'foundation-js']);

gulp.task('foundation-css', ['clear'], function () {
    return gulp.src('node_modules/foundation-sites/dist/*.css')
        .pipe(gulp.dest('build/web/css'));
});

gulp.task('foundation-js', ['clear'], function () {
    return gulp.src(['node_modules/foundation-sites/js/*',
            'node_modules/foundation-sites/dist/*.js'])
        .pipe(gulp.dest('build/web/js'));
});

gulp.task('jquery', ['clear'], function () {
    return gulp.src('node_modules/jquery/dist/*')
        .pipe(gulp.dest('build/web/js'));
});

gulp.task('browserify', ['babel'], () => {
    return gulp.src('build/web/es5/index.js')
        .pipe(browserify({
            basedir: './build/web/es5'
        }))
        .pipe(gulp.dest('build/web'));
});

gulp.task('clear', () => {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('default', ['browserify', 'views', 'foundation', 'jquery']);