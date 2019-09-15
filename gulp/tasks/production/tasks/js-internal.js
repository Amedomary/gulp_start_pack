'use strict';

// const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const babel = require('gulp-babel');
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
const config = require('../../../config');
// const sourcemaps = require('gulp-sourcemaps');

module.exports = function (options) {
    return config.wrapPipe(function (success, error) {

        return gulp.src(config.js.srcInternal)
            .pipe(fileinclude({
                prefix: '@@',
                basepath: '@file',
                indent: true
            }).on('error', error))
            // .pipe(sourcemaps.init())
            .pipe(babel({
                presets: ['@babel/env']
            }))
            .pipe(uglify().on('error', error))
            // .pipe(sourcemaps.write())
            .pipe(gulp.dest(config.js.dest));
    });
};
