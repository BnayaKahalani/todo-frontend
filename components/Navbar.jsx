import { Link } from "react-router-dom"

export const Navbar = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h1>ToDo</h1>
        </Link>
      </div>
    </header>
  )
}
