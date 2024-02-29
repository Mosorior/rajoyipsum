const path = require('path');

module.exports = {
    mode: 'production',
    entry: './extension.js', // Asegúrate de que este sea el punto de entrada de tu extensión
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'extension.js',
        libraryTarget: 'commonjs2',
        devtoolModuleFilenameTemplate: '../[resource-path]',
    },
    target: 'node', // Importante ya que tu extensión se ejecuta en un entorno de Node.js
    devtool: 'source-map',
    externals: {
        vscode: 'commonjs vscode', // Excluye 'vscode' del paquete ya que es un módulo global de VS Code
    },
    resolve: {
        extensions: ['.js'],
    },
};