"use strict";

var gulp = require("gulp"),
    markdownToJSON = require("gulp-markdown-to-json"),
    marked = require("marked"),
    gutil = require('gulp-util');


gulp.task("content", function () {
    return gulp.src("./src/content/**/*.md")
        .pipe(markdownToJSON(marked))
        .pipe(gulp.dest("./build/content"));
});

const createAPIResponse = src => (dist, filename) => {
  gulp.src(src)
  .pipe(filename ? gutil.buffer() : gutil.noop())
  .pipe(markdownToJSON(marked, filename ? filename : false))
  .pipe(gulp.dest(dist));
};
const createRootAPI = createAPIResponse("./src/content/**/*.md");

gulp.task('api', () => {
  createRootAPI('./build/api', 'global.json');
  createRootAPI('./build/api');
});
