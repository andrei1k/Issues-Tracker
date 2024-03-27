import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

interface NavBarProps {
    isLoggedIn: boolean;
    logOut: () => void;
}

function NavBar({ isLoggedIn, logOut } : NavBarProps) {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const menuRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        const handleClickOutside: EventListener = (event: Event) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    const toggleMenu = () => {
        setMenuVisible(prevMenuVisible => !prevMenuVisible);
    };

    return (
        <nav className={"navBar"}>
            <button ref={menuRef} className='menu-button' onClick={toggleMenu}>Menu</button>
            <div  className={`navigation ${menuVisible ? 'open' : ''}`}>
                <Link to='/' className='menu-item'>Home</Link>
                {isLoggedIn ? (
                    <>
                        <Link to='/dashboard' className='menu-item'>My Dashboard</Link>
                        <Link to='/profile' className='menu-item'>My Profile</Link>
                        <Link to='/' className='menu-item' onClick={logOut}>Logout</Link>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='menu-item' >Login</Link>
                        <Link to='/register' className='menu-item'>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );



};



export default NavBar;
