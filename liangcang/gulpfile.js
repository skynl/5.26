//引入gulp
// const gulp = require('gulp');
// const cssmin = require('gulp-cssmin');
// 对CSS进行处理
// const cssHandler = function () {
//     // 对css进行处理
//     return gulp.src('./src/css/all.css')//找到对应文件
//         .pipe(cssmin())//调用压缩方法
//         .pipe(gulp.dest('./dist/css'))
// }
// 导出处理CSS的方法
// module.exports.cssHandler = function () {
//     // 对css进行处理
//     return gulp.src('./src/css/*')//找到对应文件
//         .pipe(cssmin())//调用压缩方法
//         .pipe(gulp.dest('./dist/css'))
// };
function defaultTask(cb) {
    cb();
}
exports.default = defaultTask;