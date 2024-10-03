import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './components/login';
import SignupPage from './components/signup';
import HomeComponent from './components/home';
function App() {

  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
            <Route path='/home' element={<HomeComponent />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
