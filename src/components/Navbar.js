import React from 'react'
import { Link } from 'react-router-dom'
import{AiFillHome,AiFillPlusCircle} from 'react-icons/ai'
import styled from 'styled-components'
import {FaLaptopCode, FaLayerGroup} from 'react-icons/fa'


const StyledNav = styled.nav`
width:100vw;
padding:10px 20px;
background:white;
display: flex;
justify-content: space-between;
position: fixed;
top:0px;
box-shadow:0 3px 5px 2px rgb(0,0,0,0.15);
z-index:200;
a{
    padding:5px;
    display: flex;
    gap:10px;
    align-items: center;
    .icon{
        font-size:28px;
        transition: 0.3s ease all;
    }
    text-decoration: none;
    
    &:hover{
        .icon{
            transform: scale(1.2);
        }     
    }
    &:active{
        .icon{
            transform: scale(0.8);
        }   
    }
}
`;
function Navbar() {
  return (
    <StyledNav>
        <Link to='/home'><AiFillHome className='icon'/> Home</Link>
        <Link to='/post/new'><AiFillPlusCircle className='icon'/> Create Post</Link>
        <Link to='/post/all'><FaLayerGroup className='icon'/> All Posts</Link>
        <Link to='/editor'><FaLaptopCode className='icon'/> Editor</Link>
    </StyledNav>
  )
}

export default Navbar