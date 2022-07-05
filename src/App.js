import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import All from "./components/All";
import Single from "./components/Single";
import Error from "./components/Error";
import New from "./components/New";
import DescriptionContext from "./DescriptionContext";
import { useState } from "react";
import EditorPage from "./components/EditorPage";
import Update from "./components/Update";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

function App() { 
  const [des, setDes] = useState("");
  // localStorage

  // const code = 'const express = require("express");\nconst app = express();\nconst path = require("path");\nconst axios = require("axios");'
  return (
    <DescriptionContext.Provider value={[des, setDes]}>
      <div className="app">
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route  element={<PrivateRoute />}>
            <Route exact path="post/all" element={<All />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="post/new" element={<New />} />
            <Route exact path="post/:id" element={<Single />} />
            <Route exact path="post/update/:id" element={<Update />} />
            <Route exact path="editor" element={<EditorPage />} />
          </Route>
          <Route exact path="/" element={<Home />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </DescriptionContext.Provider>
  );
}

export default App;
