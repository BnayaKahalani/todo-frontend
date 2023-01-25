import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TodoContextProvider } from "./context/todoContext"
import index from './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
)
