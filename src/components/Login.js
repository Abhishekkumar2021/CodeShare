import React, { useState } from 'react'
import styled from 'styled-components'
import useInput from '../hooks/useInput';

import {MdEmail} from 'react-icons/md'
import {RiLockPasswordFill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {BiErrorCircle} from 'react-icons/bi'

const StyledDiv = styled.div`
width:100%;
min-height:100vh;
padding:10px;
background:rgb(217, 241, 250);
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap:10px;
.error{
  background:white;
  padding:10px 20px;
  max-width:100%;
  border-radius: 10px;
  box-shadow:0 3px 5px rgb(0,0,0,0.2);
  text-align: center;
  color:red;
  display: flex;
  align-items: center;
  gap:10px;
  transition:0.2s ease all;

  transform:${({err})=>err?"scale(1)":"scale(0)"};
  height:${({err})=>err?"auto":"0"};

}
.icons{
    width:30px;
    height:30px;
  }
.card{
  width:800px;
  max-width:100%;
  display:flex;
  box-shadow:0 3px 5px rgb(0,0,0,0.2);
  border-radius: 20px;

  #sidebar{
    flex:1;
    background:url("https://images.unsplash.com/photo-1654555244707-9a4d785a23ec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80");
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 20px 0 0 20px;
  }
  form{
  background:white;
  padding:40px;
  border-radius: 0 20px 20px 0;
display: flex;
flex-direction: column;
gap:15px;
h1{
  text-align: center;
  border-bottom: 1px solid teal;
  padding-bottom:10px;
}
.label{
  display: flex;
  align-items: center;
  gap:10px;

}
input{
  padding:10px 15px;
  border-radius: 2px;
  border:none;
  outline:none;
  transition:0.3s ease all;

  &:hover{
    box-shadow:  0 1px 0 teal ;
  }
}
button{
  margin:0 auto;
  padding:10px 25px;
  border:none;
  outline:none;
  background:teal;
  color:white;
  border-radius: 30px;
  box-shadow:0 3px 5px rgb(0,0,0,0.2);
  transition:0.3s ease all;

  &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.9);
  }
}
a{
  color:teal;
  transition:0.3s ease all;
  &:hover{
    text-decoration: none;
  }
}
}

}
@media only screen and (max-width:768px){
  .card{
    flex-direction: column;
    flex-grow: 1;
    #sidebar{
      border-radius: 20px 20px 0 0;
    }
    form{
      border-radius: 0 0 20px 20px;
    }
  }
}


`;


function Login() {
  document.title="Login"
  const [email,handleEmail] = useInput("")
  const [password,handlePassword] = useInput("")
  const [error,setError] = useState("");
  const navigate = useNavigate();



  const handleSubmit = async (e)=>{
    e.preventDefault();
    const config = {
      header:{
        "Content-Type":"application/json"
      }
    }
    try{
      const res = await axios.post("http://localhost:8080/api/user/login",{email,password},config);
        localStorage.setItem("authToken",res.data.token);
        navigate("/");
    }catch(err){
      setError(err.response.data.error);
      setTimeout(()=>{
        setError("");
      },5000)
    }

  }
  return (
    <StyledDiv err={error!==""}>
       <div className='error'><BiErrorCircle className="icons"/>{error}</div>
      <div className='card'>
        <div id="sidebar"></div>
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        
      <div className=" label">
          <MdEmail className="icons" />
          <label htmlFor="email">Email</label>
        </div>
        <input

          type="email"
          placeholder="Enter the email here...."
          name="email"
          value={email}
          onChange={handleEmail}
          required
        />
      <div className=" label">
          <RiLockPasswordFill className="icons" />
          <label htmlFor="password">Password </label>
        </div>
        <input

          type="password"
          placeholder="Enter the password here...."
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />
        <button>Login</button>
        <h3>Don't have an account? <Link to="/register">Register</Link> </h3>
      </form>
      </div>
      
    </StyledDiv>
    
  )
}

export default Login