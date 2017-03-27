var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    del             = require('del'),
    reload          = browserSync.reload,
    concat          = require('gulp-concat'),
    cssmin          = require('gulp-cssmin'),
    ngAnnotate      = require('gulp-ng-annotate'),
    plumber         = require('gulp-plumber'),
    rename          = require('gulp-rename'),
    runSequence     = require('run-sequence').use(gulp),
    sass            = require('gulp-sass'),
    uglify          = require('gulp-uglify');


var depsJS          = [
                        './app/bower_components/angular/angular.min.js',
                        './app/bower_components/jquery/dist/jquery.min.js',
                        './app/bower_components/tether/dist/js/tether.min.js',
                        './app/bower_components/bootstrap/dist/js/bootstrap.min.js',
                        './app/bower_components/angular-route/angular-route.min.js',
                        './app/bower_components/ngstorage/ngStorage.min.js',
                        './app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.js'
                        ],
    appJS           = [ './app/app.js',
                        './app/message-item/message.service.js',
                        './app/message-item/message-item.component.js',
                        './app/new-message/new-message-form.component.js',
                        './app/navbar/navbar.directive.js',
                        './app/constants/app-constants.js'
                        ],
    depsStyles      =   ['./app/bower_components/bootstrap/dist/css/bootstrap.min.css',
                         './app/bower_components/angular-ui-notification/dist/angular-ui-notification.min.css',
                         './app/bower_components/components-font-awesome/css/font-awesome.min.css'
                        ],
    appStyles       =   ['./app/assets/scss/style.scss'];


gulp.task('jsDeps', function () {
    var depsJs = gulp.src(depsJS);
    return depsJs
        .pipe(plumber())
        .pipe(concat('all_dependencies.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./app/scripts/'));
});

gulp.task('jsDev', function () {
    var devJs = gulp.src(appJS);
    return devJs
        .pipe(plumber())
        .pipe(concat('all.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./app/scripts/'));
});

gulp.task('styleDeps', function () {
    var depsStyle = gulp.src(depsStyles);
    return depsStyle
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('dependencies_style.min.css'))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(reload({stream:true}));
});

gulp.task('styleDev', function () {
    var devStyles = gulp.src(appStyles);
    return devStyles
        .pipe(plumber())
        .pipe(sass())
        .pipe(cssmin())
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(reload({stream:true}));
});


gulp.task('icons', function() {
    var faIcons = gulp.src('./app/bower_components/components-font-awesome/fonts/**.*');
    return faIcons
        .pipe(gulp.dest('./app/assets/fonts'));
});

gulp.task('watch', ['browser-sync', 'styleDev', 'jsDev'], function (){
    gulp.watch('./app/**/*.js', ['jsDev']);
    gulp.watch('./app/assets/scss/*.scss', ['styleDev']);
    gulp.watch('./app/**/*.html', reload);
    gulp.watch('./app/index.html', reload);
});


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    })
});


gulp.task('clean', function () {
    return del([
        './app/assets/css/*',
        './app/scripts/*'
    ])
});

gulp.task('default', function (callback) {
    runSequence('clean', ['jsDeps', 'jsDev', 'styleDeps', 'styleDev', 'icons'],'watch', 'browser-sync', callback)
});