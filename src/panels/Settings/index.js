import React, { useState } from 'react'
import { Panel, Group, Cell, ActionSheetItem } from '@vkontakte/vkui'
import { Icon28ChevronDownOutline } from '@vkontakte/icons'

import PanelHeader from '../../common/PanelHeader'
import Dropdown from '../../common/Dropdown'

import SteamIcon from '../../assets/steam.jpg'
import BattlenetIcon from '../../assets/battlenet.jpg'

import s from './styles.module.css'

const menu = [
  { id: 1, label: 'Все' },
  { id: 2, label: 'Друзья' },
  { id: 3, label: 'Никто' },
]

const platforms = [
  { id: 1, label: 'Steam', iconSrc: SteamIcon, connected: true },
  { id: 2, label: 'Battle.net', iconSrc: BattlenetIcon, connected: false },
  // { id: 3, label: 'VK Game', iconSrc: BattlenetIcon, connected: false },
]

const Settings = ({ id, title }) => {
  const [activeMenuItem, setActiveMenuItem] = useState(menu[0])

  const renderMenu = () => (
    <>
      {menu.map(item => (
        <ActionSheetItem
          autoclose
          selectable
          checked={activeMenuItem.id === item.id}
          onClick={() => {
            setActiveMenuItem(item)
          }}
        >
          {item.label}
        </ActionSheetItem>
      ))}
    </>
  )

  const getAfterComponent = platform => {
    if (platform.connected) return null
    return 'Подключить'
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
      <PanelHeader title={title} />
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
