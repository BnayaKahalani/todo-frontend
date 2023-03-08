import { React, useState } from "react"
import { Box, Typography, Switch, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

const Setting = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [team, setTeam] = useState("")

  const handleChange = (event) => {
    setTeam(event.target.value)
  }

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

      <Box>
        <FormControl fullWidth>
          <InputLabel id='favorite-team'>Favorite Team</InputLabel>
          <Select
            labelId='favorite-team'
            id='select'
            variant='outlined'
            value={team}
            label='Favorite Team'
            onChange={handleChange}
          >
            <MenuItem value={"default"}>Default</MenuItem>
            <MenuItem value={"barcelona"}>Barcelona</MenuItem>
            <MenuItem value={"real-madrid"}>Real Madrid</MenuItem>
            <MenuItem value={"liverpool"}>Liverpool</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
  )
}

export default Setting
