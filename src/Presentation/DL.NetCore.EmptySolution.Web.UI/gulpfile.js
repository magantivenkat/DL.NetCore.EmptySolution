﻿/// <binding BeforeBuild='build' />
const { series, parallel, src, dest } = require('gulp');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const del = require('del');

const clean = function () {
    return del(['wwwroot/**', '!wwwroot']);
};

const copyGlobalScripts = function () {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/jquery-validation/dist/jquery.validate.js',
        'node_modules/jquery-validation-unobtrusive/dist/jquery.validate.unobtrusive.js',
        'node_modules/popper.js/dist/umd/popper.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
    ])
        .pipe(concat('global.js'))
        .pipe(dest('wwwroot/js'))
        .pipe(terser())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('wwwroot/js'));
};

const copyGlobalStyles = function () {
    return src([
        'assets/css/bootstrap-theme-default.css'
    ])
        .pipe(concat('global.css'))
        .pipe(dest('wwwroot/css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('wwwroot/css'));
};

exports.clean = clean;
exports.build = series(
    clean,
    parallel(
        copyGlobalScripts,
        copyGlobalStyles
    )
);