import { Button, Space, Typography } from 'antd'
import { CloseOutlined, SendOutlined } from '@ant-design/icons'
import React, { useState, useCallback } from 'react'

import { FEELS } from '../constants'
import Centered from '../components/Centered'
import EmojiButton from '../components/EmojiButton'
import LocationInput from '../components/LocationInput'
import submitHealthCheck from '../api/submitHealthCheck'

const { Title, Paragraph } = Typography

const HealthCheck = ({ setLat, setLng, lat, lng }) => {
  const [selectedFeel, setSelectedFeel] = useState()
  console.log('selectedFeel', selectedFeel)

  const handleCancel = useCallback(() => setSelectedFeel(undefined), [setSelectedFeel])
  const handleSubmit = useCallback(() => {
    const requestData = {
      status: selectedFeel.status,
      location: [lat, lng],
    }

    submitHealthCheck(requestData)
      .then(() => {
        console.log('successfully submitted health check!', { requestData })
      })
      .catch((e) => {
        console.error('failed to submit health check', e)
      })
  }, [selectedFeel, lat, lng])

  return (
    <React.Fragment>
      <Centered>
        <Title level={2}>How are you feeling?</Title>
        <Paragraph>
          Are you experiencing any symptoms of fever, sore throat, cough, weariness, or respiratory
          distress?
        </Paragraph>
        <Space>
          {Object.values(FEELS).map((feel) => (
            <EmojiButton
              key={`feel-emojibutton-${feel.status}`}
              feel={feel}
              isActive={selectedFeel === feel}
              onSelect={setSelectedFeel}
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
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              shape="round"
              icon={<SendOutlined />}
              size={'medium'}
              disabled={!lat || !lng || !selectedFeel}
              onClick={handleSubmit}
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
