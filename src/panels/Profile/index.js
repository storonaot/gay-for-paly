import React, { useEffect, useState } from 'react'
import {
  Panel,
  PanelHeader,
  Group,
  Header,
  Avatar,
  SimpleCell,
  FormItem,
  Input, FormLayout, Button, Spacing, RichCell, Title, IconButton, Caption,
} from '@vkontakte/vkui'

import Icon24UnfavoriteOutline from '@vkontakte/icons/dist/24/unfavorite_outline'
import { Icon12User } from '@vkontakte/icons'
import Dropdown from '../../common/Dropdown'

const Profile = ({ id, user, title }) => {

  let favoriteGames = [
    {
      id: 1,
      avatar: user ? user.photo_200 : null,
      title: 'Малиновый джем',
      description: '1232 часов',
    },
    {
      id: 2,
      avatar: user ? user.photo_200 : null,
      title: 'Малиновый джем 2',
      description: '342 часов',
    },
  ]

  let accounts = [
    {
      id: 1,
      avatar: user ? user.photo_200 : null,
      title: 'Steam',
      nickname: 'fayfay',
      since: '20.01.2019',
    },
    {
      id: 2,
      avatar: user ? user.photo_200 : null,
      title: 'Battle.nex',
      nickname: 'megapihar',
      since: '20.02.2012',
    },
  ]

  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      {user && (
        <Group>
          <RichCell
            before={user.photo_200 ? <Avatar src={user.photo_200} size={72} /> : null}
            caption={<div style={{ display: 'flex', flexDirection: 'column' }}>
              <Spacing size={4} />
              <Dropdown
                content={
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
      <Group>
        <Header mode='primary'>Аккаунты</Header>
        {accounts.map(account => {
            return (
              <SimpleCell key={account.id} before={<Avatar mode='app' size={32} src={account.avatar} />}
                          description={<div style={{display: 'flex', alignItems: 'center'}}><Icon12User /> {account.nickname}</div>}
              >

                {account.title}
                <span style={{color: '#818C99'}}> с {account.since}</span>
              </SimpleCell>)
          },
        )}
      </Group>
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
    </Panel>
  )
}

export default Profile
