import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register';
import {Route, Link, Routes} from "react-router-dom";
import ImageSlider from "./components/Slider/ImageSlider"
import { SlideData } from './components/Slider/SliderData';


function App() {
  return (
    <main className="App">
      <Navbar/>
    {/* <ImageSlider slides={SlideData}/> */}
       <Routes>
      <Route path="/register" element={<Register/>}>
      </Route>
      </Routes> 
     
    
      
    </main>
  );
}

export default App;
