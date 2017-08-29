var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    coffee = require('gulp-coffee'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs'),
    cssnano = require('gulp-cssnano'),
    rename = require('gulp-rename'),
	del = require('del'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');

var dir = 'main'

gulp.task('sass', function(){
    return gulp.src('pages/'+ dir +'/styles/*.+(sass|scss)')
        .pipe(sass())
        .pipe(gulp.dest('pages/'+ dir +'/styles/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('coffee', function(){
   gulp.src('pages/'+ dir +'/scripts/*.coffee')
    .pipe(coffee())
    .pipe(gulp.dest('pages/'+ dir +'/scripts'))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function(){
   return gulp.src([
	   'libs/vue/dist/vue.min.js',
       'libs/jquery/dist/jquery.min.js', 
	   'libs/Snap.svg/dist/snap.svg-min.js',
	   'libs/velocity/velocity.min.js',
	   'libs/particles.js/particles.min.js',
       'libs/bootstrap/dist/js/bootstrap.min.js',
   ]).pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('pages/' + dir + '/scripts'));
});

gulp.task('img', function(){
	return gulp.src('pages/'+ dir +'/images/**/*')
	.pipe(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		une: [pngquant()]
	}).pipe(gulp.dest('dist/images')));
});

gulp.task('css-libs',['sass'] , function(){
   return gulp.src([
       'app/styles/css/libs.css',
   ]).pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/styles/css'));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: 'pages/'+ dir
        },
        notify: false
    });
});

gulp.task('clean', function(){
	return del.sync('dist')
});

gulp.task('watch', ['browser-sync', 'css-libs', 'coffee', 'scripts'], function(){
   gulp.watch('pages/'+ dir +'/styles/*.+(sass|scss)', ['sass']); 
   gulp.watch('pages/'+ dir +'/*.html', browserSync.reload);
   gulp.watch('pages/'+ dir +'/scripts/*.coffee', ['coffee']);
});

gulp.task('build', ['clean', 'sass', 'scripts', 'coffee', 'img'], function(){
	
	var buildCss = gulp.src('app/styles/css/*')
	.pipe(gulp.dest('dist/styles/css'));
	
	var buildFonts = gulp.src('app/styles/fonts/**/*')
	.pipe(gulp.dest('dist/styles/fonts'));
	
	var buildJs = gulp.src('app/scripts/*.js')
	.pipe(gulp.dest('dist/scripts'));
	
	var buildImg = gulp.src('app/images/**/*')
	.pipe(gulp.dest('dist/images'));
	
	var buildPages = gulp.src('app/pages/**/*')
	.pipe(gulp.dest('dist/pages'));
	
	var buildHtml = gulp.src('app/*.html')
	.pipe(gulp.dest('dist'));
	
})

