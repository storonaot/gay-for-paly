import React, { useContext } from 'react'
import {
  Panel,
  Group,
  Avatar,
  Header,
  Counter,
  Link,
  HorizontalScroll,
  HorizontalCell,
  RichCell,
  UsersStack,
} from '@vkontakte/vkui'

import { PANELS, MODALS } from '../../constants'
import { Icon28ChevronRightOutline } from '@vkontakte/icons'

import SteamIcon from '../../assets/steam.jpg'
import BattlenetIcon from '../../assets/battlenet.jpg'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'

const Home = ({ id, user, title }) => {
  const { setActivePanel, setActiveModal } = useContext(AppContext)
  const steamGamesTotal = 16
  const battlenetGamesTotal = 16

  const renderGames = () => (
    <>
      <HorizontalCell
        size="m"
        header="Контра Сити"
        onClick={() => {
          console.log('123')
          setActiveModal({
            key: MODALS.gameItem,
            props: {
              imgSrc: 'https://sun9-24.userapi.com/c639120/v639120173/3fe6f/tgPr7lecAY4.jpg',
            },
          })
        }}
      >
        <Avatar
          size={88}
          mode="app"
          src="https://sun9-24.userapi.com/c639120/v639120173/3fe6f/tgPr7lecAY4.jpg"
        />
      </HorizontalCell>
      <HorizontalCell
        size="m"
        header="Golden Valley"
        onClick={() => {
          setActiveModal({
            key: MODALS.gameItem,
            props: {
              imgSrc: 'https://sun9-24.userapi.com/c639120/v639120173/3fe6f/tgPr7lecAY4.jpg',
            },
          })
        }}
      >
        <Avatar
          size={88}
          mode="app"
          src="https://sun9-71.userapi.com/c849220/v849220453/147ade/0MtQXKEVsiQ.jpg"
        />
      </HorizontalCell>
      <HorizontalCell
        size="m"
        header="Warma-geddon"
        onClick={() => {
          setActiveModal({
            key: MODALS.gameItem,
            props: {
              imgSrc: 'https://sun9-24.userapi.com/c639120/v639120173/3fe6f/tgPr7lecAY4.jpg',
            },
          })
        }}
      >
        <Avatar
          size={88}
          mode="app"
          src="https://sun9-45.userapi.com/c846418/v846418215/5cf20/Gd9mQ6dVXTw.jpg"
        />
      </HorizontalCell>
    </>
  )

  return (
    <Panel id={id}>
      <PanelHeader title={title} />
      {user && (
        <Group>
          <RichCell
            after={<Icon28ChevronRightOutline fill="var(--button_primary_background)" />}
            onClick={() => {
              setActivePanel({ name: PANELS.profile, id: user.vk_user_id })
            }}
            multiline
            caption="В игре 5 173 часа"
            bottom={<UsersStack photos={[SteamIcon, BattlenetIcon]} />}
            before={user.avatar ? <Avatar src={user.avatar} size={72} /> : null}
          >
            {`${user.first_name} ${user.last_name}`}
          </RichCell>
        </Group>
      )}
      <Group
        header={
          <Header
            aside={
              <Link
                onClick={() => {
                  setActivePanel({ name: PANELS.steam })
                }}
              >
                Показать все
              </Link>
            }
            indicator={
              <Counter size="s" mode="secondary">
                {steamGamesTotal}
              </Counter>
            }
          >
            Мой Steam
          </Header>
        }
      >
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            {renderGames()} {renderGames()} {renderGames()}
          </div>
        </HorizontalScroll>
      </Group>
      <Group
        header={
          <Header
            aside={
              <Link
                onClick={() => {
                  setActivePanel({ name: PANELS.buttleNet })
                }}
              >
                Показать все
              </Link>
            }
            indicator={
              <Counter size="s" mode="secondary">
                {battlenetGamesTotal}
              </Counter>
            }
          >
            Мой Battle.net
          </Header>
        }
      >
        <HorizontalScroll>
          <div style={{ display: 'flex' }}>
            {renderGames()} {renderGames()} {renderGames()}
          </div>
        </HorizontalScroll>
      </Group>
    </Panel>
  )
}

export default Home
