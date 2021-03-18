import React from 'react'
import { Panel } from '@vkontakte/vkui'

import Header from '../../common/Header'
import { PANELS } from '../../constants'

const Friends = ({ id, title }) => {
  return (
    <Panel id={id}>
      <Header title={title} goBack={PANELS.profile} />
      <h1>Friends</h1>
    </Panel>
  )
}

export default Friends
