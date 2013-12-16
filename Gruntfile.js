'use strict';

module.exports = function (grunt) {
  grunt.initConfig({


    jshint: {

      options: {
        jshintrc: '.jshintrc',
        ignores: [
          '*.min.js',
          'node_modules/**/*',
          'coverage/**/*'
        ]
      },

      all: [
        '*.js',
        '**/*.js'
      ]

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'dot'
        },
        src: ['test/**/*.js']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('mocha', 'mochaTest');
  grunt.registerTask('lint', 'jshint:all');
  grunt.registerTask('default', 'lint', 'mochaTest');

  if(process.env.TEST_CMD) {
    grunt.registerTask('travis', process.env.TEST_CMD);
  }

};
