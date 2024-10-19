import React, { useContext } from 'react'
import "../styles/SideBar.css";
import { CiLogout } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { MdHome } from "react-icons/md";
import axios from 'axios';
import UserContext from '../context/UserContext';

const Sidebar = () => {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post("https://cuvette-assignment-mva1.onrender.com/api/company/logout",{}, {withCredentials: true});
      console.log(res);
      localStorage.removeItem("user");
      setUser(null);
       console.log("Navigating to login...");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='side-bar'>
        <Link to={"/"} className='home'><MdHome /></Link>
        <p  className='logout' onClick={handleLogout} ><CiLogout /></p>
        
    </div>
  )
}

export default Sidebar
