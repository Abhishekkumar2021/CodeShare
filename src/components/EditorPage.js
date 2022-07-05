import React from 'react'
import styled from 'styled-components'
import Editor from './Editor';
import Navbar from './Navbar';
const StyledDiv = styled.div`
padding-top:60px;
width:100%;
min-height:100vh;
background:rgb(217, 241, 250);

`;

function EditorPage() {
  document.title="Editor"
  return (
    <StyledDiv><Navbar/><Editor /></StyledDiv>
  )
}

export default EditorPage