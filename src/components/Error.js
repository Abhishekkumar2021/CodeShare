import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const StyledDiv = styled.div`

width:100%;
min-height:100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
div{
  overflow: hidden;
  position:relative;
  display: flex;
flex-direction: column;
justify-content: center;
  background:white;
  padding:30px 50px;
  box-shadow:0 3px 5px rgb(0,0,0,0.1);
  border-radius:5px;
  gap:10px;
  h1{
    font-size:48px;
    color:rgb(31, 31, 100);
    font-weight:300;
  }
  a{
    transition: 0.1s ease all;
    margin:0 auto;
    text-decoration: none;
    padding:10px 30px;
    background:rgb(31, 31, 100);
    color:white;
    border-radius: 30px;;
    &:hover{
      background:white;
      color:rgb(31, 31, 100);
      box-shadow:0 0 0 1px rgb(31, 31, 100);
    }
    &:active{
      transform:scale(0.9);
    }
  }

}
`;

function Error() {
  document.title = '404 Not Found!'

  return (
    <StyledDiv>
      <div>
      <h1>Nothing here</h1>
      <Link to='/'>Go Home</Link>
      </div>
    </StyledDiv>
  )
}

export default Error