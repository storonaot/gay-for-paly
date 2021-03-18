import React, { useContext } from 'react'
import { ModalRoot, ModalPage, ModalCard } from '@vkontakte/vkui'

import { MODALS } from '../../constants'

import { GamePopup } from '../PlatformDetails'
import { AppContext } from '../../context'

import { StatusForm, StoryPopup } from '../../panels/Profile'

const Modal = ({ activeModal }) => {
  const { setActiveModal } = useContext(AppContext)

  return (
    <ModalRoot
      activeModal={activeModal ? activeModal.key : null}
      onClose={() => {
        setActiveModal(null)
      }}
    >
      <ModalPage id="noop" />
      <ModalCard id={MODALS.gameItem}>
        <GamePopup />
      </ModalCard>
      <ModalCard id={MODALS.statusForm}>
        <StatusForm />
      </ModalCard>
      <ModalCard id={MODALS.storyPopup}>
        <StoryPopup />
      </ModalCard>
    </ModalRoot>
  )
}

export default Modal
