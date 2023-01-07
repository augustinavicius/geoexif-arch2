// Electron Remote
const { dialog } = require('@electron/remote');
// Leaflet
const leaflet = require('leaflet');
// EXIF
const EXIF = require('fast-exif');
// DMS 2 Decimal
const { DMS2Decimal } = require('dms-to-decimal');
// File Paths
const path = require('path');

module.exports.load = (map, loadedImages, loadedMarkers) => {
    var addImageScanType = document.getElementById('addImageScanType').value;
    switch (addImageScanType) {
        case 'images':
            processImagesPaths();
            break;
        case 'folders':
            processFoldersPaths();
            break;
        case 'foldersandsubfolders':
            processFoldersSubfoldersPaths();
            break;
    }

    // Functions
    async function processPath(imagePath) {
        // Available Extension Names
        var extNames = ['.png', '.jpg', '.jpeg'];
        // Check for duplicates
        if (loadedImages.some((image) => image.path == imagePath)) return;
        // Check if it's an image
        if (!extNames.includes(path.extname(imagePath))) return;

        let imageList = document.getElementById('imageList');
        let imageName;
        let imageExif = true;
        let imageGPS = true;
        let imageLatitude;
        let imageLongitude;
        let imageMarker;

        try {
            let exifData = await EXIF.read(imagePath);

            if (exifData == null) { // EXIF data does not exist
                imageName = `[NO EXIF] ${path.basename(imagePath)}`;
                imageExif = false;
                imageLatitude = 0;
                imageLongitude = 0;
            } else {                // EXIF data does exist
                if (exifData.gps.GPSLatitude == undefined || exifData.gps.GPSLongitude == undefined || exifData.gps.GPSLatitudeRef == undefined || exifData.gps.GPSLongitudeRef == undefined) { // GPS data does not exist
                    imageName = `[NO GPS] ${path.basename(imagePath)}`;
                    imageGPS = false;
                    imageLatitude = 0;
                    imageLongitude = 0;
                } else {            // GPS data does exist
                    imageName = path.basename(imagePath);

                    let latDegree = exifData.gps.GPSLatitude[0];
                    let latMinute = exifData.gps.GPSLatitude[1];
                    let latSecond = exifData.gps.GPSLatitude[2];
                    let latDir = exifData.gps.GPSLatitudeRef;

                    let longDegree = exifData.gps.GPSLongitude[0];
                    let longMinute = exifData.gps.GPSLongitude[1];
                    let longSecond = exifData.gps.GPSLongitude[2];
                    let longDir = exifData.gps.GPSLongitudeRef;

                    imageLatitude = DMS2Decimal(latDegree, latMinute, latSecond, latDir);
                    imageLongitude = DMS2Decimal(longDegree, longMinute, longSecond, longDir);

                    imageMarker = new leaflet.Marker([imageLatitude, imageLongitude]);
                    imageMarker.addTo(map).on('mousedown', () => { 
                        document.getElementById(imagePath.replaceAll('\\', '\\\\')).querySelector('.list-item-title').querySelector('input').checked=true;
                        document.getElementById(imagePath.replaceAll('\\', '\\\\')).scrollIntoView();
                        selectedImages.push(imagePath);
                    });
                }
            }
        } catch (error) {           // Fatal Error
            imageName = `[ERROR] ${path.basename(imagePath)}`;
            console.log(error);
        }

        loadedImages.push({
            name: imageName,
            path: imagePath,
            exif: imageExif,
            gps: imageGPS,
            latitude: imageLatitude,
            longitude: imageLongitude
        });

        loadedMarkers.push({
            path: imagePath,
            marker: imageMarker
        });

        let imageEntry = `
        <div class="list-item">
            <div class="list-item-content" id="${imagePath.replaceAll('\\', '\\\\')}">
                <!--Photo Name-->
                <div class="list-item-title"><input type="checkbox" class="mr-2" onclick="renderer.selectImage('${imagePath.replaceAll('\\', '\\\\')}')">${imageName}</div>
                <!--Photo Path Array Here-->
                <div class="list-item-description">${imagePath}</div>
            </div>
            <div class="list-item-controls">
                <div class="buttons is-right">
                    <button class="button">
                        <span class="icon is-small">
                            <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </span>
                        <span onclick="openImage('${imagePath.replaceAll('\\', '\\\\')}')">Open</span>
                    </button>
    
                    <button class="button">
                        <span class="icon is-small">
                            <i class="fas fa-ellipsis-h"></i>
                        </span>
                    </button>
                </div>
            </div>
        </div>`

        imageList.innerHTML += imageEntry;
    }

    async function processImagesPaths() {
        var selection = dialog.showOpenDialogSync({ properties: ['openFile', 'multiSelections'], filters: [{ name: 'Images', extensions: ["jpg", "png", "jpeg"] }] });

        for (var i = 0; i < selection.length; i++) {
            let imagePath = selection[i];
            await processPath(imagePath);
        }
    }
}

// File List
const getFileList = async (dirName) => {
    let progressBarStatus = document.getElementById('progressBarStatus');
    progressBarStatus.innerHTML = 'Retrieving files...'
    let progressBar = document.getElementById('progressBar');

    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    progressBar.max = items.length;

    for (var i = 0; i < items.length; i++) {
        let item = items[i];

        if (item.isDirectory()) continue;
        files.push(`${dirName}\\${item.name}`);

        progressBar.value += 1;
    }

    return files;
};

// File List - Nesting
const getFileListNest = async (dirName) => {
    let files = [];
    const items = await readdir(dirName, { withFileTypes: true });

    progressBar.max = items.length;

    for (var i = 0; i < items.length; i++) {
        let item = items[i];

        if (item.isDirectory()) {
            files = [
                ...files,
                ...(await getFileListNest(`${dirName}\\${item.name}`)),
            ];
        } else {
            files.push(`${dirName}\\${item.name}`);
        }

        progressBar.value += 1;
    }

    return files;
};