'use strict';

var gulp = require('gulp');

gulp.task('copy:themes', function () {
    return gulp.src(['projects/natural-search/src/lib/**/_*.theme.scss'])
        .pipe(gulp.dest('dist/natural-search/theming'));
});
