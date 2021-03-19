import React, { useContext, useEffect, useState } from 'react'
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
  Cell,
} from '@vkontakte/vkui'

import { PANELS, MODALS } from '../../constants'
import { Icon28ChevronRightOutline } from '@vkontakte/icons'

import SteamIcon from '../../assets/steam.jpg'
import WargamingIcon from '../../assets/wargaming.jpeg'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'
import Wargaming from '../Wargaming'

import { getLeaders } from '../../api'

import { numWord } from '../../utils'

const Home = ({ id, user, title }) => {
  const { setActivePanel, setActiveModal } = useContext(AppContext)
  const [leaders, setLeaders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resLeaders = await getLeaders()
      setLeaders(resLeaders)
    }
    fetchData()
  })

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
            size="m"
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
            <Avatar size={88} mode="app" src={game.logo1 || game.logo2} />
          </HorizontalCell>
        )
      })}
    </>
  )

  let iconsStack = []
  if (user.steam_id) {
    iconsStack.push(SteamIcon)
  }
  if (user.wargaming_id) {
    iconsStack.push(WargamingIcon)
  }
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
            // bottom={<UsersStack photos={[SteamIcon, WargamingIcon]} />}
            before={user.avatar ? <Avatar src={user.avatar} size={72} /> : null}
          >
            <div>
              {`${user.first_name} ${user.last_name}`}
              <div style={{ display: 'flex', marginTop: 8 }}>
                {user.steam_link && (
                  <a
                    style={{ marginRight: 8 }}
                    href={user.steam_link}
                    rel="norefferer"
                    target="_blank"
                  >
                    <Avatar mode="app" src={SteamIcon} size={24} />
                  </a>
                )}
                {user.wargaming_id && (
                  <a
                    style={{ marginRight: 8 }}
                    href="https://wargaming.com/ru/"
                    rel="norefferer"
                    target="_blank"
                  >
                    <Avatar mode="app" src={WargamingIcon} size={24} />
                  </a>
                )}
              </div>
            </div>
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
                <Counter size="s" mode="secondary">
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
            action={<Button size="m">Подключить Steam</Button>}
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
                <Counter size="s" mode="secondary">
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
            action={<Button size="m">Подключить Wargaming</Button>}
          >
            Подключите платформу Wargaming
          </Placeholder>
        )}
      </Group>
      {leaders.length ? (
        <Group header={<Header>Топ-10 пользователей</Header>}>
          {leaders.map(leader => {
            const hours = Math.floor(leader.total_games_time / 60)
            const word = numWord(hours, ['час', 'часа', 'часов'])

            return (
              <Cell
                description={`${hours} ${word}`}
                before={<Avatar size={48} src={leader.avatar} />}
              >
                {leader.first_name} {leader.last_name}
              </Cell>
            )
          })}
        </Group>
      ) : null}
    </Panel>
  )
}

export default Home
