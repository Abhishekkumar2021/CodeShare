import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import{AiFillHome,AiFillPlusCircle, AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'
import styled from 'styled-components'
import {FaLaptopCode, FaLayerGroup} from 'react-icons/fa'
import useToggle from '../hooks/useToggle'
import {CgProfile} from 'react-icons/cg'


const StyledNav = styled.nav`
width:100vw;
padding:10px 20px;
background:white;
display: flex;
justify-content: space-between;
align-items: center;
position: fixed;
top:0px;
box-shadow:0 3px 5px 2px rgb(0,0,0,0.15);
z-index:200;
gap:10px;
.links{
    display: flex;
    justify-content:space-evenly;
    gap:20px;
}
.icon{
        font-size:28px;
        
    }
    .ham{
        transition:0.2s ease all;
        display: none;
        &:hover{
            transform: scale(1.1);  
    }
    &:active{
        transform: scale(0.8);  
    }
    }
a{
    padding:5px 15px;
    border-radius: 10px;;
    display: flex;
    gap:10px;
    transition: 0.2s ease all;
    align-items: center;

    text-decoration: none;
    
    &:hover{
        box-shadow:0 0 0 2px rgba(28, 34, 85, 0.808);
        
    }
    &:active{
        transform: scale(0.8);
        
    }
}
button{
    padding:10px 20px;
    border:none;
    outline:none;
    border-radius: 30px;
    background:rgba(28, 34, 85, 0.808);
    color:white; 
    transition: 0.2s ease all;
    font-size:14px;
    &:hover{
        box-shadow:0 0 0 2px rgba(28, 34, 85, 0.808);
        background:white;
        color:rgba(28, 34, 85, 0.808);
        
    }
    &:active{
        transform: scale(0.8);
        
    }
}

@media only screen and (max-width:768px){
    .ham{
        display: block;

    }
    .links{
        z-index:100;
        font-size:14px;
        flex-direction: column;
        transform-origin: top left;
        background:white;
        position: fixed;
        top:70px;
        left:8px;
        box-shadow:0 3px 5px 2px rgb(0,0,0,0.15);
        border-radius: 10px;
        padding:10px;
        transition:0.3s ease all;
        transform: ${({dis})=>dis?"scale(1)":"scale(0)"};
    }
}
`;

function Navbar() {
  const [dis,toggleDis] = useToggle(false);
  const [login,toggleLogin] = useToggle(localStorage.getItem("authToken"))
  const navigate = useNavigate();
  const handleClick = ()=>{
    if(login){
        toggleLogin();
        localStorage.removeItem("authToken");
        navigate("/login")
    }else{
        navigate("/login")
    }
}
  return (
    <StyledNav dis={dis}>
       {!dis?<AiOutlineMenu className="icon ham" onClick={toggleDis}/>:<AiOutlineClose className="icon ham" onClick={toggleDis}/>} 
        <div className='links'>
        <Link to='/'><AiFillHome className='icon'/> Home</Link>
        <Link to='/post/new'><AiFillPlusCircle className='icon'/> Create Post</Link>
        <Link to='/post/all'><FaLayerGroup className='icon'/> All Posts</Link>
        <Link to='/editor'><FaLaptopCode className='icon'/> Editor</Link>
        <Link to='/profile'><CgProfile className='icon'/> Profile</Link>

        </div>
        <button onClick={handleClick}>{login?"Logout":"Login / Register"}</button>
        
    </StyledNav>
  )
}

export default Navbar