/**
 * Created by biyk on 18.01.18.
 */

var rename = require('gulp-rename');
const config = require('../../../config');
const gulp = require('gulp');

function str_replace(search, replace, subject) {
    return subject.split(search).join(replace);
}

module.exports = function (options) {
    return config.wrapPipe(function (success, error) {
        var name; var i = process.argv.indexOf('--name');
        if (i>-1) {
            name = process.argv[i+1];
        }
        if (name) {
            return gulp.src([config.less.bemblocks+'/default/default.*'])
                .pipe(rename(function (path) {
                    path.basename = str_replace('default',name,path.basename);
                }))
                .pipe(gulp.dest(config.less.bemblocks+'/global/'+name));
        } else {
            return console.log(process.argv);
        }


    });
};


