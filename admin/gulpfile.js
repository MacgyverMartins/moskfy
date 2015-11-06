var gulp = require('gulp');

var $ = require('gulp-load-plugins')();
var del = require('del');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var preprocessify = require('preprocessify');
var runSequence = require('run-sequence');
var domain = require('domain');

var env = 'dev';
var webserver = false;

log = function(task, start) {
  if (!start) {
    setTimeout(function() {
      $.util.log('Starting', '\'' + $.util.colors.cyan(task) + '\'...');
    }, 1);
  } else {
    var time = ((new Date() - start) / 1000).toFixed(2) + ' s';
    $.util.log('Finished', '\'' + $.util.colors.cyan(task) + '\'', 'after', $.util.colors.magenta(time));
  }
};

gulp.task('clean:dev', function() {
  return del(['.tmp']);
});

gulp.task('clean:dist', function() {
  return del(['dist']);
});

gulp.task('scripts', function() {
  var dev = env === 'dev';
  var filePath = './app/scripts/app.js';
  var extensions = ['.jsx', 'js'];

  var bundle = function() {
    if (dev) {
      var start = new Date();
      log('scripts:bundle');
    }
    browserify({
        entries: [filePath],
        extensions: extensions,
        debug: env === 'dev'
      })
      //.transform(preprocessify({
      //env: env
      //}, {
      //includeExtensions: extensions
      //}))
      .transform("babelify", {
        presets: [
          //{ plugins: ["syntax-class-properties"] },
          //"es2015",
          "react"
        ]
      })
      .bundle()
      .pipe(source('app.js'))
      .pipe(gulp.dest('.tmp/scripts/bundle'))
      .pipe($.if(dev, $.tap(function() {
        log('scripts:bundle', start);
        if (!webserver) {
          runSequence('webserver');
        }
      })));
  }

  if (dev) {
    gulp.src(filePath)
      .pipe($.plumber())
      .pipe($.tap(function(file) {
        var d = domain.create();

        d.on('error', function(err) {
          $.util.log($.util.colors.red('Browserify compile error:'), err.message, '\n\t', $.util.colors.cyan('in file'), file.path);
          $.util.beep();
        });

        d.run(bundle);
      }));
  } else {
    bundle();
  }
});


gulp.task('imagemin', function() {
  return gulp.src('app/images/*')
    .pipe($.imagemin({
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }]
    }))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('copy', function() {
  return gulp.src(['app/*.txt', 'app/*.ico'])
    .pipe(gulp.dest('dist'));
})

gulp.task('bundle', function() {
  var assets = $.useref.assets();
  var revAll = new $.revAll({
    dontRenameFile: [/^\/favicon.ico$/g, '.html']
  });
  var jsFilter = $.filter(['**/*.js']);
  var cssFilter = $.filter(['**/*.css']);
  var htmlFilter = $.filter(['*.html']);

  return gulp.src('app/index.html')
    .pipe($.preprocess())
    .pipe(assets)
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(jsFilter)
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.autoprefixer({
      browsers: ['last 5 versions']
    }))
    .pipe($.minifyCss())
    .pipe(cssFilter.restore())
    .pipe(htmlFilter)
    .pipe($.htmlmin({
      collapseWhitespace: true
    }))
    .pipe(htmlFilter.restore())
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'))
    .pipe($.size());
});

gulp.task('webserver', function() {
  webserver = gulp.src(['.tmp', 'app'])
    .pipe($.webserver({
      //host: '0.0.0.0', //change to 'localhost' to disable outside connections
      port: '3333',
      livereload: {
        enable: true,
        filter: function(filePath) {
          if (/app\\(?=scripts)/.test(filePath)) {
            $.util.log('Ignoring', $.util.colors.magenta(filePath));
            return false;
          } else {
            return true;
          }
        }
      },
      open: true
    }));
});

gulp.task('serve', function() {
  runSequence('clean:dev', ['scripts']);
  gulp.watch('app/*.html');
  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch('app/scripts/**/*.jsx', ['scripts']);
});

gulp.task('build', function() {
  env = 'prod';
  runSequence(['clean:dev', 'clean:dist'], ['scripts', 'imagemin'],
    'bundle', 'copy');
});

gulp.task('default', ['build']);

