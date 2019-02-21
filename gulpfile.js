const {series, src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass'); 
const del = require('del');
sass.compiler = require('node-sass');
const googleWebFonts = require('gulp-google-webfonts');

const clean = () => del(['dist'])

const css =()=> src('./sass/**/*.scss')
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
      }).on('error', sass.logError))
    .pipe(dest('./dist/css'));
  
const html=()=> src('./templates/**/*.html').pipe(dest('./dist/'));

const js =()=> src('./js/**/*.js').pipe(dest('./dist/js'));
  
const imgs=()=> src('./images/**/*').pipe(dest('./dist/images'));

const fortawesome =()=> {
  return src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
  .pipe(dest('./dist/webfonts/'));
}

const watchFile = () =>{
    watch('./sass/**/*.scss', css)
    watch('./js/**/*.js', js)
    watch('./images/**/*', imgs)
    watch('./templates/**/*.html', html)
}

const fonts = () => {
     return src('./fonts.list')
		.pipe(googleWebFonts({
      fontsDir: 'fonts/',
      cssDir: 'css/',
      cssFilename: 'googleFonts.css',
      relativePaths: true
    }))
		.pipe(dest('./dist'));
  }

const build = series(clean, parallel(js, html, css, imgs, fortawesome, fonts));
const runDev = series(build, watchFile)

exports.clean = clean;
exports.runDev = runDev;
exports.build = build;
exports.default = build;