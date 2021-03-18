import React from 'react'
import { Panel } from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'
import { PANELS } from '../../constants'

import PlatformDetails from '../../common/PlatformDetails'

const BattleNet = ({ id, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader goBack={PANELS.home} title={title} />
      <PlatformDetails />
    </Panel>
  )
}

export default BattleNet
