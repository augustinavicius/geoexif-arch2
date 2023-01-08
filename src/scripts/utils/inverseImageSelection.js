module.exports.load = () => {
    for (var i = 0; i < loadedImages.length; i++) {
        let image = loadedImages[i];

        if (image.selected) {
            image.selected = false;
            document.getElementById(image.path.replaceAll('\\', '\\\\')).querySelector('.list-item-title').querySelector('input').checked = false;
        } else {
            image.selected = true;
            document.getElementById(image.path.replaceAll('\\', '\\\\')).querySelector('.list-item-title').querySelector('input').checked = true;
        }
    }
}