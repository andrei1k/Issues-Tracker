import React, { useState, useEffect } from 'react';

import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import NavBar from './components/NavBar.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

interface LocalData {
    firstName: string ; 
    lastName: string;
    email: string;
}

function App() {
    const [userData, setUserData] = 
        useState<{ userInfo: LocalData | null, isLoggedIn: boolean } | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const fetchedUserData = JSON.parse(storedData);
            setUserData({ userInfo: fetchedUserData.userInfo, isLoggedIn: true });
        }
    }, []);

    const authorize = (userInfo: LocalData) => {
        localStorage.setItem('userData', JSON.stringify({ userInfo, isLoggedIn: true }));
        setUserData({ userInfo, isLoggedIn: true });

        const logoutTimer = setTimeout(logOut, 1200000); // 20 minutes
        localStorage.setItem('logoutTimer', logoutTimer.toString());
    };
    const logOut = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        localStorage.removeItem('logoutTimer'); 
        window.location.href = '/';
    }

    return (
    <Router>
        <NavBar isLoggedIn={userData !== null && userData.isLoggedIn} logOut={logOut}/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard userInfo={userData?.userInfo ?? null}/>}/>
            <Route path="/login" element={<Login onLogin={authorize} />} />
            <Route path="/register" element={<Register onRegister={authorize}/>}/>
        </Routes>
    </Router>
    )
}

export default App;
