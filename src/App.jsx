import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "../components/Navbar"
import { Home } from "../pages/Home"
import index from '../styles/index.scss'

function App() {

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
