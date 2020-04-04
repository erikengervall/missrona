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

const ExampleHeatmap = () => {
  const [zipCode, setZipCode] = useState()
  const [lat, setLat] = useState(59.334591) // Default to Stockholm
  const [lng, setLng] = useState(18.06324) // Default to Stockholm
  const [isLocationSetterHidden, setIsLocationSetterHidden] = useState(false)
  const autocomplete = useRef(null)

  const autocompleteOnLoad = (_autocomplete) => {
    autocomplete.current = _autocomplete
  }

  const autocompleteOnPlaceChanged = () => {
    if (autocomplete.current !== null) {
      const place = autocomplete.current.getPlace()
      setLat(place.geometry.location.lat())
      setLng(place.geometry.location.lng())
      setIsLocationSetterHidden(true)
      console.log('New place:', autocomplete.current.getPlace())
    } else {
      console.error('Autocomplete is not loaded yet!')
    }
  }

  if (navigator.geolocation) {
    console.log('Geolocation is supported!')
  }

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
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
          options={{ disableDefaultUI: true }}
        >
          {isLocationSetterHidden && (
            <Autocomplete onLoad={autocompleteOnLoad} onPlaceChanged={autocompleteOnPlaceChanged}>
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  background: 'rgba(90, 90, 90, 0.80)',
                  width: '100%',
                  height: '100%',
                  zIndex: 0,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '35%',
                    transform: 'translate3d(-50%, -50%, 0)',
                    padding: 5,
                    textAlign: 'center',
                    width: '90%',
                  }}
                >
                  <Typography.Paragraph
                    style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
                  >
                    BROWSE REGION
                  </Typography.Paragraph>

                  <Button
                    onClick={() => {
                      navigator.geolocation.getCurrentPosition(
                        (position) => {
                          setLat(position.coords.latitude)
                          setLng(position.coords.longitude)
                        },
                        (error) => {
                          console.error(
                            'Something went wrong when requesting GPS location with error:',
                            error
                          )
                          alert('Something went wrong when requesting GPS location')
                        }
                      )
                    }}
                    style={{ width: 200 }}
                  >
                    Use GPS
                  </Button>

                  <Typography.Text
                    strong
                    style={{ margin: '5px 0', color: 'white', display: 'block', fontSize: 16 }}
                  >
                    OR
                  </Typography.Text>

                  <input
                    type="text"
                    placeholder="Search location"
                    style={{
                      boxSizing: 'border-box',
                      border: '1px solid transparent',
                      width: 200,
                      height: 32,
                      padding: '0 12px',
                      borderRadius: 3,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      fontSize: 14,
                      outline: 'none',
                      textOverflow: 'ellipses',
                      textAlign: 'center',
                    }}
                  />
                </div>
              </div>
            </Autocomplete>
          )}
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
}

export default ExampleHeatmap
