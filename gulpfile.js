const gulp = require('gulp');
const file = require('gulp-file');
const rollup = require('rollup').rollup;
const babel =require('rollup-plugin-babel');
const commonjs =require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const postcss = require('rollup-plugin-postcss');
const uglify = require('rollup-plugin-uglify');
const postcssModules = require('postcss-modules');


const cssExportMap = {};

gulp.task('rollup', () => {
    return rollup({
        entry: 'src/web/index.js',
        format: 'iife',
        plugins: [
            postcss({
                plugins: [
                    postcssModules({
                        getJSON (id, exportTokens) {
                          cssExportMap[id] = exportTokens;
                        }
                    })
                ],
                getExport (id) {
                    return cssExportMap[id];
                }
            }),
            babel({
                presets: ['react', 'es2015-rollup'],
                babelrc: false,
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production') // Disable development mode for modules, that are built with webpack
            }),
            resolve({
                jsnext: true,
                main: true,
                browser: true
            }),
            commonjs({
                include: 'node_modules/**',
                namedExports: {
                    'node_modules/react-dom/index.js': ['render'],
                    'node_modules/react/react.js': ['Component']
                }
            }),
            uglify()
        ]
    })
    .then(bundle => {
        return bundle.generate({
          format: 'iife',
          moduleName: 'menu_and_tabs'
        });
    })
    .then(gen => {
        return file('index.js', gen.code, {src: true})
          .pipe(gulp.dest('dist'));
    });
});

gulp.task('html', () => {
    return gulp.src('src/web/**/*.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['html', 'rollup']);

gulp.task('default', ['copy']);