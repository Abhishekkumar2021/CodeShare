import React, { useContext, useEffect, useState } from "react";
import parse from "html-react-parser";
import styled from "styled-components";
import useToggle from "../hooks/useToggle";
import { VscOpenPreview } from "react-icons/vsc";
import { FaBold, FaCode, FaHeading, FaItalic, FaLink } from "react-icons/fa";
import {IoCheckmarkDoneSharp} from 'react-icons/io5'
import { BsFillChatSquareTextFill } from "react-icons/bs";
import { AiOutlineLink } from "react-icons/ai";
import useInput from "../hooks/useInput";
import DescriptionContext from "../DescriptionContext";
const StyledEditor = styled.div`
  width: 100%;
  min-height: 92vh;
  display: flex;
  align-items: center;
  padding:10px;
  flex-direction: column;
  .buttons {
    background: white;
    padding: 7px 15px;
    box-shadow: 0 3px 5px 2px rgb(0, 0, 0, 0.15);
    margin-bottom: -20px;
    border-radius: 10px;
    z-index: 5;
    .icon {
      width: 40px;
      height: 40px;
      padding: 10px;
      margin: 2px;
      border-radius: 20px;
    }
    .link{
        background: ${({ link }) => (link && 'rgba(230,230,256,0.9)')};

    }
    .code{
        background: ${({ code }) => (code && 'rgba(230,230,256,0.9)')};


    }
    .heading{
        background: ${({ heading }) => (heading && 'rgba(230,230,256,0.9)')};

    }
    .bold{
        background: ${({ bold }) => (bold && 'rgba(230,230,256,0.9)')};

    }
    .italic{
        background: ${({ italic }) => (italic && 'rgba(230,230,256,0.9)')};

    }
  }
  .content {
    position: relative;
    border-radius: 20px;
    width:100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    textarea {
      border-radius: 20px;
      flex: 1;
      resize: none;
      padding: 20px;
      border: none;
      outline: none;
      min-height:600px;
    }

    .preview {
      z-index: 100;
      position: absolute;
      width: 30px;
      height: 30px;
      padding: 5px;
      top: 10px;
      right: 10px;
      box-shadow: 0 3px 5px 2px rgb(0, 0, 0, 0.15);
      border-radius: 20px;
      transition: 0.3s ease all;
      background: white;
    
      &:hover {
        transform: scale(1.1);
      }
    }
    .parsed {
      transition: 0.3s ease all;
      width: 100%;
      transform: ${({ preview }) => (preview ? "scale(1)" : "scale(0)")};
      border-radius: 20px;
      height: ${({ preview }) => (preview ? "auto" : "0")};
      background: white;
      padding: 20px;
      box-shadow: 0 3px 5px 2px rgb(0, 0, 0, 0.15);
      transform-origin: bottom left;
      position: relative;
      pre{
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
    }
      span {
        background: rgb(20,20,60);
        position: absolute;
        top: -10px;
        right: -10px;
        border-radius: 20px;
        padding: 10px 20px;
        color: white;
        box-shadow: 0 3px 5px 2px rgb(0, 0, 0, 0.15);
      }
    }
    
  }
    input{
        padding:5px;
        border:none;
     outline:none;
    }
    .anchor{
        div{
            display: flex;
            align-items: center;
            gap:5px;
        }
        button{
            background:white;
            border:none;
            outline:none;
            display: flex;
            align-items: center;
            gap:5px;
            padding:5px 10px;
            border-radius: 20px;
        box-shadow: 0 3px 5px rgb(0, 0, 0, 0.15);
        margin-top:10px;
        }

    }
`;

function Editor({value}) {
const [des,setDes] = useContext(DescriptionContext);
  const [string, setString] = useState(value || "");
  const [HTML, setHTML] = useState("");
  const [href,handleHref] = useInput('');
  const [text,handleText] = useInput('');
  const [stack,setStack] = useState([]);
  const [dis, toggleDis] = useToggle(false);
  const [bold, toggleBold] = useToggle(false);
  const [italic, toggleItalic] = useToggle(false);
  const [link, toggleLink] = useToggle(false);
  const [heading, toggleHeading] = useToggle(false);
  const [code, toggleCode] = useToggle(false);
  const [preview, togglePreview] = useToggle(false);

  
  useEffect(()=>{
    const newStr = string.replaceAll('\n','<br/>');
    setHTML(newStr);
  },[string,des])

  const handleChange = (e) => {
    setDes(HTML)
    setString(e.target.value);
  };
  const handleBold = () => {
    if(bold && stack[stack.length-1]!=='bold') return;
    else if(bold && stack[stack.length-1]==='bold'){
        const newStack = stack;
        newStack.pop()
        setStack(newStack)
        toggleBold();
        setString(string+' </b> ')
    }else{
        toggleBold();
        setStack([...stack,'bold'])
        setString(string+' <b> ')
    } 
  };
  const handleLink = () => {
    toggleDis()
    toggleLink()
  };
  const handleItalic = () => {
    if(italic && stack[stack.length-1]!=='italic') return;
    else if(italic && stack[stack.length-1]==='italic'){
        const newStack = stack;
        newStack.pop()
        setStack(newStack)
        toggleItalic();
        setString(string+' </i> ')
    }else{
        toggleItalic();
        setStack([...stack,'italic'])
        setString(string+' <i> ')
    } 
  };
  const handleHeading = () => {
    if(heading && stack[stack.length-1]!=='heading') return;
    else if(heading && stack[stack.length-1]==='heading'){
        const newStack = stack;
        newStack.pop()
        setStack(newStack)
        toggleHeading();
        setString(string+' </h2> ')
    }else{
        toggleHeading();
        setStack([...stack,'heading'])
        setString(string+' <h2> ')
    }
  };
  const handleCode = () => {
    if(code && stack[stack.length-1]!=='code') return;
    else if(code && stack[stack.length-1]==='code'){
        const newStack = stack;
        newStack.pop()
        setStack(newStack)
        toggleCode();
        setString(string+' </code></pre> ')
    }else{
        toggleCode();
        setStack([...stack,'code'])
        setString(string+' <pre><code> ')
    }
  };
  const handleButton = ()=>{
    toggleDis();
    setString(string + ` <a href=${href}/> ${text} </a> `)
    toggleLink();
  }
  return (
    <StyledEditor
      preview={preview}
      code={code}
      link={link}
      heading={heading}
      bold={bold}
      italic={italic}
    >
      <div className="buttons">
        <FaBold onClick={handleBold} className="icon bold" />
        <FaItalic onClick={handleItalic} className="icon italic" />
        <FaHeading onClick={handleHeading} className="icon heading" />
        <FaCode onClick={handleCode} className="icon code" />
        <FaLink onClick={handleLink} className="icon link" />
        {dis && 
          <div className="anchor">
            <div>
                <AiOutlineLink/>
            <input type="text" className="link-icon" value={href} onChange={handleHref}  placeholder="Provide address here..." />
            </div>
            <div>
                <BsFillChatSquareTextFill/>
            <input type="text"  value={text} onChange={handleText} placeholder="Text here..." className="link-icon"  />
            </div>
            <button onClick={handleButton}><IoCheckmarkDoneSharp   className="link-icon" /> Done</button>
          </div>
        }
      </div>
      <div className="content">
        <VscOpenPreview className="preview" onClick={togglePreview} />
        <textarea value={string} onChange={handleChange} />
        <div className="parsed">
          <span>Preview</span>
          {parse(HTML)}
        </div>
      </div>
    </StyledEditor>
  );
}

export default Editor;
