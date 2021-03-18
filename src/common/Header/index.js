import React from 'react'
import { PanelHeaderButton, PanelHeader, platform } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline, Icon28ArrowRightOutline } from '@vkontakte/icons'
const osName = platform()

const Header = ({ title, goBack, goPrew }) => {
  return (
    <PanelHeader
      left={
        goBack && (
          <PanelHeaderButton data-to={goBack}>
            <Icon28ArrowLeftOutline />
          </PanelHeaderButton>
        )
      }
      right={
        goPrew && (
          <PanelHeaderButton data-to={goPrew}>
            <Icon28ArrowRightOutline />
          </PanelHeaderButton>
        )
      }
    >
      {title}
    </PanelHeader>
  )
}

export default Header
