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
  Placeholder,
  Button,
} from '@vkontakte/vkui'

import { PANELS, MODALS } from '../../constants'
import { Icon28ChevronRightOutline } from '@vkontakte/icons'

import SteamIcon from '../../assets/steam.jpg'
import WargamingIcon from '../../assets/wargaming.jpeg'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'
import Wargaming from '../Wargaming'

const Home = ({ id, user, title }) => {
  const { setActivePanel, setActiveModal } = useContext(AppContext)

  const { steamGames, wargamingGames } = Array.isArray(user.games)
    ? user.games.reduce(
      (acc, current) => {
        if (current.platform === 'steam') {
          return { steamGames: [...acc.steamGames, current], wargamingGames: acc.wargamingGames }
        }

        return { steamGames: acc.steamGames, wargamingGames: [...acc.wargamingGames, current] }
      },
      {
        steamGames: [],
        wargamingGames: [],
      },
    )
    : {
      steamGames: [],
      wargamingGames: [],
    }

  const steamGamesTotal = steamGames.length
  const wargamingGamesTotal = wargamingGames.length

  const renderGames = list => (
    <>
      {list.map(game => {
        return (
          <HorizontalCell
            key={game.game_id}
            size='m'
            header={game.title}
            onClick={() => {
              setActiveModal({
                key: MODALS.gameItem,
                props: {
                  game,
                },
              })
            }}
          >
            <Avatar size={88} mode='app' src={game.logo1 || game.logo2} />
          </HorizontalCell>
        )
      })}
    </>
  )

  return (
    <Panel id={id}>
      <PanelHeader title={title} />
      {user && (
        <Group>
          <RichCell
            after={<Icon28ChevronRightOutline fill='var(--button_primary_background)' />}
            onClick={() => {
              setActivePanel({ name: PANELS.profile, id: user.vk_user_id })
            }}
            multiline
            bottom={<UsersStack photos={[SteamIcon, WargamingIcon]} />}
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
              steamGamesTotal ? (
                <Link
                  onClick={() => {
                    setActivePanel({ name: PANELS.steam })
                  }}
                >
                  {'Показать все'}
                </Link>
              ) : null
            }
            indicator={
              steamGamesTotal ? (
                <Counter size='s' mode='secondary'>
                  {steamGamesTotal}
                </Counter>
              ) : null
            }
          >
            Мой Steam
          </Header>
        }
      >
        {steamGamesTotal ? (
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>{renderGames(steamGames)}</div>
          </HorizontalScroll>
        ) : user.steam_id ? (
          <Placeholder>Пока не добавлено ни одной игры в Steam</Placeholder>
        ) : (
          <Placeholder
            onClick={() => {
              setActivePanel({ name: PANELS.settings })
            }}
            action={<Button size='m'>Подключить Steam</Button>}
          >
            Подключите платформу Steam
          </Placeholder>
        )}
      </Group>
      <Group
        header={
          <Header
            aside={
              wargamingGamesTotal ? (
                <Link
                  onClick={() => {
                    setActivePanel({ name: PANELS.wargaming })
                  }}
                >
                  {'Показать все'}
                </Link>
              ) : null
            }
            indicator={
              wargamingGamesTotal ? (
                <Counter size='s' mode='secondary'>
                  {wargamingGamesTotal}
                </Counter>
              ) : null
            }
          >
            Мой Wargaming
          </Header>
        }
      >
        {wargamingGamesTotal ? (
          <HorizontalScroll>
            <div style={{ display: 'flex' }}>{renderGames(wargamingGames)}</div>
          </HorizontalScroll>
        ) : user.wargaming_id ? (
          <Placeholder>Пока не добавлено ни одной игры в Wargaming</Placeholder>
        ) : (
          <Placeholder
            onClick={() => {
              setActivePanel({ name: PANELS.settings })
            }}
            action={<Button size='m'>Подключить Wargaming</Button>}
          >
            Подключите платформу Wargaming
          </Placeholder>
        )}
      </Group>
    </Panel>
  )
}

export default Home
