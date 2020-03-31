module.exports = (gulp, options, plugins) => {
    gulp.task('js', gulp.series(
        gulp.parallel('js-script'),
        gulp.parallel('js-additional')
    ));

    gulp.task('js-terser', gulp.series(
        gulp.parallel('js-script-terser'),
        gulp.parallel('js-additional-terser')
    ));

    gulp.task('js-script', () => {
        const browserify = plugins.browserify({
            entries: process.env.JS_SRC + 'script.js',
            debug: false,
            transform: [plugins.babelify]
        });

        return browserify.bundle()
            .pipe(plugins.vinylSource('script.js'))
            .pipe(plugins.vinylBuffer())
            .pipe(gulp.dest(process.env.JS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('js-script-terser', () => {
        return gulp.src([
            process.env.JS_DEST + 'script.js'
        ])
            .pipe(plugins.terser())
            .pipe(gulp.dest(process.env.JS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('js-additional', () => {
        const browserify = plugins.browserify({
            entries: process.env.JS_SRC + 'additional.js',
            debug: false,
            transform: [plugins.babelify]
        });

        return browserify.bundle()
            .pipe(plugins.vinylSource('additional.js'))
            .pipe(plugins.vinylBuffer())
            .pipe(gulp.dest(process.env.JS_DEST))
            .on('error', plugins.log.error);
    });

    gulp.task('js-additional-terser', () => {
        return gulp.src([
            process.env.JS_DEST + 'additional.js'
        ])
            .pipe(plugins.terser())
            .pipe(gulp.dest(process.env.JS_DEST))
            .on('error', plugins.log.error);
    });
};
