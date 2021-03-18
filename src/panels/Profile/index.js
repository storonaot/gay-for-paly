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

import { initStory } from '../../utils'
import Icon24UnfavoriteOutline from '@vkontakte/icons/dist/24/unfavorite_outline'
import Icon56DiamondOutline from '@vkontakte/icons/dist/56/diamond_outline'
import { Icon12User, Icon28StoryOutline, Icon20StoryOutline } from '@vkontakte/icons'
import Div from '@vkontakte/vkui/dist/components/Div/Div'
import PanelHeader from '../../common/PanelHeader'
import { MODALS, PANELS } from '../../constants'
import bridge from '@vkontakte/vk-bridge'

const FavouriteGames = ({ showAction }) => {
  let favoriteGames = [
    {
      id: 1,
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Малиновый джем',
      description: '1232 часов',
    },
    {
      id: 2,
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Малиновый джем 2',
      description: '342 часов',
    },
  ]

  return (
    <Group>
      <Header mode='primary'>Любимые игры</Header>
      {favoriteGames.map(game => {
        return (
          <SimpleCell
            key={game.id}
            before={<Avatar mode='app' size={32} src={game.avatar} />}
            description={game.description}
            after={showAction && <Icon24UnfavoriteOutline />}
          >
            {game.title}
          </SimpleCell>
        )
      })}
    </Group>
  )
}

const Accounts = () => {
  let accounts = [
    {
      id: 1,
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Steam',
      nickname: 'fayfay',
      since: '20.01.2019',
    },
    {
      id: 2,
      avatar:
        'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Battle.nex',
      nickname: 'megapihar',
      since: '20.02.2012',
    },
  ]

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
            <span style={{ color: '#818C99' }}> с {account.since}</span>
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

export const StoryPopup = () => {
  const requestStory = () => {
    let space = '\n'
    if ([
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod',
    ].includes(navigator.platform)) {
      space = ' '
    }
    let text = 'Я играл в игры 32312 часов' + space +
      '\n' +
      'А мог бы заработать 2млн' + space +
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
        5 173 часов
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

  const [userInfo, setUserInfo] = useState(user || {})
  useEffect(() => {
    if (isMyProfile) {
      setUserInfo(user)
    } else {
      //fetch
      setUserInfo({
        avatar:
          'https://sun9-58.userapi.com/s/v1/if1/dbx2eFAQIxeioLvvHMiftCUlx41z97gfu_9-v-EF9lpXIsBb3gv8KeBFcCM3W9fA-44zJgbB.jpg?size=200x0&quality=96&crop=0,0,1365,1365&ava=1',
        first_name: 'Шпак',
        last_name: 'Геннадий',
        steam_attach_link:
          'https://steamcommunity.com/openid/login?openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.realm=https%3A%2F%2Fgamer.super-app.studio%2F&openid.return_to=https%3A%2F%2Fgamer.super-app.studio%2Fsignin%2Fcallback%2FeGtvcDRYZ3J4THJPbHYzamZVRTR4clVLTVlfRC0wdzhGM093dTlCaU9RY2pLQTdZRU1yNWVPRzU5cm5rMWdDQTF5S19YNnNuVTRKM2dZMldjNDZ1S2liRnVLMWxvd2NITzNDVTNmTWE2bl9IdUlrQkcyVzZSWjlhTzkyc2hWU3Fvak5LSzdSZHlyNUVqRjVyWlRiSDQwVGd0dnB5alRLM0dMWnNrUWJJcFdIWTlpb2xzLUFNMHpvN1ZtZXkxUkZ3OTctN2YtVDJ5cTFyTzNQemFZLV8tTlJkVEgyVHlpYzNaSF9wUlNZZlZQTk16REhTeXh4ZHRwTTZON1RYWnJGT1JaX2VMQU9fTzdLb2hRX2pWa1RMbkdMbUowX3dmZVM4MkVlem1wWHlPOHJOaUNoS0I0VnBzS2xhQzh3VDA2SENPM1A1ODREdXZqckhIeVB4WWRmWDdGZ0dIRlJMRnZhblo1Z2pSdWxPNk5z',
        steam_id: null,
        steam_link: null,
        vk_user_id: 31667848,
      })
    }
  }, [])

  const userName = `${userInfo.first_name} ${userInfo.last_name}`

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
                    setActiveModal({ key: MODALS.storyPopup })
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
                    Мой Статус
                  </span>
                ) : (
                  'some status'
                )}
                <Spacing size={4} />
                <span>Всего в игре: 5 173 часов</span>
              </div>
            }
          >
            {userName}
          </RichCell>
        </Group>
      )}
      <Accounts />
      <FavouriteGames showAction={isMyProfile} />
    </Panel>
  )
}

export default Profile
