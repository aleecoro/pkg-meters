require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/FeatureLayer",
  "esri/widgets/Home",
  "esri/widgets/Locate",
  "esri/widgets/Expand",
  "esri/widgets/BasemapGallery",
],function(
  Map, 
  MapView,
  FeatureLayer,
  Home,
  Locate,
  Expand,
  BasemapGallery
) {  //TOP of REQUIRE

  // Create the Map with an initial basemap
  var map = new Map({
    basemap: "gray"
  });

  // Create the MapView and reference the Map in the instance
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-117.16, 32.71], // San Diego, CA
    zoom: 12
  });
  


  //Create a SimpleRenderer to apply to the feature layer.

    var pkgmetersRenderer = {
      type: "simple",
      symbol: {
        type: "simple-marker",
        size: 5,
        width: 1,
        color: [235, 162, 0, 1],
        outline: {
          width: 1,
          color: [245, 245, 245, 1]
        }
      }
    };;

  
  // Add popup
  var popupPkgMeters = {
    title: "Pole ID: {pole_id}",
    content: [
      {
        type: "fields",
        fieldInfos: [
          {
            fieldName: "pole_id",
            label: "Pole ID",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box"
          },
          {
            fieldName: "Time",
            label: "Time Limit",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box"
          },
          {
            fieldName: "Hours",
            label: "Hours",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: null,
            stringFieldOption: "text-box"
          },
          {
            fieldName: "Amount",
            label: "Amount",
            isEditable: true,
            tooltip: "",
            visible: true,
            format: {
              places: 2,
              digitSeparator: true
            },
            stringFieldOption: "text-box"
          }
        ]
      }
    ]
  };

  //Create a feature layer
  var pkg_meters = new FeatureLayer({
    url: "https://services.arcgis.com/oxInpRhVIBxlo4pO/arcgis/rest/services/parking_meters_loc_datasd_processed/FeatureServer/0",
    renderer: pkgmetersRenderer, //Apply the renderer to the feature layer,
    minScale: 0,
    maxScale: 0,
    outFields: ["pole_id", "Time", "Hours","Amount"],
    popupTemplate: popupPkgMeters
  });

  //Add a feature layer to the map
  map.add(pkg_meters,0);


// Create the home widget
  
  var homeWidget = new Home({
    view : view
  });
  
// Add the widget to the view
  
  view.ui.add( homeWidget, {
    position : "top-left",
    index : 1
  })  
 
 // Create the locate widget
  var locateWidget = new Locate({
    view : view
  });

 // Add the widget to the view 
  view.ui.add( locateWidget, {
    position : "top-left",
    index : 2
  });


// Create a BasemapGallery widget instance and set
// its container to a div element

var basemapGallery = new BasemapGallery({
  view: view,
  container: document.createElement("div")
});

// Create an Expand instance and set the content
// property to the DOM node of the basemap gallery widget

var bgExpand = new Expand({
  view: view,
  content: basemapGallery
});

// Add the expand instance to the ui

view.ui.add(bgExpand, "top-right");



}); // BOTTOM of REQUIRE
