const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'),
        },
        compress: true,
        port: 9000,
    },
    output: {
        libraryTarget: 'window',
        library: 'functions'
    },
};