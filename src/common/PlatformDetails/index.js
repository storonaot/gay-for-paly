import React, { useContext } from 'react'
import {
  Icon28FavoriteOutline,
  Icon24FavoriteOutline,
  Icon28Favorite,
  Icon24StoryOutline,
} from '@vkontakte/icons'
import { Group, Cell, Header, Avatar, Div, Button, Title, Caption } from '@vkontakte/vkui'

import { AppContext } from '../../context'

import { MODALS } from '../../constants'

import { numWord, initStory } from '../../utils'

import { addToFaivorite, removeFromFaivorite, getUser } from '../../api'

export const GamePopup = () => {
  const { activeModal, setUser, setActiveModal } = useContext(AppContext)

  const updateUser = async () => {
    const updUser = await getUser()

    setUser(updUser)
    setActiveModal({ key: null, props: {} })
  }

  const mark = async (id, platform) => {
    await addToFaivorite(id, platform)
    updateUser()
  }
  const unmark = async (id, platform) => {
    await removeFromFaivorite(id, platform)
    updateUser()
  }

  if (!activeModal && !activeModal.props) return null

  const { game } = activeModal.props

  if (!game) return null

  const totalHours = Math.floor(game.play_time_minutes / 60)
  const word = numWord(totalHours, ['час', 'часа', 'часов'])

  const requestStory = () => {
    initStory(`${totalHours} ${word} в ${game.title}`, totalHours, game.logo1 || game.logo2)
  }

  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={game.logo1 || game.logo2}
        width='72px'
        height='72px'
        style={{ borderRadius: '8px', marginBottom: 16 }}
      />
      <Title weight='medium' level='2' style={{ marginBottom: 8 }}>
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
        Сколько бессоных ночей
      </div>
      <Button
        onClick={requestStory}
        before={<Icon24StoryOutline />}
        size='l'
        stretched
        style={{ marginBottom: 8 }}
      >
        Поделиться в истории
      </Button>
      <Button
        mode='secondary'
        size='l'
        stretched
        before={<Icon24FavoriteOutline />}
        onClick={
          game.is_favorite
            ? () => {
              unmark(game.game_id, game.platform)
            }
            : () => {
              mark(game.game_id, game.platform)
            }
        }
      >
        {game.is_favorite ? 'Удалить из избранного' : 'Добавить игру в избранное'}
      </Button>
    </Div>
  )
}

const PlatformDetails = ({ list = [] }) => {
  const { setActiveModal } = useContext(AppContext)

  return (
    <Group header={<Header mode='secondary'>{list.length} игр</Header>}>
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
            key={game.game_id}
            description={`Игровое время ${totalHours} ${word}`}
            before={<Avatar mode='app' src={game.logo1 || game.logo2} />}
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
