import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext"
import Header from "./components/Header.jsx"
import { Home } from "./pages/Home"
import UserSettings from "./pages/UserSettings"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { createTheme } from "@mui/material/styles"
import { ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 900,
      md: 1200,
      lg: 1400,
      xl: 1536,
    },
  },
})

function App() {
  const { user } = useAuthContext()

  return (
    <ThemeProvider theme={theme}>
      <div className='app'>
        <BrowserRouter>
          <Header />
          <div className='pages'>
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                path='/signup'
                element={!user ? <Signup /> : <Navigate to='/' />}
              />
              <Route
                path='/user-settings'
                element={<UserSettings />}
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  )
}

export default App
