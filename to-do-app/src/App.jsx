import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import HomeComponent from './pages/home';
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
