
/**
 * @file
 * Javascript functions for getdirections module
 *
 * @author Bob Hutchinson http://drupal.org/user/52366
 * jquery stuff
*/
(function ($) {

  Drupal.getdirections_preview_map = [];

  Drupal.behaviors.getdirections_preview = {
    attach: function() {

      $.each(Drupal.settings.getdirections_preview, function(key, settings) {

        function updateCopyrights() {
          if(Drupal.getdirections_preview_map[key].getMapTypeId() == "OSM") {
            copyrightNode.innerHTML = "OSM map data @<a target=\"_blank\" href=\"http://www.openstreetmap.org/\"> OpenStreetMap</a>-contributors,<a target=\"_blank\" href=\"http://creativecommons.org/licenses/by-sa/2.0/legalcode\"> CC BY-SA</a>";
            if (settings.trafficinfo) {
              $("#getdirections_toggleTraffic_" + key).attr('disabled', true);
            }
            if (settings.bicycleinfo) {
              $("#getdirections_toggleBicycle_" + key).attr('disabled', true);
            }
            if (settings.transitinfo) {
              $("#getdirections_toggleTransit_" + key).attr('disabled', true);
            }
          }
          else {
            copyrightNode.innerHTML = "";
            if (settings.trafficinfo) {
              $("#getdirections_toggleTraffic_" + key).attr('disabled', false);
            }
            if (settings.bicycleinfo) {
              $("#getdirections_toggleBicycle_" + key).attr('disabled', false);
            }
            if (settings.transitinfo) {
              $("#getdirections_toggleTransit_" + key).attr('disabled', false);
            }
          }
        }
        // end functions

        if ($("#getdirections_preview_map_canvas_" + key).is('div')) {


          var key2 = key.replace('_', '-');
          var trafficInfo = {};
          var traffictoggleState = [];    traffictoggleState[key] = true;
          var bicycleInfo = {};
          var bicycletoggleState = [];    bicycletoggleState[key] = true;
          var transitInfo = {};
          var transittoggleState = [];    transittoggleState[key] = true;
          var lat = parseFloat(settings.lat);
          var lng = parseFloat(settings.lng);
          var selzoom = parseInt(settings.zoom);
          var controltype = settings.controltype;
          var pancontrol = settings.pancontrol;
          var scale = settings.scale;
          var overview = settings.overview;
          var overview_opened = settings.overview_opened;
          var streetview_show = settings.streetview_show;
          var scrollw = settings.scrollwheel;
          var drag = settings.draggable;
          var unitsys = settings.unitsystem;
          var maptype = (settings.maptype ? settings.maptype : '');
          var baselayers = (settings.baselayers ? settings.baselayers : '');
          var map_backgroundcolor = settings.map_backgroundcolor;
          //var fromlatlon = (settings.fromlatlon ? settings.fromlatlon : '');
          //var tolatlon = (settings.tolatlon ? settings.tolatlon : '');
          var useOpenStreetMap = false;
          var scheme = 'http';
          if (settings.use_https) {
            scheme = 'https';
          }
          var nokeyboard = (settings.nokeyboard ? true : false);
          var nodoubleclickzoom = (settings.nodoubleclickzoom ? true : false);

          // menu type
          var mtc = settings.mtc;
          if (mtc == 'standard') { mtc = google.maps.MapTypeControlStyle.HORIZONTAL_BAR; }
          else if (mtc == 'menu' ) { mtc = google.maps.MapTypeControlStyle.DROPDOWN_MENU; }
          else { mtc = false; }
          // nav control type
          if (controltype == 'default') { controltype = google.maps.ZoomControlStyle.DEFAULT; }
          else if (controltype == 'small') { controltype = google.maps.ZoomControlStyle.SMALL; }
          else if (controltype == 'large') { controltype = google.maps.ZoomControlStyle.LARGE; }
          else { controltype = false; }
          // map type
          var maptypes = [];
          if (maptype) {
            if (maptype == 'Map' && baselayers.Map) { maptype = google.maps.MapTypeId.ROADMAP; }
            if (maptype == 'Satellite' && baselayers.Satellite) { maptype = google.maps.MapTypeId.SATELLITE; }
            if (maptype == 'Hybrid' && baselayers.Hybrid) { maptype = google.maps.MapTypeId.HYBRID; }
            if (maptype == 'Physical' && baselayers.Physical) { maptype = google.maps.MapTypeId.TERRAIN; }
            if (baselayers.Map) { maptypes.push(google.maps.MapTypeId.ROADMAP); }
            if (baselayers.Satellite) { maptypes.push(google.maps.MapTypeId.SATELLITE); }
            if (baselayers.Hybrid) { maptypes.push(google.maps.MapTypeId.HYBRID); }
            if (baselayers.Physical) { maptypes.push(google.maps.MapTypeId.TERRAIN); }
            if (baselayers.OpenStreetMap) {
              maptypes.push("OSM");
              var copyrightNode = document.createElement('div');
              copyrightNode.id = 'copyright-control';
              copyrightNode.style.fontSize = '11px';
              copyrightNode.style.fontFamily = 'Arial, sans-serif';
              copyrightNode.style.margin = '0 2px 2px 0';
              copyrightNode.style.whiteSpace = 'nowrap';
              useOpenStreetMap = true;
            }
          }
          else {
            maptype = google.maps.MapTypeId.ROADMAP;
            maptypes.push(google.maps.MapTypeId.ROADMAP);
            maptypes.push(google.maps.MapTypeId.SATELLITE);
            maptypes.push(google.maps.MapTypeId.HYBRID);
            maptypes.push(google.maps.MapTypeId.TERRAIN);
          }

          var mapOpts = {
            zoom: selzoom,
            center: new google.maps.LatLng(lat, lng),
            mapTypeControl: (mtc ? true : false),
            mapTypeControlOptions: {style: mtc,  mapTypeIds: maptypes},
            zoomControl: (controltype ? true : false),
            zoomControlOptions: {style: controltype},
            panControl: (pancontrol ? true : false),
            mapTypeId: maptype,
            scrollwheel: (scrollw ? true : false),
            draggable: (drag ? true : false),
            overviewMapControl: (overview ? true : false),
            overviewMapControlOptions: {opened: (overview_opened ? true : false)},
            streetViewControl: (streetview_show ? true : false),
            scaleControl: (scale ? true : false),
            scaleControlOptions: {style: google.maps.ScaleControlStyle.DEFAULT},
            keyboardShortcuts: (nokeyboard ? false : true),
            disableDoubleClickZoom: nodoubleclickzoom
          };
          if (map_backgroundcolor) {
            mapOpts.backgroundColor = map_backgroundcolor;
          }

          Drupal.getdirections_preview_map[key] = new google.maps.Map(document.getElementById("getdirections_preview_map_canvas_" + key), mapOpts);

          // OpenStreetMap
          if (useOpenStreetMap) {
            var tle = Drupal.t("OpenStreetMap");
            if (settings.mtc == 'menu') {
              tle = Drupal.t("OSM map");
            }
            Drupal.getdirections_preview_map[key].mapTypes.set("OSM", new google.maps.ImageMapType({
              getTileUrl: function(coord, zoom) {
                return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
              },
              tileSize: new google.maps.Size(256, 256),
              name: tle,
              maxZoom: 18
            }));
            google.maps.event.addListener(Drupal.getdirections_preview_map[key], 'maptypeid_changed', updateCopyrights);
            Drupal.getdirections_preview_map[key].controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(copyrightNode);
          }

          // TrafficLayer
          if (settings.trafficinfo) {
            trafficInfo[key] = new google.maps.TrafficLayer();
            if (settings.trafficinfo_state > 0) {
              trafficInfo[key].setMap(Drupal.getdirections_preview_map[key]);
              traffictoggleState[key] = true;
            }
            else {
              trafficInfo[key].setMap(null);
              traffictoggleState[key] = false;
            }
            $("#getdirections_toggleTraffic_" + key).click( function() {
              if (traffictoggleState[key]) {
                trafficInfo[key].setMap();
                traffictoggleState[key] = false;
                label = Drupal.t('Traffic Info On');
              }
              else {
                trafficInfo[key].setMap(Drupal.getdirections_preview_map[key]);
                traffictoggleState[key] = true;
                label = Drupal.t('Traffic Info Off');
              }
              $(this).val(label);
            });
          }
          // BicyclingLayer
          if (settings.bicycleinfo) {
            bicycleInfo[key] = new google.maps.BicyclingLayer();
            if (settings.bicycleinfo_state > 0) {
              bicycleInfo[key].setMap(Drupal.getdirections_preview_map[key]);
              bicycletoggleState[key] = true;
            }
            else {
              bicycleInfo[key].setMap(null);
              bicycletoggleState[key] = false;
            }
            $("#getdirections_toggleBicycle_" + key).click( function() {
              if (bicycletoggleState[key]) {
                bicycleInfo[key].setMap();
                bicycletoggleState[key] = false;
                label = Drupal.t('Bicycle Info On');
              }
              else {
                bicycleInfo[key].setMap(Drupal.getdirections_preview_map[key]);
                bicycletoggleState[key] = true;
                label = Drupal.t('Bicycle Info Off');
              }
              $(this).val(label);
            });
          }
          // TransitLayer
          if (settings.transitinfo) {
            transitInfo[key] = new google.maps.TransitLayer();
            if (settings.transitinfo_state > 0) {
              transitInfo[key].setMap(Drupal.getdirections_preview_map[key]);
              transittoggleState[key] = true;
            }
            else {
              transitInfo[key].setMap(null);
              transittoggleState[key] = false;
            }
            $("#getdirections_toggleTransit_" + key).click( function() {
              if (transittoggleState[key]) {
                transitInfo[key].setMap();
                transittoggleState[key] = false;
                label = Drupal.t('Transit Info On');
              }
              else {
                transitInfo[key].setMap(Drupal.getdirections_preview_map[key]);
                transittoggleState[key] = true;
                label = Drupal.t('Transit Info Off');
              }
              $(this).val(label);
            });
          }

          // an event handler on map zoom
          google.maps.event.addListener(Drupal.getdirections_preview_map[key], 'zoom_changed', function() {
            $("#edit-getdirections-default-zoom").val(Drupal.getdirections_preview_map[key].getZoom());
          });

          // an event handler on center changed
          google.maps.event.addListener(Drupal.getdirections_preview_map[key], 'center_changed', function() {
            var ll = Drupal.getdirections_preview_map[key].getCenter();
            $("#edit-getdirections-default-latlong").val(ll.lat() + ',' + ll.lng());
          });

          // an event handler on maptypeid_changed
          google.maps.event.addListener(Drupal.getdirections_preview_map[key], 'maptypeid_changed', function() {
            maptype = Drupal.getdirections_preview_map[key].getMapTypeId();
            if (maptype == google.maps.MapTypeId.ROADMAP)        { maptype = 'Map'; }
            else if (maptype == google.maps.MapTypeId.SATELLITE) { maptype = 'Satellite'; }
            else if (maptype == google.maps.MapTypeId.HYBRID)    { maptype = 'Hybrid'; }
            else if (maptype == google.maps.MapTypeId.TERRAIN)   { maptype = 'Physical'; }
            else if (maptype == "OSM")                           { maptype = 'OpenStreetMap'; }
            $("#edit-getdirections-default-maptype").val(maptype);
          });
        }
      });
    }
  }
})(jQuery);
