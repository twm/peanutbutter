// FIXME: The call to render() seems to be using *these* imports rather than
// the version of react in the bundle.
var React = require('react');
var ReactDOMServer = require('react-dom/server');

function ServerRenderPlugin() {
    this.render = function() {
        // We are depending on the way Webpack happens to run the builds in
        // order to sequence the emit events between the two builds, but this
        // is probably not really guaranteed by Webpack.  Throw an error when
        // this breaks, as it inevitably will.
        throw new Error("Looks like the emit event for render.js hasn't happened yet.");
    };
};

ServerRenderPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        console.log('emit start: render');
        const renderFile = jsForChunk(compilation, 'render');
        const asset = compilation.assets[renderFile];

        // The exported module sets "var render = { default: ... }".
        eval(asset.source());
        this.render = render.default;

        delete compilation.assets[renderFile];
        callback();
    });
};

ServerRenderPlugin.prototype.fileEmitter = function(filename) {
    return {
        apply: compiler => {
            compiler.plugin('emit', (compilation, callback) => {
                const clientFile = jsForChunk(compilation, 'client');
                const content = this.render(clientFile);

                compilation.assets[filename] = {
                    source: function() { return content; },
                    size: function() { return content.length; },
                };
                callback();
            });
        },
    };
};

function jsForChunk(compilation, chunkName) {
    const chunks = compilation.chunks.filter(c => c.name === chunkName);
    if (!chunks.length) {
        throw new Error(`Unable to find the "${chunkName}" chunk`);
    }
    const jsFiles = chunks[0].files.filter(fn => fn.match(/\.js$/));
    if (jsFiles.length !== 1) {
        throw new Error(`There are ${jsFiles.length} files in chunk "${chunkName}" but I only know how to handle one.  The files are ${jsFiles}.`);
    }
    return jsFiles[0];
}

module.exports = ServerRenderPlugin;
