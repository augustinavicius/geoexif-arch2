// Leaflet Map Load 
const { loadMap } = require(__dirname + '/leaflet/loadMap.js');

// Leaflet Map
var map;

// App Cache
var loadedImages = [];
var loadedMarkers = [];

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
// Open & Save Dialog Handlers
module.exports.openDialog = () => { require(__dirname + '/dialogs/openDialog.js').load(map, loadedImages, loadedMarkers) };