import React from "react";
import { AiFillGithub, AiOutlineCopyright } from "react-icons/ai";
import styled from "styled-components";
import Navbar from "./Navbar";
import { HiOutlineDotsVertical } from "react-icons/hi";

const StyledDiv = styled.div`
  background: url("https://images.unsplash.com/photo-1548849198-9531e306d1d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 80px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .content{
    width:800px;
    max-width:100%;
    background:white;
    box-shadow:0 3px 5px rgb(0,0,0,0.1);
    border-radius: 20px;;
    padding:20px;
    font-size:18px;

    span{
      color:teal;
      font-size:26px;
      padding:5px;
    }
    ol{
      
      padding:10px;
      padding-bottom:20px;
      li{
        font-size:16px;

        color:rgba(28, 34, 55, 0.808);
        padding:10px;
        list-style: none;
        border:1px solid lightgray;
        border-radius: 10px;
        margin:5px 0;
      }
    }


  }

  footer {
    box-shadow: 0 -3px 5px rgb(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    padding: 10px;
    background: white;
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 10px;
    span {
      display: flex;
      align-items: center;
      gap: 10px;
      #icon {
        width: 30px;
        height: 30px;
      }
    }
  }
`;

function Home() {
  document.title = "Code Share | Home";

  return (
    <StyledDiv>
      <Navbar />
      <div className="content">
        Hi, I am <span>CodeShare</span> You can use me to share your thoughts
        based on the programming concepts that you know or you can also able to
        learn from some else's contributed thoughts and ideas. let's deep dive
        into understanding me -
        <ol>
          <li>
            {" "}
            I have an authentication system so that you can register and
            Login/Logout whenever you want{" "}
          </li>
          <li>
            {" "}
            I also have a builtin editor that fully supports HTML. If you are
            familiar with HTML you can write beautiful posts as of your styles
            and choice and if you don't even know what the HTML is you can still
            able to write cool posts using the editor's interface. able to{" "}
          </li>
          <li>
            {" "}
            I also have a page named All Posts where you can see all the posts ,
            either published by you or by the peoples like You.
          </li>
          <li>
            {" "}
            You can see a single post by clicking know more button over the
            posts present in the All Posts page. And if that posts is written by
            you you can update that too.
          </li>
          <li>
            {" "}
            I also have a profile page for you where you can see your details
            with us and the posts that you have contribute on this portal. You
            can also able to delete that post if You want.
          </li>
        </ol>
        This is all about me in breif , You can explore and find more. 
        Happy Learning
      </div>
      <footer>
        <span>
          {" "}
          <a href="https://github.com/Abhishekkumar2021/CodeShare">
            {" "}
            <AiFillGithub id="icon" />{" "}
          </a>
          Contibute to this project{" "}
        </span>
        <span>
          <HiOutlineDotsVertical id="icon" />
        </span>
        <span>
          {" "}
          <AiOutlineCopyright id="icon" />
          Copyright 2022
        </span>
      </footer>
    </StyledDiv>
  );
}

export default Home;
