var sass = require('node-sass');
var fs = require('file-system');


function HelloWorldPlugin(options) {
  // Setup the plugin instance with options...
  this.scssPath = options.scssPath;
  this.scssFilename = options.scssFilename;
  this.cssPath = options.cssPath;
  this.cssFilename = options.cssFilename;
  this.scssFullPath = this.scssPath + '/' + this.scssFilename;
  this.cssFullPath = this.cssPath + '/' + this.cssFilename;
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    sass.render({
      file: this.scssFullPath,
      outFile: this.cssFullPath
    }, function (error, result) {
      if(!error){
        // No errors during the compilation, write this result on the disk
        fs.writeFile(this.cssFullPath, result.css, function(err){
          if(!err){
            //file written on disk
            callback();
          }
        });
      }

      console.log(err);
      console.log(result);
    });
    // // Create a header string for the generated file:
    // var filelist = 'In this build:\n\n';
    //
    // // Loop through all compiled assets,
    // // adding a new line item for each filename.
    // for (var filename in compilation.assets) {
    //   filelist += ('- '+ filename +'\n');
    // }
    //
    // // Insert this list into the Webpack build as a new file asset:
    // compilation.assets['filelist.md'] = {
    //   source: function() {
    //     return filelist;
    //   },
    //   size: function() {
    //     return filelist.length;
    //   }
    // };



  }.bind(this));

  compiler.plugin('done', function() {
    console.log('Styles processed.');
  });
};

module.exports = HelloWorldPlugin;