var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-ruby-sass');
// var cssmin     = require('gulp-cssmin');
var coffee        = require('gulp-coffee');
// var uglify     = require('gulp-uglify');
var jade          = require('gulp-jade');
// var minifyHTML = require('gulp-minify-html');

var localPort = 8080;
var paths = {
    styles: "sass/**/*.s?ss", style_output: "css",
    scripts: "coffee/**/*.coffee", scripts_output: "js",
    jade: "jade/**/*.jade", jade_output: "./"
};

gulp.task('browserSyncServer', function () {
    browserSync({
        server: {
            baseDir: "./"
        },
        port: localPort
    });
});

gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sass({
            // style: 'compressed'
        }))
        // .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(gulp.dest(paths.style_output));
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(coffee())
        // .pipe(uglify())
        .pipe(gulp.dest(paths.scripts_output));
});

gulp.task('jade', function () {
    gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        // .pipe(minifyHTML())
        .pipe(gulp.dest(paths.jade_output));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts', browserSync.reload]);
    gulp.watch(paths.styles, ['styles', browserSync.reload]);
    gulp.watch(paths.jade, ['jade', browserSync.reload]);
});

gulp.task('default', ['browserSyncServer', 'styles', 'scripts', 'jade', 'watch']);
