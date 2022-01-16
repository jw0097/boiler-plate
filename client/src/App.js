import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import { Auth } from './hoc/auth';


function App() {
  return (
    <Router>
        <Routes>
          <Route path = '/' element = { Auth(LandingPage, null) } /> 
          <Route path = '/login' element = { Auth(LoginPage, false) } /> 
          <Route path = '/register' element = { Auth(RegisterPage, false) } /> 
        </Routes>
    </Router>
  )
}

export default App
