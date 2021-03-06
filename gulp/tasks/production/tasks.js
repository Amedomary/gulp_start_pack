'use strict';

const gulp  = require('gulp');
const config  = require('../../config');

function lazyRequireTask(taskName, path, options) {
    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function(callback) {
        let task = require(path).call(this, options);

        return task(callback);
    });
}

// icons to font
lazyRequireTask('iconfont', './tasks/iconfont');

// Favicons
lazyRequireTask('favicon-check-for-updates', './tasks/favicon-check-for-updates');
lazyRequireTask('favicon-generate', './tasks/favicon-generate');
lazyRequireTask('favicon-inject-markups', './tasks/favicon-inject-markups');
gulp.task('favicon', gulp.parallel('favicon-check-for-updates', 'favicon-generate', 'favicon-inject-markups'));

// images from production
lazyRequireTask('images', './tasks/images');

const gulpif   = require('gulp-if');
const pug      = require('gulp-pug');
const emitty   = require('emitty').setup('src', 'pug');
gulp.task('emitty', () =>
    new Promise((resolve, reject) => {
        emitty.scan(global.emittyChangedFile).then(() => {
            gulp.src('src/*.pug')
                .pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
                .pipe(pug({ pretty: true }))
                .pipe(gulp.dest(config.pug.dest))
                .on('end', resolve)
                .on('error', reject);
        });
    })
);
// less foe ie only
lazyRequireTask('ieless', './tasks/ieless');

// generate js if requireJS is true
lazyRequireTask('js', './tasks/js');
lazyRequireTask('js-external', './tasks/js-external');
// inner js to only file if requireJS is false
lazyRequireTask('js-internal', './tasks/js-internal');

lazyRequireTask('js-assets', './tasks/js-assets');

// combine tasks to only for NOT requireJS
gulp.task('js-norequire', gulp.parallel('js-external', 'js-internal'));

// copy json folder
lazyRequireTask('json', './tasks/json');

// copy fonts folder
lazyRequireTask('fonts', './tasks/fonts');

// Less
lazyRequireTask('concat-mobile', './tasks/less-concate', {
    lessName: 'global/*/*.mobile.less',
    concatName: 'mobile.less'
});

lazyRequireTask('concat-tablet', './tasks/less-concate', {
    lessName: 'global/*/*.tablet.less',
    concatName: 'tablet.less'
});

lazyRequireTask('concat-desktop-min', './tasks/less-concate', {
    lessName: 'global/*/*.desktop.min.less',
    concatName: 'desktop.min.less'
});

lazyRequireTask('concat-desktop', './tasks/less-concate', {
    lessName: 'global/*/*.desktop.less',
    concatName: 'desktop.less'
});

lazyRequireTask('concat-desktop-big', './tasks/less-concate', {
    lessName: 'global/*/*.desktop.big.less',
    concatName: 'desktop.big.less'
});

// Less compile
lazyRequireTask('less-compile', './tasks/less-compile');

lazyRequireTask('buster', './tasks/buster');

// Compile LESS to CSS
gulp.task('less', gulp.series(
    gulp.parallel(
        'concat-mobile',
        'concat-tablet',
        'concat-desktop-min',
        'concat-desktop',
        'concat-desktop-big',
    ),
    'less-compile'
));

// delete build path
lazyRequireTask('clean', './tasks/clean');

// generate index.html for list of pages
lazyRequireTask('htmllist', './tasks/htmllist');

// generate iconlist.html for list of icons
lazyRequireTask('iconlist', './tasks/iconlist');

// copy files from root
lazyRequireTask('otherfiles', './tasks/otherfiles');

gulp.task('fonts-all', gulp.series(
    'fontmin',
    'fonts'
));

gulp.task('compile',
    gulp.series(
        gulp.parallel(
            (config.main.iconfont ? 'iconfont' : 'sprites'),
            'images',
            'emitty',
            (config.main.requireJs ? 'js-require' : 'js-norequire'),
            'json',
            'otherfiles'
        ),
        'fonts-all',
        'less'
    )
);

gulp.task('init', gulp.series(
    'htmllist',
    'iconlist'
));

gulp.task('build',
    gulp.series(
        'clean',
        gulp.parallel(
            'compile',
            'init'
        )
    )
);

gulp.task('buildback',
    gulp.series(
        'clean',
        'init',
        'compile',
        'js-assets',
        'buster'
    )
);
