import React from 'react'
import { AiFillGithub, AiOutlineCopyright } from 'react-icons/ai';
import styled from 'styled-components';
import Navbar from './Navbar'
import {HiOutlineDotsVertical} from 'react-icons/hi'

const StyledDiv = styled.div`
  background:url('https://images.unsplash.com/photo-1548849198-9531e306d1d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  width:100%;
  min-height:100vh;
  position:relative;
 

  footer{
    box-shadow: 0 -3px 5px rgb(0,0,0,0.1);
    position: absolute;
    bottom:0;
    padding:10px;
    background:white;
    width:100%;
    display:flex;
    justify-content: center;
    gap:10px;
    span{
      display:flex;
    align-items: center;
    gap:10px;
    #icon{
      width:30px;
      height:30px;
    }
    }

  }
`;

function Home() {
  document.title="Code Share | Home"

  return (
    <StyledDiv>
      <Navbar/>
      <footer><span> <a href="https://github.com/Abhishekkumar2021/CodeShare"> <AiFillGithub id="icon"/> </a>Contibute to this project </span><span><HiOutlineDotsVertical id="icon"/></span><span> <AiOutlineCopyright id="icon" />Copyright 2022</span></footer>
    </StyledDiv>
  )
}

export default Home