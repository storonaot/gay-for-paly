import React from 'react'
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
  Cell,
  UsersStack,
} from '@vkontakte/vkui'

import SteamIcon from '../../assets/steam.jpg'
import BattlenetIcon from '../../assets/battlenet.jpg'

import PanelHeader from '../../common/PanelHeader'

const Home = ({ id, user, title }) => {
  const steamGamesTotal = 16
  const battlenetGamesTotal = 16

  const renderGames = () => (
    <>
      <HorizontalCell size="m" header="Контра Сити">
        <Avatar
          size={88}
          mode="app"
          src="https://sun9-24.userapi.com/c639120/v639120173/3fe6f/tgPr7lecAY4.jpg"
        />
      </HorizontalCell>
      <HorizontalCell size="m" header="Golden Valley">
        <Avatar
          size={88}
          mode="app"
          src="https://sun9-71.userapi.com/c849220/v849220453/147ade/0MtQXKEVsiQ.jpg"
        />
      </HorizontalCell>
      <HorizontalCell size="m" header="Warma-geddon">
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
            aside={<Link>Показать все</Link>}
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
            aside={<Link>Показать все</Link>}
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
