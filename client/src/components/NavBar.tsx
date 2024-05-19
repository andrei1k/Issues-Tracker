import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignJustify,FiX } from "react-icons/fi";

import '../styles/NavBar.css';

interface NavBarProps {
    userId: number,
    isLoggedIn: boolean;
    logOut: () => void;
}

function NavBar({ userId, isLoggedIn, logOut } : NavBarProps) {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect (() => {
      let handler = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) ) {
          toggleMenu();
        }
      };
      if (menuVisible) {
        document.addEventListener('mousedown', handler);
      }

      return () => {
        document.removeEventListener('mousedown', handler);
      }
    },[menuVisible]);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuClick = () => {
      setMenuVisible(false);
    }
  

    return (
      <nav className='navBar'>
        {menuVisible ? 
          (<FiX className='menu-button' onClick={toggleMenu}/>) : 
          (<FiAlignJustify className='menu-button' onClick={toggleMenu}/>)
        }
          <div ref={menuRef} className={`navigation ${menuVisible ? 'open' : ''}`}>
            <Link to='/' onClick={handleMenuClick} className='menu-item'>Home</Link>
             {isLoggedIn ? (
                <>
                  <Link to={`/dashboard/${userId}`} onClick={handleMenuClick} className='menu-item'>
                    Dashboard
                  </Link>
                  <Link to='/profile' onClick={handleMenuClick} className='menu-item'>
                    Profile
                  </Link>
                  <Link to='/' className='menu-item' 
                    onClick={() => {handleMenuClick(); logOut(); }}>
                      Logout
                  </Link>
                </>
            ) : (
                <>
                  <Link to='/login' onClick={handleMenuClick} className='menu-item'>
                    Login
                  </Link>
                  <Link to='/register' onClick={handleMenuClick} className='menu-item' >
                    Register
                  </Link>
                </>
            )}
          </div>
        </nav>
    );
};



export default NavBar;
