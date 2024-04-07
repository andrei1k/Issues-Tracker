import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './components/Home.tsx';
import Login from './components/Login.tsx';
import NavBar from './components/NavBar.tsx';
import Register from './components/Register.tsx';
import Dashboard from './components/Dashboard.tsx';
import Profile from './components/Profile.tsx';

interface LocalData {
    userId: number;
    firstName: string; 
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
                userInfo: {userId: 0,firstName: '', lastName: '', email: ''},
                isLoggedIn: false
            }
            setUserData(defaultUserData);
        }
    }, []);

    const authorize = (userInfo: LocalData, rememberMe: boolean) => {
        localStorage.setItem('userData', JSON.stringify({ userInfo, isLoggedIn: true }));
        setUserData({ userInfo, isLoggedIn: true});
        if (!rememberMe) {
            const logoutTimer = setTimeout(() => {
                logOut();
            }, 600000); // 10 minutes
            localStorage.setItem('logoutTimer', logoutTimer.toString());
        }
    };
    const logOut = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        localStorage.removeItem('logoutTimer');
        return <Navigate to='/login?sessionExpired=true'/>;
    }

    return (
        <Router>
          <NavBar userId={userData?.userInfo?.userId ?? 0} isLoggedIn={userData?.isLoggedIn ?? false} logOut={logOut}/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/profile' element={<ProfileRoute userData={userData}/>}/>
            <Route path='/dashboard/:userId' element={<DashboardRoute userData={userData} />} />
            <Route path='/login' element={<LoginRoute userData={userData} onLogin={authorize} />} />
            <Route path='/register' element={<RegisterRoute userData={userData} onRegister={authorize} />} />
          </Routes>
        </Router>
      );

}

function ProfileRoute({ userData }) {
    if(!userData?.isLoggedIn) {
      return <Navigate to='/login' />;
    }

    return <Profile/>;
}

function DashboardRoute({ userData }) {
    if (!userData?.isLoggedIn) {
        return <Navigate to='/login' />;
    }

    return <Dashboard userInfo={userData.userInfo} />;
}

function LoginRoute({ userData, onLogin }) {
    if (userData?.isLoggedIn) {
        return <Navigate to={`/dashboard/${userData.userInfo.userId}`} />;
    }

    return <Login onLogin={onLogin} />;
}

function RegisterRoute({ userData, onRegister }) {
    if (userData?.isLoggedIn) {
        return <Navigate to={`/dashboard/${userData.userInfo.userId}`} />;
    }

    return <Register onRegister={onRegister} />;
}

export default App;
