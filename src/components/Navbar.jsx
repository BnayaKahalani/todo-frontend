import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

  const handleSetting = () => {}

  return (
    <header>
      <div className='header-container'>
        <Link to='/'>
          <h1>GoalGuru</h1>
        </Link>
        <nav>
          {user && (
            <div className='user-menu'>
              <span>{user.email}</span>
              <span className='material-symbols-outlined settings-btn'>settings</span>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
