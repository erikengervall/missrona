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
}

const Form = (props) => {
  const [activeKey, setActiveKey] = useState('0')

  return (
    <div style={styles.container}>
      <Tabs
        defaultActiveKey={TABS.HEALTH_CHECK}
        onChange={(key) => setActiveKey(key)}
        activeKey={activeKey}
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
