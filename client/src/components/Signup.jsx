import React, { useState } from 'react'
import axios from "axios";
import "../styles/Signup.css"
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        username: "",
        companyName: "",
        companyEmail: "",
        companyPhone: "",
        password: "",
        employeeSize: ""
    });
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("I am called");
            const res = await axios.post("https://cuvette-assignment-mva1.onrender.com/api/company/create",
                details,{
                withCredentials: true
            });
            console.log(res);
            if(res.data.success){
              localStorage.setItem("emailForVerification", details.companyEmail);
              navigate("/verification");
            }
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
      <h2 className='heading'>Sign Up</h2>
      <p className='p1'>Lorem Ipsum is simply dummy text</p>
        <input type="text" name='username' id='username' placeholder='Name' value={details.username} onChange={handleChage} />
        <input type="text" name='companyName' id='companyName' placeholder='Company Name' value={details.companyName} onChange={handleChage} />
        <input type="text" name='companyEmail' id='companyEmail' placeholder='Company Email' value={details.companyEmail} onChange={handleChage} />
        <input type="text" name='companyPhone' id='companyPhone' placeholder='Company Phone no.' value={details.companyPhone} onChange={handleChage} />
        <input type="text" name='password' id='password' placeholder='password' value={details.password} onChange={handleChage} />
        <input type="text" name='employeeSize' id='employeeSize' placeholder='Employee Size' value={details.employeeSize} onChange={handleChage} />
            <p className='p2'>By clicking on proceed you will accept our</p>
            <p className='p3'><Link> Terms & Conditions </Link></p>
            <p className='p3'>Already have an account <Link to={"/login"}>Click here</Link></p>
        <button className='btn' onClick={handleSubmit}>Proceed</button>
      </div>
    </div>
  )
}

export default Signup

