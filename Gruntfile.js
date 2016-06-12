module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['src/**/*.scss', 'src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
      tasks: ['debug'],
      options: {
        nospawn: true
      }
    },
    // Cleans the build directory
    clean: {
      src: ['build/*']
    },
    // Concat
    concat: {
      options: {
        banner: '/* ** <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> - DO NOT EDIT; FILE AUTO GENERATED ** */\n'
      },
      dist: {
        src: ['src/js/main.js', '!src/js/*-all.js', '!src/js/*-all.min.js'],
        dest: 'src/js/<%= pkg.name %>-all.js',
      },
    },
    // Uglify
    uglify: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
        preserveComments: false
      },
      build: {
        src: 'src/js/<%= pkg.name %>-all.js',
        dest: 'src/js/<%= pkg.name %>-all.min.js'
      }
    },
    // Compass
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },

    // css min
    cssmin: {
      options: {
        banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      build: {
        src: 'src/css/style.css',
        dest: 'src/css/<%= pkg.name %>.min.css'
      }
    },

    // Copy
    copy: {
      assets: {
        expand: true,
        src: ['assets/**'],
        dest: 'build/',
        cwd: 'src/'
      },
      css: {
        expand: true,
        src: ['css/<%= pkg.name %>.min.css', 'css/jquery.loadmask-plus.min.css'],
        dest: 'build/',
        cwd: 'src/'
      },
      js: {
        expand: true,
        src: ['js/<%= pkg.name %>-all.min.js', 'js/jquery.loadmask-plus.min.js'], 
        dest: 'build/',
        cwd: 'src/'
      },
      js_debug: {
        expand: true,
        src: ['js/<%= pkg.name %>-all.js'],
        dest: 'build/',
        cwd: 'src/'
      },
      html: {
        expand: true,
        src: ['**/*.html'],
        dest: 'build/',
        cwd: 'src/',
        options: {
          process: function(content) {
            // Add build headers here
            return content.replace('thesauruser-all.js', 'thesauruser-all.min.js');
          }
        }
      },
      html_debug: {
        expand: true,
        src: ['**/*.html'],
        dest: 'build/',
        cwd: 'src/'
      }
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Tasks
  grunt.registerTask('build', ['clean', 'concat', 'uglify', 'compass', 'cssmin', 'copy:assets', 'copy:css', 'copy:js', 'copy:html']);
  grunt.registerTask('debug', ['clean', 'concat', 'compass', 'cssmin', 'copy:assets', 'copy:css', 'copy:js_debug', 'copy:html_debug']);

};
