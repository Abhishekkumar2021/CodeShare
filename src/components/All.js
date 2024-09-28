import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import styled from 'styled-components'
import axios from 'axios';
import parse from 'html-react-parser'
import { Link } from 'react-router-dom';

const StyledDiv = styled.div`
padding-top:80px;
width:100%;
min-height:100vh;
background:rgb(217, 241, 250);
display: flex;
justify-content: center;
flex-wrap: wrap;
align-content: center;
gap:15px;
.post{
  width:360px;
  height:418px;
  max-width:100%;
  background: white;
  padding:20px;
  border-radius: 20px;
  box-shadow:0 3px 5px rgb(0,0,0,0.2);
  display: flex;
  gap:10px;
  flex-direction: column;
  h3{
    padding:10px;
    border-radius: 10px;
    border:2px solid rgb(20,20,56,0.5);
    font-weight: 300;
   
  }
  #des{
    padding:5px;
    flex-grow: 1 ;
    pre{
      overflow-x: auto;
      white-space: pre-wrap;
      white-space: -moz-pre-wrap;
      white-space: -o-pre-wrap;
      word-wrap: break-word;
    }
    overflow: hidden;
  }a{
    text-decoration: none;
    color:teal;
    &:hover{
      text-decoration: underline;
    }
  }
  #more{
    background:white;
   
      padding:10px 20px;
      border-radius: 20px;
      color:green;
      border:1px solid green;
      text-decoration: none;
      width:120px;
      font-size:14px;
      text-align:center;
      transition:0.2s ease all;
      &:hover{
        background:lightgreen;
      }
      &:active{
        transform: scale(0.9);
      }
  }

}

`;

function All() {
  document.title = 'All Posts'
  const [posts,setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get(`http://localhost:8080/api/posts/`)
      setPosts(res.data);
    }
    fetchPosts();

  },[])

  // UI part
  return (
    <StyledDiv>
      <Navbar/>
      {posts.map((post,idx)=>(
        <div className='post' key={idx}>
          <h3>{post.title}</h3>
          <div id="des">{parse(post.description)}</div>
          <Link id="more" to={`/post/${post._id}`}>Know More</Link>
        </div>
      ))}
    </StyledDiv>
  )
}

export default All