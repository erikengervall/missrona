import { GoogleMap, Circle } from '@react-google-maps/api'
import React, { useState, useEffect } from 'react'

const axios = {
  get: async () => ({
    data: {
      average: Math.random() * 3,
    },
  }),
}

const ExampleHeatmap = ({ lat, lng }) => {
  const [aggregatedNearbyFeels, setAggregatedNearbyFeels] = useState()

  useEffect(() => {
    const getAggregatedNearbyFeels = async () => {
      const response = await axios.get(lat, lng)
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

  console.log({ aggregatedNearbyFeels })

  const options = {
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
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        position: 'relative',
        height: '100%',
        width: '100%',
        overflow: 'inherit',
      }}
      zoom={13}
      center={{ lat, lng }}
      options={{ disableDefaultUI: true }}
    >
      {!!aggregatedNearbyFeels && (
        <Circle
          center={{ lat, lng }}
          options={Object.assign(options, {
            fillColor: aggregatedNearbyFeels,
          })}
        />
      )}
    </GoogleMap>
  )
}

export default ExampleHeatmap
