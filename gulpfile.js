'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');
var flatten = require('gulp-flatten');

gulp.task('build', shell.task(['npm run prod']));

gulp.task('copy:themes', function () {
    return gulp.src(['lib/**/*.theme.scss'])
               .pipe(flatten())
               .pipe(gulp.dest('node_modules/@ecodev/natural-search/theming'));
});

// Only watch
gulp.task('watch', function () {

    var watch = [
        'lib/**/*',
        '!lib/**/*.spec.ts'
    ];

    gulp.watch(watch, ['build']);
});
