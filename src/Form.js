import React, { useState, useRef } from 'react'
import { Button, Tooltip, Space, Typography, Tabs } from 'antd'
import Centered from './Centered'
import { Autocomplete } from '@react-google-maps/api'

const { Title, Text } = Typography
const { TabPane } = Tabs

const FEELS = {
  Haphap: {
    colour: '#D5E8D4',
    emoji: '😄',
    title: 'Good',
    tooltip: 'haphap',
  },
  Meh: {
    colour: '#FFF2CC',
    emoji: '😐',
    title: 'Okay',
    tooltip: 'meh',
  },
  SmolDepresso: {
    colour: '#F8CECC',
    emoji: '😩',
    title: 'Not so good',
    tooltip: 'smol depresso',
  },
}

const EmojiButton = ({ feel, selectedFeel, setSelectedFeel, isActive }) => {
  const { emoji, title, colour, tooltip } = feel

  return (
    <div style={{ width: '80px', height: '100px' }}>
      <Tooltip title={tooltip}>
        <div style={{ width: '70px' }}>
          <div
            style={{
              backgroundColor: colour,
              border: isActive ? '1px solid black' : 'none',
              borderRadius: isActive ? 3 : 0,
              padding: isActive ? 1 : 0,
            }}
          >
            <Button
              block
              ghost
              onClick={() =>
                selectedFeel === title ? setSelectedFeel(undefined) : setSelectedFeel(title)
              }
            >
              <div style={{ paddingTop: 1 }}>{emoji}</div>{' '}
            </Button>
          </div>
          <Text type="secondary">{title}</Text>
        </div>
      </Tooltip>
    </div>
  )
}

const LocationInput = ({ setLat, setLng }) => {
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
      <div style={{ padding: 5, minHeight: 235 }}>
        <Title level={2}>Where do you live?</Title>

        <input
          type="text"
          placeholder="Search location"
          style={{
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
          }}
        />

        {!!navigator.geolocation && (
          <>
            <Typography.Text strong style={{ margin: '5px 0', display: 'block', fontSize: 16 }}>
              OR
            </Typography.Text>

            <Button
              onClick={() => {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    console.log('navigator.geolocation.getCurrentPosition > ', position.coords)
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
              style={{ width: '90%', background: 'grey', color: 'white' }}
            >
              Use GPS
            </Button>
          </>
        )}
      </div>
    </Autocomplete>
  )
}

const Form = ({ setLat, setLng }) => {
  const [selectedFeel, setSelectedFeel] = useState()

  return (
    <div
      style={{
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        background: 'white',
        borderRadius: 10,
        textAlign: 'center',
        position: 'absolute',
        left: '50%',
        bottom: 20,
        transform: 'translate3d(-50%, 0, 0)',
        margin: '0 auto',
        maxWidth: '90vw',
        width: 500,
      }}
    >
      <Tabs
        defaultActiveKey="1"
        // onChange={(index) => console.log('Tab #' + index)}
      >
        <TabPane tab="Health check" key="0">
          <Centered>
            <Title level={2}>How are you feeling?</Title>
            <Space>
              {Object.values(FEELS).map((feel, index) => (
                <EmojiButton
                  key={`feel-emojibutton-${index}`}
                  feel={feel}
                  isActive={selectedFeel === feel.title}
                  selectedFeel={selectedFeel}
                  setSelectedFeel={setSelectedFeel}
                />
              ))}
            </Space>
          </Centered>
          {selectedFeel && (
            <Centered>
              <LocationInput setLat={setLat} setLng={setLng} />
              <Button onClick={() => setSelectedFeel(undefined)}>Cancel</Button>
              <Button>Submit</Button>
            </Centered>
          )}
        </TabPane>

        <TabPane tab="Browse regions" key="1">
          <LocationInput setLat={setLat} setLng={setLng} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Form
