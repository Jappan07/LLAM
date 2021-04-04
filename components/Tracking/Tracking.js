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
    const viewer = new Cesium.Viewer("cesium");
    var points = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    {
      locationData.map(coords => {
        points.add({
          position: Cesium.Cartesian3.fromDegrees(coords.longitude, coords.latitude),
          color: Cesium.Color.RED
        });
      })
    }
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