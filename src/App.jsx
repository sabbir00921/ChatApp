import React from 'react'
import SignIn from './pages/signIn/Index'
import Signup from './pages/signup/index';
import RootLayout from './components/rootLayout/RootLayout';
import Home from './pages/Home/Index';
import Message from './pages/Message/index';
import Notification from './pages/Notification/index';
import Error from './pages/Error/Error';
import { BrowserRouter, Routes, Route } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={< Signup />}/>
        <Route path="/signin" element={< SignIn />}/> 
        <Route path="/" element={< RootLayout />}> 
        <Route path="/home" element={< Home />}/> 
        <Route path="/message" element={< Message />}/> 
        <Route path="/notification" element={< Notification />}/> 
        <Route path="*" element={<Error/>}/> 
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
