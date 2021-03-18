import React from 'react'

import { noop } from './utils'

export const AppContext = React.createContext({
  activePanel: null,
  setActivePanel: noop,
})
