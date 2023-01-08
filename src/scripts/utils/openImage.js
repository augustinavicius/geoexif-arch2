const { shell } = require('electron');

module.exports.load = (imagePath) => {
    shell.openPath(imagePath);
}