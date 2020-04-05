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
    transform: `scale(${isActive ? 1.1 : 1})`,
  }),
  emojiContainer: { paddingTop: 1 },
}

const EmojiButton = ({ feel, onSelect, isActive }) => {
  const { emoji, title, colour, tooltip } = feel

  const buttonContainerStyle = useMemo(() => {
    return styles.buttonContainer({ colour, isActive })
  }, [colour, isActive])

  const handleOnClick = useCallback(() => {
    onSelect(feel)
  }, [onSelect, feel])

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
