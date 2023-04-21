'use strict';
app.controller('mapController', ['$scope', '$http', function ($scope, $http) {

    $http.get("https://data-cloud.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=36.661%2C24.257%2C38.574%2C68.587&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&reg=EP-VAI&pk=&stats=1&enc=y1F-oReU7ufATC8QkB6YOyqepjBSozH_Bxvh2I9QGdU").then(function (response) {
        console.log(response);
    });



    var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VwZWhyc2hhaHJhZWluaSIsImEiOiJjbGJybGdkYXQwdGxwM25sZXVjMms1aXkyIn0.vB2_cOSKFUSUwvTOyd_yVA';


    //var map = L.map('map').setView([51.505, -0.09], 13);
    //L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //    maxZoom: 19,
    //    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    //}).addTo(map);

    var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    var streets = L.tileLayer(mapboxUrl, { id: 'mapbox://styles/mapbox/streets-v12', tileSize: 512, zoomOffset: -1, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    var cities = L.tileLayer(mapboxUrl, { id: 'mapbox/cities-v11', tileSize: 512, zoomOffset: -1, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });
    var satellite = L.tileLayer(mapboxUrl, { id: 'satellite-streets-v9', tileSize: 512, zoomOffset: -1, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' });


    var map = L.map('map', {
        center: [45.51, -122.68],
        zoom: 10,
        layers: [osm, cities]
    });


    var baseMaps = {
        "OpenStreetMap": osm,
        "Mapbox Streets": streets
    };

    var overlayMaps = {
        "Cities": cities
    };

    var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);



    layerControl.addBaseLayer(satellite, "Satellite");

    var airplane = L.icon({
        iconUrl: 'content/images/airplaneMark.png',

        iconSize: [25, 25], // size of the icon
        iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
        popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
    });



    var points = [
        [45.51, -122.68],
        [37.77, -122.43],
        [34.04, -118.2]
    ]

    L.marker([45.51, -122.68], { icon: airplane }).addTo(map);

    var line = L.polyline(points, { color: 'blue' }).addTo(map);
    map.fitBounds(line.getBounds());


}]);