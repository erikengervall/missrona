import React, { useState } from 'react'
import Centered from '../../Centered'
import EmojiButton from '../components/EmojiButton'
import { Button, Space, Typography } from 'antd'
import LocationInput from '../components/LocationInput'
import { FEELS } from '../constants'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'

const { Title, Paragraph } = Typography

const HealthCheck = ({ setLat, setLng, lat, lng }) => {
  const [selectedFeel, setSelectedFeel] = useState()
  return (
    <React.Fragment>
      <Centered>
        <Title level={2}>How are you feeling?</Title>
        <Paragraph>
          Are you experiencing any symptoms of fever, sore throat, cough, weariness, or respiratory
          distress?
        </Paragraph>
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
          <LocationInput setLat={setLat} setLng={setLng} tab={0} />
          <Space>
            <Button
              type="secondary"
              shape="round"
              icon={<CloseOutlined />}
              size={'medium'}
              onClick={() => setSelectedFeel(undefined)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<SendOutlined />}
              size={'medium'}
              disabled={!lat || !lng || !selectedFeel}
              onClick={() => {
                console.log("At this point it's definitely time to send eine kleine rekvest")
              }}
            >
              Submit
            </Button>
          </Space>
        </Centered>
      )}
    </React.Fragment>
  )
}

export default HealthCheck
