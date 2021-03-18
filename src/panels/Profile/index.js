import React from 'react'
import { Panel, Group, Cell, Header, Avatar } from '@vkontakte/vkui'

import PanelHeader from '../../common/PanelHeader'

const Profile = ({ id, user, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      {user && (
        <Group>
          <Cell before={user.avatar ? <Avatar src={user.avatar} size={72} /> : null}>
            {`${user.first_name} ${user.last_name}`}
          </Cell>
        </Group>
      )}
    </Panel>
  )
}

export default Profile
