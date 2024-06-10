import React from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify, FaPlusCircle, FaHome, FaRegUserCircle } from "react-icons/fa";

import "../styles/NavBar.css";

function NavBarLoggedIn() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome className="navbar-icon" />
            <span className="navbar-name">Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            <FaRegUserCircle className="navbar-icon" />
            <span className="navbar-name">Profile</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-issue" className="navbar-link">
            <FaPlusCircle className="navbar-icon" />
            <span className="navbar-name">Add Issue</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/issues" className="navbar-link">
            <FaAlignJustify className="navbar-icon" />
            <span className="navbar-name">Issue List</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBarLoggedIn;
