function HelloWorldPlugin(options) {
  // Setup the plugin instance with options...
  this.path = options.path;
  this.filename = options.filename;
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    console.log(this.path + '/' + this.filename);
    // Create a header string for the generated file:
    var filelist = 'In this build:\n\n';

    // Loop through all compiled assets,
    // adding a new line item for each filename.
    for (var filename in compilation.assets) {
      filelist += ('- '+ filename +'\n');
    }

    // Insert this list into the Webpack build as a new file asset:
    compilation.assets['filelist.md'] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };

    callback();

  }.bind(this));

  compiler.plugin('done', function() {
    console.log('Styles processed.');
  });
};

module.exports = HelloWorldPlugin;