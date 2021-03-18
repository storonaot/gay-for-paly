import React, { useContext, useEffect, useState } from 'react'
import { Panel, Group, Cell, ActionSheetItem, Alert } from '@vkontakte/vkui'
import { Icon28ChevronDownOutline } from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import Dropdown from '../../common/Dropdown'

import SteamIcon from '../../assets/steam.jpg'
import BattlenetIcon from '../../assets/battlenet.jpg'

import s from './styles.module.css'
import { getUser, updatePrivateStatus } from '../../api'
import { AppContext } from '../../context'
import { MODALS } from '../../constants'

const menu = [
  { id: 1, label: 'Все' },
  { id: 2, label: 'Друзья' },
  { id: 3, label: 'Никто' },
]

const Settings = ({ id, title, user }) => {
  const platforms = [
    { id: 1, label: 'Steam', iconSrc: SteamIcon, connected: user ? user.steam_id : null },
    { id: 2, label: 'Battle.net', iconSrc: BattlenetIcon, connected: false },
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
            action: fetchUser,
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

  const fetchUser = async () => {
    const updatedUser = await getUser()

    if (updatedUser) {
      if (user.steam_id) setActivePopout(null)
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

      setUser(user)
    }
  }

  const connectBattleNet = () => {}

  const renderMenu = () => (
    <>
      {menu.map(item => (
        <ActionSheetItem
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
      <div onClick={platform.label === 'Steam' ? connectSteam : connectBattleNet}>Подключить</div>
    )
  }

  const getIndicatorComponent = platform => {
    if (platform.connected) {
      return (
        <Dropdown
          content={
            <ActionSheetItem autoclose mode="destructive">
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
