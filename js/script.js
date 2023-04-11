$(document).ready(function () {
    // Set up the API URL and app token
    var apiUrl = "https://data.cityofnewyork.us/resource/he7q-3hwy.json";
    var appToken = "Affw7G7wBclIZonqqsdIJJDh2";

    // Make a GET request to the API
    $.ajax({
        url: apiUrl,
        type: "GET",
        data: {
            "$limit": 1000,
            "$$app_token": appToken,

        },
        success: function (data) {
            // Map the data array to a new array that contains only the name, latitude, and longitude properties
            var filteredData = data.map(function (entrance) {
                return {
                    name: entrance.name,
                    latitude: entrance.the_geom.coordinates[1],
                    longitude: entrance.the_geom.coordinates[0],
                    line: entrance.line
                };
            });

            // Add a marker for each entrance
            filteredData.forEach(function (data) {
                // Check if the latitude and longitude values are valid numbers
                if (!isNaN(data.latitude) && !isNaN(data.longitude)) {
                    // Create a marker
                    var marker = new mapboxgl.Marker({
                        color: "rgb(255, 255, 153)",
                        size: 'small'
                })
                        .setLngLat([data.longitude, data.latitude])
                        .setPopup(new mapboxgl.Popup().setHTML("<h3>" + data.name + "</h3><p><strong>Line: </strong>" + data.line + "</p>"))
                        .addTo(map);
                }
            });
        },
        error: function (xhr, status, error) {
            // Handle errors here
            console.log("Error retrieving data from the NYC Open Data API: " + error);
        }
    });

    // Set up the Mapbox map
    mapboxgl.accessToken = "pk.eyJ1IjoiYW1rOTcxMCIsImEiOiJjbGc1cWRtNTIwNWl0M2VuNW9yZTJxYmJ2In0.BR49nDMsJOC3F0VxtVqT9Q";
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-73.972637, 40.676602],
        zoom: 11
    });
});
