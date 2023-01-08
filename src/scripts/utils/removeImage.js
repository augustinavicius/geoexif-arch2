module.exports.load = () => {
    var tempLoadedImages = loadedImages;
    for (var i = 0; i < tempLoadedImages.length; i++) {
        // Image Var
        let image = tempLoadedImages[i];
        // Check if Selected
        if (!image.selected) continue;

        // Image Path
        let imagePath = image.path;

        // Remove DIV
        document.getElementById(imagePath.replaceAll('\\', '\\\\')).parentElement.remove();

        // Remove Image Data from Cache
        loadedImages = loadedImages.filter((image) => { return image.path != imagePath });

        // Remove Image Marker Data from Cache
        let imageMarker = loadedMarkers.find(image => image.path == imagePath);
        map.removeLayer(imageMarker.marker);
        loadedMarkers = loadedMarkers.filter((marker) => { return marker.path != imagePath });
    }
}