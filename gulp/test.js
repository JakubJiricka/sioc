const gulp = require('gulp');
const config = require('./config.json');

gulp.task('sasslint', () => {
    const sassLint = require('gulp-sass-lint');

    return gulp.src('src/sass/**/*.scss')
        .pipe(sassLint())
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
});

gulp.task('eslint', () => {
    const eslint = require('gulp-eslint');

    return gulp.src(config.eslint.src)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
