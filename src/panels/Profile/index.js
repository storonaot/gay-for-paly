import React, { useEffect, useState } from 'react'
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  Avatar,
  SimpleCell,
  FormItem,
  Input, FormLayout, Button, Spacing, RichCell, Title, IconButton, Caption, Subhead,
} from '@vkontakte/vkui'

import Icon24UnfavoriteOutline from '@vkontakte/icons/dist/24/unfavorite_outline'
import Icon20StoryOutline from '@vkontakte/icons/dist/20/story_outline'
import Icon56DiamondOutline from '@vkontakte/icons/dist/56/diamond_outline'
import { Icon12User } from '@vkontakte/icons'
import Dropdown from '../../common/Dropdown'
import Div from '@vkontakte/vkui/dist/components/Div/Div'

const FavouriteGames = () => {
  let favoriteGames = [
    {
      id: 1,
      avatar: 'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Малиновый джем',
      description: '1232 часов',
    },
    {
      id: 2,
      avatar: 'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Малиновый джем 2',
      description: '342 часов',
    },
  ]

  return (
    <Group>
      <Header mode='primary'>Любимые игры</Header>
      {favoriteGames.map(game => {
          return (
            <SimpleCell key={game.id} before={<Avatar mode='app' size={32} src={game.avatar} />}
                        description={game.description}
                        after={<Icon24UnfavoriteOutline />}
            >

              {game.title}
            </SimpleCell>)
        },
      )}
    </Group>
  )
}


const Accounts = () => {


  let accounts = [
    {
      id: 1,
      avatar: 'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
      title: 'Steam',
      nickname: 'fayfay',
      since: '20.01.2019',
    },
    {
      id: 2,
      avatar: 'https://avatars.mds.yandex.net/get-zen_doc/244664/pub_5b25395c3d857800aaba5c81_5b253a754c398b00a9b1ac17/scale_1200',
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
            <SimpleCell key={account.id} before={<Avatar mode='app' size={32} src={account.avatar} />}
                        description={<div style={{ display: 'flex', alignItems: 'center' }}>
                          <Icon12User /> {account.nickname}</div>}
            >

              {account.title}
              <span style={{ color: '#818C99' }}> с {account.since}</span>
            </SimpleCell>)
        },
      )}
    </Group>
  )
}

const StatusForm = () => {
  return (
    <FormLayout>
      <FormItem>
        <Title level='2'
               style={{ textAlign: 'center' }}
               weight='medium'>
          Статус
        </Title>
      </FormItem>
      <FormItem>
        <Input type='text' />
      </FormItem>
      <FormItem>
        <Button size='l' stretched>Сохранить</Button>
      </FormItem>
    </FormLayout>
  )
}

const StoryPopup = () => {
  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Icon56DiamondOutline fill='var(--accent)' />
      <Spacing size={17} />
      <Title level='2'
             style={{ textAlign: 'center' }}
             weight='medium'>
        5 173 часов
      </Title>
      <Spacing size={8} />
      <Subhead style={{ color: 'var(--text_subhead)' }} weight='regular'>проведено в играх Steam и
        Battle.net</Subhead>
      <Spacing size={20} />
      <Caption style={{ color: 'var(--text_placeholder)' }} level='1' weight='regular'>Это больше, чем у
        99% пользователей</Caption>
      <Spacing size={32} />
      <Button before={<Icon20StoryOutline />} size='l' stretched>Поделиться в истории</Button>
    </Div>
  )
}

const Profile = ({ id, user, title }) => {
  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      {user && (
        <Group>
          <RichCell
            after={
              <Dropdown
                content={
                  <StoryPopup />
                }
              >
                {({ open, setAnchorElement }) => (
                  <div ref={setAnchorElement}>
                    <Icon20StoryOutline onClick={open} />
                  </div>
                )}
              </Dropdown>
            }
            before={user.avatar ? <Avatar src={user.avatar} size={72} /> : null}
            caption={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Spacing size={4} />
              <Dropdown
                content={
                  <StatusForm />
                }
              >
                {({ open, setAnchorElement }) => (
                  <div ref={setAnchorElement}>
                    <span
                      style={{ color: '#4986CC' }}
                      onClick={open}
                    >
                      Статус
                    </span>
                  </div>
                )}
              </Dropdown>
              <Spacing size={4} />
              <span>Всего в игре: 5 173 часов</span>
            </div>}
          >
            {`${user.first_name} ${user.last_name}`}
          </RichCell>
        </Group>)}
      <Accounts />
      <FavouriteGames />
    </Panel>
  )
}

export default Profile
