var map = L.map('earthquakemap').setView([38, -95], 4);
var basemapUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}';
var basemap = L.tileLayer(basemapUrl, { attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community' }).addTo(map);

// build color function to assign colors based on magnitude of earthquake.
function getColor(mag) {
  return mag > 8 ? '#830303' :
         mag > 7 ? '#dd0808' :
         mag > 6 ? '#ff5656' :
         mag > 5 ? '#c28604' :
         mag > 4 ? '#ff9305' :
         mag > 3 ? '#ffef0a' :
         mag > 2 ? '#1d5503' :
         mag > 1 ? '#0cff03' :
                   '#9aff7b';      
}

//add Earthquake layer
var earthquakeUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';
$.getJSON(earthquakeUrl, function (data) {

  //L.geoJSON(data).addTo(map);
  L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {})
    },
    
    // Add Colors to earthquake markers based off of magnitude
    style: function style (feature) {
      return {
        fillColor: getColor(feature.properties.mag),
        weight: 1,
        opacity: 1,
        color: 'black',
        fillOpacity: 1,
      }
    },

    // Add popups for each earthquake
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        'Location: ' + feature.properties.place +
        '<br> Magnitude: ' + feature.properties.mag +
        "<br> Time: " + new Date(feature.properties.time).toLocaleString() // the time is from the api is a Unix timestamp. The toLocaleString() converts it to match your machine's local time with the corresponding date.
      );

    }
  }).addTo(map);

});

// Add Legend to map for earthquake magnitudes
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');
  var magnitudes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  labels = [];

  // Loop through the magnitude intervals and generate a legend item for each level
  for (var i =0; i < magnitudes.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(magnitudes[i] + 1) + '"></i> ' +
      magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i+1] + '<br>' : '+');
  }

  return div;
};

legend.addTo(map);

