const concat = require('gulp-concat');
const less = require('gulp-less');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const coffee = require('gulp-coffee');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');

const LIBS_PATH = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
    'bower_components/d3/d3.js',
    'bower_components/jsnetworkx/jsnetworkx.js'
];
const LESS_PATH    = 'src/less/*.less';
const SCRIPTS_PATH = 'src/coffee/*.coffee';
const PUBLIC_PATH = './dest';
const IMAGES_PATH = './dest/img';

const SRC_IMAGES = 'src/images/*';
const MAIN_LESS = 'src/less/app.less';
const MAIN_COFFEE = 'src/coffee/app.coffee';

const DEST_SCRIPT = 'app.js';
const DEST_LIBS = 'libs.min.js';


gulp.task('libs', function() {
    return gulp.src(LIBS_PATH)
        .pipe(concat(DEST_LIBS))
        .pipe(gulp.dest(PUBLIC_PATH));
});
gulp.task('scripts', function() {
    return gulp.src(MAIN_COFFEE)
        .pipe(coffee())
        .pipe(concat(DEST_SCRIPT))
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(livereload());
});

gulp.task('less', function() {
    return gulp.src(MAIN_LESS)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(livereload());
});
gulp.task('images', function() {
    return gulp.src(SRC_IMAGES)
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest(IMAGES_PATH))
        .pipe(livereload());
});

gulp.task('server', function () {
  nodemon({ script: 'index.js' })
    .on('restart', function () {
      console.log('Node server restarted!')
    })
})

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(LESS_PATH, ['less']);
    gulp.watch(SRC_IMAGES, ['images']);
});

gulp.task('default', ['images', 'libs', 'scripts', 'less', 'server', 'watch']);
