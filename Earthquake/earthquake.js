var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
var basemap = L.tileLayer(basemapUrl, { attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community' }).addTo(map);


//add Earthquake layer
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeUrl, function (data) {

  //L.geoJSON(data).addTo(map);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {})
    },

    // Symbolize based on magnitude
    style: function (feature) {
      var magColor = 'transparent'; // Hides Colors not listed below
      if (feature.properties.mag >= 0 && feature.properties.mag <= 2.0) magColor = 'lightgreen'; // Micro
      if (feature.properties.mag >= 2.01 && feature.properties.mag <= 4.0) magColor = 'green'; // Minor
      if (feature.properties.mag >= 4.01 && feature.properties.mag <= 5.0) magColor = 'yellow'; // Light
      if (feature.properties.mag >= 5.01 && feature.properties.mag <= 6.0) magColor = 'orange'; // Moderate
      if (feature.properties.mag >= 6.01 && feature.properties.mag <= 7.0) magColor = 'lightred'; // Strong
      if (feature.properties.mag >= 7.01 && feature.properties.mag <= 8.0) magColor = 'red'; // Major
      if (feature.properties.mag >= 8.01) magColor = 'darkred'; // Great
      return { color: magColor }
    },
    
    // Add popups for each earthquake
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Location: ' + feature.properties.place +
        '<br> Magnitude: ' + feature.properties.mag +
        "<br> Time: " + new Date(feature.properties.time).toLocaleString() // the time is from the api is a Unix timestamp. The toLocaleString() converts it to match your machine's local time with the corresponding date.
      );

    },

    // Add Legend to map for earthquake magnitudes
    
  }).addTo(map);

});

