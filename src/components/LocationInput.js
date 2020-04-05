import React, { useRef } from 'react'
import { Typography } from 'antd'
import { Autocomplete } from '@react-google-maps/api'

const { Title } = Typography

const styles = {
  container: (tab) => ({ padding: 5, marginBottom: tab === 0 ? 20 : 0 }),
  input: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '90%',
    height: 32,
    padding: '0 12px',
    borderRadius: 3,
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
    fontSize: 14,
    outline: 'none',
    textOverflow: 'ellipses',
    textAlign: 'center',
  },
}

const LocationInput = ({ setLat, setLng, tab }) => {
  const autocomplete = useRef(null)

  const autocompleteOnLoad = (_autocomplete) => {
    autocomplete.current = _autocomplete
  }

  const autocompleteOnPlaceChanged = () => {
    if (autocomplete.current !== null) {
      const place = autocomplete.current.getPlace()
      setLat(place.geometry.location.lat())
      setLng(place.geometry.location.lng())
      console.log('Autocomplete result:', {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      })
    } else {
      console.error('Autocomplete is not loaded yet!')
    }
  }

  return (
    <Autocomplete onLoad={autocompleteOnLoad} onPlaceChanged={autocompleteOnPlaceChanged}>
      <div style={styles.container(tab)}>
        <Title level={2}>Where do you live?</Title>
        <input type="text" placeholder="Search location" style={styles.input} />
      </div>
    </Autocomplete>
  )
}

export default LocationInput
