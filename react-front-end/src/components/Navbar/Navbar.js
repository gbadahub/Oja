import React from "react";
import { Menuitems } from "./Menuitems";

function Navbar() {
  return (
    <nav classname="NavbarItems">
      <h1 className="navbar-logo"> OJA </h1>
      <div className="menu-icon"></div>
      <ul>
        {Menuitems.map((item, index) => {
          return (
            <li>
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
