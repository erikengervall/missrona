import React, { useState } from 'react'
import { Button, Tooltip, Space, Typography } from 'antd'
import Centered from './Centered'

const { Title, Text } = Typography

const Feels = {
  Haphap: { emoji: '😄', colour: '#D5E8D4', title: 'Good', tooltip: 'haphap', value: 1 },
  Meh: { emoji: '😐', colour: '#FFF2CC', title: 'Okay', tooltip: 'meh', value: 2 },
  SmolDepresso: {
    emoji: '😩',
    colour: '#F8CECC',
    title: 'Not so good',
    tooltip: 'smol depresso',
    value: 3,
  },
}

const EmojiIcon = ({ emoji }) => <div style={{ paddingTop: 1 }}>{emoji}</div>

const EmojiButton = ({ feel, onSelect = () => {} }) => {
  const { emoji, title, colour, tooltip } = feel
  return (
    <div style={{ width: '80px', height: '100px' }}>
      <Tooltip title={tooltip}>
        <div style={{ width: '70px' }}>
          <div style={{ backgroundColor: colour }}>
            <Button
              block
              ghost
              onClick={() => {
                onSelect(feel)
              }}
            >
              <EmojiIcon emoji={emoji} />
            </Button>
          </div>
          <Text type="secondary">{title}</Text>
        </div>
      </Tooltip>
    </div>
  )
}

const PostCodeInput = () => null

function Form() {
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
        position: 'fixed',
        left: '50%',
        bottom: '20px',
        transform: 'translate(-50%, -50%)',
        margin: '0 auto',
      }}
    >
      <Title level={2}>{'How are you feeling?'}</Title>
      <Centered>
        <Space>
          <EmojiButton feel={Feels.Haphap} onSelect={setSelectedFeel} />
          <EmojiButton feel={Feels.Meh} onSelect={setSelectedFeel} />
          <EmojiButton feel={Feels.SmolDepresso} onSelect={setSelectedFeel} />
        </Space>
      </Centered>
      {selectedFeel && (
        <>
          <PostCodeInput />
          <Button>Submit</Button>
        </>
      )}
    </div>
  )
}

export default Form
