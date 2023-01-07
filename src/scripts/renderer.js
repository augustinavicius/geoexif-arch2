// Load Leaflet Map
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
