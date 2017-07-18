var gulp = require('gulp');


gulp.task('html', () => {
    return gulp.src('src/web/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['html', 'rollup', 'sass']);
