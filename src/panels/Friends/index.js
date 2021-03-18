import React , {useContext} from 'react'
import { Avatar, Group, Header, Panel, SimpleCell } from '@vkontakte/vkui'

import { PANELS } from '../../constants'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'

const Friends = ({ id, title }) => {
  const { setActivePanel } = useContext(AppContext)
  let friends = [
    {
      id: 1,
      first_name: 'Женя',
      last_name: 'Соколов',
      avatar: 'https://yt3.ggpht.com/a/AATXAJwjNes0pvUyXrwN2QvtNvpu0m0Z0HJ1bAC5Ng=s900-c-k-c0xffffffff-no-rj-mo',
      accounts: ['Steam', 'Battle.net'],
    },
    {
      id: 2,
      first_name: 'Маша',
      last_name: 'Соловьева',
      avatar: 'https://yt3.ggpht.com/a/AATXAJwjNes0pvUyXrwN2QvtNvpu0m0Z0HJ1bAC5Ng=s900-c-k-c0xffffffff-no-rj-mo',
      accounts: ['Steam'],
    },
    {
      id: 3,
      first_name: 'Геннадий',
      last_name: 'Шпак',
      avatar: 'https://yt3.ggpht.com/a/AATXAJwjNes0pvUyXrwN2QvtNvpu0m0Z0HJ1bAC5Ng=s900-c-k-c0xffffffff-no-rj-mo',
      accounts: ['Battle.net'],
    },
  ]

  return (
    <Panel id={id}>
      <PanelHeader title={title} />
      <Group>
        <Header>Друзья</Header>
        {
          friends.map(friend => {
            return (
              <SimpleCell key={friend.id}
                          onClick={() => {
                            setActivePanel({ name: PANELS.profile, id: friend.id })
                          }}
                          description={friend.accounts.join(', ')}
                          before={<Avatar src={friend.avatar} />}>
                {friend.first_name} {friend.last_name}
              </SimpleCell>
            )
          })
        }
      </Group>
    </Panel>
  )
}

export default Friends
