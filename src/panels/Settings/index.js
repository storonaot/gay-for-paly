import React from 'react'
import { Panel, Group, Cell } from '@vkontakte/vkui'

import Header from '../../common/Header'
import { PANELS } from '../../constants'

const Settings = ({ id, title }) => {
  return (
    <Panel id={id}>
      <Header title={title} />
      <Group>
        <Cell>Кто может видеть мой профиль</Cell>
      </Group>
    </Panel>
  )
}

export default Settings
