import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { TodosContextProvider } from "./context/TodoContext"
import { AuthContextProvider } from "./context/AuthContext"
import { UserSettingsContextProvider } from "./context/UserSettingsContext"
import "./styles/index.scss"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserSettingsContextProvider>
        <TodosContextProvider>
          <App />
        </TodosContextProvider>
      </UserSettingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
