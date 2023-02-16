import React from "react"

const Setting = () => {
  return (
    <div className='user-settings'>
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
