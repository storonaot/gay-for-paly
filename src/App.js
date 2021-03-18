import React, { useEffect, useState } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { Epic, Tabbar, TabbarItem, View, ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline'
import { Icon28Profile, Icon28SettingsOutline } from '@vkontakte/icons'

import { PANELS } from './constants'
import { AppContext } from './context'
import Modal from './common/Modal'

import Friends from './panels/Friends'
import Settings from './panels/Settings'
import Profile from './panels/Profile'
import Home from './panels/Home'
import Steam from './panels/Steam'
import BattleNet from './panels/BattleNet'

import { signIn } from './api'

const App = () => {
  const [activePanel, setActivePanel] = useState({ name: PANELS.settings })
  const [activePopout, setActivePopout] = useState(null) // <ScreenSpinner size='large'/>
  const [user, setUser] = useState(null)
  const [activeModal, setActiveModal] = useState({ key: null })

  useEffect(() => {
    bridge.subscribe(({ detail: { type, data } }) => {
      if (type === 'VKWebAppUpdateConfig') {
        const schemeAttribute = document.createAttribute('scheme')

        schemeAttribute.value = data.scheme ? data.scheme : 'client_light'
        document.body.attributes.setNamedItem(schemeAttribute)
      }
    })

    async function fetchData() {
      setActivePopout(<ScreenSpinner size="large" />)

      try {
        const user = await bridge.send('VKWebAppGetUserInfo')

        signIn({ ...user, avatar: user.photo_200 })
          .then(usr => {
            console.log('user', usr)
            setUser(usr)
          })
          .finally(() => {
            setActivePopout(null)
          })
      } catch (error) {
        console.error('error', error.message)
      }
      setActivePopout(null)
    }

    fetchData()
  }, [])

  const AppContextValue = {
    activePanel,
    setActivePanel,
    activePopout,
    setActivePopout,
    activeModal,
    setActiveModal,
    user,
    setUser,
  }

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => setActivePanel({ name: PANELS.friends, id: 0 })}
        selected={activePanel.name === PANELS.friends}
        text="Мои друзья"
      >
        <Icon28UsersOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActivePanel({ name: PANELS.home, id: 0 })}
        selected={activePanel.name === PANELS.home}
        text="Мой профиль"
      >
        <Icon28Profile />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActivePanel({ name: PANELS.settings, id: 0 })}
        selected={activePanel.name === PANELS.settings}
        text="Настройки"
      >
        <Icon28SettingsOutline />
      </TabbarItem>
    </Tabbar>
  )

  return !user ? (
    <ScreenSpinner size="large" />
  ) : (
    <AppContext.Provider value={AppContextValue}>
      <Epic activeStory={activePanel.name} tabbar={tabbar}>
        <View
          id={PANELS.profile}
          activePanel={PANELS.profile}
          popout={activePopout}
          modal={<Modal activeModal={activeModal} />}
        >
          <Profile id={PANELS.profile} title="Мой профиль" userId={activePanel.id} user={user} />
        </View>
        <View
          id={PANELS.settings}
          activePanel={PANELS.settings}
          popout={activePopout}
          modal={<Modal activeModal={activeModal} />}
          user={user}
        >
          <Settings id={PANELS.settings} title="Настройки" user={user} />
        </View>
        <View
          id={PANELS.friends}
          activePanel={PANELS.friends}
          popout={activePopout}
          modal={<Modal activeModal={activeModal} />}
        >
          <Friends id={PANELS.friends} title="Мои друзья" />
        </View>
        <View
          id={PANELS.home}
          activePanel={PANELS.home}
          popout={activePopout}
          modal={<Modal activeModal={activeModal} />}
        >
          <Home id={PANELS.home} title="Геймер" user={user} />
        </View>
        <View
          id={PANELS.steam}
          activePanel={PANELS.steam}
          popout={activePopout}
          modal={<Modal activeModal={activeModal} />}
        >
          <Steam id={PANELS.steam} title="Мой Steam" />
        </View>
        <View id={PANELS.buttleNet} activePanel={PANELS.buttleNet} popout={activePopout}>
          <BattleNet id={PANELS.buttleNet} title="Мой Battle.net" />
        </View>
      </Epic>
    </AppContext.Provider>
  )
}

export default App
