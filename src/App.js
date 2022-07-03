import './App.css'
import { Routes,Route } from 'react-router-dom';
import Home from './components/Home';
import All from './components/All';
import Single from './components/Single';
import Error from './components/Error';
import New from './components/New';
import DescriptionContext from './DescriptionContext'
import { useState } from 'react';
import EditorPage from './components/EditorPage';
import Update from './components/Update';

function App() {
  const [des, setDes] = useState("");
// const code = 'const express = require("express");\nconst app = express();\nconst path = require("path");\nconst axios = require("axios");'
  return (
    
    <DescriptionContext.Provider value={[des, setDes]}>
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/post/all' element={<All/>}/>
        <Route exact path='/post/new' element={<New/>}/>
        <Route exact path='/post/:id' element={<Single/>}/>
        <Route exact path='/post/update/:id' element={<Update/>}/>
        <Route exact path='/editor' element={<EditorPage/>}/>
        <Route path='*' element={<Error/>}/>
      </Routes>
      
    </div>
    </DescriptionContext.Provider>
  )
}

export default App;
