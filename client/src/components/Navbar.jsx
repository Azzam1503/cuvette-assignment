import React from 'react'
import "../styles/Nav.css";
import logo from "../assets/cuvette.png";
const Navbar = () => {
  return (
    <nav>
        <img src={logo} alt="Logo" width={150} height={40} />
        <p className='nav-p'>Contact</p>
    </nav>
  )
}

export default Navbar
