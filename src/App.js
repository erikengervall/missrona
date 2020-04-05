import 'antd/dist/antd.css'
import './App.css'
import Form from './Form'
import Map from './Map'
import React, { useState } from 'react'
import { Layout } from 'antd'
import { LoadScript } from '@react-google-maps/api'

const { Content } = Layout

const App = () => {
  const [lat, setLat] = useState(59.334591) // Default to Stockholm
  const [lng, setLng] = useState(18.06324) // Default to Stockholm

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey={'AIzaSyB70fmdxTT6eYDICyXwGr7rZDy-0DZJSQY'} // https://console.cloud.google.com/apis/credentials
      libraries={['places', 'visualization']}
    >
      <Content style={{ width: '100vw', height: '100vh' }}>
        <Map lat={lat} lng={lng} />
        <Form setLat={setLat} setLng={setLng} lat={lat} lng={lng} />
      </Content>
    </LoadScript>
  )
}

export default App
