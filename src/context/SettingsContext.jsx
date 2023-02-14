import { createContext, useReducer } from "react"

export const SettingsContext = createContext()

export const settingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_SETTINGS":
      return {
        team: action.payload,
      }
    default:
      return state
  }
}

export const SettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingsReducer, {
    team: null,
  })

  return <SettingsContext.Provider value={{ ...state, dispatch }}>{children}</SettingsContext.Provider>
}
