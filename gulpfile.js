// gulp default    - for dev with watch, livereload and server, no UglifyJs
// gulp dev        - build files, no UglifyJs
// gulp product    - build files for diploy with UglifyJs

var gulp = require('gulp');
var watch = require('gulp-watch');
var less = require('gulp-less');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var rigger = require('gulp-rigger');
var rimraf = require('rimraf') //очистка
var webpack = require('webpack');
var gutil = require("gulp-util");
var runSequence = require('run-sequence'); // последовательное или паралельное выполнение тасков
var inject = require('gulp-inject');
var connect = require('gulp-connect');
var open = require('gulp-open');
var configWPlib = require('./webpack.config.jsLibs.js');
var configWP = require('./webpack.config.js');

var path = {
	build: {
		html: './build/',
		app: './dev/app/assets/js/bundle.js',
		bundle: './build/assets/js',
		css: './build/assets/css/',
		images: './build/assets/image/',
		fonts: './build/assets/fonts/',
		data: './build/data/'
	},
	dev: {
		html: './dev/index.html',
		template: './dev/app/**/*.html',
		app: './dev/app/index.js',
		css: './dev/assets/css/**/*',
		cssLibs: [
			'./node_modules/angular-material/angular-material.min.css'
		],
		images: './dev/assets/img/**/*',
		fonts: './dev/assets/fonts/**/*',
		data: './dev/data/**/*'
	},
	watch: {
		html: './dev/*.html',
		template: './dev/app/**/*.html',
		app: './dev/app/**/*',
		css: './dev/assets/css/**/*',
		images: './dev/assets/img/**/*',
		fonts: './dev/assets/fonts/**/*',
		data: './dev/data/**/*'
	},
	clean: './build'
};

// html

gulp.task('html', function () {
	gulp.src(path.dev.html)
		.pipe(inject(
			gulp.src('./build/assets/js/vendor.bundle*.js', {read: false}), {
				name: 'head',
				ignorePath: '/build',
				transform: function (filePath, file, i, length) {
					console.log('inject script = .' + filePath);
					return '<script src=".' + filePath + '"></script>';
				}
			}))
		.pipe(gulp.dest(path.build.html))
		.pipe(livereload());
});

// css
gulp.task('css', function () {
	gulp.src(path.dev.css)
		.pipe(less())
		.pipe(autoprefixer({browsers: ['> 1%', 'ie >= 9', 'last 4 versions']}))
		.pipe(concat('main.css'))
		.pipe(gulp.dest(path.build.css))
		.pipe(livereload());
});

// cssLibs
gulp.task('cssLibs', function () {
	gulp.src(path.dev.cssLibs)
		.pipe(concat('vendor.bundle.css'))
		.pipe(gulp.dest(path.build.css))
});

// app
gulp.task('app', function () {
	// run webpack
	webpack(configWP, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("[webpack]", stats.toString({
			timings: true,
			colors: true
		}));
		// run build html
		gulp.start('html');
		livereload.changed(path.build.app)
	});
});

// jsLibs
gulp.task('js', function () {
	// run webpack
	webpack(configWPlib, function (err, stats) {
		if (err) {
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("[webpack]", stats.toString({
			timings: true,
			colors: true
		}));
		gulp.start('app');
	});
});

// images
gulp.task('images', function () {
	gulp.src(path.dev.images)
		.pipe(gulp.dest(path.build.images))
		.pipe(livereload());
});

// fonts
gulp.task('fonts', function () {
	gulp.src(path.dev.fonts)
		.pipe(gulp.dest(path.build.fonts))
		.pipe(livereload());
});

// data
gulp.task('data', function () {
	gulp.src(path.dev.data)
		.pipe(gulp.dest(path.build.data))
		.pipe(livereload());
});

//watch
gulp.task('watch', function () {
	watch(path.watch.html, function () {
		gulp.start('html');
	});
	watch(path.watch.css, function () {
		gulp.start('css');
	});
	watch(path.watch.app, function () {
		gulp.start('app');
	});
	watch(path.watch.images, function () {
		gulp.start('images');
	});
	watch(path.watch.fonts, function () {
		gulp.start('fonts');
	});
	watch(path.watch.data, function () {
		gulp.start('data');
	});
});

// чистим папку билда
gulp.task('clean', function (cb) {
	rimraf(path.clean, cb);
});

//server
gulp.task('server', function () {
	connect.server({
		root: 'build',
		port: 8888,
		livereload: true
	});
});

gulp.task('open', function () {
	gulp.src('')
		.pipe(open({
			uri: 'http://localhost:8888'
		}));
});

gulp.task('build', function () {
	runSequence(
		'clean',
		['css', 'cssLibs', 'js', 'images', 'fonts', 'data']
	);
});

gulp.task('dev', function () {
	configWPlib.plugins = [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
	];
	gulp.start('build');
});

gulp.task('product', function () {
	configWPlib.plugins = [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.min.js"),
//		минификация JS
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		})
	];
	gulp.start('build');
});

// default
gulp.task('default', function () {
	runSequence(
		'dev',
		'watch',
		'server',
		'open',
		function () {
			livereload.listen();
		});
});