module.exports.load = (selectedImages, loadedImages, loadedMarkers, map) => {
    selectedImages.forEach(imagePath => {
        imagePath = imagePath.replaceAll('\\', '\\\\');
        // Remove DIV
        let imageEntry = document.getElementById(imagePath);
        imageEntry.parentElement.remove();

        // Remove Image Data from Cache
        loadedImages = loadedImages.filter((image) => { return image.path.replaceAll('\\', '\\\\') != imagePath});

        // Remove Image Marker from Cache
        let imageMarker = loadedMarkers.find(image => image.path.replaceAll('\\', '\\\\') == imagePath);
        map.removeLayer(imageMarker.marker);
        loadedMarkers = loadedMarkers.filter((marker) => { return marker.path.replaceAll('\\', '\\\\') != imagePath});
    });

    return [];
}