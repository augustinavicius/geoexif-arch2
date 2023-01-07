// Leaflet Map Load 
const { loadMap } = require(__dirname + '/leaflet/loadMap.js');

// Leaflet Map
var map;

// App Cache
var loadedImages = [];
var loadedMarkers = [];

// Load Leaflet Map
document.addEventListener('DOMContentLoaded', (event) => {
    loadMap(map);
});

module.exports.navBarControl = () => { require(__dirname + '/utils/navBarControl.js').navBarControl() }
window.addEventListener("resize", () => { require(__dirname + '/utils/resizeControl.js').resizeControl() });