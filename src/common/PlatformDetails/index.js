import React, { useContext } from 'react'
import {
  Icon28FavoriteOutline,
  Icon24FavoriteOutline,
  Icon28Favorite,
  Icon24StoryOutline,
} from '@vkontakte/icons'
import { Group, Cell, Header, Avatar, Div, Button, Title } from '@vkontakte/vkui'

import { AppContext } from '../../context'

import DotaImg from '../../assets/dota.jpg'
import { MODALS } from '../../constants'

import { numWord } from '../../utils'

import { addToFaivorite, removeFromFaivorite, getUser } from '../../api'

const list = [
  { id: 1, name: 'Dota 2', description: '1 448 часов', selected: true },
  { id: 2, name: 'Dota 2', description: '1 448 часов', selected: true },
  { id: 3, name: 'Dota 2', description: '1 448 часов', selected: true },
  { id: 4, name: 'Dota 2', description: '1 448 часов', selected: true },
  { id: 5, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 6, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 7, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 8, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 9, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 10, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 11, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 12, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 13, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 14, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 15, name: 'Dota 2', description: '1 448 часов', selected: false },
  { id: 16, name: 'Dota 2', description: '1 448 часов', selected: false },
]

export const GamePopup = () => {
  const { activeModal, setUser } = useContext(AppContext)

  if (!activeModal && !activeModal.props) return null

  const { game } = activeModal.props

  const updateUser = async () => {
    const updUser = await getUser()

    setUser(updUser)
  }

  const mark = async id => {
    await addToFaivorite(id)
    updateUser()
  }
  const unmark = async id => {
    await removeFromFaivorite(id)
    updateUser()
  }

  const totalHours = Math.floor(game.play_time_minutes / 60)
  const word = numWord(totalHours, ['час', 'часа', 'часов'])

  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={game.logo2}
        width="72px"
        height="72px"
        style={{ borderRadius: '8px', marginBottom: 16 }}
      />
      <Title weight="medium" level="2" style={{ marginBottom: 8 }}>
        {totalHours} {word}
      </Title>
      <div
        style={{
          marginBottom: 20,
          color: '#6D7885',
          fontSize: '14px',
        }}
      >
        Проведено в игре
      </div>
      <div style={{ marginBottom: 32, color: '#6D7885', fontSize: '14px' }}>
        Тут смешной текст.АААА
      </div>
      <Button before={<Icon24StoryOutline />} size="l" stretched style={{ marginBottom: 8 }}>
        Поделиться в истории
      </Button>
      <Button
        mode="secondary"
        size="l"
        stretched
        before={<Icon24FavoriteOutline />}
        onClick={
          game.is_favorite
            ? () => {
                unmark(game.id)
              }
            : () => {
                mark(game.id)
              }
        }
      >
        {game.is_favorite ? 'Удалить из избранного' : 'Добавить игру в избранное'}
      </Button>
    </Div>
  )
}

const PlatformDetails = ({ list = [] }) => {
  const { setActiveModal, setUser } = useContext(AppContext)

  return (
    <Group header={<Header mode="secondary">{list.length} игр</Header>}>
      {list.map(game => {
        const totalHours = Math.floor(game.play_time_minutes / 60)
        const word = numWord(totalHours, ['час', 'часа', 'часов'])

        return (
          <Cell
            onClick={() => {
              setActiveModal({
                key: MODALS.gameItem,
                props: {
                  game,
                },
              })
            }}
            description={`Игровое время ${totalHours} ${word}`}
            before={<Avatar mode="app" src={game.logo2} />}
            after={game.is_favorite ? <Icon28Favorite /> : <Icon28FavoriteOutline />}
          >
            {game.title}
          </Cell>
        )
      })}
    </Group>
  )
}

export default PlatformDetails
