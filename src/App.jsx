import React from 'react'
import SignUp from './pages/signUp/index'
import SignIn from './pages/signIn/Index'

import { BrowserRouter, Routes, Route } from "react-router";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< SignUp />}> </Route>
        <Route path="/signin" element={< SignIn />}> </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
