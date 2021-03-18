import React from 'react'
import { IOS, Panel, PanelHeaderButton, PanelHeader, platform } from '@vkontakte/vkui'
import { Icon24Back, Icon28ChevronBack } from '@vkontakte/icons'

import Header from '../../common/Header'
import { PANELS } from '../../constants'

const osName = platform()

const Settings = ({ id, title }) => {
  return (
    <Panel id={id}>
      <Header title={title} goPrew={PANELS.profile} />
      <h1>Settings</h1>
    </Panel>
  )
}

export default Settings
