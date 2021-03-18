import React, { useCallback, useMemo, useState } from 'react'
import { ActionSheet, Group } from '@vkontakte/vkui'
import { createPortal } from 'react-dom'

import s from './styles.module.css'

const getPortalElement = () => {
  const PORTAL_ELEMENT_ID = 'DropdownPortal'

  let element = document.getElementById(PORTAL_ELEMENT_ID)

  if (!element) {
    element = document.createElement('div')
    element.id = PORTAL_ELEMENT_ID
    element.classList.add(s.portal)

    document.body.appendChild(element)
  }

  return element
}

/**
 * Компонент для выпадающего меню.
 * Внутри используется ActionSheet из vkui, поэтому использовать с осторожностью,
 * скорее всего в вашем кейсе работать не будет.
 * Не использовать в формах, fixed элементах, контейнерах со скроллом
 * Нельзя кастомизировать позиционирование.
 */
const Dropdown = ({ children, content, iosCloseItem = null, onClose, ...props }) => {
  const [anchorElement, setAnchorElement] = useState(null)
  const [open, setOpen] = useState(false)

  const portalElement = useMemo(() => {
    return getPortalElement()
  }, [])

  const handleCloseRequest = useCallback(() => {
    setOpen(false)

    if (typeof onClose === 'function') {
      onClose()
    }
  }, [onClose])

  const handleOpenRequest = useCallback(() => {
    setOpen(true)
  }, [])

  const renderProps = useMemo(
    () => ({
      setAnchorElement,
      open: handleOpenRequest,
      isOpened: open,
    }),
    [handleOpenRequest, open],
  )

  return (
    <>
      {children(renderProps)}
      {open &&
        anchorElement &&
        createPortal(
          <ActionSheet
            {...props}
            iosCloseItem={iosCloseItem}
            onClose={handleCloseRequest}
            toggleRef={anchorElement}
          >
            <Group>{content}</Group>
          </ActionSheet>,
          portalElement,
        )}
    </>
  )
}

export default Dropdown
