import React from 'react'
import { Panel } from '@vkontakte/vkui'

import { PANELS } from '../../constants'

import PanelHeader from '../../common/PanelHeader'

const Friends = ({ id, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader title={title} goBack={PANELS.profile} />
      <h1>Friends</h1>
    </Panel>
  )
}

export default Friends
