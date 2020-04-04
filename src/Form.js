import React, { useState } from 'react'
import { Button, Tooltip, Space, Typography } from 'antd'

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
    <div style={{ width: '80px' }}>
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
          <Text>{title}</Text>
        </div>
      </Tooltip>
    </div>
  )
}

// const

function Form() {
  const [selectedFeel, setSelectedFeel] = useState()
  return (
    <div>
      <Title>{'How are you feeling?'}</Title>
      <Space>
        <EmojiButton feel={Feels.Haphap} onSelect={setSelectedFeel} />
        <EmojiButton feel={Feels.Meh} onSelect={setSelectedFeel} />
        <EmojiButton feel={Feels.SmolDepresso} onSelect={setSelectedFeel} />
      </Space>
    </div>
  )
}

export default Form
