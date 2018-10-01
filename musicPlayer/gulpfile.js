var gulp = require('gulp');
var imageMin = require('gulp-imagemin');
var htmlClean = require('gulp-htmlclean');
var ugligy = require('gulp-uglify');
var strip = require('gulp-strip-debug'); //去掉js调试断点
// var concat = require('gulp-concat'); //合并两个js文件
var less = require('gulp-less');
// var postcss = require('gulp-postcss'); //允许同时压缩css代码并添加前缀
var autoprefixer = require('gulp-autoprefixer'); //添加css兼容前缀
var cssnano = require('gulp-cssnano');
var devMode = process.env.NODE_ENV == 'development';
var connect = require('gulp-connect');
console.log(devMode)
var folder = {
    src: 'src/',
    out: 'out/'
}

gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.out + 'images/'))
});
gulp.task('html', function () {
    var page = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload());
    if (!devMode) {
        page.pipe(htmlClean());
    }
    page.pipe(gulp.dest(folder.out + 'html/'));
});
gulp.task('js', function () {
    var page = gulp.src(folder.src + 'js/*').pipe(connect.reload());
    if (!devMode) {
        page.pipe(strip())
            .pipe(ugligy())
            
    }
    page.pipe(gulp.dest(folder.out + 'js/'))
});
gulp.task('css', function () {
    var page = gulp.src(folder.src + 'css/*')
        .pipe(less()).pipe(connect.reload()).pipe(autoprefixer());
    if (!devMode) {
        page.pipe(cssnano())
    }
    page.pipe(gulp.dest(folder.out + 'css/'))
});
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html']);
    gulp.watch(folder.src + 'js/*', ['js']);
    gulp.watch(folder.src + 'css/*', ['css']);
    gulp.watch(folder.src + 'images/*', ['images']);
});
gulp.task('server', function () {
    connect.server({
        port: 8080,
        livereload:true
    });
})
gulp.task('default', ['html', 'images', 'js', 'css', 'watch', 'server'])