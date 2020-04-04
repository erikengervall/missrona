/* eslint-disable no-undef */
import {
  GoogleMap,
  // HeatmapLayer,
  LoadScript,
  Autocomplete,
} from '@react-google-maps/api'
import { Button, Input, Typography } from 'antd'
import React, { useState, useRef } from 'react'

const { Search } = Input

const geoError = (error) => alert('Something went wrong when requesting GPS location')

const ExampleHeatmap = () => {
  const [zipCode, setZipCode] = useState()
  const [lat, setLat] = useState(59.334591) // Default to Stockholm
  const [lng, setLng] = useState(18.06324) // Default to Stockholm
  const autocomplete = useRef(null)

  const onLoad = (_autocomplete) => {
    console.log('autocomplete: ', _autocomplete)
    autocomplete.current = _autocomplete
  }

  const onPlaceChanged = () => {
    if (autocomplete.current !== null) {
      const place = autocomplete.current.getPlace()
      setLat(place.geometry.location.lat())
      setLng(place.geometry.location.lng())
      console.log('New place:', autocomplete.current.getPlace())
    } else {
      console.error('Autocomplete is not loaded yet!')
    }
  }

  const geoSuccess = (position) => {
    setLat(position.coords.latitude)
    setLng(position.coords.longitude)
  }

  if (navigator.geolocation) {
    console.log('Geolocation is supported!')
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '70vh',
        width: '100vw',
      }}
    >
      <LoadScript
        id="script-loader"
        googleMapsApiKey={'AIzaSyB70fmdxTT6eYDICyXwGr7rZDy-0DZJSQY'} // https://console.cloud.google.com/apis/credentials
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={{
            position: 'static',
            overflow: 'inherit',
            height: 'inherit',
            width: 'inherit',
          }}
          zoom={13}
          center={{ lat, lng }}
        >
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            {/* <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'rgba(0, 0, 0, 0.75)',
                width: '100%',
                height: '100%',
                zIndex: 0,
              }}
            > */}
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '0',
                transform: 'translate3d(-50%, 0, 0)',
                padding: 15,
                background: 'rgba(0, 0, 0, 0.25)',
              }}
            >
              <Button
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(geoSuccess, geoError)
                }}
              >
                Use GPS
              </Button>
              <Typography.Text strong style={{ marginLeft: 10, marginRight: 10, color: 'white' }}>
                or
              </Typography.Text>
              {/* <Search
                  placeholder="Search location"
                  onSearch={(value) => {
                    console.log(value)
                  }}
                  enterButton
                /> */}
              <input
                type="text"
                placeholder="Search location"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `32px`,
                  padding: `0 12px`,
                  borderRadius: `3px`,
                  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-120px',
                }}
              />
            </div>
            {/* </div> */}
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
          </Autocomplete>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
export default ExampleHeatmap
