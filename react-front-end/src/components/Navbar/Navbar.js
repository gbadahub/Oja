import React, { Component, useState } from "react";
import { Menuitems } from "./Menuitems";
import { Navitems } from "./Navitems";
import "./Navbar.css";


function Navbar() {
  return (
    <nav className="NavbarItems">
      <div className="nav-div-top">
      <h1 className="navbar-logo"> OJA </h1>

      
      <ul className="nav-items">
        {Navitems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      </div>

      <ul className="nav-menu">
        {Menuitems.map((item, index) => {
          return (
            <li key={index}>
              <a className={item.cName} href={item.url}>
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
      
    </nav>
  );
}

export default Navbar;
