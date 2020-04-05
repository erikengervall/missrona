import { DownCircleFilled, UpCircleFilled } from '@ant-design/icons'
import { Tabs } from 'antd'
import React, { useState } from 'react'

import { TABS } from './constants'
import BrowseRegions from './tabs/BrowseRegions'
import HealthCheck from './tabs/HealthCheck'

const { TabPane } = Tabs

const styles = {
  container: {
    padding: 5,
    paddingLeft: 15,
    paddingRight: 15,
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
  },
  hideShowForm: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate3d(10%, -10%, 0)',
    zIndex: 9,
  },
}

const Form = (props) => {
  const [activeKey, setActiveKey] = useState('0')
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div style={styles.container}>
      <div style={styles.hideShowForm}>
        {isHidden ? (
          <UpCircleFilled onClick={() => setIsHidden(false)} style={{ fontSize: 25 }} />
        ) : (
          <DownCircleFilled onClick={() => setIsHidden(true)} style={{ fontSize: 25 }} />
        )}
      </div>
      <Tabs
        defaultActiveKey={TABS.HEALTH_CHECK}
        onChange={(key) => setActiveKey(key)}
        activeKey={activeKey}
        style={{ height: isHidden ? 15 : 'inherit' }}
      >
        <TabPane tab="Health check" key={TABS.HEALTH_CHECK} style={{ minHeight: 235 }}>
          <HealthCheck {...props} setActiveKey={setActiveKey} />
        </TabPane>

        <TabPane tab="Browse regions" key={TABS.BROWSE_REGIONS} style={{ minHeight: 235 }}>
          <BrowseRegions {...props} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Form
