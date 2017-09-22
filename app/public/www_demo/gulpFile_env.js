
var gulp = require('gulp'),
  fs = require('fs'),
  less = require('gulp-less'),
  csso = require('gulp-csso'),
  livereload = require('gulp-livereload'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  rev = require('gulp-rev'),
  replace = require('gulp-replace'),
  revCollector = require('gulp-rev-collector'),
  connect = require('gulp-connect');
  rename = require('gulp-rename'),
  edit = require('gulp-edit'),
  sourcemaps = require('gulp-sourcemaps'),
  notify=require('gulp-notify'),
  plumber=require('gulp-plumber'),
  nodemon=require('gulp-nodemon'),
  express=require('gulp-express'),
  clean = require('gulp-clean'),
  imagemin = require('gulp-imagemin'),
  htmlImport = require('gulp-html-import'),

  gulp_webpack = require('gulp-webpack'),
  webpack= require('webpack'),
  webpack_config = require('./webpack.config_env.js'),

  devHtml = require('gulp-devHtml');

  var basePath = './';
  var js_debug = 'false'; //调试模式

  var _fnless = function () {
      console.log('less 编译');
      gulp.src(basePath + 'src/less/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        // .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(basePath + 'src/styles'))
        .pipe(gulp.dest(basePath + 'dist/styles'));
      // gulp.src(basePath + 'src/less/page/*.less')
      //   .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
      //   .pipe(sourcemaps.init())
      //   .pipe(less())
      //   .pipe(minifycss())
      //   .pipe(sourcemaps.write('./'))
      //   .pipe(gulp.dest(basePath + 'src/styles/page'))
      //   .pipe(gulp.dest(basePath + 'dist/styles/page'));
  };
  var _cp_css = function () {
      console.log('_cp_js');
      gulp.src(basePath + 'src/styles/page_index.css')
      .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
      .pipe(gulp.dest('D:/web/lxmstarapproach/src/css'))
  };
  var _cp_js = function () {
      console.log('_cp_js');
      gulp.src([basePath + 'src/scripts/queryResults_index.js',basePath + 'src/scripts/queryResults_index_tpl.js'])
      .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
      .pipe(edit(function (str,callBack) {
          str = str.replace(/__js_debug__/g,js_debug);
          if(str){
            callBack(null,str);
          }else{
            callBack('意外错误 . .');
          }
      }))
      .pipe(gulp.dest('D:/web/lxmstarapproach/src/js'))
  };
  var _cp_html = function () {
      console.log('_cp_html');
      gulp.src([basePath + 'html/index.html'])
      .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
      .pipe(htmlImport(basePath + 'html/com/'))
      .pipe(gulp.dest('D:/web/test'))
  }

  // less 编译
  gulp.task('less',(event) => {
      gulp.src(basePath + 'src/less/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(basePath + 'src/css'))
        // .pipe(gulp.dest(basePath + 'dist/css'));
      gulp.src(basePath + 'src/less/page/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifycss())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(basePath + 'src/css/page'))
        // .pipe(gulp.dest(basePath + 'dist/css'));

  });
  gulp.task('lessClean',(event) => {
      gulp.src(basePath + 'dist/css')
        .pipe(clean());
  });
  // less 编译
  gulp.task('lessTest',(event) => {
      console.log('gulp.task: lessTest');
      gulp.src(basePath + 'src/less/*.less')
        .pipe(plumber({errorHandler:notify.onError('Error:<%=error.message%>')}))
        .pipe(less())
        .pipe(gulp.dest(basePath + 'dist/css'));

  });

  //定义监听文件修改任务
  gulp.task('watchBuild',(event) => {
      // livereload.listen();
      gulp.watch([basePath + 'src/index.js'], ['buildjs']);

  });

  //定义监听文件修改任务
  gulp.task('watchLess', (event) => {
      // livereload.listen();
      gulp.watch(basePath + 'src/less/*.less', ['less']);
      gulp.watch(basePath + 'src/less/page/*.less', ['less']);
      // gulp.watch(basePath + 'src/less/index.less', ['lessTest']);
      // fs.watch(basePath + 'src/less', function (event,filename) {
      //     console.log('fs.watch');
      //     gulp.run('default');
      // });

  });

  // 生成js文件
  gulp.task('buildjs',() => {
    gulp.src(basePath + 'src/index.js')
      .pipe(gulp_webpack(webpack_config,webpack))
      .pipe(gulp.dest(basePath + 'dist/'))
      // .pipe(devHtml({
      //     files: ['./public/html/demo04.html']
      // }))
      // .pipe(livereload());
  });

  // 压缩图片
  gulp.task('imgMin',['cleanImg'],function () {
      gulp.src(basePath + 'src/img/**/*.*')    //原图片的位置
        .pipe(imagemin())                   //执行图片压缩
        .pipe(gulp.dest(basePath + 'dist/img'));    //压缩后的图片输出的位置
  });
  // 清理图片文件
  gulp.task('cleanImg',function () {
      gulp.src(basePath + 'dist/img',{read:false})
        .pipe(clean());
  });

  //定义默认任务
  gulp.task('default',['watchBuild','watchLess']);
  gulp.run('default');
  // 压缩图片 启动时执行一次
  gulp.task('img_Min',['cleanImg','imgMin']);
  gulp.run('img_Min');

