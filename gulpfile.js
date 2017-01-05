var gulp=require('gulp');
var sass=require('gulp-sass');
var inject=require('gulp-inject');
var wiredep=require('wiredep').stream;
var del=require('del');
var jshint=require('gulp-jshint');
var sourcemaps=require('gulp-sourcemaps');
var concat=require('gulp-concat');
var gutil=require('gulp-util');

gulp.task('clean', function() {
    return del(['static']);
});

gulp.task('scripts', ['clean', 'jshint', 'vendorjs'], function() {
    gulp.src('src/js/**/*.js')
        .pipe(sourcemaps.init())
            .pipe(concat('bundle.js'))
            .pipe(gutil.env.type==='production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/js/'));
});

gulp.task('jshint', function() {
    gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
})

gulp.task('vendorjs', function() {
    gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap_sass/assets/javascripts/bootstrap.js',
            ])
        .pipe(sourcemaps.init())
            .pipe(concat('vendor.js'))
            .pipe(gutil.env.type==='production' ? uglify() : gutil.noop())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/js/'));
})

gulp.task('styles', ['clean'], function() {
    var injectFiles=gulp.src('src/css/_*.scss', {read:false});
    var transform = function(filepath) { return '@import "' + filepath + '";'; };
    gulp.src('src/css/main.scss')
        .pipe(sourcemaps.init())
        .pipe(wiredep())
        .pipe(
            inject(
                gulp.src('src/css/global/*.scss', {read:false}), {
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
        .pipe(gulp.dest('static/css'));
});

gulp.task('html', ['clean', 'styles', 'scripts'], function() {
    var injectFiles=gulp.src(['static/css/main.css']);    
    gulp.src('src/index.html')
        .pipe(inject(injectFiles, {
            addRootSlash: false,
            ignorePath: ['src','static']
        }))
        .pipe(gulp.dest('static'));
});

gulp.task('default', ['html']);
