var gulp          = require('gulp');
var connect       = require('gulp-connect');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-ruby-sass');
// var cssmin     = require('gulp-cssmin');
var coffee        = require('gulp-coffee');
// var uglify     = require('gulp-uglify');
var jade          = require('gulp-jade');
// var minifyHTML = require('gulp-minify-html');

var paths = {
    styles: "sass/**/*.scss",
    scripts: "coffee/**/*.coffee",
    jade: "jade/**/*.jade"
};

gulp.task('webserver', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('styles', function () {
    gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(sass({
            // style: 'compressed'
        }))
        // .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(gulp.dest("css"))
        .pipe(connect.reload());
});

gulp.task('scripts', function () {
    gulp.src(paths.scripts)
        .pipe(plumber())
        .pipe(coffee())
        // .pipe(uglify())
        .pipe(gulp.dest("js"))
        .pipe(connect.reload());
});

gulp.task('jade', function () {
    gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        // .pipe(minifyHTML())
        .pipe(gulp.dest("./"))
        .pipe(connect.reload());
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['styles']);
    gulp.watch(paths.jade, ['jade']);
});

gulp.task('default', ['webserver', 'styles', 'scripts', 'jade', 'watch']);
