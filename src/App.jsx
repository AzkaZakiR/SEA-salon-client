import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Count from './Pages/Count';
import Test from './Pages/Test';
import Home from './Pages/Home/Home';
import Banner from './Pages/Home/Banner';
import Hal from './Pages/Hal';
import Login from './Pages/Login';
// import SignIn from './Pages/SignIn';
import Register from './Pages/Register';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/count' element={<Count />}></Route>
          <Route path="/" element={<Test />}></Route>
          {/* <Route path='/' element=<Home />></Route> */}
          <Route path='/home' element={<Home />}></Route>
          <Route path='/hal' element={<Hal />}></Route>
          <Route path='/banner' element={<Banner />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
