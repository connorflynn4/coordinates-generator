# Coordinates Generator

## Description

The Coordinates Generator is a web application that allows users to interactively select geographical points on a map, view their corresponding latitude and longitude values, and manage these coordinates efficiently.

## Features

- **Interactive Map Interface**: Users can click on any point on the map to generate and record the latitude and longitude of that location. The map is implemented using the Leaflet library, providing a smooth and responsive user experience.
- **Country Search Functionality**: Users can search for any country using a search bar. Upon searching, the map will center on the specified country, making it easy to find and select points of interest within that region.
- **Dynamic Coordinates Table**: As users select points on the map, a table dynamically updates to display the selected coordinates. The table includes columns for the point number, latitude, and longitude.
- **Export to Excel**: The application allows users to export the list of selected coordinates to an Excel file. This feature is implemented using the xlsx and FileSaver.js libraries, ensuring compatibility and ease of use.
- **Clear Coordinates**: Users can easily clear all selected coordinates and reset the map using a dedicated button.
- **Responsive Design**: The application features a responsive design that adapts to different screen sizes, ensuring usability across various devices.

## Technical Stack

- **Frontend**: HTML, CSS, JavaScript
- **Map Library**: Leaflet
- **Geocoding Service**: Nominatim (OpenStreetMap)
- **Excel Export**: xlsx, FileSaver.js

## Key Learnings

- Integrating and using the Leaflet library for interactive map features.
- Implementing dynamic DOM updates to reflect user interactions in real-time.
- Utilizing external APIs for geocoding services.
- Managing and exporting data to Excel format using JavaScript libraries.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/connorflynn4/coordinates-generator.git
