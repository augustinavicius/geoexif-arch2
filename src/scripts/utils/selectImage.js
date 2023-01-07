// File Paths
module.exports.load = (selectedImages, imagePath) => {
    var selected = selectedImages.find(tempImagePath => tempImagePath == imagePath);

    if (selected) {
        var index = selectedImages.indexOf(imagePath);
        selectedImages.splice(index, 1);
    } else {
        selectedImages.push(imagePath);
    }
}