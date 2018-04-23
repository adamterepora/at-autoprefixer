var sass = require('node-sass');
var fs = require('file-system');
var autoprefixer = require('autoprefixer');
var postcss = require('postcss');

const pluginName = 'HelloWorldPlugin';

class HelloWorldPlugin {
  constructor(options) {
    this.scssPath = options.scssPath;
    this.scssFilename = options.scssFilename;
    this.cssPath = options.cssPath;
    this.cssFilename = options.cssFilename;
    this.autoprefixerOptions = options.autoprefixerOptions;
    this.scssFullPath = this.scssPath + '/' + this.scssFilename;
    this.cssFullPath = this.cssPath + '/' + this.cssFilename;
  }

  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log("The webpack build process is starting!!!");
    });

    compiler.plugin("emit", (compilation, cb) => {
      this.processSass()
        .then((success) => {
          console.log('sass processed');


        }).catch((err) => {
        console.log(err.message);
      });

      fs.readFile(this.cssFullPath, (err, css) => {
        postcss([autoprefixer(this.autoprefixerOptions)])
          .process(css, { from: this.cssFullPath, to: this.cssFullPath })
          .then(result => {
            fs.writeFile(this.cssFullPath, result.css);
            if ( result.map ) fs.writeFile(this.cssFullPath + '.map', result.map);
          });
      });
      cb();
    });

    compiler.plugin("done", () => {
      console.log("Done");
    });
  }

  processSass() {
    return new Promise((resolve, reject) => {
      sass.render({
        file: this.scssFullPath,
        outFile: this.cssFullPath,
        sourceMap: true,
        sourceMapContents: true
      }, (error, result) => {
        if(!error){
          // No errors during the compilation, write this result on the disk
          fs.writeFile(this.cssFullPath, result.css, function(err){
            if(!err){
              //file written on disk
              resolve();
            }

            reject(err);
          });
        } else {
          reject(error);
        }
      });

      resolve();
    });
  }
}

module.exports = HelloWorldPlugin;