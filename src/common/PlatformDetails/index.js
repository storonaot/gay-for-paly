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
import Dropdown from '../Dropdown'
import { MODALS } from '../../constants'

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
  const { activeModal } = useContext(AppContext)

  if (!activeModal) return null

  const imgSrc = activeModal && activeModal.props ? activeModal.props.imgSrc : null

  return (
    <Div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img
        src={imgSrc}
        width="72px"
        height="72px"
        style={{ borderRadius: '8px', marginBottom: 16 }}
      />
      <Title weight="medium" level="2" style={{ marginBottom: 8 }}>
        5 132 часов
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
      <Button mode="secondary" size="l" stretched before={<Icon24FavoriteOutline />}>
        Добавить игру в избранное13
      </Button>
    </Div>
  )
}

const PlatformDetails = ({ title, goBack }) => {
  const { setActiveModal } = useContext(AppContext)

  return (
    <Group header={<Header mode="secondary">16 игр</Header>}>
      {list.map(item => (
        <Cell
          onClick={() => {
            setActiveModal({ key: MODALS.gameItem, props: { imgSrc: DotaImg } })
          }}
          description={item.description}
          before={<Avatar mode="app" src={DotaImg} />}
          after={item.selected ? <Icon28Favorite /> : <Icon28FavoriteOutline />}
        >
          {item.name}
        </Cell>
      ))}
    </Group>
  )
}

export default PlatformDetails
