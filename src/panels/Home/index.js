import React from 'react'
import { Panel, Group, Cell, Avatar } from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'

const Home = ({ id, user, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      {user && (
        <Group>
          <Cell
            before={user.photo_200 ? <Avatar src={user.photo_200} size={72} /> : null}
            description={user.city && user.city.title ? user.city.title : ''}
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
        </Group>
      )}
    </Panel>
  )
}

export default Home
