import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <h1>GoalGuru</h1>
        </Link>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  )
}
