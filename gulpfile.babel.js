'use strict';

require("babel-register");

import gulp from 'gulp';
import path from 'path';
import del from 'del';

import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpack from 'css-mqpacker';
import flexbugsFixes from 'postcss-flexbugs-fixes'
import csso from 'postcss-csso';
import tildeImporter from 'node-sass-tilde-importer';

import rename from 'gulp-rename';

import sequence from 'gulp-sequence';

let cssClasses = [];
const postcssPlugins = [
  autoprefixer(),
  mqpack(),
  flexbugsFixes()
];

gulp.task('clean', function () {
  return del([
    'dist/**', '!dist'
  ]);
});


gulp.task('styles', () => {
  return gulp.src(path.join('src', '**', '*.scss'))
    .pipe(sass({
      errLogToConsole: true,
      importer: tildeImporter
    }))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest('dist'))
    .pipe(postcss([csso()]))
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(gulp.dest('dist'))
    ;
});

gulp.task('build', gulp.series(
  'clean',
  'styles',
));

gulp.task('watch', gulp.series(
  'build',
  () => {
    gulp.watch([
      path.join('src', '**', '*.scss')
    ], ['styles']);
  }
));


