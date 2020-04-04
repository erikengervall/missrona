import 'antd/dist/antd.css'
import './App.css'
import Form from './Form'
import Map from './Map'
import React from 'react'
import { Layout, Space } from 'antd'

const { Footer, Content } = Layout

function App() {
  return (
    <Layout>
      <Content>
        <Space direction={'vertical'}>
          <Map />
          <Form />
        </Space>
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>{'Missrona ©2020'}</Footer> */}
    </Layout>
  )
}

export default App
