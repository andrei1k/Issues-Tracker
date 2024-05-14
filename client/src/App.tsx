import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import NavBar from './components/NavBar.tsx';
import Register from './pages/Register.tsx';
import Dashboard from './pages/Dashboard.tsx';
import Profile from './pages/Profile.tsx';
import Layout from './components/Layout.tsx';

interface LocalData {
    userId: number;
    firstName: string; 
    lastName: string;
    email: string;
}

function App() {
    const [userData, setUserData] = 
        useState<{ userInfo: LocalData, token:String, isLoggedIn: boolean } | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const fetchedUserData = JSON.parse(storedData);
            setUserData({ userInfo: fetchedUserData.userInfo, token: fetchedUserData.token, isLoggedIn: true});
        }
        else {
            const defaultUserData = {
                userInfo: {userId: 0,firstName: '', lastName: '', email: ''},
                token: '',
                isLoggedIn: false
            }
            setUserData(defaultUserData);
        }
    }, []);

    const authorize = (userInfo: LocalData, rememberMe: boolean, token: string) => {
        localStorage.setItem('userData', JSON.stringify({ userInfo, token, isLoggedIn: true }));
        setUserData({ userInfo,token, isLoggedIn: true});
        if (!rememberMe) {
            const logoutTimer = setTimeout(() => {
                localStorage.removeItem('logoutTimer');
                logOut();
            }, 30 * 1000); // 1 min
            localStorage.setItem('logoutTimer', JSON.stringify(logoutTimer));
        }
    };

    const logOut = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        if (localStorage.getItem('logoutTimer') !== null) {
            return <Navigate to='/'/>;
        }
        else {
            window.location.href = '/login?sessionExpired=true';
        }
    };

    return (
        <div>
            <Helmet>
                <title>{Layout(window.location.pathname)}</title>
            </Helmet>
            <Router>
            <NavBar userId={userData?.userInfo?.userId ?? 0} isLoggedIn={userData?.isLoggedIn ?? false} logOut={logOut}/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/profile' element={<Profile />}/>
                <Route path='/dashboard/:userId' element={<DashboardRoute userData={userData} />} />
                <Route path='/login' element={<Login onLogin={authorize} />} />
                <Route path='/register' element={<Register onRegister={authorize} />} />
            </Routes>
            </Router>
        </div>
      );

}


function DashboardRoute({ userData }) {
    if (!userData) {
        return null;
    }
    console.log(userData?.isLoggedIn);
    return userData?.isLoggedIn ? <Dashboard userInfo={userData.userInfo} token={userData.token} /> : <Navigate to='/login'/>;
}
// function ProfileRoute({ userData }) {
//     if(!userData?.isLoggedIn) {
//         return <Navigate to='/login'></Navigate>;
//     }
    
//     return <Profile/>;
// }

// function DashboardRoute({ userData }) {
//     if (!userData?.isLoggedIn) {
//         return <Navigate to='/login'></Navigate>;
//     }

//     return <Dashboard userInfo={userData.userInfo} token={userData.token} />;
// }

// function LoginRoute({ userData, onLogin }) {
//     if (userData?.isLoggedIn) {
//         return <Navigate to={`/dashboard/${userData.userInfo.userId}`} />;
//     }

//     return <Login onLogin={onLogin} />;
// }

// function RegisterRoute({ userData, onRegister }) {
//     if (userData?.isLoggedIn) {
//         return <Navigate to={`/dashboard/${userData.userInfo.userId}`} />;
//     }

//     return <Register onRegister={onRegister} />;
// }

export default App;
