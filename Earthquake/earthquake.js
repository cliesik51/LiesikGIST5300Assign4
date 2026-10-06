var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
var basemap =  L.tileLayer(basemapUrl, {attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'}).addTo(map);


//add Earthquake layer
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeUrl, function(data) {
    //L.geoJSON(data).addTo(map);
    L.geoJSON(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng, {})
      },

      style: function(feature) {
        var magColor = 'transparent'; // Hides Colors not listed below
        if (feature.properties.mag >= 1.0 && feature.properties.mag <= 2.0) magColor = 'lightgreen'; // Micro
        if (feature.properties.mag >= 2.1 && feature.properties.mag <= 4.0) magColor = 'green'; // Minor
        if (feature.properties.mag >= 4.1 && feature.properties.mag <= 5.0) magColor = 'yellow'; // Light
        if (feature.properties.mag >= 5.1 && feature.properties.mag <= 6.0) magColor = 'orange'; // Moderate
        if (feature.properties.mag >= 6.1 && feature.properties.mag <= 7.0) magColor = 'lightred'; // Strong
        if (feature.properties.mag >= 7.1 && feature.properties.mag <= 8.0) magColor = 'red'; // Major
        if (feature.properties.mag >= 8.1) magColor = 'darkred'; // Great
        return {color: magColor}
      }  
      }).addTo(map);
      
});

