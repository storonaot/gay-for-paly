import React, { useEffect, useState } from 'react'
import {
  Panel,
  PanelHeader,
  Group,
  Cell,
  Header,
  Avatar,
  SimpleCell,
  MiniInfoCell,
  ModalRoot,
  FormItem,
  Input,
  ModalPage,
  ModalPageHeader, FormLayout, Button, Spacing,
} from '@vkontakte/vkui'

import Icon20ErrorCircleOutline from '@vkontakte/icons/dist/20/error_circle_outline'

const Profile = ({ id, user, title }) => {

  const ABOUT_MODAL = 'about;'

  const [modal, setModal] = useState(null)

  let favoriteGames = [
    {
      id: 1,
      avatar: user ? user.photo_200 : null,
      title: 'Малиновый джем',
      description: '3 года 2 месяца 12 минут',
    },
    {
      id: 2,
      avatar: user ? user.photo_200 : null,
      title: 'Малиновый джем 2',
      description: '8 лет',
    },
  ]

  return (
    <Panel id={id}>
      <PanelHeader>{title}</PanelHeader>
      {user && (
        <Group>
          <Cell
            before={user.photo_200 ? <Avatar src={user.photo_200} size={72} /> : null}
            description="Лябудень"
          >
            {`${user.first_name} ${user.last_name}`}
          </Cell>
        </Group>)}
      <MiniInfoCell
        before={<Icon20ErrorCircleOutline />}
        mode='add'
        onClick={() => setModal(ABOUT_MODAL)}
      >
        Статус
      </MiniInfoCell>
      <Spacing size={40} />
      <Group>
        <Header mode='primary'>Любимые игры</Header>
        {favoriteGames.map(game => {
            return (
              <SimpleCell key={game.id} before={<Avatar mode='app' size={72} src={game.avatar} />}
                          description={game.description}>
                {game.title}
              </SimpleCell>)
          },
        )}
      </Group>
      <ModalRoot activeModal={modal} onClose={() => setModal(null)}>
        <ModalPage
          id={ABOUT_MODAL}
          header={
            <ModalPageHeader>
              Расскажите о себе
            </ModalPageHeader>
          }
        >
          <FormLayout>
            <FormItem>
              <Input type='text' />
            </FormItem>
            <FormItem>
              <Button size='l' stretched>Сохранить</Button>
            </FormItem>
          </FormLayout>
        </ModalPage>
      </ModalRoot>
    </Panel>
  )
}

export default Profile
