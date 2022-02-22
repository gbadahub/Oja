import React, { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Rent from "./components/Rent";
import Bags from "./components/categories/Bags";
import BagsItemsPage from "./components/DetailItemPage/Bagdetails/BagsItems"
import Shoes from "./components/categories/Shoes";
import ShoesItemPage from "./components/DetailItemPage/Shoesdetails/ShoesItem";
import Clothing from "./components/categories/Clothing";
import ClothingItemPage from "./components/DetailItemPage/Clothingdetail/ClothingItem"
import Accessories from "./components/categories/Accessories";
import AccessoriesItemPage from "./components/DetailItemPage/Accessoriesdetails/AccessoriesItem";
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
        <Route path="/bags/:productId" element={<BagsItemsPage />}></Route>
      </Routes>

      <Routes>
        <Route path="/shoes" element={<Shoes />}></Route>
      </Routes>

      <Routes>
        <Route path="/shoes/:productId" element={<ShoesItemPage />}></Route>
      </Routes>

      <Routes>
        <Route path="/accessories" element={<Accessories />}></Route>
      </Routes>

      <Routes>
        <Route path="/accessories/:productId" element={<AccessoriesItemPage />}></Route>
      </Routes>
      

      <Routes>
        <Route path="/clothing" element={<Clothing />}></Route>
      </Routes>

      <Routes>
        <Route path="/clothing/:productId" element={<ClothingItemPage />}></Route>
      </Routes>
      

      <Routes>
        <Route path="/rent" element={<Rent />}></Route>
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
