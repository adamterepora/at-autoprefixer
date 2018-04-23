var sass = require('node-sass');
var fs = require('file-system');

const pluginName = 'HelloWorldPlugin';

class HelloWorldPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, compilation => {
      console.log("The webpack build process is starting!!!");
    });
  }
}

// function HelloWorldPlugin(options) {
//   // Setup the plugin instance with options...
//   this.scssPath = options.scssPath;
//   this.scssFilename = options.scssFilename;
//   this.cssPath = options.cssPath;
//   this.cssFilename = options.cssFilename;
//   this.scssFullPath = this.scssPath + '/' + this.scssFilename;
//   this.cssFullPath = this.cssPath + '/' + this.cssFilename;
//   this.chunkVersions = {};
// }
//
// HelloWorldPlugin.prototype.apply = function(compiler) {
//   compiler.plugin("emit", function(compilation, callback) {
//     sass.render({
//       file: this.scssFullPath,
//       outFile: this.cssFullPath,
//       sourceMap: true,
//       sourceMapContents: true
//     }, function (error, result) {
//       // console.log(this.scssFullPath);
//       // console.log(this.cssFullPath);
//
//       if(!error){
//         // No errors during the compilation, write this result on the disk
//         fs.writeFile(this.cssFullPath, result.css, function(err){
//           if(!error){
//             //file written on disk
//             callback();
//           }
//         });
//       }
//
//       var changedChunks = compilation.chunks.filter(function(chunk) {
//         var oldVersion = this.chunkVersions[chunk.name];
//         this.chunkVersions[chunk.name] = chunk.hash;
//         console.log('sth changed');
//         return chunk.hash !== oldVersion;
//       }.bind(this));
//
//       // console.log(error);
//       // console.log(result);
//     }.bind(this));
//   }.bind(this));
//
//   compiler.plugin('done', function() {
//     console.log('Styles processed.');
//   });
// };

module.exports = HelloWorldPlugin;