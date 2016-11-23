'use strict';

import gulp   from 'gulp';
import config from '../config';

gulp.task('copyFonts', function() {

  return gulp.src([config.sourceDir + 'fonts/**/*', config.sourceDir + 'vendor/material-design-icons/iconfont/*'])
    .pipe(gulp.dest(config.buildDir + 'fonts/'));

});
