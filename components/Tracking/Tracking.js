import { useEffect, useState, useRef } from 'react';
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

const usePrevious = (value) => {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  console.log(value)
  const ref = useRef();
  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}


const Tracking = () => {

  const [predictedData, setPredictedData] = useState(null)
  const [displayMessage, setDisplayMessage] = useState("")
  const [longitude, setLongitude] = useState("")
  const [latitude, setLatitude] = useState("")
  const [loading, setLoading] = useState(false)

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
      selectedImageryProviderViewModel: imagery[1],
      animation: false,
      timeline: false,
      // automaticallyTrackDataSourceClocks: false
    });

    // viewer.imageryLayers.addImageryProvider(provider);
    // enabling lighting effects due to sun

    // adding sentinel 2a, meteo 10 and spot 6 satellite realtime visualization
    viewer.dataSources.removeAll();
    var dataSrc = Cesium.CzmlDataSource.load("sat.czml");
    viewer.dataSources.add(dataSrc);


    // var editHandler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
    // editHandler.setInputAction(function (e) {
    //   var shapeEditMenu = document.getElementById("toolbar");
    //   shapeEditMenu.textContent = 'Testing';
    //   shapeEditMenu.style.display = "block";
    //   shapeEditMenu.style.left = e.position.x + 'px';
    //   shapeEditMenu.style.top = e.position.y + 'px';
    //   shapeEditMenu.style.background = 'rgba(42, 42, 42, 0.8)';
    //   shapeEditMenu.style.border = '1px solid #888';
    // }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    // editHandler.setInputAction(function (e) {
    //   var shapeEditMenu = document.getElementById("toolbar");
    //   shapeEditMenu.style.display = "none";
    // }, Cesium.ScreenSpaceEventType.LEFT_DOWN);


    // adding predicted point
    // if (prediction) {
    //   viewer.entities.add({
    //     position: Cesium.Cartesian3.fromDegrees(parseInt(longitude), parseInt(latitude)),
    //     point: {
    //       pixelSize: 30,
    //       color: Cesium.Color.CRIMSON.withAlpha(0.4),
    //     },
    //   });
    // }

    // populating locust locations on globe
    var billboards = viewer.scene.primitives.add(new Cesium.BillboardCollection());
    {
      locationData.map(coords => {
        billboards.add({
          position: Cesium.Cartesian3.fromDegrees(coords.longitude, coords.latitude),
          image: '/Assets/Images/locust.png'
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
    // const prediction = await predictedData
    init(locationData);
  }, [])

  const prevLat = usePrevious(latitude);
  const prevLong = usePrevious(longitude);
  // const prevPredictedData = usePrevious(predictedData);

  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log("Longitude: " + longitude)
    console.log("Latitude: " + latitude)
    let lat = latitude
    let long = longitude

    if (lat === "" && long === "") {
      setPredictedData({ risk: NaN })
    }
    else if (prevLat === lat && prevLong === long) {
      console.log("lat and long matched with prev values")
    }
    else {
      let data = `lat-${lat}-long-${long}`
      setLoading(true)
      axios.post(`https://landcoverapi.azurewebsites.net/predict/${data}`)
        .then(response => {
          setLoading(false)
          setDisplayMessage("Predicted Probability = ")
          setPredictedData(response.data)
          // plotPredictedPoint(longitude, latitude)
        })
    }
  }

  const onResetHandler = (event) => {
    event.preventDefault();
    setDisplayMessage("")
    setLongitude("")
    setLatitude("")
    setLoading(false)
    setPredictedData(null)
  }

  return (
    <>
      <div id="cesium" />
      <div id="toolbar" />
      <form id="location-form">
        <h2>Predicting Probability of Attack</h2>
        <label htmlFor="longitude">longitude: </label>
        <input type="text" name="long" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        <br />
        <label htmlFor="latitude">latitude: </label>
        <input type="text" name="lat" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        <br />
        <button onClick={onFormSubmitHandler}>Predict</button>
        <button onClick={onResetHandler}>Reset</button>
        {loading ? <p>Loading...</p> : null}
        {predictedData ? <p>{displayMessage} {predictedData.risk.toFixed(2)}%</p> : null}
      </form>
    </>
  );
}

export default Tracking;