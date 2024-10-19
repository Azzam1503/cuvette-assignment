import React, { useEffect, useState } from 'react'
import axios from "axios";
import "../styles/Login.css"
import { useNavigate } from 'react-router-dom';

const Verification = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const storedEmail = localStorage.getItem("emailForVerification");
      if(storedEmail){
        setEmail(storedEmail);
      }else{
        navigate("/signup");
      }
    },[navigate])
    
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("I am called");
            const res = await axios.post("https://cuvette-assignment-mva1.onrender.com/api/company/verify",
                {email, otp},{
                withCredentials: true
            });
            console.log(res);
            if(!res.data.success){
              setError(res.data.message);
            }
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='signin'>
      <div className='side-text'>
        <p>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley</p>
      </div>
      <div className='sing-in'>
      <h2 className='heading'>Verify Yourself</h2>
      <p className='p1'>Lorem Ipsum is simply dummy text</p>
        <input type="text" name='otp' id='otp' placeholder='Email otp' value={otp} onChange={(e) => setOtp(e.target.value)} />
            <p className='p2'>Resend Otp</p>
            <p className='p2'>{error ? error : ""}</p>
        <button className='btn' onClick={handleSubmit}>Proceed</button>
      </div>
    </div>
  )
}

export default Verification
