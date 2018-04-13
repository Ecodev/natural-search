'use strict';

var gulp = require('gulp');
const shell = require('gulp-shell');

gulp.task('build', shell.task(['npm run prod']));

// Only watch
gulp.task('watch', function () {

    var watch = [
        'src/app/modules/**/*',
        '!**/*.spec.ts'
    ];

    gulp.watch(watch, ['build']);

});
