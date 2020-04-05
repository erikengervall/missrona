import { GoogleMap, Circle, Marker } from '@react-google-maps/api'
import React, { useState, useEffect, useCallback, useRef } from 'react'
import throttle from 'lodash.throttle'

import { FEELS } from './constants'
import getFeelData from './api/getFeelinData'
import getFeelinDataByBox from './api/getFeelinDataByBox'

const styles = {
  mapContainerStyle: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'inherit',
  },
  circleOptions: (status) => ({
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
    fillColor: (status === 1 ? FEELS.Haphap : status === 2 ? FEELS.Meh : FEELS.SmolDepresso)
      .backgroundColor,
  }),
}

const ExampleHeatmap = ({ lat, lng }) => {
  const [aggregatedNearbyFeels, setAggregatedNearbyFeels] = useState()
  const [boxData, setBoxData] = useState([])
  const [bounds, setBounds] = useState()
  const map = useRef()

  useEffect(() => {
    if (bounds) {
      const { south, east, north, west } = bounds.toJSON()

      const requestObj = { south, east, north, west }

      getFeelinDataByBox(requestObj).then((response) => {
        setBoxData(response)
      })
    }
  }, [bounds])

  useEffect(() => {
    const getAggregatedNearbyFeels = async () => {
      const response = await getFeelData({ lat, lng })
      const derivedColor = () => {
        const { average } = response.data
        if (average < 1) return FEELS.Haphap.backgroundColor
        if (average < 2) return FEELS.Meh.backgroundColor
        return FEELS.SmolDepresso.backgroundColor
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
            if (!newBounds.equals(bounds)) {
              setBounds(newBounds)
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

  useEffect(() => {
    if (map.current) {
      map.current.panTo({ lat, lng })
    }
  }, [lat, lng])

  return (
    <GoogleMap
      onLoad={handleLoad}
      mapContainerStyle={styles.mapContainerStyle}
      zoom={13}
      options={{ disableDefaultUI: true }}
      onBoundsChanged={handleBoundsChanged}
    >
      <Marker position={{ lat, lng }} />
      {!!aggregatedNearbyFeels && (
        <Circle center={{ lat, lng }} options={styles.circleOptions(aggregatedNearbyFeels)} />
      )}
      {boxData.map(({ lat, lng, status }) => (
        <Circle center={{ lat, lng }} options={styles.circleOptions(status)} />
      ))}
    </GoogleMap>
  )
}

export default ExampleHeatmap
