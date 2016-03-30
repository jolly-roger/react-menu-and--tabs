var gulp = require('gulp');


gulp.task('foundation-css', () => {
    return gulp.src('node_modules/foundation-sites/dist/*.css')
        .pipe(gulp.dest('dist'));
});

gulp.task('foundation-js', () => {
    return gulp.src(['node_modules/foundation-sites/js/*',
            'node_modules/foundation-sites/dist/*.js'])
        .pipe(gulp.dest('dist'));
});

gulp.task('foundation', ['foundation-css', 'foundation-js']);