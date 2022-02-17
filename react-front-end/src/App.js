import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './Register';
import {Routes, Link} from "react-router-dom";


function App(){

  return (
    <main className="App">
      <Navbar/>
      <Routes exact path to="/register" component={Register}/>
      
    </main>
  );
}

export default App;
