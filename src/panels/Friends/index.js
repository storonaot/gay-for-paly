import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Group, Header, Panel, Placeholder, ScreenSpinner, SimpleCell } from '@vkontakte/vkui'

import { PANELS } from '../../constants'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'
import { getFriends } from '../../api'

const Friends = ({ id, title }) => {
  const { setActivePanel, setActivePopout } = useContext(AppContext)
  const [friends, setFriends] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      setActivePopout(<ScreenSpinner size='large' />)
      getFriends()
        .then(resp => {
          setFriends(resp || [])
        }).catch(error => {
        console.error(error)
      }).finally(() => {
        setActivePopout(null)
      })
    }
    fetchData()
  }, [])

  return (
    <Panel id={id}>
      <PanelHeader title={title} goBack={PANELS.home} />
      {friends &&
      <Group>
        <Header indicator={friends.length || null}>Друзья</Header>
        {friends.map(friend => {
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
        {!friends.length ? <Placeholder>Пока нет друзей</Placeholder> : null}
      </Group>
      }
    </Panel>
  )
}

export default Friends
