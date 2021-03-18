import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Group, Header, Panel, SimpleCell } from '@vkontakte/vkui'

import { PANELS } from '../../constants'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'
import { getFriends } from '../../api'

const Friends = ({ id, title }) => {
  const { setActivePanel } = useContext(AppContext)
  const [friends, setFriends] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      getFriends()
        .then(resp => {
          setFriends(resp)
        }).catch(error => {
        console.error(error)
      })
    }
    fetchData()
  }, [])

  return (
    <Panel id={id}>
      <PanelHeader title={title} goBack={PANELS.home} />
      <Group>
        <Header>Друзья</Header>
        {friends && friends.map(friend => {
          let accounts = []
          if (friend.steam_id) {
            accounts.push('Steam')
          }
          return (
            <SimpleCell
              key={friend.vk_user_id}
              onClick={() => {
                setActivePanel({ name: PANELS.profile, id: friend.vk_user_id, goBack: PANELS.friends })
              }}
              description={accounts.join(', ')}
              before={<Avatar src={friend.avatar} />}
            >
              {friend.first_name} {friend.last_name}
            </SimpleCell>
          )
        })}
      </Group>
    </Panel>
  )
}

export default Friends
