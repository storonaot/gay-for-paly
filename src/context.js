import React from 'react'

import { noop } from './utils'

export const AppContext = React.createContext({
  activePanel: null,
  setActivePanel: null,
  activePopout: null,
  setActivePopout: noop,
  user: null,
  setUser: noop,
  activeModal: null,
  setActiveModal: noop,
})
