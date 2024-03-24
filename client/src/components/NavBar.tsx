import React, { useState, useEffect, useRef } from 'react';
import './NavBar.css';

interface NavItem {
    label: string;
    to: string;
}

const NavBar: React.FC = () => {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
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

    const items: NavItem[] = [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Login', to: '/login' },
        { label: 'Register', to:'/register'}
    ];

    return (
        <nav className={"navBar"}>
            <button ref={menuRef} className='menu-button' onClick={toggleMenu}>Menu</button>
            <div  className={`navigation ${menuVisible ? 'open' : ''}`}>
                {items.map((item, index) => (
                    <a key={index} className='menu-item' href={item.to}>
                        {item.label}
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
