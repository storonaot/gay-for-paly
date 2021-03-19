import React from 'react'
import { Panel } from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'
import { PANELS } from '../../constants'

import PlatformDetails from '../../common/PlatformDetails'

const Steam = ({ id, title, user }) => {
  const steamGames = Array.isArray(user.games)
    ? user.games.filter(game => game.platform === 'steam')
    : []

  return (
    <Panel id={id}>
      <PanelHeader goBack={PANELS.home} title={title} />
      <PlatformDetails list={steamGames} />
    </Panel>
  )
}

export default Steam
