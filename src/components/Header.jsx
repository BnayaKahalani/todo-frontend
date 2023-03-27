import * as React from "react"
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  MenuItem,
  Dialog,
  CssBaseline,
  useScrollTrigger,
  Slide,
} from "@mui/material"

import { SportsSoccer as SportsSoccerIcon } from "@mui/icons-material"

import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"

import TodoForm from "../components/TodoForm"

const Header = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [anchorElUser, setAnchorElUser] = useState(null)

  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleLogout = () => {
    setAnchorElUser(null)
    logout()
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleUserMenuClick = (pageURL) => {
    setAnchorElUser(null)
    navigate(pageURL)
  }

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const HideOnScroll = (props) => {
    const { children, window } = props

    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
    })

    return (
      <Slide
        appear={false}
        direction='down'
        in={!trigger}
      >
        {children}
      </Slide>
    )
  }

  return (
    <HideOnScroll>
      <AppBar
        style={{ background: "white", color: "black" }}
        position='sticky'
      >
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between" }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <SportsSoccerIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
              <Typography
                variant='h5'
                noWrap
                component='a'
                href='/'
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                GoalGuru
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              {user && (
                <div>
                  <span
                    className='material-symbols-outlined add'
                    onClick={handleClickOpen}
                  >
                    add
                  </span>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                  >
                    <TodoForm onClose={handleClose} />
                  </Dialog>
                </div>
              )}
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
                color='inherit'
              ></IconButton>
            </Box>
            <SportsSoccerIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GoalGuru
            </Typography>

            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt='Remy Sharp'
                    src='/static/images/avatar/2.jpg'
                  />
                </IconButton>

                <Menu
                  sx={{ mt: "45px" }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                >
                  <MenuItem
                    key='userSettings'
                    onClick={() => handleUserMenuClick("/user-settings")}
                  >
                    <Typography textAlign='center'>Settings</Typography>
                  </MenuItem>
                  <MenuItem
                    key='logout'
                    onClick={handleLogout}
                  >
                    <Typography textAlign='center'>Logout</Typography>
                  </MenuItem>
                </Menu>
              </Box>
            )}
            {!user && (
              <div className='login-logout'>
                <Link to='/login'>Login</Link>
                <Link to='/signup'>Signup</Link>
              </div>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  )
}

export default Header
