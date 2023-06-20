import { createContext, useReducer } from "react"

export const UserSettingsContext = createContext()

export const userSettingsReducer = (state, action) => {
  switch (action.type) {
    case "IS_DARK":
      return {
        team: action.payload,
      }
    default:
      return state
  }
}

export const UserSettingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userSettingsReducer, {
    team: null,
  })

  return <UserSettingsContext.Provider value={{ ...state, dispatch }}>{children}</UserSettingsContext.Provider>
}
