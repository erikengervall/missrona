import { Button, Space, Typography } from 'antd'
import { CloseOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useState, useCallback } from 'react'

import { FEELS, TABS } from '../constants'
import Centered from '../components/Centered'
import EmojiButton from '../components/EmojiButton'
import LocationInput from '../components/LocationInput'
import submitHealthCheck from '../api/submitHealthCheck'

const { Title, Paragraph } = Typography

const HealthCheck = ({ setLat, setLng, lat, lng, setActiveKey }) => {
  const [selectedFeel, setSelectedFeel] = useState()
  const [showThankYou, setShowThankYou] = useState(false)

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
      .finally(() => {
        setSelectedFeel(undefined)
        setShowThankYou(true)
      })
  }, [selectedFeel, lat, lng])

  return (
    <>
      {showThankYou ? (
        <Centered>
          <Title level={2}>Thank you!</Title>
          <Paragraph>
            If your symptoms change in any way, you can always update your health status.
          </Paragraph>

          {/* <Space> */}
          <Button
            type="secondary"
            shape="round"
            icon={<SmileOutlined />}
            size={'medium'}
            onClick={() => setShowThankYou(false)}
            style={{ marginRight: 10, marginBottom: 10 }}
          >
            Back to submission screen
          </Button>
          <Button
            type="primary"
            shape="round"
            icon={<SendOutlined />}
            size={'medium'}
            onClick={() => setActiveKey(TABS.BROWSE_REGIONS)}
          >
            Browse regions
          </Button>
          {/* </Space> */}
        </Centered>
      ) : (
        <>
          <Centered>
            <Title level={2}>How are you feeling?</Title>
            <Paragraph>
              Are you experiencing any symptoms of fever, sore throat, cough, weariness, or
              respiratory distress?
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
            <Centered style={{ marginBottom: 30 }}>
              <LocationInput setLat={setLat} setLng={setLng} tab={TABS.HEALTH_CHECK} />

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
        </>
      )}
    </>
  )
}

export default HealthCheck
