import { useEffect, useState } from 'react';
import axios from "axios"
import * as Cesium from 'cesium';
import CesiumWind from "./Wind";

// fetching locust locations
const fetchData = async () => {
  let data = []
  await axios.get("https://services5.arcgis.com/sjP4Ugu5s0dZWLjd/arcgis/rest/services/Swarms_Public/FeatureServer/0/query?where=STARTDATE%20%3E%3D%20TIMESTAMP%20%272021-01-01%2000%3A00%3A00%27%20AND%20STARTDATE%20%3C%3D%20TIMESTAMP%20%272021-04-04%2000%3A00%3A00%27&outFields=STARTDATE,LOCNAME,COUNTRYID,LOCPRESENT&outSR=4326&f=json")
    .then(response => {
      response.data.features.map(pos => {
        console.log(pos)
        data.push({
          longitude: pos.geometry.x,
          latitude: pos.geometry.y
        })
      })
    })

  return data
}

const Tracking = () => {
  const init = (locationData) => {
    // default view over India
    var west = 68.0;
    var south = 7.0;
    var east = 89.0;
    var north = 35.0;

    var indiaPosition = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 1.2;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = indiaPosition;

    var imagery = Cesium.createDefaultImageryProviderViewModels();
    // initialize viewer
    const viewer = new Cesium.Viewer("cesium", {
      scene3DOnly: false,
      selectionIndicator: true,
      imageryProviderViewModels: imagery,
      selectedImageryProviderViewModel: imagery[1]
    });
    // enabling lighting effects due to sun
    viewer.scene.globe.enableLighting = true;


    var editHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

    editHandler.setInputAction(function (e) {
      var shapeEditMenu = document.getElementById("toolbar");
      shapeEditMenu.textContent = 'Testing';
      shapeEditMenu.style.display = "block";
      shapeEditMenu.style.left = e.position.x + 'px';
      shapeEditMenu.style.top = e.position.y + 'px';
      shapeEditMenu.style.background = 'rgba(42, 42, 42, 0.8)';
      shapeEditMenu.style.border = '1px solid #888';
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    editHandler.setInputAction(function (e) {
      var shapeEditMenu = document.getElementById("toolbar");
      shapeEditMenu.style.display = "none";
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);



    // populating locust locations on globe
    var points = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    {
      locationData.map(coords => {
        points.add({
          position: Cesium.Cartesian3.fromDegrees(coords.longitude, coords.latitude),
          color: Cesium.Color.CRIMSON.withAlpha(0.5),
          pixelSize: 10,
          label: {
            text: "Label",
            show: true,
          }
        });
      })
    }

    // adding position marker
    var entity = viewer.entities.add({
      name: "location",
      label: {
        show: false,
        showBackground: true,
        font: "14px monospace",
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -9),
      },
    });

    // showing position popup on mouse move
    viewer.canvas.addEventListener('mousemove', function (e) {

      var mousePosition = new Cesium.Cartesian2(e.clientX, e.clientY);
      var ellipsoid = viewer.scene.globe.ellipsoid;
      var cartesian = viewer.camera.pickEllipsoid(mousePosition, ellipsoid);

      if (cartesian) {
        var cartographic = ellipsoid.cartesianToCartographic(cartesian);
        var longitudeString = Cesium.Math.toDegrees(cartographic.longitude).toFixed(2);
        var latitudeString = Cesium.Math.toDegrees(cartographic.latitude).toFixed(2);

        entity.position = cartesian;
        entity.label.show = true;
        entity.label.text = "Lon: " +
          ("   " + longitudeString).slice(-7) +
          "\u00B0" +
          "\nLat: " +
          ("   " + latitudeString).slice(-7) +
          "\u00B0";

      } else {
        entity.label.show = false;
      }

    }, false);

    // Visualizing wind on the globe
    const windOptions = {
      colorScale: [
        'rgb(36,104, 180)',
        'rgb(60,157, 194)',
        'rgb(128,205,193 )',
        'rgb(151,218,168 )',
        'rgb(198,231,181)',
        'rgb(238,247,217)',
        'rgb(255,238,159)',
        'rgb(252,217,125)',
        'rgb(255,182,100)',
        'rgb(252,150,75)',
        'rgb(250,112,52)',
        'rgb(245,64,32)',
        'rgb(237,45,28)',
        'rgb(220,24,32)',
        'rgb(180,0,35)',
      ],
      frameRate: 16,
      maxAge: 60,
      globalAlpha: 0.9,
      velocityScale: 1 / 30,
      paths: 2000
    };

    fetch('https://qjvic.github.io/cesium-wind/examples/wind.json')
      .then(res => res.json())
      .then(res => {
        const windLayer = new CesiumWind(res, { windOptions });
        windLayer.addTo(viewer);
      });
  }

  useEffect(async () => {
    const locationData = await fetchData()
    init(locationData);
  }, [])

  return (
    <>
      <div id="cesium" />
      <div id="toolbar" />
    </>
  );
}

export default Tracking;