import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Rent from "./components/Rent";
import Bags from "./components/categories/Bags";
import Shoes from "./components/categories/Shoes";
import Clothing from "./components/categories/Clothing";
import Accessories from "./components/categories/Accessories";
import { Route, Routes } from "react-router-dom";


// Link,
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user_id') || false); 
  const [loginAuth, setLoginAuth] = useState(localStorage.getItem('user_name') || '');

  return (
    <main className="App">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loginAuth={loginAuth} setLoginAuth={setLoginAuth}/>

      <Routes>
        <Route path="/bags" element={<Bags />}></Route>
      </Routes>

      <Routes>
        <Route path="/shoes" element={<Shoes />}></Route>
      </Routes>

      <Routes>
        <Route path="/accessories" element={<Accessories />}></Route>
      </Routes>
      

      <Routes>
        <Route path="/clothing" element={<Clothing />}></Route>
      </Routes>

      <Routes>
        <Route path="/rent" element={ isLoggedIn ? < Rent /> : <p> 404 LOG IN PLEASE </p>}></Route>
      </Routes>

      <Routes>
        <Route path="/register" element={<Register />}></Route>
      </Routes>

      <Routes>
        <Route path="/login" element={<Login setLoginAuth={setLoginAuth} setIsLoggedIn={setIsLoggedIn} />}></Route>
      </Routes>

      <Routes>
        <Route path="/homepage" element={<Home />}></Route>
      </Routes>
    </main>
  );
}

export default App;
