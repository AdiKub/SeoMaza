const {series, src, dest, parallel, watch} = require('gulp');
const cleaner = require('gulp-clean');
const sass = require('gulp-sass'); 
sass.compiler = require('node-sass');

const clean = () =>{
    return src('dist', {read: false})
    .pipe(cleaner());
}

function css() {
    return src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('./dist/css'));
  }
  
function html() {
    return src('./templates/**/*.html')
    .pipe(dest('./dist/'));
  }

function js() {
    return src('./js/**/*.js')
    .pipe(dest('./dist/js'));
  }
  
function imgs() {
    return src('./images/**/*')
    .pipe(dest('./dist/images'));
  }

const dev = () =>{
    watch('./sass/**/*.scss', css)
    watch('./js/**/*.js', js)
    watch('./images/**/*', imgs)
    watch('./templates/**/*.html', html)
}
  exports.imgs = imgs; 
  exports.html = html;
  exports.js = js;
  exports.css = css;
  exports.clean = clean;
  exports.dev = dev;
  exports.default = series(clean, parallel(js, html, css, imgs));