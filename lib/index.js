var sass = require('node-sass');
var fs = require('file-system');

const pluginName = 'HelloWorldPlugin';

class HelloWorldPlugin {
  constructor(options) {
    this.scssPath = options.scssPath;
    this.scssFilename = options.scssFilename;
    this.cssPath = options.cssPath;
    this.cssFilename = options.cssFilename;
    this.scssFullPath = this.scssPath + '/' + this.scssFilename;
    this.cssFullPath = this.cssPath + '/' + this.cssFilename;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log("The webpack build process is starting!!!");
    });

    compiler.plugin("emit", (compilation, cb) => {
      sass.render({
        file: this.scssFullPath,
        outFile: this.cssFullPath,
        sourceMap: true,
        sourceMapContents: true
      }, (error, result) => {
        if(!error){
          // No errors during the compilation, write this result on the disk
          fs.writeFile(this.cssFullPath, result.css, function(err){
            if(!error){
              //file written on disk
              cb();
            }
          });
        }
      });

      cb();
    });

    compiler.plugin("done", () => {
      console.log("Done");
    });
  }
}

module.exports = HelloWorldPlugin;