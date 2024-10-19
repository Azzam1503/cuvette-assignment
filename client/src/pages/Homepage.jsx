import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div>
      <Link to={'/create'}><button className='btn-create'>Create Ineterview</button></Link>
    </div>
  )
}

export default Homepage
