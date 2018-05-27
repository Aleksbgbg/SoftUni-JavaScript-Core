const gulp = require("gulp");
const gulpCleanCss = require("gulp-clean-css");
const gulpRename = require("gulp-rename");

gulp.task("default", ["minify-css"]);

gulp.task("minify-css", function() {
    gulp.src("./content/styles/*.css")
        .pipe(gulpCleanCss())
        .pipe(gulpRename({
            suffix: ".min"
        }))
        .pipe(gulp.dest("content/styles"))
});