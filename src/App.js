import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Login from './components/Login';
import Formulario from './components/Formulario';
function App() {
  return (
    <>
    {/* <div className="container mt-5"></div> */}

    <Formulario/>
    
    {/* <div/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Formulario" element={<Formulario/>}/>
      </Routes>
    </BrowserRouter> */}
    </>
  );
}

export default App;
