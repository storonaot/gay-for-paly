import React from 'react'
import { Panel, PanelHeader, Group, Cell, Header, Avatar } from '@vkontakte/vkui'

const Profile = ({ id, user, title }) => {
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

export default Profile
