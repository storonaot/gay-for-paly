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
import BattlenetIcon from '../../assets/battlenet.jpg'

import PanelHeader from '../../common/PanelHeader'
import { AppContext } from '../../context'

const Home = ({ id, user, title }) => {
  const { setActivePanel, setActiveModal } = useContext(AppContext)

  const { steamGames, battleNetGames } = Array.isArray(user.games)
    ? user.games.reduce(
        (acc, current) => {
          if (current.platform === 'steam') {
            return { steamGames: [...acc.steamGames, current], battleNetGames: acc.battleNetGames }
          }

          return { steamGames: acc.steamGames, battleNetGames: [...acc.battleNetGames, current] }
        },
        {
          steamGames: [],
          battleNetGames: [],
        },
      )
    : {
        steamGames: [],
        battleNetGames: [],
      }

  const steamGamesTotal = steamGames.length
  const battlenetGamesTotal = battleNetGames.length

  const renderGames = list => (
    <>
      {list.map(game => {
        return (
          <HorizontalCell
            size="m"
            header={game.title}
            // onClick={() => {
            //   setActiveModal({
            //     key: MODALS.gameItem,
            //     props: {
            //       imgSrc: game.logo2,
            //     },
            //   })
            // }}
          >
            <Avatar size={88} mode="app" src={game.logo2} />
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
      {/* <Group
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
      </Group> */}
    </Panel>
  )
}

export default Home
