import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MdDescription, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillTags, AiOutlineCloudUpload } from "react-icons/ai";
import Navbar from "./Navbar";
import useInput from "../hooks/useInput";
import axios from 'axios'
import Editor from "./Editor";
import DescriptionContext from "../DescriptionContext";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";

const StyledDiv = styled.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 10px;
  padding-top:80px;
  background:rgb(217, 241, 250);

  form {
    width: 800px;
    max-width:100%;
    .label {
      display: flex;
      align-items: center;
      padding: 10px 0;
      font-size: 24px;
      label {
        margin-left: 10px;
      }
    }
    input {
      min-width: 360px;
      max-width: 100%;
    }
    .icons {
      background: white;
      width: 50px;
      height: 50px;
      border-radius: 50px;
      padding: 10px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
    }
    .input,
    textarea {
      margin-bottom: 20px;
      transition: 0.1s ease all;
      font-size: 16px;
      border: none;
      outline: none;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      padding: 15px 20px;
      border-radius: 10px;
      overflow: hidden;
      &:focus {
        box-shadow: 0 5px 10px rgb(0, 0, 0, 0.15);
      }
    }
    textarea {
      width: 100%;
      resize: vertical;
      min-height: 700px;
      padding: 20px;
      overflow-y: auto;
      -ms-overflow-style: none; /* Internet Explorer 10+ */
      scrollbar-width: none; /* Firefox */
      &::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
      }
    }
    #code {
      font-family: "Fira Code", monospace !important;
    }
    .post {
      display: flex;
      justify-content: center;
      align-items: center;
      background: white;
      gap: 10px;
      width: 150px;
      padding: 10px;
      font-size: 16px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      border-radius: 30px;
      transition:0.3s ease all;
      margin: 0 auto;
      .icon{
        width:30px;
        height:30px;
      }
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      border-radius: 30px;
      transition:0.3s ease all;
      margin: 0 auto;
      &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.9);
  }
      button {
        border: none;
        outline: none;
        background: white;
        font-size: 24px;
      }
    }
  }
  .loading{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background:white;
    .lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: orange;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

  }
`;
function New() {
  const [email,setEmail] = useState("")
  const [process,toggleProcess] = useToggle(false);
  document.title = "Create Post";
  const navigate = useNavigate();

  //states
  const [title, handleTitle] = useInput("");
  const [des] = useContext(DescriptionContext);
  const [code, handleCode] = useInput("");
  const [author, handleAuthor] = useInput("");
  const [tags, handleTags] = useInput("");

  //submitting form
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const array = tags.split(',');
    toggleProcess()
    const res = await axios.post('http://localhost:8080/api/posts/',{title,description:des,code,author,tags:array,email})
    toggleProcess()
    navigate(`/post/${res.data._id}`);
  }
  useEffect(()=>{
    const fetchUser = async ()=>{
      const config = {
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`
        }
      }
      try{
        const res = await axios.get("http://localhost:8080/api/private",config);
        setEmail(res.data.user.email||"");
      }catch(e){
        localStorage.removeItem("authToken");
        navigate("/login");
      }
    }
    fetchUser();
    
  },[navigate,des])
  return (
    <StyledDiv>
      <Navbar />
      <form onSubmit={handleSubmit} >
        <div className="title label">
          <MdOutlineDriveFileRenameOutline className="icons" />
          <label htmlFor="title">Title of the post</label>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Provide a title here...."
          name="title"
          value={title}
          onChange={handleTitle}
          required
        />
        <div className="description label">
          <MdDescription className="icons" />
          <label htmlFor="description">Describe the post</label>
        </div>
        <Editor/>
      
        <div className="code label">
          <FaFreeCodeCamp className="icons" />
          <label htmlFor="code">Write the code here.</label>
        </div>
        <textarea name="code" id="code" value={code} onChange={handleCode} required />
        <div className="author label">
          <BsFillPeopleFill className="icons" />
          <label htmlFor="title">Author </label>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Provide author name here...."
          name="author"
          value={author}
          onChange={handleAuthor}
          required
        />
        <div className="author label">
          <AiFillTags className="icons" />
          <label htmlFor="title">Tags </label>
        </div>
        <input
          className="input"
          type="text"
          placeholder="Provide comma seperated tags here ..."
          name="tags"
          value={tags}
          onChange={handleTags}
          required
        />
        <div className="post">
        <AiOutlineCloudUpload className="icon"/>
          <button type="submit">Post</button>
        </div>
      </form>
      {process && <div className="loading"><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>}
    </StyledDiv>
  );
}

export default New;
