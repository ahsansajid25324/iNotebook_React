import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [credentials,setcredential]=useState({email:"",password:""})
    const Navigate=useNavigate()
    const handleClick= async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
        
            headers: {
              "Content-Type": "application/json",
            },
        
            body: JSON.stringify({email:credentials.email, password:credentials.password})
          });
      
          const data=await response.json()
          
          
          if(data.success){
            
            //redirect
            localStorage.setItem('token',data.authtoken)
          
            Navigate("/")
          }
          else{
            alert('Invalid Credentials')
          }
        
          
    }
    const onChange = (e) => {
    

        setcredential({ ...credentials, [e.target.name]: e.target.value });
      };
  return (
    
    <div>
        <form onSubmit={handleClick}>
          
        <div className="form-group my-4">
        
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email"  onChange={onChange} value={credentials.email} name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
        </div>
        
        <div className="form-group my-2">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control"  value={credentials.password} onChange={onChange}  name="password" id="password" placeholder="Password"/>
        </div>
  
        <button type="submit" className="btn btn-primary my-2">Submit</button>
        </form>
      
    </div>
  )
}

export default Login
