module.exports.load = () => {
    for (var i = 0; i < loadedImages.length; i++) {
        let image = loadedImages[i];

        image.selected = true;
        document.getElementById(image.path.replaceAll('\\', '\\\\')).querySelector('.list-item-title').querySelector('input').checked=true;
    }
}