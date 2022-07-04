import React from 'react'
import styled from 'styled-components'
import useInput from '../hooks/useInput';
import {MdEmail} from 'react-icons/md'
import {RiLockPasswordFill} from 'react-icons/ri'
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const StyledDiv = styled.div`
width:100%;
min-height:100vh;
padding:10px;
background:rgb(217, 241, 250);
display: flex;
justify-content: center;
align-items: center;
.card{
  width:800px;
  max-width:100%;
  display:flex;
  box-shadow:0 3px 5px rgb(0,0,0,0.2);
  border-radius: 20px;

  #sidebar{
    flex:1;
    background:url("https://images.unsplash.com/photo-1654309184335-465ae7e6537a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80");
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
  .icons{
    width:30px;
    height:30px;
  }
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
    min-height:96vh;
    #sidebar{
      border-radius: 20px 20px 0 0;
    }
    form{
      border-radius: 0 0 20px 20px;
    }
  }
}


`;


function Register() {
  document.title="Register"
  const [email,handleEmail] = useInput("")
  const [password,handlePassword] = useInput("")
  const [username,handleUsername] = useInput("")


  const handleSubmit = (e)=>{
    e.preventDefault();
  }
  return (
    <StyledDiv>
      <div className='card'>
        <div id="sidebar"></div>
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        
      <div className=" label">
          <FaUserCircle className="icons" />
          <label htmlFor="username">Username</label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Enter the username here...."
          name="username"
          value={username}
          onChange={handleUsername}
          required
        />
      <div className=" label">
          <MdEmail className="icons" />
          <label htmlFor="email">Email</label>
        </div>
        <input
          id="input"
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
          id="input"
          type="password"
          placeholder="Enter the email here...."
          name="password"
          value={password}
          onChange={handlePassword}
          required
        />
        <button>Register</button>
        <h3>Already have an account? <Link to="/login">Login</Link> </h3>
      </form>
      </div>
      
    </StyledDiv>
    
  )
}

export default Register