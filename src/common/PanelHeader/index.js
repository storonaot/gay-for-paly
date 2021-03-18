import React, { useContext } from 'react'

import { PanelHeaderButton, PanelHeader as VKPanelHeader } from '@vkontakte/vkui'
import { Icon28ArrowLeftOutline } from '@vkontakte/icons'

import { AppContext } from '../../context'

const PanelHeader = ({ title, goBack }) => {
  const { setActivePanel } = useContext(AppContext)

  return (
    <VKPanelHeader
      left={
        goBack && (
          <PanelHeaderButton
            onClick={() => {
              setActivePanel({ name: goBack })
            }}
          >
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
