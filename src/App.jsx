import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './Pages/InterviewPrep/LandingPage'
import InterviewPrep from './Pages/InterviewPrep/Components/InterviewPrep'
import Dashboard from './Pages/Home/Dashboard'
import UserProvider from './context/userContext'

const App=()=>{
  return (
    <UserProvider>
    <div>
    <Router>
    <Routes>
      
      <Route path='/' element={<LandingPage />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />

    </Routes>
    </Router>

    <Toaster toastOptions={{
      className:"",
      style:{
        fontSize:"13px"
      }
    }} />
    </div>
    </UserProvider>
  )
}

export default App