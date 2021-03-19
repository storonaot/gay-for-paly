import React, { useContext, useEffect, useState } from 'react'
import { Panel, Group, Cell, ActionSheetItem, Alert } from '@vkontakte/vkui'
import { Icon28ChevronDownOutline } from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import Dropdown from '../../common/Dropdown'

import SteamIcon from '../../assets/steam.jpg'
import WargamingIcon from '../../assets/wargaming.jpeg'

import s from './styles.module.css'
import { getUser, updatePrivateStatus, detachPlatform } from '../../api'
import { AppContext } from '../../context'

const menu = [
  { id: 1, label: 'Все' },
  { id: 2, label: 'Друзья' },
  { id: 3, label: 'Никто' },
]

const Settings = ({ id, title, user }) => {
  const platforms = [
    { id: 1, label: 'Steam', iconSrc: SteamIcon, connected: user ? user.steam_id : null },
    {
      id: 2,
      label: 'Wargaming',
      iconSrc: WargamingIcon,
      connected: user ? user.wargaming_id : null,
    },
    // { id: 3, label: 'VK Game', iconSrc: BattlenetIcon, connected: false },
  ]

  const [activeMenuItem, setActiveMenuItem] = useState(
    menu.find(item => item.id === Number(user.private_status)),
  )

  const { setActivePopout, setUser } = useContext(AppContext)

  const connectSteam = () => {
    setActivePopout(
      <Alert
        actions={[
          {
            title: 'Продолжить',
            action: fetchSteamUser,
          },
        ]}
        onClose={() => {
          setActivePopout(null)
        }}
        text="Подключение к аккаунту Steam"
      />,
    )

    window.open(user.steam_attach_link)
    // 1. открываем модалку с кнопкой продолжить
    // 2. открываем окно со стимом регистрируемся и окно закрывается
    // 3. нажимаем на продолжить
    // 4. отправляем запрос на юзера
    // 5. если есть стим id - закрываем модалку и обновляем индикаторы
    // 6. если нет показываем юзеру информацию о том что он не авторизовался с стиме и пусть попробует еще раз
  }

  const fetchSteamUser = async () => {
    const updatedUser = await getUser()

    if (updatedUser) {
      if (updatedUser.steam_id) setActivePopout(null)
      else
        setActivePopout(
          <Alert
            actions={[
              {
                title: 'Попробовать еще раз',
                autoclose: true,
                action: connectSteam,
              },
              {
                title: 'Отмена',
                autoclose: true,
                mode: 'cancel',
              },
            ]}
            onClose={() => {
              setActivePopout(null)
            }}
            text="Не удалось подключиться к аккаунту Steam"
          />,
        )

      setUser(updatedUser)
    }
  }

  const fetchWargamingUser = async () => {
    const updatedUser = await getUser()

    if (updatedUser) {
      if (updatedUser.wargaming_id) setActivePopout(null)
      else
        setActivePopout(
          <Alert
            actions={[
              {
                title: 'Попробовать еще раз',
                autoclose: true,
                action: connectWargaming,
              },
              {
                title: 'Отмена',
                autoclose: true,
                mode: 'cancel',
              },
            ]}
            onClose={() => {
              setActivePopout(null)
            }}
            text="Не удалось подключиться к аккаунту Wargaming"
          />,
        )

      setUser(updatedUser)
    }
  }

  const connectWargaming = () => {
    setActivePopout(
      <Alert
        actions={[
          {
            title: 'Продолжить',
            action: fetchWargamingUser,
          },
        ]}
        onClose={() => {
          setActivePopout(null)
        }}
        text="Подключение к аккаунту Wargaming"
      />,
    )

    window.open(user.wargaming_attach_link)
  }

  const renderMenu = () => (
    <>
      {menu.map(item => (
        <ActionSheetItem
          key={item.id}
          autoclose
          selectable
          checked={activeMenuItem.id === item.id}
          onClick={() => {
            const id = Number(item.id)

            setActiveMenuItem(menu.find(item => item.id === id))
            updatePrivateStatus(item.id)
          }}
        >
          {item.label}
        </ActionSheetItem>
      ))}
    </>
  )

  const getAfterComponent = platform => {
    if (platform.connected) return null
    return (
      <div onClick={platform.label === 'Steam' ? connectSteam : connectWargaming}>Подключить</div>
    )
  }

  const detach = async platform => {
    detachPlatform(platform.label.toLowerCase()).then(response => {
      setUser(response)
    })
  }

  const getIndicatorComponent = platform => {
    if (platform.connected) {
      return (
        <Dropdown
          content={
            <ActionSheetItem
              autoclose
              mode="destructive"
              onClick={() => {
                detach(platform)
              }}
            >
              Удалить
            </ActionSheetItem>
          }
        >
          {({ open, setAnchorElement }) => (
            <div onClick={open} ref={setAnchorElement}>
              Вкл.
            </div>
          )}
        </Dropdown>
      )
    }

    return null
  }

  return (
    <Panel id={id}>
      <PanelHeader title={title} goBack="home" />
      <Group>
        <Cell
          after={
            <Dropdown content={renderMenu()}>
              {({ open, setAnchorElement }) => {
                return (
                  <span className={s.after} ref={setAnchorElement} onClick={open}>
                    {activeMenuItem.label} <Icon28ChevronDownOutline width={20} />
                  </span>
                )
              }}
            </Dropdown>
          }
        >
          Кто может видеть мой профиль
        </Cell>
      </Group>
      <Group>
        {platforms.map(platform => (
          <Cell
            before={<img width={32} height={32} src={platform.iconSrc} className={s.icon} />}
            key={platform.id}
            after={getAfterComponent(platform)}
            indicator={getIndicatorComponent(platform)}
          >
            {platform.label}
          </Cell>
        ))}
      </Group>
    </Panel>
  )
}

export default Settings
