const {series, src, dest, parallel, watch} = require('gulp');
const sass = require('gulp-sass'); 
const del = require('del');
sass.compiler = require('node-sass');
const googleWebFonts = require('gulp-google-webfonts');
const browsersync = require("browser-sync").create();
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');




const browserSync = (done) => {
  browsersync.init({
    server: {
      baseDir: "./dist/",
      index: "blog.html"
              
    }
  });
  done();
}

const browserSyncReload = (done) => {
  browsersync.reload();
  done();
}


const clean = () => del(['dist'])

const css =()=> {
return src(['./sass/**/*.scss', ])
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
      }).on('error', sass.logError))
    .pipe(rename({suffix: ".min"}))
    .pipe(autoprefixer())
    .pipe(cssnano({
      discardComments: {
        removeAll: true,
      }
    }))
    .pipe(dest('./dist/css'));
  }


  // const nimifyGoogleFonts =() => {
  //   return src('./dist/css/googleFonts.css')
  //   .pipe()
  // }



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
    watch('./dist', browserSyncReload)
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
const runDev = series(build, parallel(browserSync, watchFile));

exports.clean = clean;
exports.runDev = runDev;
exports.build = build;
exports.default = build;

