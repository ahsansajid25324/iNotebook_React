import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [credentials,setcredential]=useState({name:"",email:"",password:"",cpassword:""})
  const {name,email,password}=credentials
  const Navigate=useNavigate()
  const handleClick= async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/cred", {
        method: "POST",
    
        headers: {
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify({name,email,password})
      });
  
      const json=await response.json()
      console.log(json)
      // if(json.success){
      //   //redirect
      //   localStorage.setItem('token',json.authtoken)
      //   Navigate("/")
      // }
      // else{
      //   alert('Invalid Credentials')
      // }
    
      
}
const onChange = (e) => {


    setcredential({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form onSubmit={handleClick}>
      <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter name"/>
      </div>
      <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} placeholder="Enter email"/>
      </div>
      <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange} placeholder="Password"/>
      </div>
      <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" minLength={5} required  onChange={onChange} placeholder="Confirm Password"/>
      </div>
      
      <button type="submit" className="btn btn-primary my-2">Submit</button>
    </form>
       
      
    </div>
  )
}

export default Signup
