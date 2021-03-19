import React, { useState, useEffect, useContext } from 'react'
import {
  Panel,
  Group,
  Header,
  Avatar,
  SimpleCell,
  FormItem,
  Input,
  FormLayout,
  Button,
  Spacing,
  RichCell,
  Title,
  Caption,
  Subhead, ScreenSpinner,
} from '@vkontakte/vkui'
import { AppContext } from '../../context'

import Icon28Favorite from '@vkontakte/icons/dist/24/favorite'
import Icon56DiamondOutline from '@vkontakte/icons/dist/56/diamond_outline'
import { Icon12User, Icon28StoryOutline, Icon20StoryOutline } from '@vkontakte/icons'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import PanelHeader from '../../common/PanelHeader'
import { MODALS, PANELS } from '../../constants'
import { getFriends, getUser, removeFromFaivorite, setStatus } from '../../api'

import SteamIcon from '../../assets/steam.jpg'

import { initStory, numWord } from '../../utils'

const FavoriteGames = ({ games, showAction }) => {
  const { setUser } = useContext(AppContext)
  const updateUser = async () => {
    const updUser = await getUser()
    setUser(updUser)
  }

  const unmark = async (id, platform) => {
    await removeFromFaivorite(id, platform)
    updateUser()
  }
  return (
    <Group>
      <Header mode='primary'>Любимые игры</Header>
      {games &&
      games.map(game => {
        return (
          <SimpleCell
            key={game.game_id}
            before={<Avatar mode='app' size={32} src={game.logo1 || game.logo2} />}
            description={`${Math.floor(game.play_time_minutes / 60)} часов`}
            after={showAction && <Icon28Favorite onClick={() => {
              unmark(game.game_id, game.platform)
            }} />}
          >
            {game.title}
          </SimpleCell>
        )
      })}
    </Group>
  )
}

const Accounts = ({ user }) => {
  let accounts = []
  if (user && user.steam_id) {
    accounts.push({
      id: 1,
      nickname: user.steam_username,
      avatar: SteamIcon,
      title: 'Steam',
    })
  }
  return (
    <Group>
      <Header mode='primary'>Аккаунты</Header>
      {accounts.map(account => {
        return (
          <SimpleCell
            key={account.id}
            before={<Avatar mode='app' size={32} src={account.avatar} />}
            description={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Icon12User /> {account.nickname}
              </div>
            }
          >
            {account.title}
          </SimpleCell>
        )
      })}
    </Group>
  )
}

export const StatusForm = () => {
  const { setActiveModal, user, setUser } = useContext(AppContext)
  const [statusBuf, setStatusBuf] = useState('')

  const onChange = e => {
    const { value } = e.currentTarget
    setStatusBuf(value)
  }

  const onSave = () => {
    setStatus(statusBuf.trim())
      .then(() => {
        setUser({ ...user, status: statusBuf.trim() })
      })
      .finally(() => {
        setActiveModal(null)
      })
  }
  return (
    <FormLayout>
      <FormItem>
        <Title level='2' style={{ textAlign: 'center' }} weight='medium'>
          Статус
        </Title>
      </FormItem>
      <FormItem>
        <Input type='text' value={statusBuf} onChange={onChange} />
      </FormItem>
      <FormItem>
        <Button size='l' stretched onClick={onSave}>
          Сохранить
        </Button>
      </FormItem>
    </FormLayout>
  )
}

export const StoryPopup = ({ total }) => {
  const requestStory = () => {
    const word = numWord(total, ['час', 'часа', 'часов'])
    initStory(`Я играл в игры ${word}`, total)
  }
  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Icon56DiamondOutline fill='var(--accent)' />
      <Spacing size={17} />
      <Title level='2' style={{ textAlign: 'center' }} weight='medium'>
        {total} часов
      </Title>
      <Spacing size={8} />
      <Subhead style={{ color: 'var(--text_subhead)' }} weight='regular'>
        проведено в играх Steam и Battle.net
      </Subhead>
      <Spacing size={20} />
      <Caption style={{ color: 'var(--text_placeholder)' }} level='1' weight='regular'>
        Сколько бессоных ночей
      </Caption>
      <Spacing size={32} />
      <Button onClick={requestStory} before={<Icon20StoryOutline />} size='l' stretched>
        Поделиться в истории
      </Button>
    </Div>
  )
}

const Profile = ({ id, title, user, userId }) => {
  const { setActiveModal, activePanel, setActivePopout } = useContext(AppContext)
  const isMyProfile = user ? user.vk_user_id === userId : false
  const [userInfo, setUserInfo] = useState(null)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (isMyProfile) {
      setUserInfo(user)
    } else {
      const fetchData = async () => {
        setActivePopout(<ScreenSpinner size='large' />)
        getFriends([userId])
          .then(resp => {
            for (let i = 0; i < resp.length && !userInfo; i++) {
              if (resp[i].vk_user_id === userId) {
                setUserInfo(resp[i])
              }
            }
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {
            setActivePopout(null)
          })
      }
      fetchData()
    }
    if (userInfo && userInfo.games) {
      let favoriteGamesBuf = []
      let totalMinutes = 0
      userInfo.games.forEach(game => {
        if (game.is_favorite) {
          favoriteGamesBuf.push(game)
        }
        totalMinutes += game.play_time_minutes
      })
      setFavoriteGames(favoriteGamesBuf)
      setTotal(Math.floor(totalMinutes / 60))
    }
  }, [user, userInfo])

  const userName = userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : 'Профиль'

  return (
    <Panel id={id}>
      <PanelHeader
        goBack={activePanel.goBack || PANELS.home}
        title={isMyProfile ? title : userName}
      />
      {userInfo && (
        <>
          <Group>
            <RichCell
              after={
                isMyProfile && (
                  <Icon28StoryOutline
                    fill='var(--button_primary_background)'
                    onClick={() => {
                      setActiveModal({ key: MODALS.storyPopup, props: { total: total } })
                    }}
                  />
                )
              }
              before={userInfo.avatar ? <Avatar src={userInfo.avatar} size={72} /> : null}
              caption={
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Spacing size={4} />
                  {isMyProfile ? (
                    <span
                      style={{ color: '#4986CC' }}
                      onClick={() => {
                        setActiveModal({ key: MODALS.statusForm })
                      }}
                    >
                    {userInfo.status ? userInfo.status : 'Установить статус'}
                  </span>
                  ) : (
                    userInfo.status
                  )}
                  <Spacing size={4} />
                  <span>Всего в игре: {total} часов</span>
                </div>
              }
            >
              {userName}
            </RichCell>
          </Group>
          <Accounts user={userInfo} />
          <FavoriteGames showAction={isMyProfile} games={favoriteGames} />
        </>
      )}
    </Panel>
  )
}

export default Profile
