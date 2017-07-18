var gulp = require('gulp');
var file = require('gulp-file');
var rollup = require('rollup').rollup;
var babel =require('rollup-plugin-babel');
var commonjs =require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var replace = require('rollup-plugin-replace');


gulp.task('rollup', () => {
    return rollup({
        entry: 'src/web/index.js',
        format: 'iife',
        plugins: [
            babel({
                presets: ['react', 'es2015-rollup'],
                babelrc: false,
                exclude: 'node_modules/**'
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify( 'development' )
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
            })
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