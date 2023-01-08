// Leaflet Map Load 
const { loadMap } = require(__dirname + '/leaflet/loadMap.js');

// Leaflet Map
global.map;

// App Cache
global.loadedImages = [];
global.loadedMarkers = [];

// Load Leaflet Map
document.addEventListener('DOMContentLoaded', (event) => {
    map = loadMap(map);
});

// Disable animations on window resize
window.addEventListener("resize", () => { require(__dirname + '/utils/resizeControl.js').resizeControl() });
// Navigation Bar Control Behaviour
module.exports.navBarControl = () => { require(__dirname + '/utils/navBarControl.js').navBarControl() };
// Open | Open Dialog Modal
module.exports.openAddImageModal = () => { document.getElementById('addImageModal').classList.add('is-active') };
// Close | Open Dialog Modal
module.exports.closeAddImageModal = () => { document.getElementById('addImageModal').classList.remove('is-active') };
// Select Image
module.exports.selectImage = (imagePath) => { require(__dirname + '/utils/selectImage.js').load(imagePath) };
// Select All Images
module.exports.selectAllImages = () => { require(__dirname + '/utils/selectAllImages.js').load() };
// Inverse Image Selection
module.exports.inverseImageSelection = () => { require(__dirname + '/utils/inverseImageSelection.js').load() };
// Remove Image
module.exports.removeImage = () => { require(__dirname + '/utils/removeImage.js').load() };
// Open & Save Dialog Handlers
module.exports.openDialog = () => { require(__dirname + '/dialogs/openDialog.js').load() };

module.exports.test = () => { console.log(loadedImages, loadedMarkers)};