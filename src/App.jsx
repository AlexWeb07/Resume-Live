import React from 'react'
import { BrowserRouter, Form, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import MyForm from './components/MyForm'
import AdminPage from './components/AdminPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/form' element={<MyForm/>}></Route>
        <Route path='/admin' element={<AdminPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
