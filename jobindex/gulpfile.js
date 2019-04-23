let gulp = require('gulp');
let sass = require('gulp-sass');
let cleanCSS = require('gulp-clean-css');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();

var temp = 'result';

// 경로
var path = {
    jobindex: 'scss/**/*.scss',
    html: ['**/*.html', '!node_modules/**/*.html']
};

// 컴파일 완료
var result = {
    jobindex: 'assets/css/'
};

// html 변경 반영
gulp.task('html', function() {
    return gulp.src(path.html)

    .pipe(browserSync.reload({
        stream: true
    }));
});


// css 로 변환
gulp.task('jobindex', function() {
    return gulp.src(path.jobindex)

    .pipe(sourcemaps.init({loadMaps: true})) // 최종 빌드시 제거

    .pipe(sass()
        .on('error', function(err) {
            console.error('Error!', err.message);
        })
    )

    // css minified 불필요시 삭제
    .pipe(cleanCSS({debug: true}, (details) => {
        console.log(`original ${details.name}: ${details.stats.originalSize}`);
        console.log(`minified ${details.name}: ${details.stats.minifiedSize}`);
    }))

    .pipe(sourcemaps.write('./maps')) // 최종 빌드시 제거

    .pipe(gulp.dest(result.jobindex))

    // scss 수정 후 브라우저 리로드
    .pipe(browserSync.reload({
        stream: true
    }))
});

// 변경사항을 실시간 반영
gulp.task('watch', ['html', 'jobindex', 'browserSync'], function() {
    gulp.watch(path.jobindex, ['jobindex']);
    gulp.watch(path.html, ['html']);
});

// 서버 실행
gulp.task('browserSync', ['html', 'jobindex'], function() {
    return browserSync.init({
        port: 3334,
        server: {
            baseDir: 'C:/work/Jobindex-v3-Publish'
        }
    });
});

// task 실행
gulp.task('default', ['html', 'jobindex', 'watch', 'browserSync']);