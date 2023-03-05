import { React, useState } from "react"
import { Box, Typography, Switch } from "@mui/material"

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false)

  const handleDarkModeChange = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className='user-settings'>
      <Box>
        <Typography variant='h5'>Settings</Typography>
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <Typography>Dark mode</Typography>
          <Switch
            checked={darkMode}
            onChange={handleDarkModeChange}
          />
        </Box>
      </Box>

      <label>Team:</label>
      <select>
        <option value='default'>Default</option>
        <option value='barcelona'>Barcelona</option>
        <option value='real-madrid'>Real Madrid</option>
        <option value='liverpool'>Liverpool</option>
      </select>
    </div>
  )
}

export default Setting
