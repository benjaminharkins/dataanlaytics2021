# Leaflet Homework

#################
#index.html code#
#################
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Leaflet Step-1</title>

  <!-- Leaflet CSS -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />

  <!-- Our CSS -->
  <link rel="stylesheet" type="text/css" href="static/css/style.css">
</head>

<body>

  <!-- The div that holds our map -->
  <div id="mapid"></div>

  <!-- Leaflet JS -->
  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""></script>
  <!-- D3 JavaScript -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/4.2.3/d3.min.js"></script>
  <!-- API key -->
  <script type="text/javascript" src="static/js/config.js"></script>
  <!-- Our JavaScript -->
  <script type="text/javascript" src="static/js/logic.js"></script>
</body>

</html>



###############
#logic.js code#
###############
function createMap(mapdata) {
    var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYm95b3MiLCJhIjoiY2twNjhkMGxpMDF1MDJ6bjZ4c2g4eHBieiJ9.odFXcnMdqxzpmjZ-lrfxxg', {
       maxZoom: 5,
       attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
           'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
       id: 'mapbox/light-v9',
       tileSize: 512,
       zoomOffset: -1
   });
//.addTo(myMap)
// 
 var myMap = L.map("map", {
   center: [37.09, -95.71],
   zoom: 5,
   layers:[lightMap, mapdata]
 });
 // Setup the legend for the magnitude of the earthquakes
 var legend = L.control({ position: "bottomright"});
 legend.onAdd = function() {
     var div = L.DomUtil.create('div', 'info legend'),
     magnitude = [0,1,2,3,4,5,6,7],
     labels = [];
     for (var i = 0; i < magnitude.length; i++)  {
        div.innerHTML +=
        
        `<i style="background:` + getColor(magnitude[i] + 1) +  `" >  ${magnitude[i]}   </i> ` +  magnitude[i] + (magnitude[i + 1] ? "--" + magnitude[i + 1] + '<br>': '+');

     }
     //console.log(div.innerHTML);
     return div;
};
// adding legend to the map ${magnitude[i]} 
legend.addTo(myMap);
}
 function createCircles(response) {
   // Pull the "stations" property off of response.data
   var data = response.features ; 
   var maparray = [];
   for (i = 0 ; i< data.length ; i ++ ){
     // Capture data into local variables 
         magnitude = data[i].properties.mag;
         place = data[i].properties.place;
         lattitude = data[i].geometry.coordinates[1] ;
         longitude = data[i].geometry.coordinates[0] ;
         depth = data[i].geometry.coordinates[2] ;
     // Create a circle and pass in some initial options
       var mapcircle = L.circle([lattitude,longitude], {
           color: getColor(magnitude),
           fillColor: getColor(magnitude),
           fillOpacity: 0.5,
           weight: 1,
           radius: radiusMag(depth)
       }).bindPopup("<h3>" + place + "<h3><h3>depth: " + depth + "</h3>" + "<h3> magnitude:" + magnitude + "</h3>")
       ;
       maparray.push(mapcircle);
   }
   //console.log(maparray);
   createMap(L.layerGroup(maparray));
 }
 function radiusMag(depth){
   return depth*1500 ;
 }
 
 function getColor(mag){
     //Conditionals for countries points
     var ccolor = "";
     //console.log(mag);
     switch (true) {
       case mag >= 7:
         return 'red';
         break;
     case mag >= 6:
       return 'orangered';
       break;
     case mag >= 5:
       return 'darkorange';
       break;
     case mag >= 4:
       return 'orange';
       break;
     case mag >= 3:
       return 'gold';
       break;
     case mag >= 2:
       return 'yellow';
       break;
     default:
       return 'greenyellow';
     };
 }
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createCircles);