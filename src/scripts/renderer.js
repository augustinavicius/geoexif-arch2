// Leaflet Map Load 
const { loadMap } = require(__dirname + '/leaflet/loadMap.js');

// Leaflet Map
global.map;

// Leaflet Marker Styles
const { icon } = require('leaflet');
global.markerIcon = icon({
    iconUrl: './images/marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [15, 31]
});

global.selectedMarkerIcon = icon({
    iconUrl: './images/marker-icon-selected.png',
    iconSize: [32, 32],
    iconAnchor: [15, 31]
});

// App Cache
global.loadedImages = [];
global.loadedMarkers = [];

// Load Leaflet Map
document.addEventListener('DOMContentLoaded', (event) => {
    map = loadMap(map);
});

// Disable animations on window resize
window.addEventListener("resize", () => { require(__dirname + '/utils/resizeControl.js').resizeControl() });

// Modal Controls
// Open | Open Dialog Modal
module.exports.openAddImageModal = () => { document.getElementById('addImageModal').classList.add('is-active') };
// Close | Open Dialog Modal
module.exports.closeAddImageModal = () => { document.getElementById('addImageModal').classList.remove('is-active') };
// Open | Open Image Options Modal
module.exports.openImageOptionsModal = (imagePath) => { require(__dirname + '/utils/imageOptionsModal.js').load(imagePath) };
// Close | Open Image Options Modal
module.exports.closeImageOptionsModal = () => { document.getElementById('imageOptionsModal').classList.remove('is-active') };
module.exports.closeImageOptionsErrorBox = () => { document.getElementById('imageOptionsErrorBox').classList.add('is-hidden') };
module.exports.selectImageRadius = (imagePath) => { require(__dirname + '/utils/selectImageRadius.js').load(imagePath) };

// Selection Controls
// Select Image
module.exports.selectImage = (imagePath) => { require(__dirname + '/utils/selectImage.js').load(imagePath) };
// Select All Images
module.exports.selectAllImages = () => { require(__dirname + '/utils/selectAllImages.js').load() };
// Inverse Image Selection
module.exports.inverseImageSelection = () => { require(__dirname + '/utils/inverseImageSelection.js').load() };
// Remove Image
module.exports.removeImage = () => { require(__dirname + '/utils/removeImage.js').load() };

// Navigation Bar Control Behaviour
module.exports.navBarControl = () => { require(__dirname + '/utils/navBarControl.js').navBarControl() };

// Open & Save Dialog Handlers
module.exports.openDialog = () => { require(__dirname + '/dialogs/openDialog.js').load() };