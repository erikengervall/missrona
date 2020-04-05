import React, { useCallback } from 'react'
import LocationInput from '../components/LocationInput'
import { Button, Space } from 'antd'
import { SearchOutlined, CompassOutlined } from '@ant-design/icons'

const styles = {
  spacing: { marginTop: 20 },
}

const BrowseRegions = ({ setLat, setLng }) => {
  const handleUseGPS = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('navigator.geolocation.getCurrentPosition > ', position.coords)
        setLat(position.coords.latitude)
        setLng(position.coords.longitude)
      },
      (error) => {
        console.error('Something went wrong when requesting GPS location with error:', error)
        alert('Something went wrong when requesting GPS location')
      }
    )
  }, [setLat, setLng])

  return (
    <React.Fragment>
      <LocationInput setLat={setLat} setLng={setLng} tab={1} />
      <Space middle style={styles.spacing}>
        {!!navigator.geolocation && (
          <Button
            type="secondary"
            shape="round"
            icon={<CompassOutlined />}
            size={'medium'}
            onClick={handleUseGPS}
          >
            Use GPS
          </Button>
        )}
        <Button type="primary" shape="round" icon={<SearchOutlined />} size={'medium'}>
          Search
        </Button>
      </Space>
    </React.Fragment>
  )
}

export default BrowseRegions
