gulp           = require 'gulp'
jshint         = require 'gulp-jshint'
jshintReporter = require 'jshint-stylish'
stylus         = require 'gulp-stylus'
watch          = require 'gulp-watch'
nib            = require 'nib'
jeet           = require 'jeet'
rupture        = require 'rupture'
sourcemaps     = require 'gulp-sourcemaps'
browsersync    = require 'browser-sync'
nodemon        = require 'nodemon'
reload         = browsersync.reload
gulpif         = require 'gulp-if'
sprite         = require('css-sprite').stream

# Get one .styl file and render
gulp.task 'css', ->
  gulp.src('./css/app.styl')
  .pipe stylus(use: [nib(), jeet(), rupture()], compress: on, sourcemap: {inline: on, sourceRoot: '../../css'})
  .pipe gulp.dest('./public/styles')
  .pipe reload(stream: yes)

gulp.task 'sprites', ->
  gulp.src(['./assets/img/*.png','./assets/img/*.jpg'])
  .pipe(sprite({
    name: 'sprite',
    style: '_sprite.styl',
    cssPath: './img',
    processor: 'stylus'
  }))
  .pipe(gulpif(['*.png','*.jpg'], gulp.dest('./public/img/'), gulp.dest('./public/styles/')))

# Inline sourcemaps
gulp.task 'sourcemaps-inline', ->
  gulp.src('./css/sourcemaps-inline.styl')
  .pipe stylus(sourcemap: {inline: on, sourceRoot: '../../css', basePath: 'css'})
  .pipe gulp.dest('./css/build')

# Auto-reload
gulp.task 'nodemon', (next) ->
  nodemon script: 'keystone.js', watch: ['keystone.js']
  .on 'restart', -> console.log 'server:restarted'; reload()
  .once 'start', -> setTimeout next, 2000

gulp.task 'server', ['nodemon'], ->
  browsersync
    notify: no
    ghostMode: no
    proxy: 'http://localhost:3001'
    port: 3000

# External sourcemaps
gulp.task 'sourcemaps-external', ->
  gulp.src('./css/sourcemaps-external.styl')
  .pipe stylus sourcemap: {inline: on, sourceRoot: '..', basePath: 'css/build'}
  .pipe sourcemaps.init loadMaps: yes
  .pipe sourcemaps.write '.', {includeContent: off, sourceRoot: '.'}
  .pipe gulp.dest('./css/build')

# Default gulp task to run
gulp.task 'default', ['stylus', 'watch', 'assets', 'server']
gulp.task 'stylus',  ['css', 'sourcemaps-inline', 'sourcemaps-external']
gulp.task 'watch',   ['watchTemplates', 'watchAssets', 'watchStylus']
gulp.task 'nosync',  ['stylus', 'watch', 'assets']
gulp.task 'build', ['stylus','assets']

#
# * Create variables for our project paths so we can change in one place
#
paths = src: [
  './models/**/*.js'
  './routes/**/*.js'
  'keystone.js'
  'package.json'
]

# enable for tests
#'tests':['./test/*.js', './test/**/*.js']

# gulp lint
gulp.task 'lint', ->
  gulp.src(paths.src)
  .pipe jshint()
  .pipe jshint.reporter(jshintReporter)

# gulp watcher for lint
gulp.task 'watchLint', ->
  gulp.src(paths.src)
  .pipe watch()
  .pipe jshint()
  .pipe jshint.reporter(jshintReporter)

gulp.task 'watchAssets', ->
  gulp.watch './assets/**/*.*', ['assets']

gulp.task 'assets', ->
  gulp.src('./assets/**/*')
  .pipe gulp.dest('public')

gulp.task 'watchStylus', ->
  gulp.watch './css/**/*.styl', ['stylus']

gulp.task 'watchTemplates', ->
  gulp.watch './templates/**/*.jade', reload
