import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdOutlineMail } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import Navbar from './Navbar';
import parse from 'html-react-parser'
import { AiFillDelete } from 'react-icons/ai';

const StyledDiv = styled.div`
.container{


.profile-container{
  display:flex;
justify-content: center;
align-items: center;
  width:100%;
min-height:100vh;
padding:20px;
  .profile,.error{
  padding:20px;
  background: white;
  border-radius: 10px;
  box-shadow:0 3px 5px rgb(0,0,0,0.1);

}
.profile{
  padding:2px;
  display: flex;
  width:900px;
  max-width:100%;
  
}
.right{
  padding:60px;
  display: flex;
  flex-direction: column;
  gap:20px;
}
.email{
  margin-top: -5px;
  display: flex;
  align-items: center;
  gap:10px;
  .icon{
    width:30px;
    height:30px;
  }
}
h1{
  font-weight: 300;
}
.left{
  border-radius: 10px;
  flex:1;
  background:url('https://images.unsplash.com/photo-1579783483458-83d02161294e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=797&q=80');
  background-repeat: no-repeat;
    background-position: center;
}
.error{
  font-size: 24px;
  
}
}
h1{
  text-align: center;
  border: 2px solid rgb(20,20,56,0.5);
  padding:10px;
  font-weight: 300;
  border-radius: 5px;
}
.allpost{
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
  .delete{
    display: flex;
    align-items: center;
    gap:10px;
    box-shadow:0 3px 5px rgb(0,0,0,0.2);
padding:8px 15px;
background:rgb(200,40,40);
color:white;
margin-top: 10px;
border-radius: 20px;
justify-content: center;
transition:0.2s ease all;
cursor: pointer;
      &:hover{
        transform: scale(1.03);
        }
        &:active{
          transform: scale(0.9);
        }
    .deleteicon{

      width:20px;
      height:20px;
      
    }
  }

}

}

@media only screen and (max-width:768px){
  .profile{
    flex-direction: column;
    min-height:80vh;
  }
}
}
`;

function Profile() {
  const [user,setUser] = useState({})
  const navigate = useNavigate();
  const [posts,setPosts] = useState([]);
  const [error,setError] = useState("");

  useEffect(()=>{
    document.title="Your profile"
    const fetchUser = async()=>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const res = await axios.get("http://localhost:3001/api/private",config);
        setUser(res.data.user);

      }catch(e){
        localStorage.removeItem("authToken");
        setError("Your session has expired, Please login again!")
        setTimeout(()=>{
          navigate("/login");
        },5000)
      }
      const fetchPosts = async ()=>{
        const res = await axios.get(`http://localhost:3001/api/posts/${user.email}`)
        setPosts(res.data);
      }
      fetchPosts();

    }
    fetchUser()

  },[navigate,user])
  const handleDelete = async(id)=>{
    const ans = prompt("This action is irreversible. Do you want to proceed? (Y/N)","Y");
    if(ans==="Y" || ans==="y"){
      try{
          await axios.delete(`http://localhost:3001/api/posts/${id}/${user?.email}`);
      }catch(err){
        setError(err.response.data.error);
        setTimeout(()=>{
          setError("");
        },5000)
      }
    }
  }
  return (
    <StyledDiv>
      <Navbar/>
      {error? <div className='error'>{error}</div>:
        <div className="container">
        <div className='profile-container'>
        <div className='profile'>
          <div className='left'></div>
          <div className='right'>
            <h1>Your personal data </h1>
            <div className='username'>Hi, {user?.username}</div>
            <div className='joined'>You have joined Codeshare on {user?.createdAt && user?.createdAt.toString()}</div>
            <div className='number'>Total posts : {posts?.length}</div>
            <div className='email'> <MdOutlineMail className='icon'/>{user?.email}</div>
          </div>
        </div>
      </div>
      <h1>All your posts are here </h1>
      <div className='allpost'>
      {posts.map((post,idx)=>(
        <div className='post' key={idx}>
          <h3>{post.title}</h3>
          <div id="des">{parse(post.description)}</div>
          <Link id="more" to={`/post/${post._id}`}>Know More</Link>
          <div className='delete' onClick={()=>handleDelete(post._id)}>
          <AiFillDelete className="deleteicon"  /> Delete this post
          </div>
        </div>
      ))}
      </div>
      </div>}
    </StyledDiv>
  )
}

export default Profile