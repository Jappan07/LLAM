import { useEffect, useState } from 'react';
import * as Cesium from 'cesium';
import CesiumWind from "./Wind";
import axios from "axios"

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
      // data = data.slice(0, 100)
    })

  return data
}

function Tracking(props) {
  const init = (locationData) => {
    var west = 68.0;
    var south = 7.0;
    var east = 89.0;
    var north = 35.0;

    var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);

    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0.5;
    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;
    const viewer = new Cesium.Viewer("cesium", {
      scene3DOnly: true,
    });
    viewer.scene.globe.enableLighting = true;
    var points = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    {
      locationData.map(coords => {
        points.add({
          position: Cesium.Cartesian3.fromDegrees(coords.longitude, coords.latitude),
          color: Cesium.Color.SPRINGGREEN
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

    // Mouse over the globe to see the cartographic position
    // var handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // handler.setInputAction(function (movement) {
    //   var cartesian = viewer.camera.pickEllipsoid(
    //     movement.endPosition,
    //     viewer.scene.globe.ellipsoid
    //   );
    //   if (cartesian) {
    //     var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    //     var longitudeString = Cesium.Math.toDegrees(
    //       cartographic.longitude
    //     ).toFixed(2);
    //     var latitudeString = Cesium.Math.toDegrees(
    //       cartographic.latitude
    //     ).toFixed(2);

    //     entity.position = cartesian;
    //     entity.label.show = true;
    //     entity.label.text =
    //       "Lon: " +
    //       ("   " + longitudeString).slice(-7) +
    //       "\u00B0" +
    //       "\nLat: " +
    //       ("   " + latitudeString).slice(-7) +
    //       "\u00B0";
    //   } else {
    //     entity.label.show = false;
    //   }
    // })

    // var scene = widget.scene;
    // var ellipsoid = scene.globe.ellipsoid;
    // var position = Cesium.Cartesian3.fromDegrees(0.0, 0.0);
    // var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    // handler.setInputAction(function (movement) {
    //   console.log(Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position));
    // }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // for (var longitude = -1; longitude < 10; longitude++) {
    //   var color = Cesium.Color.PINK;
    //   if ((longitude % 2) === 0) {
    //     color = Cesium.Color.CYAN;
    //   }

    //   for (var latitude = -1; latitude < 10; latitude++) {
    //     points.add({
    //       position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
    //       color: color
    //     });
    //   }
    // }
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
    // setLocation(locationData)
    console.warn(locationData[0].longitude)
  }, [])
  return (
    <div id="cesium" />
  );

}

// export const getServerSideProps = async () => {
//   const locationData = await fetchData()
//   return {
//     props: {
//       location: locationData
//     }
//   }
// }

export default Tracking;