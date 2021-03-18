import React from 'react'
import { PanelHeaderButton, PanelHeader } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline } from '@vkontakte/icons'

const Header = ({ title, goBack }) => {
  return (
    <PanelHeader
      left={
        goBack && (
          <PanelHeaderButton data-to={goBack}>
            <Icon28ArrowLeftOutline />
          </PanelHeaderButton>
        )
      }
    >
      {title}
    </PanelHeader>
  )
}

export default Header
