import React from "react";
// { Component, useState }
import "./Navbar.css";
import { Link } from "react-router-dom";


function Navbar() {
  return (
    <nav className="NavbarItems">
      <div className="nav-div-top">
        <h1 className="navbar-logo"> OJA </h1>

        <ul className="nav-items">
          <li>
            <Link to="/home"> Home </Link>
          </li>
          <li>Search</li>
          <li>
            <Link to="/login"> Login </Link>
          </li>
          <li>
            {" "}
            <Link to="/register">Register</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>

      <ul className="nav-menu">
        <li>Bags</li>
        <li>Clothing</li>
        <li>Shoes</li>
        <li>Accessories</li>
        <li>
        <Link to="/rent"> Rent </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
