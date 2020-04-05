import React from 'react'
import { Tabs } from 'antd'
import HealthCheck from './tabs/HealthCheck'
import BrowseRegions from './tabs/BrowseRegions'

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
  return (
    <div style={styles.container}>
      <Tabs defaultActiveKey="0">
        <TabPane tab="Health check" key="0" style={{ minHeight: 235 }}>
          <HealthCheck {...props} />
        </TabPane>

        <TabPane tab="Browse regions" key="1" style={{ minHeight: 235 }}>
          <BrowseRegions {...props} />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Form
