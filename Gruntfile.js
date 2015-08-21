module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['browserify', 'uglify', 'watch']);
 
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	browserify: {
		main: {
			src: [
				'node_modules/angular-jwt/dist/angular-jwt.min.js',
				'js/*.js'
			],
			dest: 'build/<%= pkg.name %>.js'
		}
	},
    watch: {
      files: 'js/*',
      tasks: ['default']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    }

  });
}