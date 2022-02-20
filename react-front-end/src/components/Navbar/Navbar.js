import React from "react";
// { Component, useState }
import "./Navbar.css";
import { Link } from "react-router-dom";
import Search from "../SearchBar/Search"


function Navbar() {
  return (
    <nav className="NavbarItems" >
      <div className="nav-div-top">
        <h1 className="navbar-logo"> OJA </h1>

        <ul className="nav-top">
          <li className="nav-top-list">
            <Link to="/home" className="nav-top-list"> Home </Link>
          </li>
          <li className="search"><Search /></li>
          <li>
            <Link to="/login" className="nav-top-list"> Login </Link>
          </li>
          <li>
            <Link to="/register" className="nav-top-list">Register</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>

      <ul className="nav-bottom">
        <li>
        <Link to="/categories/1/Bags" className="nav-top-list">Bags</Link>
        </li>
        <li>Clothing</li>
        <li>Shoes</li>
        <li>Accessories</li>
        <li>
        <Link to="/rent" className="nav-top-list"> Rent </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
