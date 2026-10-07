# GIST5300 Assignment 4: Leaflet Web Map
## Author: Carson Liesik
### Date: 10/4/2026

This is the main launching point for the 2 web maps created for this assignment. 

### Weather Alerts Map
The framework of this map comes from the Leaflet Web Application from Module 5. I adjusted the IF functions for the alert symbology to include specific colors for "minor" and "extreme" weather alerts. Then I switched the basemap to show an aerial image instead of a plain backdrop. The link for this web map can be found here:
<https://cliesik51.github.io/LiesikGIST5300Assign4/Weather>

### EarthQuake Activity Map
Starting with the files from the Weather Alerts Map, I created 2 new files called "earthquake.js" and earthquake.css". From there I modified the basemap to highlight better contrast between the earthquake markers and changed the data url to read the USGS earthquake data. Following the linked Leaflet tutorials I generated a function called "getColor" to apply the color for each earthquake record based on magnitude. Then I created a legend variable and applied the matching colors from the "getColor" function. The Legend and corresponding colors were displayed by the 2 additional CSS entries from the Leaflet tutorials.

Leaflet Links:
<https://leafletjs.com/examples/geojson/>
<https://leafletjs.com/examples/choropleth/>

I finally added the the popups for each earthquake record using the same code from the Weather Alerts Map. I ran into a challenge with the time value because it was entered into the USGS Earthquake Data in the Unix Timestamp Millisecond format so it looked like this "1791326997360". I found a Stack Overflow post that showed me how to convert the data to a readable format using ".toLocaleString". This put it in the same format as you local machine and displayed it like this "10/6/2026, 4:49:57 PM".

Stack Overflow Link:
<https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript>

The link for the Earthquake Activity Map can be found here:
<https://cliesik51.github.io/LiesikGIST5300Assign4/Earthquake>
