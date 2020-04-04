/* eslint-disable no-undef */
import {
  GoogleMap,
  // HeatmapLayer,
  LoadScript,
} from "@react-google-maps/api"
import React from "react"

const center = {
  lat: 37.774546,
  lng: -122.433523,
}

const onClick = (...args) => {
  console.log("onClick args: ", args)
}

const ExampleHeatmap = () => (
  <div id="map">
    <LoadScript
      id="script-loader"
      googleMapsApiKey={"AIzaSyB70fmdxTT6eYDICyXwGr7rZDy-0DZJSQY"} // https://console.cloud.google.com/apis/credentials
    >
      <GoogleMap
        mapContainerStyle={{
          position: "static",
          overflow: "inherit",
          height: "inherit",
          width: "inherit",
        }}
        zoom={13}
        center={center}
        onClick={onClick}
      >
        {/* <HeatmapLayer
          data={[
            new google.maps.LatLng(37.782, -122.447),
            new google.maps.LatLng(37.782, -122.445),
            new google.maps.LatLng(37.782, -122.443),
            new google.maps.LatLng(37.782, -122.441),
            new google.maps.LatLng(37.782, -122.439),
            new google.maps.LatLng(37.782, -122.437),
            new google.maps.LatLng(37.782, -122.435),
            new google.maps.LatLng(37.785, -122.447),
            new google.maps.LatLng(37.785, -122.445),
            new google.maps.LatLng(37.785, -122.443),
            new google.maps.LatLng(37.785, -122.441),
            new google.maps.LatLng(37.785, -122.439),
            new google.maps.LatLng(37.785, -122.437),
            new google.maps.LatLng(37.785, -122.435),
          ]}
        /> */}
      </GoogleMap>
    </LoadScript>
  </div>
)

export default ExampleHeatmap
