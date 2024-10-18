import React, { useState } from 'react'
import axios from "axios";
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        companyEmail: "",
        password: "",
    });
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("I am called");
            const res = await axios.post("http://localhost:8000/api/company/login",
                details,{
                withCredentials: true
            });
            console.log(res);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleChage = (e) => {
        const {name, value} = e.target;
        setDetails((prevDetails) => ({...prevDetails, [name]: value}));
    };


  return (
    <div className='signup'>
      <div className='side-text'>
        <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
      </div>
      <div className='sing-up'>
      <h2 className='heading'>Login In</h2>
      <p className='p1'>Lorem Ipsum is simply dummy text</p>
        <input type="text" name='companyEmail' id='companyEmail' placeholder='Company Email' value={details.companyEmail} onChange={handleChage} />
        <input type="text" name='password' id='password' placeholder='password' value={details.password} onChange={handleChage} />
            <p className='p2'>Create an account</p>
            <p className='p3'><a href="">Terms </a>&<a href=""> Conditions</a></p>
        <button className='btn' onClick={handleSubmit}>Proceed</button>
      </div>
    </div>
  )
}

export default Login

