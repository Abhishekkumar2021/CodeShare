import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MdDescription, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { FaFreeCodeCamp } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiFillTags, AiOutlineCloudUpload } from "react-icons/ai";
import Navbar from "./Navbar";
import axios from 'axios'
import Editor from "./Editor";
import DescriptionContext from "../DescriptionContext";
import { useNavigate, useParams } from "react-router-dom";

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
    #input,
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
      font-size: 36px;
      box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
      border-radius: 30px;
      transition:0.3s ease all;
      margin: 0 auto;
      &:active{
        transform:scale(0.9);
      }
      button {
        border: none;
        outline: none;
        background: white;
        font-size: 24px;
      }
    }
  }
`;
function Update() {
  const [user,setUser] = useState({})
  const [des,setDes] = useContext(DescriptionContext);
  const {id} = useParams();
  document.title = "Update Post";
  const navigate = useNavigate();

  //states
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState("");

  const handleTitle = (e)=>{
    setTitle(e.target.value);
  }
  const handleCode = (e)=>{
    setCode(e.target.value);
  }
  const handleAuthor = (e)=>{
    setAuthor(e.target.value);
  }
  const handleTags = (e)=>{
    setTags(e.target.value);
  }
  useEffect(()=>{

    const fetchUserData = async ()=>{
      const res = await axios.patch(`http://localhost:3001/api/posts/${id}`)
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
        navigate("/login");
      }
      if(res.data.email!==user.email) navigate("/");
      setDes(res.data.description);  
      setAuthor(res.data.author);
      setTitle(res.data.title);
      setCode(res.data.code)
      let str = "";
      for(let i=0; i<res.data.tags.length-1; i++) str+=(res.data.tags[i]+",");
      str+=res.data.tags[res.data.tags.length-1];
      setTags(str);
    }
    fetchUserData();
  },[id,setDes,navigate,user])

  //submitting form
  const handleSubmit =async (e)=>{
    e.preventDefault();
    const array = tags.split(',');
    const res = await axios.post('https://codeshareback.herokuapp.com/api/posts/',{title,description:des,code,author,tags:array,email:user.email})
    navigate(`/post/${res.data._id}`);
  }
  return (
    <StyledDiv>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div className="title label">
          <MdOutlineDriveFileRenameOutline className="icons" />
          <label htmlFor="title">Title of the post</label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide a title here...."
          name="title"
          value={title}
          onChange={handleTitle}
        />
        <div className="description label">
          <MdDescription className="icons" />
          <label htmlFor="description">Describe the post</label>
        </div>
        <Editor value={des}/>
      
        <div className="code label">
          <FaFreeCodeCamp className="icons" />
          <label htmlFor="code">Write the code here.</label>
        </div>
        <textarea name="code" id="code" value={code} onChange={handleCode}  
/>
        <div className="author label">
          <BsFillPeopleFill className="icons" />
          <label htmlFor="title">Author </label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide author name here...."
          name="author"
          value={author}
          onChange={handleAuthor}
        />
        <div className="author label">
          <AiFillTags className="icons" />
          <label htmlFor="title">Tags </label>
        </div>
        <input
          id="input"
          type="text"
          placeholder="Provide comma seperated tags here ..."
          name="tags"
          value={tags}
          onChange={handleTags}

        />
        <div className="post">
          <AiOutlineCloudUpload />
          <button>Post</button>
        </div>
      </form>
    </StyledDiv>
  );
}

export default Update;
