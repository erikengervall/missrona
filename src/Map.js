/* eslint-disable no-undef */
import { GoogleMap, HeatmapLayer } from '@react-google-maps/api'
import React from 'react'

const ExampleHeatmap = ({ lat, lng }) => {
  return (
    <GoogleMap
      mapContainerStyle={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'inherit',
      }}
      zoom={13}
      center={{ lat, lng }}
      options={{ disableDefaultUI: true }}
    >
      <HeatmapLayer
        data={[
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
          new google.maps.LatLng(59.32932349999999, 18.0685808),
        ]}
      />
    </GoogleMap>
  )
}

export default ExampleHeatmap
