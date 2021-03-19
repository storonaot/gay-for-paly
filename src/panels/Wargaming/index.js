import React from 'react'
import { Panel } from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'
import { PANELS } from '../../constants'

import PlatformDetails from '../../common/PlatformDetails'

const Wargaming = ({ id, title, user }) => {
  const wargamingGames = Array.isArray(user.games)
    ? user.games.filter(game => game.platform === 'wargaming')
    : []

  return (
    <Panel id={id}>
      <PanelHeader goBack={PANELS.home} title={title} />
      <PlatformDetails list={wargamingGames} />
    </Panel>
  )
}

export default Wargaming
