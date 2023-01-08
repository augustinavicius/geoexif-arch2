// File Paths
module.exports.load = (imagePath) => {
    var image = loadedImages.find(image => image.path == imagePath);

    if (image.selected) {
        image.selected = false;
    } else {
        image.selected = true;
    }
}