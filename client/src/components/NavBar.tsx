import React from "react";
import { Link } from "react-router-dom";
import { FaAlignJustify, FaPlusCircle, FaHome, FaRegUserCircle, 
  FaSignOutAlt, FaSignInAlt, FaTachometerAlt, FaProjectDiagram, FaUserPlus } from "react-icons/fa";

import "../styles/NavBarLoggedIn.css";

interface NavBarProps {
  userId: number,
  isLoggedIn: boolean;
  logOut: () => void;
}


function NavBarLoggedIn({ userId, isLoggedIn, logOut } : NavBarProps) {
  return (
    <nav className="navbar">
        {isLoggedIn ? (
        <ul className="navbar-list">
          <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome className="navbar-icon" />
            <span className="navbar-name">Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to={`/${userId}/dashboard`} className="navbar-link">
            <FaTachometerAlt className="navbar-icon" />
            <span className="navbar-name">Dashboard</span>
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link to="/issues" className="navbar-link">
            <FaAlignJustify className="navbar-icon" />
            <span className="navbar-name">Issue List</span>
          </Link>
        </li> */}
        <li className="navbar-item">
          <Link to="/add-issue" className="navbar-link">
            <FaPlusCircle className="navbar-icon" />
            <span className="navbar-name">Add Issue</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to='/workflow' className="navbar-link">
            <FaProjectDiagram className="navbar-icon" />
            <span className="navbar-name">Workflow</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/profile" className="navbar-link">
            <FaRegUserCircle className="navbar-icon" />
            <span className="navbar-name">Profile</span>
          </Link>
        </li>
        <li>
          <Link to='/' className='navbar-link' 
          onClick={logOut}>
            <FaSignOutAlt className="navbar-icon" />
            <span className="navbar-name">Logout</span>
          </Link>
        </li>
      </ul>) : 
        (
          <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            <FaHome className="navbar-icon" />
            <span className="navbar-name">Home</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to='/login' className="navbar-link">
            <FaSignInAlt className="navbar-icon" />
            <span className="navbar-name">Login</span>
          </Link>
        </li>
        <li className="navbar-item">
          <Link to='/register' className="navbar-link">
            <FaUserPlus className="navbar-icon" />
            <span className="navbar-name">Register</span>
          </Link>
        </li>
      </ul>)
      }
    </nav>
  );
}

export default NavBarLoggedIn;
