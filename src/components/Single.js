import axios from 'axios';
import React, {  useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components';
import Navbar from './Navbar';
import parse from 'html-react-parser'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark,vs} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {MdDarkMode, MdOutlineContentCopy, MdOutlineDarkMode} from 'react-icons/md'
import useToggle from '../hooks/useToggle';
import { BsFillPeopleFill, BsFillTagsFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
const StyledPage = styled.div`
width:100%;
min-height:100vh;
padding:20px;
padding-top: 80px;
background:rgb(217, 241, 250);

display: flex;
flex-direction: column;
gap:10px;
align-items: center;
.Paper{
  position: relative;
  background:white;
  flex-grow: 1;
  padding:20px;
  border-radius: 10px;
  box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
  width:900px;
  max-width: 100%;
  .edit{
    position: absolute;
    top:10px;
    right:10px;
    .icon{
      width:20px;
      height:20px;
      transition:0.2s ease all;
      &:hover{
          transform: scale(1.1);
        }
      &:active{
          transform: scale(0.9);
      }
    }
  }
  #title{
    font-weight:400;
  }
  #des{
    pre{
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    }
    padding:10px ;
    a{
      color:teal;
      &:hover{
        text-decoration: none;
      }
    }
    h2{
      padding:10px 0;
      font-weight:400;
    }

  }
  .code{
    position: relative;
    .buttons{
      padding:10px 15px;
      position:absolute;
      top:0;
      right:0;
      display: flex;
      flex-direction: column;
      gap:10px;
      .icon{
        box-shadow:0 3px 5px rgb(0, 0, 0, 0.2);
        background:white;
        width:30px;
        height:30px;
        padding: 7px;
        border-radius: 50%;
        transition: 0.2s ease all;
        &:hover{
          transform: scale(1.1);
        }
      }
    }
  }
  .author{
    label{
      display: flex;
      align-items: center;
      padding:10px;
      gap:10px;
      #icon{
        width:30px;
        height:30px;
      }
    }
    display: flex;
    align-items: center;
    padding:10px;
    gap:10px;
    #author{
      background:lightyellow;
      border:1px solid orange;
      padding:10px 20px;
      border-radius: 20px;
      
    }
  }
  .tags{
    display: flex;
      align-items: center;
      flex-wrap:wrap;
      padding:10px;
      gap:10px;
      #icon{
        width:30px;
        height:30px;
      }
      .tag{
        background:lightgreen;
      padding:10px 20px;
      border-radius: 20px;
      border:1px solid green;
      color:green;
      &:hover{
        background:white;
      }
      a{
        text-decoration: none;
      }
      }
  }

}
#copy{
  background: rgb(22, 22, 72);;
  color:white;
  padding:15px 20px;
  font-size:16px;
  position:fixed;
  bottom: -80px;
  box-shadow:0 3px 5px rgb(0, 0, 0, 0.2);
border-radius: 10px;
transition: 0.2s ease all;
  transform:${({copy})=>copy &&'translateY(-100px)'};
}
`

function Single() {
  const [user,setUser] = useState({})
  const [light, toggleLight] = useToggle(true);
  const {id} = useParams();
  const [copy,setCopy] = useState(false);
  const navigate = useNavigate();

 
  const [post,setPost] = useState({description:""})
  document.title = post?.title || 'Post'
  useEffect(()=>{

    const fetchUser = async()=>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const res = await axios.get("http://localhost:8080/api/private",config);
        setUser(res.data.user);

      }catch(e){
        localStorage.removeItem("authToken");
          navigate("/login");
      }

    }
    const fetchData = async ()=>{
      const res = await axios.get(`http://localhost:8080/api/posts/${id}`)
      setPost(res.data);
    }
    fetchUser()
    fetchData();
  },[id,navigate])
  const handleCopy= ()=>{
    navigator.clipboard.writeText(post.code);
    setCopy(true);
    setTimeout(()=>{
      setCopy(false);
    },2500)
  }
  return (
    <StyledPage copy={copy}>
      <Navbar/>
      <div className='Paper'>
     {user.email===post.email && <div className='edit'><Link to={`/post/update/${post._id}`}><FaEdit className='icon'/></Link></div>}
      <h1 id="title">{post.title} </h1>
      <div id="des">{parse(post.description)}</div>
      <div className='code'>
        <div className="buttons">
        <MdOutlineContentCopy className='icon'  onClick={handleCopy}/>
        {light?<MdOutlineDarkMode className='icon' onClick={toggleLight}/>:<MdDarkMode className='icon' onClick={toggleLight}/>}
        </div> 
      <SyntaxHighlighter wrapLongLines  showLineNumbers style={!light?atomOneDark:vs}>
       {post.code}
      </SyntaxHighlighter>
      <div className='author'>
        <label><BsFillPeopleFill id="icon"/> Author</label>
        <div id="author">{post.author}</div>
      </div>
      <div className='tags'>
        <BsFillTagsFill id="icon"/> Tags
        {post.tags?.map((tag,idx)=>(
          <span className='tag' key={idx}><a href={`https://en.wikipedia.org/wiki/${tag}`}>{tag}</a></span>
        ))}
      </div>
      </div>
      <div id="copy">Copied to clipboard!</div>
      </div>
      
    </StyledPage>
  )
}

export default Single