var gulp = require('gulp');
var less = require('gulp-less');	//编译less
//处理错误异常
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');
var minify = require('gulp-clean-css');	//压缩css

//重启服务器与刷新浏览器
var nodemon = require('gulp-nodemon');  
var browserSync = require('browser-sync');

//压缩less文件
gulp.task('less', function(){
	gulp.src('./public/less/*.less')
		.pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
		.pipe(less())
		.pipe(minify())
		.pipe(gulp.dest('./public/styles/'))
});

gulp.task('browser-sync', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*', 'views/**/*.*'],
    browser: 'chrome',
    notify: false,
    port: 4000
  });
});

gulp.task('nodemon', function (cb) {
  // del(['./public/*.html']);
  var called = false;
  return nodemon({
    script: 'app.js'
  }).on('start', function () {
    if (!called) {
      cb();
      called = true;
    }
  });
});
//监视less文件的改变
gulp.task('watch', function(){
	gulp.watch('./public/less/*.less', ['less'])
})
gulp.task('default', ['browser-sync', 'watch']);
// gulp.task('default', ['browser-sync', 'sass', 'movesub'], function () {
//   // gulp.watch(['sass/**/*.*', '.submodule/stylus/**/*.*'], ['sass']);
// });
//gulp.task('default', ['watch'])
