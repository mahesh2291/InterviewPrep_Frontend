import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {Provider} from 'react-redux'
import Login from './Pages/Auth/Login'
import SignUp from './Pages/Auth/SignUp'
import LandingPage from './Pages/InterviewPrep/LandingPage'
import InterviewPrep from './Pages/InterviewPrep/Components/InterviewPrep'
import Dashboard from './Pages/Home/Dashboard'

const App=()=>{
  return (
    
    <Router>
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />

    </Routes>
    </Router>
  )
}

export default App