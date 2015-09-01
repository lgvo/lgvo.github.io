var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    bower = require('gulp-bower');

var config = {
    sassDir: './sass',
    sassDepsDir: './bower_components'
};

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('image-min', function() {
    return gulp.src('imgs/*')
        .pipe(imagemin({progressive: true}))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
    return sass(config.sassDir + '/main.scss', {
            loadPath: [config.sassDepsDir + '/bootstrap-sass/assets/stylesheets'],
            style: 'compressed'
        })
        .on('error', notify.onError(function(error) {
            return "Error: " + error.message;
        })).pipe(gulp.dest('./css'));
});

gulp.task('watch', function() {
    gulp.watch(config.sassDir + '/*.scss', ['sass']);
});
