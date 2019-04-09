const gulp = require('gulp');

const loadConfig = environment => global.config = require(`../config.${environment}.json`);

const copyConfig = environment => gulp.src(`./config.${environment}.json`)
    .pipe(require('gulp-rename')('config.json'))
    .pipe(gulp.dest('dist'));

gulp.task('load:config:dev', () => loadConfig('dev'));
gulp.task('load:config:uat', () => loadConfig('uat'));
gulp.task('load:config:prod', () => loadConfig('prod'));

gulp.task('copy:config:dev', () => copyConfig('dev'));
gulp.task('copy:config:uat', () => copyConfig('uat'));
gulp.task('copy:config:prod', () => copyConfig('prod'));
