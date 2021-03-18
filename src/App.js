import React, { useEffect, useState } from 'react'
import bridge from '@vkontakte/vk-bridge'
import { Epic, Tabbar, TabbarItem, View, ScreenSpinner } from '@vkontakte/vkui'
import '@vkontakte/vkui/dist/vkui.css'

import Icon28UsersOutline from '@vkontakte/icons/dist/28/users_outline'
import { Icon28Profile, Icon28SettingsOutline } from '@vkontakte/icons'

import { PANELS } from './constants'
import { AppContext } from './context'

import Friends from './panels/Friends'
import Settings from './panels/Settings'
import Profile from './panels/Profile'
import Home from './panels/Home'

import { signIn } from './api'

const App = () => {
  const [activePanel, setActivePanel] = useState(PANELS.home)
  const [activePopout, setActivePopout] = useState(null) // <ScreenSpinner size='large'/>
  const [user, setUser] = useState(null)

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
  }

  const tabbar = (
    <Tabbar>
      <TabbarItem
        onClick={() => setActivePanel(PANELS.friends)}
        selected={activePanel === PANELS.friends}
        text="Мои друзья"
      >
        <Icon28UsersOutline />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActivePanel(PANELS.profile)}
        selected={activePanel === PANELS.profile}
        text="Мой профиль"
      >
        <Icon28Profile />
      </TabbarItem>
      <TabbarItem
        onClick={() => setActivePanel(PANELS.settings)}
        selected={activePanel === PANELS.settings}
        text="Настройки"
      >
        <Icon28SettingsOutline />
      </TabbarItem>
    </Tabbar>
  )

  return (
    <AppContext.Provider value={AppContextValue}>
      <Epic activeStory={activePanel} tabbar={tabbar}>
        <View id={PANELS.profile} activePanel={PANELS.profile} popout={activePopout}>
          <Profile id={PANELS.profile} title="Мой профиль" user={user} />
        </View>
        <View id={PANELS.settings} activePanel={PANELS.settings} popout={activePopout}>
          <Settings id={PANELS.settings} title="Геймер" />
        </View>
        <View id={PANELS.friends} activePanel={PANELS.friends} popout={activePopout}>
          <Friends id={PANELS.friends} title="Геймер" />
        </View>
        <View id={PANELS.home} activePanel={PANELS.home} popout={activePopout}>
          <Home id={PANELS.home} title="Геймер" user={user} />
        </View>
      </Epic>
    </AppContext.Provider>
  )
}

export default App
