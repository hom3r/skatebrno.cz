const concat = require('gulp-concat');
const less = require('gulp-less');
const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const coffee = require('gulp-coffee');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const livereload = require('gulp-livereload');
const nodemon = require('gulp-nodemon');
const jade = require('gulp-jade');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const sequence = require('run-sequence');
const del = require('del');
const mocha = require('gulp-mocha');

const LIBS_PATH = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/bootstrap/dist/js/bootstrap.min.js',
];
const LESS_LIBS_PATH = [
    'bower_components/bootstrap/less/bootstrap.less',
];
const LESS_PATH    = 'src/less/*.less';
const JS_PATH    = 'src/js/*.js';
const SCRIPTS_PATH = 'src/coffee/*.coffee';
const PUBLIC_PATH = './dist';
const IMAGES_PATH = './dist/img';

const SRC_IMAGES = 'src/images/*';
const SRC_JADE = 'src/index.jade';
const MAIN_LESS = 'src/less/app.less';
const MAIN_COFFEE = 'src/coffee/app.coffee';

const DEST_SCRIPT = 'app.min.js';
const DEST_LIBS = 'libs.min.js';


function onError(err) {
    console.log(err);
    this.emit('end');
}

gulp.task('libs', function() {
    return gulp.src(LIBS_PATH)
        .pipe(sourcemaps.init())
        .pipe(concat(DEST_LIBS))
        // .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PUBLIC_PATH));
});

gulp.task('less-libs', function() {
    return gulp.src(LESS_LIBS_PATH)
        .pipe(sourcemaps.init())
        .pipe(concat(DEST_LIBS))
        .pipe(less())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PUBLIC_PATH));
});

// gulp.task('coffee', function() {
//     return gulp.src(MAIN_COFFEE)
//         .pipe(sourcemaps.init())
//         .pipe(coffee())
//         .pipe(concat(DEST_SCRIPT))
//         .pipe(uglify())
//         .pipe(sourcemaps.write('.'))
//         .pipe(gulp.dest(PUBLIC_PATH))
//         .pipe(livereload());
// });

gulp.task('js', function() {
    return gulp.src(JS_PATH)
        .pipe(sourcemaps.init())
        .pipe(concat(DEST_SCRIPT))
        .pipe(uglify())
        .on('error', onError)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(PUBLIC_PATH))
        .pipe(livereload());
});

gulp.task('coffee-test', function() {
    return gulp.src('test/coffee/*')
        .pipe(coffee())
        .pipe(gulp.dest('test/'));
        // .pipe(livereload());
});

gulp.task('less', function() {
    return gulp.src(MAIN_LESS)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssnano())
        .on('error', onError)
        .pipe(sourcemaps.write('.'))
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
gulp.task('jade', function() {
  gulp.src(SRC_JADE)
    .pipe(jade())
    .on('error', onError)
    .pipe(gulp.dest(PUBLIC_PATH))
    .pipe(livereload());
});

gulp.task('server', function () {
    nodemon({
        script: 'server.js',
        ignore: PUBLIC_PATH,
    })
        .on('restart', function () {
            console.log('Node server restarted!')
    })
});

gulp.task('clean', function () {
  return del([
    'dist/'
  ]);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(JS_PATH, ['js']);
    gulp.watch(LESS_PATH, ['less']);
    gulp.watch(SRC_IMAGES, ['images']);
    gulp.watch(SRC_JADE, ['jade']);
});

gulp.task('test', ['coffee-test'], function() {
    return gulp.src('test/*.js', {read: false})
        // gulp-mocha needs filepaths so you can't have any plugins before it
        .pipe(mocha(
            // {reporter: 'nyan'}
        ));
});

gulp.task('default', function(callback) {
    sequence(
        'clean',
        ['images', 'js', 'less', 'jade', 'libs', 'less-libs'],
        ['server', 'watch'],
        callback
    );
});
