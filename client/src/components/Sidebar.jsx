import React from 'react'
import "../styles/SideBar.css";
import { CiLogout } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { MdHome } from "react-icons/md";
const Sidebar = () => {
  return (
    <div className='side-bar'>
        <Link to={"/"} className='home'><MdHome /></Link>
        <Link to={"/"} className='logout'><CiLogout /></Link>
        
    </div>
  )
}

export default Sidebar
