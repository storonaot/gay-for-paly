import React from 'react'
import { PanelHeaderButton, PanelHeader as VKPanelHeader } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline } from '@vkontakte/icons'

const PanelHeader = ({ title, goBack }) => {
  return (
    <VKPanelHeader
      left={
        goBack && (
          <PanelHeaderButton data-to={goBack}>
            <Icon28ArrowLeftOutline />
          </PanelHeaderButton>
        )
      }
    >
      {title}
    </VKPanelHeader>
  )
}

export default PanelHeader
