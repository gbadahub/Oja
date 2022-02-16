import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './Register';



function App(){

  return (
    <main className="App">
      <Navbar/>
      <Register />
    </main>
  );
}

export default App;
