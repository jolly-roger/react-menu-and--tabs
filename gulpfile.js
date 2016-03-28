'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var path = require('path');


gulp.task('babel', ['clear'], () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('build/es5'));
});

gulp.task('browserify', ['babel'], () => {
    return gulp.src('build/es5/index.js')
        .pipe(browserify({
            basedir: './build/es5/'
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('clear', () => {
    return gulp.src('build/*', {read: false})
        .pipe(clean());
});

gulp.task('default', ['clear', 'babel', 'browserify']);