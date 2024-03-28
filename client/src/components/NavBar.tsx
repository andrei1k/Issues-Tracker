import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { FiAlignJustify,FiX } from "react-icons/fi";

interface NavBarProps {
    isLoggedIn: boolean;
    logOut: () => void;
}

function NavBar({ isLoggedIn, logOut } : NavBarProps) {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect (() => {
      let handler = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node) ) {
          console.log(event.target);
          toggleMenu();
        }
      };
      if (menuVisible) {
        document.addEventListener('mousedown', handler);
      }

      return () => {
        document.removeEventListener('mousedown', handler);
      }
    });

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleMenuClick = () => {
      setMenuVisible(false);
    }

    return (
      <nav className={"navBar"}>
        {menuVisible ? 
          (<FiX className='menu-button' onClick={toggleMenu}/>) : 
          (<FiAlignJustify className='menu-button' onClick={toggleMenu}/>)
        }
          <div ref={menuRef} className={`navigation ${menuVisible ? 'open' : ''}`}>
            <Link to='/' className='menu-item' onClick={handleMenuClick}>Home</Link>
             {isLoggedIn ? (
                <>
                  <Link to='/dashboard' className='menu-item' onClick={handleMenuClick}>
                    My Dashboard
                  </Link>
                  <Link to='/profile' className='menu-item' onClick={handleMenuClick}>
                    My Profile
                  </Link>
                  <Link to='/' className='menu-item' 
                    onClick={() => {handleMenuClick(); logOut();}}>
                      Logout
                  </Link>
                </>
            ) : (
                <>
                  <Link to='/login' className='menu-item' onClick={handleMenuClick}>
                    Login
                  </Link>
                  <Link to='/register' className='menu-item' onClick={handleMenuClick}>
                    Register
                  </Link>
                </>
            )}
          </div>
        </nav>
    );



};



export default NavBar;
