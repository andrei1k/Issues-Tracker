import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignJustify,FiX } from "react-icons/fi";

import '../styles/NavBar.css';
import Layout from './Layout.tsx';

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
    
    const handleLinkClick = (pathname: string) => {
      handleMenuClick();
      document.title = Layout(pathname);
    }

    return (
      <nav className='navBar'>
        {menuVisible ? 
          (<FiX className='menu-button' onClick={toggleMenu}/>) : 
          (<FiAlignJustify className='menu-button' onClick={toggleMenu}/>)
        }
          <div ref={menuRef} className={`navigation ${menuVisible ? 'open' : ''}`}>
            <Link to='/' className='menu-item' onClick={() => handleLinkClick('/')}>Home</Link>
             {isLoggedIn ? (
                <>
                  <Link to={`/dashboard/${userId}`} className='menu-item' 
                      onClick={() => handleLinkClick('/dashboard')}>
                    Dashboard
                  </Link>
                  <Link to='/profile' className='menu-item' 
                      onClick={() => handleLinkClick('/profile')}>
                    Profile
                  </Link>
                  <Link to='/' className='menu-item' 
                    onClick={() => {handleLinkClick('/'); logOut();}}>
                      Logout
                  </Link>
                </>
            ) : (
                <>
                  <Link to='/login' className='menu-item' 
                      onClick={() => handleLinkClick('/login')}>
                    Login
                  </Link>
                  <Link to='/register' className='menu-item' 
                      onClick={() => handleLinkClick('/register')}>
                    Register
                  </Link>
                </>
            )}
          </div>
        </nav>
    );
};



export default NavBar;
