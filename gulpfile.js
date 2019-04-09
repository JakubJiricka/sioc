require('require-dir')('./gulp');
const gulp = require('gulp');

gulp.task('test', ['sasslint', 'eslint']);

gulp.task('dist', [
    'webpack',
    'htmlmin',
    'copy:dist',
    'package'
]);

gulp.task('build', ['clean:dist', 'load:config:prod'], () =>
    gulp.run(['dist', 'copy:config:prod'])
);

gulp.task('build:uat', ['clean:dist', 'load:config:uat'], () =>
    gulp.run(['dist', 'copy:config:uat'])
);
