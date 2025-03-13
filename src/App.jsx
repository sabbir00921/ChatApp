import React from 'react'
import SignIn from './pages/signIn/Index'
import Signup from './pages/signup/index';
import Home from './pages/Home/Index';

import { BrowserRouter, Routes, Route } from "react-router";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={< Signup />}> </Route>
        <Route path="/signin" element={< SignIn />}> </Route>
        <Route path="/" element={< Home />}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
