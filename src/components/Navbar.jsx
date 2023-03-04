import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

export const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    logout()
  }

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
              <Link
                className='material-symbols-outlined user-settings-btn'
                to='/user-settings'
              >
                settings
              </Link>
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
