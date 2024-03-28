import React, { useState, useEffect } from 'react';

import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import NavBar from './components/NavBar.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

interface LocalData {
    firstName: string ; 
    lastName: string;
    email: string;
}

function App() {
    const [userData, setUserData] = 
        useState<{ userInfo: LocalData, isLoggedIn: boolean} | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const fetchedUserData = JSON.parse(storedData);
            setUserData({ userInfo: fetchedUserData.userInfo, isLoggedIn: true});
        }
        else {
            const defaultUserData = {
                userInfo: {firstName: '', lastName: '', email: ''},
                isLoggedIn: false
            }
            setUserData(defaultUserData);
        }
    }, []);

    const authorize = (userInfo: LocalData, rememberMe: boolean) => {
        localStorage.setItem('userData', JSON.stringify({ userInfo, isLoggedIn: true }));
        setUserData({ userInfo, isLoggedIn: true});
        if (!rememberMe) {
            const logoutTimer = setTimeout(logOut, 600000); // 10 minutes
            localStorage.setItem('logoutTimer', logoutTimer.toString());
        }
    };
    const logOut = () => {
        window.location.href = '/';
        localStorage.removeItem('userData');
        setUserData(null);
        localStorage.removeItem('logoutTimer'); 
    }

    return (
    <Router>
        <NavBar isLoggedIn={userData !== null && userData.isLoggedIn} logOut={logOut}/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/dashboard' element={userData && userData.isLoggedIn ? 
                <Dashboard userInfo={userData.userInfo ?? null} /> : 
                <Navigate to='/login' />}>
            </Route>          
            <Route path='/login' element={userData && userData.isLoggedIn ? 
                <Navigate to='/dashboard' /> :    
                <Login onLogin={authorize} />}>
            </Route>
            <Route path='/register' element={userData && userData.isLoggedIn ? 
                <Navigate to='/dashboard'/> : 
                <Register onRegister={authorize}/>}>
            </Route>
        </Routes>
    </Router>
    )
}

export default App;
