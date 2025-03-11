import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils.jsx';

const Signup = () => {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copySignupInfo = { ...signupInfo };
        copySignupInfo[name] = value;
        setSignupInfo(copySignupInfo);
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('name, email and password are required')
        }

    
    try {
        const url = `https://deploy-mern-app-1-api.vercel.app/auth/signup`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupInfo)
        });
        const result = await response.json();
        const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login')
                }, 1000)
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            } else if (!success) {
                handleError(message);
            }
            console.log(result);
        } catch (err) {
            handleError(err);
        }
    }

  return (
    <div className='container'>
      <h1>Signup Here</h1>
      <form onSubmit={handleSignup}>
            <label htmlFor="first">
                Username:
            </label>
            <input onChange={handleChange} 
            type="text" 
            name="name" 
            placeholder="Enter your Username"  
            value={signupInfo.name}
            />
            

            <label htmlFor="password">
                Email Id:
            </label>
            <input onChange={handleChange} 
            type="email" 
            name="email" 
            placeholder="Enter your Password"  
            value={signupInfo.email}
            />
        

            <label htmlFor="password">
               Password:
            </label>
            <input onChange={handleChange} 
            type="password"  
            name="password" 
            placeholder="Enter your Password"  
            value={signupInfo.password}
            />

            <div className="wrap">
                <button type="submit">
                    Submit
                </button>
            </div>
            <span>Already have an account ?
    <Link to="/login"> Login</Link>
    </span>
            
        </form>
        <ToastContainer />
    </div>
  );
};

export default Signup;
  
