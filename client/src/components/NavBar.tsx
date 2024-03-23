import React, { Component } from 'react';
import './NavBar.css';

interface NavItem {
    label: string;
    to: string;
  }
  
class NavBar extends Component<{}, NavItem[]> {
    state = {
        items: [
        { label: 'Home', to: '/' },
        { label: 'About', to: '/about' },
        { label: 'Contact', to: '/contact' },
        { label: 'Login', to: '/login' },
        { label: 'Register', to:'/register'}
        ]
    };

    render() {
        return (
        <nav className="navigation">
            {this.state.items.map((item) => (
                <a className="menu-item" href={item.to}>
                    {item.label}
                </a>

            ))}
        </nav>
        );
    }
}
  
export default NavBar;
