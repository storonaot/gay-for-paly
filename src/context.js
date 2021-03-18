import React from 'react'

import { noop } from './utils'

export const AppContext = React.createContext({
  activePanel: null,
  setActivePanel: noop,
  activePopout: null,
  setActivePopout: noop,
  user: null,
  setUser: noop,
  activeModal: null,
  setActiveModal: noop,
})
