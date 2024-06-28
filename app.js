// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 2);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var points = [];

// Function to add a marker and store the point
function onMapClick(e) {
    var latlng = e.latlng;
    points.push([latlng.lat, latlng.lng]);
    L.marker(latlng).addTo(map);
    updateCoordinatesTable();
}

// Add click event listener to the map
map.on('click', onMapClick);

// Update the coordinates table
function updateCoordinatesTable() {
    var coordinatesTable = document.getElementById('coordinates');
    coordinatesTable.innerHTML = '';
    points.forEach(function(point, index) {
        var row = document.createElement('tr');
        var countryCell = document.createElement('td');
        countryCell.textContent = `Point ${index + 1}`;
        var latCell = document.createElement('td');
        latCell.textContent = point[0];
        var lonCell = document.createElement('td');
        lonCell.textContent = point[1];
        row.appendChild(countryCell);
        row.appendChild(latCell);
        row.appendChild(lonCell);
        coordinatesTable.appendChild(row);
    });

    var coordinatesTableContainer = document.getElementById('coordinates-table');
    if (points.length > 0) {
        coordinatesTableContainer.classList.remove('hidden');
    } else {
        coordinatesTableContainer.classList.add('hidden');
    }
}

// Export points to Excel
document.getElementById('export').addEventListener('click', function() {
    var wb = XLSX.utils.book_new();
    var ws_data = [["Country", "Latitude", "Longitude"], ...points.map((point, index) => [`Point ${index + 1}`, point[0], point[1]])];
    var ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Points");

    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length);
        var view = new Uint8Array(buf);
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;
    }

    var blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });

    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'points.xlsx';
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
});

// Clear all points
document.getElementById('clear').addEventListener('click', function() {
    points = [];
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });
    updateCoordinatesTable();
});

// Function to search for a country and move the map to its coordinates
function searchCountry() {
    var country = document.getElementById('country-input').value;
    if (!country) return;

    var url = `https://nominatim.openstreetmap.org/search?country=${encodeURIComponent(country)}&format=json&limit=1`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data && data.length > 0) {
                var latlng = data[0];
                map.setView([latlng.lat, latlng.lon], 5);
            } else {
                alert('Country not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to search for the country');
        });
}

// Add event listeners for the search button and the "Enter" key
document.getElementById('search').addEventListener('click', searchCountry);
document.getElementById('country-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchCountry();
    }
});
