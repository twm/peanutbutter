// NBB: This must use CommonJS module syntax for Node.
var React = require('react');
var ReactDOMServer = require('react-dom/server');

module.exports = ServerRenderPlugin;

function ServerRenderPlugin(options) {
};


ServerRenderPlugin.prototype.apply = function(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
        // console.log('assets', Object.keys(compilation.assets));
        // compilation.chunks.forEach(function(chunk) {
        //     console.log('chunk', chunk.name);
        //     console.log('  files', chunk.files);
        // });

        const chunks = compilation.chunks.filter(function(c) {
            return c.name === 'server';
        })
        if (!chunks.length) {
            console.log("Unable to find the server chunk: probably a syntax error");
            callback();
            return;
        }
        const filename = chunks[0].files[0];
        const asset = compilation.assets[filename];
        const render = eval(asset.source()).default;
        // TODO: Pass path of client.js so it can be hashed.
        const html = render();

        delete compilation.assets[filename];

        compilation.assets['index.html'] = {
            source: function() { return html; },
            size: function() { return html.length; },
        };
        callback();
    });
};
