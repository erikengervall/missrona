import React, { useMemo, useCallback } from 'react'
import { Button, Tooltip, Typography } from 'antd'

const { Text } = Typography

const styles = {
  container: {
    width: 80,
    height: 80,
  },
  innerContainer: {
    width: 70,
  },
  buttonContainer: ({ colour, isActive }) => ({
    backgroundColor: colour,
    borderRadius: 3,
    padding: isActive ? 1 : 0,
  }),
  emojiContainer: { paddingTop: 1 },
}

const EmojiButton = ({ feel, selectedFeel, setSelectedFeel, isActive }) => {
  const { emoji, title, colour, tooltip } = feel

  const buttonContainerStyle = useMemo(() => styles.buttonContainer({ colour, isActive }), [
    colour,
    isActive,
  ])

  const handleOnClick = useCallback(() => {
    selectedFeel === title ? setSelectedFeel(undefined) : setSelectedFeel(title)
  }, [selectedFeel, title, setSelectedFeel])

  return (
    <div style={styles.container}>
      <Tooltip title={tooltip}>
        <div style={styles.innerContainer}>
          <div style={buttonContainerStyle}>
            <Button block ghost onClick={handleOnClick}>
              <div style={styles.emojiContainer}>{emoji}</div>
            </Button>
          </div>
          <Text type="secondary">{title}</Text>
        </div>
      </Tooltip>
    </div>
  )
}

export default EmojiButton