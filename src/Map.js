import { GoogleMap, Circle } from '@react-google-maps/api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import getFeelData from './api/getFeelinData'
import getFeelinDataByBox from './api/getFeelinDataByBox'
import throttle from 'lodash.throttle'

const styles = {
  mapContainerStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'inherit',
  },
  circleOptions: (aggregatedNearbyFeels) => ({
    strokeColor: '#9e9e9e',
    strokeOpacity: 0.7,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.25,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 500,
    zIndex: 1,
    fillColor: aggregatedNearbyFeels,
  }),
}

const ExampleHeatmap = ({ lat, lng }) => {
  const [aggregatedNearbyFeels, setAggregatedNearbyFeels] = useState()
  const [boxData, setBoxData] = useState()
  const bounds = useRef()
  const map = useRef()

  useEffect(() => {
    const getAggregatedNearbyFeels = async () => {
      const response = await getFeelData({ lat, lng })
      const derivedColor = () => {
        const { average } = response.data
        if (average < 1) return '#00ff00'
        if (average < 2) return '#ffff00'
        return '#ff0000'
      }
      setAggregatedNearbyFeels(derivedColor())
    }
    getAggregatedNearbyFeels()
  }, [lat, lng, setAggregatedNearbyFeels])

  const handleBoundsChanged = useCallback(
    throttle(
      () => {
        if (map.current) {
          const newBounds = map.current.getBounds()
          if (newBounds && newBounds.equals) {
            if (!newBounds.equals(bounds.current)) {
              bounds.current = newBounds
              const { south, east, north, west } = bounds.current.toJSON()

              const requestObj = { south, east, north, west }

              getFeelinDataByBox(requestObj).then((response) => {
                setBoxData(response)
              })
            }
          }
        } else {
          console.log('very undefined')
        }
      },
      2000,
      { leading: false, trailing: true }
    ),
    [bounds]
  )

  const handleLoad = useCallback((ref) => {
    map.current = ref

    // initial location
    map.current.panTo({ lat, lng })
  }, [])

  return (
    <GoogleMap
      onLoad={handleLoad}
      mapContainerStyle={styles.mapContainerStyle}
      zoom={13}
      options={{ disableDefaultUI: true }}
      onBoundsChanged={handleBoundsChanged}
    >
      {!!aggregatedNearbyFeels && (
        <Circle center={{ lat, lng }} options={styles.circleOptions(aggregatedNearbyFeels)} />
      )}
    </GoogleMap>
  )
}

export default ExampleHeatmap
