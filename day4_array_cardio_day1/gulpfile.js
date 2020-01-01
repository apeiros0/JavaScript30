const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const autoprefixer = require('autoprefixer');
const minimist = require('minimist');
const gulpSequence = require('gulp-sequence').use(gulp);

// production || development
// # gulp --env production
const envOptions = {
  string: 'env',
  default: { env: 'development' }
};
const options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('clean', () => {
  return gulp.src(['./public', './.tmp'], { read: false }).pipe($.clean());
});

gulp.task('jade', function() {
  // !(_)* 不等於 ! 的 .jade 會被編譯
  gulp
    .src('./source/**/!(_)*.jade')
    .pipe($.plumber()) // 出錯時不會停止，會繼續執行 Gulp
    .pipe(
      $.jade({
        pretty: true // 編譯完的 HTML 將會展開 (沒有壓縮的版本)
      })
    )
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream()); // 自動重新整理
});

gulp.task('vendorJs', function() {
  return gulp
    .src([
      './node_modules/jquery/dist/jquery.slim.min.js',
      './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ])
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('sass', function() {
  return gulp
    .src(['./source/scss/**/*.sass', './source/scss/**/*.scss'])
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe(
      $.sass({
        outputStyle: 'nested',
        includePaths: ['./node_modules/bootstrap/scss']
      }).on('error', $.sass.logError)
    )
    .pipe($.postcss([autoprefixer()]))
    .pipe($.if(options.env === 'production', $.cleanCss()))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./public/scss'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task('copy', function() {
  // 把非 js 和 scss 檔都加到 public
  gulp
    .src([
      './source/**/**',
      '!source/scss/**/**',
      '!source/js/**/**',
      '!source/**/**.jade'
    ])
    .pipe(gulp.dest('./public/'))
    .pipe(
      browserSync.reload({
        stream: true
      })
    );
});

gulp.task(
  'babel',
  () =>
    gulp
      .src('./source/js/**/*.js')
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe(
        $.babel({
          presets: ['@babel/env']
        })
      )
      .pipe($.concat('all.js')) // 合併檔案 $.concat('合併的檔案名稱')
      .pipe(
        $.if(
          options.env === 'production',
          $.uglify({
            compress: {
              drop_console: true // 清除 console.log
            }
          })
        )
      ) // 接在合併完檔案 (已編譯完成) 後
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./public/js/'))
      .pipe(
        browserSync.stream({
          stream: true
        })
      ) // 自動重新整理
);

gulp.task('browserSync', function() {
  browserSync.init({
    server: { baseDir: './public' },
    reloadDebounce: 2000
  });
});

gulp.task('watch', function() {
  gulp.watch(['./source/**/*.jade'], ['jade']);
  gulp.watch(['./source/scss/**/*.sass', './source/scss/**/*.scss'], ['sass']);
  gulp.watch(['./source/js/**/*.js'], ['babel']);
  // gulp.watch(['./source/**/**', '!/source/scss/**/**'], ['copy']);
});

gulp.task('image-min', () =>
  gulp
    .src('./source/images/*')
    .pipe($.if(options.env === 'production', $.imagemin()))
    .pipe(gulp.dest('./public/images'))
);

gulp.task('deploy', function() {
  return gulp.src('./public/**/*').pipe($.ghPages());
});

gulp.task(
  'sequence',
  gulpSequence('clean', 'babel', 'jade')
);

gulp.task('default', [
  'copy',
  'babel',
  'jade',
  'browserSync',
  'watch'
]);
gulp.task('build', ['sequence']);
