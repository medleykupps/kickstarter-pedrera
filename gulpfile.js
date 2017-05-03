var gulp=require('gulp');
var sass=require('gulp-sass');
var inject=require('gulp-inject');
var wiredep=require('wiredep').stream;
var del=require('del');
var jshint=require('gulp-jshint');
var sourcemaps=require('gulp-sourcemaps');
var concat=require('gulp-concat');
var gutil=require('gulp-util');
var uglify=require('gulp-uglify');
var watch=require('gulp-watch');
var templateCache = require('gulp-angular-templatecache');



// ---
const 
    ROOT = process.argv.length >= 4 ? './src/' + process.argv[3] : './src',
    JS = ROOT + '/js',
    CSS = ROOT + '/css',
    TEMPLATES = ROOT + '/templates',
    BUILD = process.argv.length >= 4 ? './build/' + process.argv[3] : './build';

console.log(`Root: ${ROOT}`);
console.log(`Css: ${CSS}`);
console.log(`Js: ${JS}`);
console.log(`Build: ${BUILD}`);
// ---



// ---
gulp.task('clean', function(cb) {
    return del([
        BUILD + '/*.*',
        BUILD + '/js', 
        BUILD + '/css', 
        BUILD + '/templates', 
        BUILD + '/fonts'
    ]);
});
// ---



// ---
gulp.task('templates', function () {
    var moduleSystem = 'IIFE'; // Also, 'RequireJS','Browserfy','IIFE','ES6'
    return gulp.src([TEMPLATES + '/**/*.html'])
        .pipe(templateCache('kickstarter-templates.js', {
            root: '/js/kickstarter/templates',
            standalone: true,
            module: 'kickstarter.templates',
            moduleSystem: moduleSystem
        }))
        .pipe(gulp.dest(BUILD + '/templates'));
});
// ---



// ---
gulp.task('fonts', function() {
    return gulp.src(['bower_components/bootstrap-sass/assets/fonts/bootstrap/*.*'])
        .pipe(gulp.dest(BUILD + '/fonts/bootstrap'));
});
// ---



// ---

gulp.task('scripts', ['jshint', 'vendorjs', 'angular-lib'], function() {
    gulp.src(JS + '/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD + '/js/'));
});

gulp.task('jshint', function() {
    return gulp.src(JS + '/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('vendorjs', function() {
    return gulp.src([
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD + '/js/'));
});

gulp.task('angular-lib', function () {
    gulp.src([
            'bower_components/angular/angular.min.js',
            'bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'bower_components/angular-animate/angular-animate.min.js',
            'bower_components/lodash/lodash.js'
        ])
        .pipe(concat('angular-lib.js'))
        .pipe(gulp.dest(BUILD + '/js/'));
});

// ---



// ---
gulp.task('styles', function() {
    var injectFiles=gulp.src([
        CSS + '/_*.scss',
        CSS + '/components/_*.scss'
        ], {read:false});
    var transform = function(filepath) { return '@import "' + filepath + '";'; };
    gulp.src(CSS + '/main.scss')
        .pipe(sourcemaps.init())
            .pipe(wiredep())
            .pipe(
                inject(
                    gulp.src(CSS + '/global/*.scss', {read:false}), {
                        transform: transform,
                        starttag: '// inject:global',
                        endtag: '// endinject',
                        addRootSlash: false
                    }
                )
            )
            .pipe(
                inject(
                    injectFiles, {
                        transform: transform,
                        starttag: '// inject:app',
                        endtag: '// endinject',
                        addRootSlash: false
                    }
                )
            )
            .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD + '/css'));

    // Include any other bundle that may exist but do not inject anything into it
    gulp.src(CSS + '/!(main).scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(BUILD + '/css'));

});
// ---



gulp.task('html', ['templates', 'fonts', 'styles', 'scripts'], function() {
    var injectFiles=gulp.src([CSS + '/main.scss']);
    return gulp.src(ROOT + '/index.html')
        .pipe(inject(injectFiles, {
            addRootSlash: false,
            ignorePath: ['src','static']
        }))
        .pipe(gulp.dest(BUILD));
});

// - Watch ---
gulp.task('watch', ['html'], function() {
    watch(ROOT + '/**/*.*', function() {
        gulp.start('html');
    });
});

// - Default ---
gulp.task('default', ['html']);
