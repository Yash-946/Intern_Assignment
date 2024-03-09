import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Post from './components/Post'

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup />} />
        <Route path='/post' element={<Post />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
