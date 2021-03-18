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
  Subhead,
} from '@vkontakte/vkui'
import { AppContext } from '../../context'

import { platform, IOS } from '@vkontakte/vkui'
import Icon24UnfavoriteOutline from '@vkontakte/icons/dist/24/unfavorite_outline'
import Icon56DiamondOutline from '@vkontakte/icons/dist/56/diamond_outline'
import { Icon12User, Icon28StoryOutline, Icon20StoryOutline } from '@vkontakte/icons'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import PanelHeader from '../../common/PanelHeader'
import { MODALS, PANELS } from '../../constants'
import bridge from '@vkontakte/vk-bridge'
import { getFriends } from '../../api'

import SteamIcon from '../../assets/steam.jpg'
import BattlenetIcon from '../../assets/battlenet.jpg'

const osname = platform()

const FavoriteGames = ({ games, showAction }) => {
  return (
    <Group>
      <Header mode='primary'>Любимые игры</Header>
      {games && games.map(game => {
        return (
          <SimpleCell
            key={game.game_id}
            before={<Avatar mode='app' size={32} src={game.logo1} />}
            description={`${Math.round(game.play_time_minutes / 60)} часов`}
            after={showAction && <Icon24UnfavoriteOutline />}
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
  if (user.steam_id) {
    accounts.push({
      id: 1,
      nickname: user.steam_id,
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
  return (
    <FormLayout>
      <FormItem>
        <Title level='2' style={{ textAlign: 'center' }} weight='medium'>
          Статус
        </Title>
      </FormItem>
      <FormItem>
        <Input type='text' />
      </FormItem>
      <FormItem>
        <Button size='l' stretched>
          Сохранить
        </Button>
      </FormItem>
    </FormLayout>
  )
}

export const StoryPopup = ({ total }) => {
  const requestStory = () => {
    let space = '\n'
    if (osname === IOS) {
      space = ' '
    }
    let text = 'Я играл в игры ' + total + ' часов' + space +
      '\n' +
      'А мог бы заработать ' + (total * 250) + space +
      'курьером, но выбрал' + space +
      'киберспорт😉'
    let imageUrl = 'https://pp.userapi.com/ESlojY-aShK5orIRfa64W7vtw1KDXbdH7ZdgbA/dSJCXRedGT8.jpg?ecomm=1'
    bridge.send('VKWebAppShowStoryBox', {
      background_type: 'image',
      url: 'https://pp.userapi.com/gw4YJQavFh93ELabRAprREv1xSOj-e37eizkUg/0Q7vior7ZQQ.jpg?ecomm=1',
      attachment: {
        text: 'go_to',
        type: 'url',
        url: 'https://vk.com/app7794940',
      },
      stickers: [
        {
          sticker_type: 'renderable',
          sticker: {
            url: imageUrl,
            content_type: 'image',
            transform: {
              relation_width: 0.2,
              translation_y: -0.07,
            },
          },
        },
        {
          sticker_type: 'native',
          sticker: {
            action_type: 'text',
            action: {
              text,
              style: 'classic',
              alignment: 'center',
              background_style: 'none',
              selection_color: '#000000',
            },
            transform: {
              relation_width: 0.8,
              translation_y: 0.1,
            },
          },
        },
      ],
    })
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
        Это больше, чем у 99% пользователей
      </Caption>
      <Spacing size={32} />
      <Button onClick={requestStory} before={<Icon20StoryOutline />} size='l' stretched>
        Поделиться в истории
      </Button>
    </Div>
  )
}

const Profile = ({ id, user, title, userId }) => {
  const isMyProfile = user ? user.vk_user_id === userId : false
  const { setActiveModal, activePanel } = useContext(AppContext)
  const [userInfo, setUserInfo] = useState({})
  const [favoriteGames, setFavoriteGames] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    if (isMyProfile) {
      setUserInfo(user)
    } else {
      const fetchData = async () => {
        getFriends([userId])
          .then(resp => {
            for (let i = 0; i < resp.length && !userInfo.vk_user_id; i++) {
              if (resp[i].vk_user_id === userId) {
                setUserInfo(resp[i])
              }
              if (resp[i].games) {
                let favoriteGamesBuf = []
                let totalMinutes = 0
                resp[i].games.forEach(game => {
                  if (game.is_favorite) {
                    favoriteGamesBuf.push(game)
                  }
                  totalMinutes += game.play_time_minutes
                })
                setFavoriteGames(favoriteGamesBuf)
                setTotal(Math.round(totalMinutes / 60))
              }
            }
          }).catch(error => {
          console.error(error)
        })
      }
      fetchData()
    }
  }, [])

  const userName = userInfo ? `${userInfo.first_name} ${userInfo.last_name}` : 'Профиль'

  return (
    <Panel id={id}>
      <PanelHeader
        goBack={activePanel.goBack || PANELS.home}
        title={isMyProfile ? title : userName}
      />
      {userInfo && (
        <Group>
          <RichCell
            after={
              isMyProfile && (
                <Icon28StoryOutline
                  fill='var(--button_primary_background)'
                  onClick={() => {
                    setActiveModal({ key: MODALS.storyPopup, total: total })
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
      )}
      <Accounts user={userInfo} />
      <FavoriteGames showAction={isMyProfile} games={favoriteGames} />
    </Panel>
  )
}

export default Profile
