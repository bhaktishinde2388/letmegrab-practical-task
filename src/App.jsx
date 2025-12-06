import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Signup from './views/Signup/Signup'
import Products from './views/Products/Products'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/products" element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App